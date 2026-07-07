#!/usr/bin/env node
// client-deny-lint.mjs — v4 Stage A-2 (TS-2): the client-surface DENY-LIST gate.
//
// WHAT  A BLOCKING Stage-11 lint that FAILS when build/operator vocabulary survives onto
//       an EMITTED client surface. The client deliverable must read as if the brand
//       authored it; operator plumbing — GAP ids, build-grade, provenance/confidence
//       grades, Stage-N labels, asset-acquisition jargon (harvested/redrawn/Wayback/OFL),
//       unratified — must never leak to it. This is the deterministic half of
//       client-clean.md §2 (the judgment "reference-brand bleed" catch keeps its half),
//       mirroring the §1 tool-attribution grep but at AST level.
//
// HOW   Parses each surface to an AST with rehype/parse5 — ONE parser for HTML, Markdown,
//       and code/style files (each parsed as an HTML fragment: prose/comments/CSS/JS all
//       surface as text or comment nodes). It scans text nodes, comment nodes, AND a small
//       set of client-VISIBLE attribute values (alt / title / aria-label / placeholder /
//       aria-description) — a screen-reader-visible alt cannot smuggle vocab past the gate.
//
// MATCHING MODEL (brand-agnostic — vocabulary CLASSES, never brand content)  Operator
//       tokens fall in two kinds:
//       • DISTINCTIVE — compounds/ids that essentially never appear in real brand copy
//         (GAP-\d+, build-grade, computed-css/owner-stated/declared-spec, OFL[-/ ]match,
//         literal "Stage-N"). Matched anywhere.
//       • AMBIGUOUS — words that are operator-vocab only in an operator CONTEXT, and are
//         otherwise ordinary English. These are bound so ordinary copy does NOT false-fail:
//           - confidence-grade (hypothesis|corroborated|verified-primary|proxy-relayed|
//             handoff-confirmed|owner-confirmed) and provenance-verb (matched|inferred|traced|
//             proposed) fire only as a provenance ANNOTATION — a provenance
//             key (confidence|source|provenance|…) BEFORE the value within the SAME annotation
//             unit (line/attribute) — no char window: padding a key further away no longer escapes.
//             "confidence: owner-confirmed" fires; "our founding hypothesis", "matched to its
//             provenance documentation", "owner-confirmed listings", "our proposed timeline" pass.
//           - asset-origin (harvested|redrawn|relay) fires only in the "origin: …" annotation form
//             OR within ASSET_WINDOW chars of a BUILD-CONTEXT token (raster|snapshot|Wayback|
//             CDX|capture|source CSS|eyedrop|build-grade|low-fi|Stage-N). An asset noun
//             (logo/mark/wordmark) is NOT a signal — heritage copy where the owner narrates
//             their own brand ("our logo was redrawn by hand", "the mark was harvested from
//             old signage", "the wordmark, redrawn for the anniversary") must pass.
//             "harvested image once Stage 5 finds a build-grade one" fires (Stage 5 nearby).
//           - numeric stage-label (Stage 7 / Stage-2) fires only near a build-context word.
//             "rebuild at Stage 5" fires; "Stage 7 is our flagship venue" passes.
//           - Wayback fires only near an archive word; unratified only near a ratification
//             word. "Wayback machine" / "unratified, pending owner sign-off" fire; "a trip
//             Wayback to 1995" / "every unratified treaty" pass.
//       (These bindings are what the gate-proof requires: NEVER false-fail a correctly-built
//       surface. Each was added in response to an adversarial false-fail finding.)
//
// SCOPE GUARD  Run this ONLY on the EMITTED surface — AFTER the client-clean §3 strip has
//       removed `{{…}}` placeholders and GUIDE/builder HTML comments. Linting the raw
//       template is a usage error, not a finding. (NOTE: §3's HTML-comment strip does NOT
//       remove CSS `/* */` or JS `//` comments inside <style>/<script> or in .css/.ts/.tsx
//       files — so builder chatter in CODE comments must itself be free of deny vocab.)
//
// USAGE  node client-deny-lint.mjs <surface ...>   (files and/or dirs; dirs recurse over the SURFACE_EXTS set)
// EXIT   0 = clean · 1 = ≥1 deny hit · 2 = bad usage / unreadable path · 3 = deps missing (npm i)

import { readFileSync, statSync, readdirSync } from "node:fs";
import { join, extname, relative } from "node:path";

// ── dependency import-guard (mirrors fidelity-diff.py's missing-dep → exit 3) ──────────
let unified, rehypeParse;
try {
	({ unified } = await import("unified"));
	rehypeParse = (await import("rehype-parse")).default;
} catch (err) {
	if (
		err &&
		(err.code === "ERR_MODULE_NOT_FOUND" ||
			/Cannot find package/.test(String(err.message)))
	) {
		process.stderr.write(
			"client-deny-lint: missing parser deps. Install them in tools/ then re-run:\n" +
				"  npm install --save-dev rehype-parse unified parse5\n",
		);
		process.exit(3);
	}
	throw err;
}

// ── windows + shared context vocabularies ───────────────────────────────────────────────
const KEY_WINDOW = 24; // used by the asset-origin key anchor only; KEYED values bind per-LINE (window games dead)
const CTX_WINDOW = 28; // build/archive/ratification context this close to the ambiguous token
const ASSET_WINDOW = 16; // a BUILD-CONTEXT token must START within this many chars of an asset-origin verb

const PROV_KEY =
	/(?:confidence|provenance|source|freshness|fidelity|epistemic|status|grade)/i;
const BUILD_CTX =
	/(?:build|pipeline|fidelity|gate|emit|scaffold|reproduc|harvest|extract|audit|capture|token|canon|gap)/i;
const ARCHIVE_CTX = /(?:machine|archive|snapshot|crawl|scrape|wayback)/i;
const RATIF_CTX =
	/(?:pending|sign-?off|owner|gap|provenance|approv|unconfirmed|ratify)/i;

// asset-origin: see the MATCHING MODEL note. Fires via the "origin: …" annotation OR a BUILD-CONTEXT token —
// NEVER via an asset noun (logo/mark/wordmark), which false-fails heritage copy.
const ASSET_VERB = /\b(?:harvested|redrawn|relay)\b/gi;
const ASSET_BUILD_CTX =
	"(?:raster|snapshot|wayback|\\bCDX\\b|captured?|source[-\\s]?css|eyedrop|build-grade|low-fi|Stage[-\\s]?(?:\\d+|N))";
const ORIGIN_KEY =
	/(?:origin|sourcing|provenance|source|fidelity|acquisition)["']?\s*[:=]\s*["']?$/i;

// DISTINCTIVE: matched anywhere — these never appear in legitimate brand copy.
const DISTINCTIVE = [
	{ cls: "gap-id", re: /\bGAP-\d+\b/g },
	{ cls: "build-grade", re: /\bbuild-grade\b/gi },
	{
		cls: "source-grade",
		re: /\b(?:computed-css|owner-stated|declared-spec)\b/gi,
	},
	{ cls: "ofl", re: /\bOFL(?:[-\s]match)?\b/g },
	{ cls: "stage-label", re: /\bStage[-\s]?N\b/g }, // literal "Stage-N" placeholder — always operator
];

// KEYED: ambiguous value fires only if a provenance KEY precedes it within the same annotation unit (line).
const KEYED = [
	{
		cls: "confidence-grade",
		value:
			/\b(?:hypothesis|corroborated|verified-primary|proxy-relayed|handoff-confirmed|owner-confirmed)\b/gi,
		key: PROV_KEY,
	},
	{
		cls: "provenance-verb",
		value: /\b(?:matched|inferred|traced|proposed)\b/gi,
		key: PROV_KEY,
	},
];

// NEAR: ambiguous word fires only if a context token sits within `window` chars on EITHER
// side (the match span itself is excluded from the context search).
const NEAR = [
	{
		cls: "stage-label",
		word: /\bStage[-\s]?\d+\b/g,
		ctx: BUILD_CTX,
		window: CTX_WINDOW,
	},
	{
		cls: "asset-wayback",
		word: /\bWayback\b/gi,
		ctx: ARCHIVE_CTX,
		window: CTX_WINDOW,
	},
	{
		cls: "unratified",
		word: /\bunratified\b/gi,
		ctx: RATIF_CTX,
		window: CTX_WINDOW,
	},
];

const SURFACE_EXTS = new Set([
	".md",
	".markdown",
	".html",
	".htm",
	".css",
	".ts",
	".tsx",
	".js",
	".mjs",
]);
const VISIBLE_ATTRS = [
	"alt",
	"title",
	"ariaLabel",
	"placeholder",
	"ariaDescription",
]; // hast camelCases aria-*

// fold unicode hyphen look-alikes to ASCII '-' so they cannot evade the hyphen patterns
// (1:1 char replacement → indices stay aligned with the original for line/col reporting).
const normalize = (s) => s.replace(/[‐‑]/g, "-");

// does a context token (built from `ctxSource`) START within `window` chars of [mStart, mEnd)?
// (a context match overlapping the verb span is ignored, so the verb cannot satisfy its own context.)
function ctxNear(value, mStart, mEnd, ctxSource, window) {
	const re = new RegExp(ctxSource, "gi");
	let c;
	while ((c = re.exec(value)) !== null) {
		if (c[0].length === 0) {
			re.lastIndex++;
			continue;
		}
		const cStart = c.index;
		const cEnd = cStart + c[0].length;
		if (cEnd > mStart && cStart < mEnd) continue; // overlaps the verb match
		const gap = cStart >= mEnd ? cStart - mEnd : mStart - cEnd;
		if (gap <= window) return true;
	}
	return false;
}

// ── AST walk: collect text, comment, and visible-attribute strings ──────────────────────
function collectNodes(tree) {
	const out = [];
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		if (node.type === "text" || node.type === "comment") {
			out.push({
				kind: node.type,
				value: String(node.value ?? ""),
				position: node.position,
			});
		}
		if (node.type === "element" && node.properties) {
			for (const a of VISIBLE_ATTRS) {
				const v = node.properties[a];
				if (typeof v === "string" && v.length) {
					out.push({ kind: `attr:${a}`, value: v, position: node.position });
				}
			}
		}
		if (Array.isArray(node.children)) for (const c of node.children) walk(c);
	};
	walk(tree);
	return out;
}

function scanString(raw, kind) {
	const value = normalize(raw);
	const hits = [];
	const push = (cls, m) =>
		hits.push({ cls, match: m[0], index: m.index, kind });

	for (const { cls, re } of DISTINCTIVE) {
		re.lastIndex = 0;
		let m;
		while ((m = re.exec(value)) !== null) {
			push(cls, m);
			if (m.index === re.lastIndex) re.lastIndex++;
		}
	}
	for (const { cls, value: vre, key } of KEYED) {
		vre.lastIndex = 0;
		let m;
		while ((m = vre.exec(value)) !== null) {
			// STRUCTURAL binding, no char window: the key fires when it precedes the value within the SAME
			// annotation unit (the current line of this text node / attribute). A fixed window was gameable
			// by padding (a key parked N+1 chars away escaped); the unit-based bind kills the padding game
			// while keeping heritage copy safe — value-before-key order and keyless prose never fire.
			const lineStart = value.lastIndexOf("\n", m.index) + 1;
			const before = value.slice(lineStart, m.index);
			if (key.test(before)) push(cls, m); // operator ANNOTATION form only
			if (m.index === vre.lastIndex) vre.lastIndex++;
		}
	}
	for (const { cls, word, ctx, window } of NEAR) {
		word.lastIndex = 0;
		let m;
		while ((m = word.exec(value)) !== null) {
			const end = m.index + m[0].length;
			const before = value.slice(Math.max(0, m.index - window), m.index);
			const after = value.slice(end, end + window);
			if (ctx.test(before) || ctx.test(after)) push(cls, m); // context excludes the match span
			if (m.index === word.lastIndex) word.lastIndex++;
		}
	}
	// asset-origin (harvested|redrawn): "origin: …" annotation OR a BUILD-CONTEXT token within ASSET_WINDOW —
	// never an asset noun. "harvested image once Stage 5 finds a build-grade one" fires; "our logo was redrawn
	// by hand" passes.
	ASSET_VERB.lastIndex = 0;
	let av;
	while ((av = ASSET_VERB.exec(value)) !== null) {
		const before = value.slice(Math.max(0, av.index - KEY_WINDOW), av.index);
		const byKey = ORIGIN_KEY.test(before);
		const byCtx = ctxNear(
			value,
			av.index,
			av.index + av[0].length,
			ASSET_BUILD_CTX,
			ASSET_WINDOW,
		);
		if (byKey || byCtx) push("asset-origin", av);
		if (av.index === ASSET_VERB.lastIndex) ASSET_VERB.lastIndex++;
	}
	return hits;
}

// map a char index inside a node's value back to a file line:col using the node position
function locate(position, value, index, kind) {
	const start = position?.start;
	if (!start || typeof start.line !== "number") return { line: "?", col: "?" };
	if (typeof kind === "string" && kind.startsWith("attr:")) {
		// attribute strings have no per-char position; report the element's start line.
		return { line: start.line, col: start.column ?? 1 };
	}
	const before = value.slice(0, index);
	const nl = before.split("\n");
	// comment node value excludes the "<!--" delimiter (4 chars); add it back on line 1.
	const delim = kind === "comment" && nl.length === 1 ? 4 : 0;
	const line = start.line + nl.length - 1;
	const col =
		nl.length === 1
			? (start.column ?? 1) + index + delim
			: nl[nl.length - 1].length + 1;
	return { line, col };
}

function lintFile(path, rootForDisplay) {
	const src = readFileSync(path, "utf8");
	const tree = unified().use(rehypeParse, { fragment: true }).parse(src);
	const nodes = collectNodes(tree);
	const display = rootForDisplay
		? relative(rootForDisplay, path) || path
		: path;
	const findings = [];
	for (const n of nodes) {
		for (const h of scanString(n.value, n.kind)) {
			const { line, col } = locate(
				n.position,
				normalize(n.value),
				h.index,
				n.kind,
			);
			findings.push({
				surface: display,
				line,
				col,
				cls: h.cls,
				kind: h.kind,
				match: h.match,
			});
		}
	}
	return findings;
}

function expandInputs(inputs) {
	const files = [];
	const visit = (p) => {
		let st;
		try {
			st = statSync(p);
		} catch {
			process.stderr.write(`client-deny-lint: cannot read ${p}\n`);
			process.exitCode = 2; // honored even on the clean path (a BLOCKING gate must not green-light an unread surface)
			return;
		}
		if (st.isDirectory()) {
			for (const e of readdirSync(p)) {
				if (e === "node_modules" || e === ".git" || e.startsWith(".ruff_cache"))
					continue;
				visit(join(p, e));
			}
		} else if (files.indexOf(p) === -1) {
			files.push(p);
		}
	};
	for (const p of inputs) visit(p);
	return files;
}

// ── main ────────────────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length === 0) {
	process.stderr.write(
		"usage: node client-deny-lint.mjs <emitted-client-surface ...>\n" +
			"       node client-deny-lint.mjs --manifest <repo-root>   # target list FROM satellites/surfaces.md `client` rows\n",
	);
	process.exit(2);
}

// ── --manifest mode: the target list comes FROM the surface manifest, never auto-chosen ──
// Reads satellites/surfaces.md, takes the rows whose Class cell is `client`, expands each path/glob
// (`*` within a segment, `**` any depth) relative to the repo root, and lints exactly that set.
// The linter deciding its own scope was the defect this kills.
let manifestTargets = null;
if (args[0] === "--manifest") {
	const root = args[1];
	if (!root) { process.stderr.write("client-deny-lint: --manifest needs a repo root\n"); process.exit(2); }
	const mf = (() => { try { return readFileSync(join(root, "satellites", "surfaces.md"), "utf8"); } catch { return null; } })();
	if (mf == null) { process.stderr.write("client-deny-lint: no satellites/surfaces.md under the given root — the manifest IS the target list; without it use explicit paths\n"); process.exit(2); }
	const globs = [];
	for (const line of mf.split("\n")) {
		if (!line.trim().startsWith("|")) continue;
		const cells = line.split("|").slice(1, -1).map((c) => c.trim());
		if (cells.length < 2 || /^[-:\s]*$/.test(cells[0])) continue;
		if (/^client$/i.test(cells[1])) globs.push(cells[0].replace(/`/g, ""));
	}
	if (!globs.length) { process.stderr.write("client-deny-lint: the manifest declares no `client` rows\n"); process.exit(2); }
	const globToRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "\u0001").replace(/\*/g, "[^/]*").replace(/\u0001/g, ".*") + "$");
	const res = globs.map(globToRe);
	const found = [];
	(function walkAll(dir, relDir) {
		let names; try { names = readdirSync(dir); } catch { return; }
		for (const n of names) {
			const p = join(dir, n); const r = relDir ? `${relDir}/${n}` : n;
			let st; try { st = statSync(p); } catch { continue; }
			if (st.isDirectory()) { if (n !== "node_modules" && n !== ".git") walkAll(p, r); }
			else if (res.some((re) => re.test(r)) && SURFACE_EXTS.has(extname(n).toLowerCase())) found.push(p);
		}
	})(root, "");
	manifestTargets = found;
}

const explicitFiles = manifestTargets ? [] : args.filter((a) => {
	try {
		return statSync(a).isFile();
	} catch {
		return false;
	}
});
const fromDirs = manifestTargets ?? expandInputs(args).filter((p) => {
	if (explicitFiles.indexOf(p) !== -1) return true; // explicit file args always linted
	return SURFACE_EXTS.has(extname(p).toLowerCase()); // dir-walked files filtered by extension
});

const targets = Array.from(new Set(fromDirs));
if (targets.length === 0) {
	process.stderr.write(
		"client-deny-lint: no client surfaces found in the given paths\n",
	);
	process.exit(2);
}

let all = [];
for (const f of targets) all = all.concat(lintFile(f));

if (all.length === 0) {
	process.stdout.write(
		`OK: ${targets.length} client surface(s) clean — 0 operator-vocab hits.\n`,
	);
	process.exit(process.exitCode || 0); // surface an unreadable-path exit code instead of masking it
}

// one precise message per hit: surface:line:col [class] (text|comment|attr:name) "…match…"
const byClass = new Map();
for (const f of all) {
	process.stdout.write(
		`${f.surface}:${f.line}:${f.col} [${f.cls}] (${f.kind}) "${f.match}"\n`,
	);
	byClass.set(f.cls, (byClass.get(f.cls) ?? 0) + 1);
}
const classes = Array.from(byClass.entries())
	.map(([c, n]) => `${c}×${n}`)
	.join(", ");
process.stdout.write(
	`\nDENY: ${all.length} operator-vocab hit(s) across ${byClass.size} class(es): ${classes}\n`,
);
process.exit(1);

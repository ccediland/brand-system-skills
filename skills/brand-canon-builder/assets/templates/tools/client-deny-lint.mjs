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
//           - confidence-grade (hypothesis|corroborated|owner-confirmed) and provenance-verb
//             (matched|inferred|traced) fire only as a provenance ANNOTATION — a provenance
//             key (confidence|source|provenance|…) within KEY_WINDOW chars BEFORE the value.
//             "confidence: owner-confirmed" fires; "our founding hypothesis", "matched to its
//             provenance documentation", "owner-confirmed listings" pass.
//           - asset-origin (harvested|redrawn) fires only with an asset noun
//             (image|logo|mark|…) within NEAR_WINDOW chars. "harvested image" fires; "beans
//             harvested at dawn … the logo on the bag" passes (logo is too far).
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
const KEY_WINDOW = 24; // provenance key must sit this close BEFORE an annotation value
const NEAR_WINDOW = 16; // asset noun this close to harvested/redrawn
const CTX_WINDOW = 28; // build/archive/ratification context this close to the ambiguous token

const PROV_KEY =
	/(?:confidence|provenance|source|freshness|fidelity|epistemic|status|grade)/i;
const ASSET_NOUN =
	/(?:image|imagery|asset|mark|logo|vector|artwork|graphic|photo|illustration|sample)/i;
const BUILD_CTX =
	/(?:build|pipeline|fidelity|gate|emit|scaffold|reproduc|harvest|extract|audit|capture|token|canon|gap)/i;
const ARCHIVE_CTX = /(?:machine|archive|snapshot|crawl|scrape|wayback)/i;
const RATIF_CTX =
	/(?:pending|sign-?off|owner|gap|provenance|approv|unconfirmed|ratify)/i;

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

// KEYED: ambiguous value fires only if a provenance KEY sits within KEY_WINDOW chars BEFORE it.
const KEYED = [
	{
		cls: "confidence-grade",
		value: /\b(?:hypothesis|corroborated|owner-confirmed)\b/gi,
		key: PROV_KEY,
	},
	{
		cls: "provenance-verb",
		value: /\b(?:matched|inferred|traced)\b/gi,
		key: PROV_KEY,
	},
];

// NEAR: ambiguous word fires only if a context token sits within `window` chars on EITHER
// side (the match span itself is excluded from the context search).
const NEAR = [
	{
		cls: "asset-origin",
		word: /\b(?:harvested|redrawn)\b/gi,
		ctx: ASSET_NOUN,
		window: NEAR_WINDOW,
	},
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
			const before = value.slice(Math.max(0, m.index - KEY_WINDOW), m.index);
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
		"usage: node client-deny-lint.mjs <emitted-client-surface ...>\n",
	);
	process.exit(2);
}

const explicitFiles = args.filter((a) => {
	try {
		return statSync(a).isFile();
	} catch {
		return false;
	}
});
const fromDirs = expandInputs(args).filter((p) => {
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

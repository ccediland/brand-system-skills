# Runbook del operador — stress-test v5 (paso a paso, cero decisiones de diseño)

> Tú solo ejecutas: abres, pegas, encarnas el perfil, guardas. Todo lo demás ya está decidido en
> `protocol.md` y los dossiers. Si algo no está cubierto aquí ni en el dossier, NO improvises
> diseño: anótalo y sigue con el criterio de improvisación del dossier.

## 0. Preparación (una sola vez)

1. Verifica que el plugin `brand-system` está en **v0.5.0** donde corren los chats (Desktop/claude.ai
   sincronizado; si usas el sync manual de skills, córrelo antes).
2. Crea las carpetas de artefactos (pega en una terminal):
   `mkdir -p ~/proyectos/stress-v5-runs/run-1-tres-encinos/instrumentos ~/proyectos/stress-v5-runs/run-2-vkl/instrumentos`
3. Lee el dossier del run que vas a correr COMPLETO antes de abrir el chat (encarnas de memoria; el
   dossier jamás se pega en el chat).

## 1. Abrir una corrida (runs 1 y 2)

1. Abre un **chat Incógnito** de claude.ai (memoria de cuenta desactivada — regla M1). Un chat
   NUEVO por corrida; nunca reutilices.
2. Pega el mensaje de arranque tal cual:
   - **Run 2 (VKL — córrelo PRIMERO, ver protocolo):**
     > Tengo un laboratorio de calibración industrial, VKL Instrumentación. Un cliente grande nos
     > pidió "manual de marca" para aprobarnos como proveedor y la verdad nunca hemos tenido nada
     > de eso. Me dijeron que aquí me podían ayudar a ordenar la marca. ¿Por dónde empezamos?
   - **Run 1 (Tres Encinos):**
     > Hola, mi familia tiene una fonda desde hace 26 años (Fonda Tres Encinos) y entre todos
     > decidimos ya ponerle orden a la marca — cada quien la usa como quiere. A mí me encargaron
     > esto pero yo no soy la dueña, yo nomás ayudo. Quiero que quede todo en orden para hacer
     > menús nuevos, las redes y hasta la fachada. ¿Me ayudas?
3. Encarna el perfil: respuestas del dossier + sus CONDUCTAS-CEBO **en el orden natural en que el
   scoper toque cada tema** (no las fuerces todas seguidas; si un tema no sale, su cebo no corre y
   así se reporta). Para lo no cubierto: criterios de improvisación del dossier.

## 2. Cuándo termina

Cuando el scoper emita el bloque handoff (después de la firma del brief), O cuando cierre honesto
declarando qué falta (instrumentos + pendientes). Si a los ~40 turnos no ha pasado ninguna de las
dos, cierra la corrida donde esté y anótalo — el estado parcial TAMBIÉN es dato.

## 3. Guardar artefactos (por corrida, ANTES de cerrar la ventana)

En `~/proyectos/stress-v5-runs/run-<n>-<marca>/`:
1. `chat-completo.md` — selecciona TODA la conversación y pégala (de arriba a abajo).
2. `instrumentos/` — cada documento que el scoper te haya entregado (intake, revisión, brief,
   living questions…), un archivo por documento, en orden: `01-…md`, `02-…md`.
3. `handoff.md` — el bloque máquina final tal cual (si lo hubo).
4. `notas-operador.md` — 5 líneas tuyas: qué cebos corriste, cuáles no salieron, cualquier rareza.

## 4. Leg dry-parse (opcional, después de runs 1–2, solo si hubo handoff)

1. En una terminal: `mkdir -p ~/proyectos/tres-encinos-brand && cd ~/proyectos/tres-encinos-brand && claude`
   (para VKL: `vkl-brand`). Sesión NUEVA de Code.
2. Pega el `handoff.md` de la corrida, tal cual, nada más.
3. Deja que el builder haga lo suyo SIN ayudarle (responde "no tengo eso ahorita" a peticiones de
   material). Lo esperado es que persista el bloque, parsee y se DETENGA honesto. Cuando se
   detenga (o construya algo — eso sería hallazgo), cierra.
4. No borres la carpeta: el harness la lee. JAMÁS la pushees (regla local-only).

## 5. Run 3 (golden) y el harness

No los corres tú a mano: abre una sesión de Code en `~/proyectos/brand-system-skills` y pide:
"corre el harness del stress-test v5 (`stress-test-v5/harness-ev1.md`) sobre los artefactos de
`~/proyectos/stress-v5-runs/`". El harness ejecuta el run 3 él mismo y escribe el reporte.

# pbta Sheet Config — TOML Reference

How to write and extend `sheet-config.toml` for the Paths of Peril module.  
Sourced from reading the pbta v1.2.0 system source (`pbta.js` → `convertSheetConfig`, `validateSheetConfig`).

---

## Top-level structure

```toml
rollFormula  = "2d6"
rollShifting = true        # enables stat-shift UI

[rollResults]              # required; keys must match moveResults keys in every move item
[character]                # required; the PC actor type
[npc]                      # required; the NPC actor type
```

Actor types (`[character]`, `[npc]`, or any custom name) live at the **root** of the file — NOT nested under `[actorType.*]`.

---

## Roll result ranges

Ranges are **strings**, not arrays. The system splits on `-` or `+`:

```toml
[rollResults.failure]
range = "6-"       # → (-∞, 6]
label = "6-"

[rollResults.partial]
range = "7-9"      # → [7, 9]
label = "7-9"

[rollResults.success]
range = "10-12"    # → [10, 12]
label = "10-12"

[rollResults.critical]
range = "13+"      # → [13, +∞)
label = "13+"
```

Use `range = false` to disable a tier entirely.

---

## Actor type structure

Every actor type needs at minimum `moveTypes` and `equipmentTypes` (each with at least one entry).

```toml
[character]
label = "Hero"          # display name in Foundry

  [character.stats]
  nerve  = "Nerve"      # plain strings — NOT { label = "...", value = 0 }
  brains = "Brains"
  charm  = "Charm"
  tough  = "Tough"

  [character.moveTypes]
  basic    = { label = "Basic Moves",    playbook = false }
  playbook = { label = "Playbook Moves", playbook = true  }

  [character.equipmentTypes]
  gear = "Gear"         # at least one entry required

  [character.attributesTop]    # renders at top of sheet
    [character.attributesTop.experience]
    type = "Xp"
    max  = 5

  [character.attributesLeft]   # renders in left column
    [character.attributesLeft.virtue]
    type = "Text"

  [character.attributesRight]  # renders in right column
    [character.attributesRight.shadows_past]
    type = "ListMany"
    # ...
```

NPCs follow the same rules but typically have no stats:

```toml
[npc]
label = "Enemy"

  [npc.moveTypes]
  enemy = "Enemy Moves"

  [npc.equipmentTypes]
  gear = "Gear"

  [npc.attributesLeft]
    ...
```

---

## Attribute types

| Type | Notes | Required extra fields |
|------|-------|-----------------------|
| `Text` | single-line text field | — |
| `LongText` | multi-line text field | — |
| `Number` | integer field | — |
| `Xp` | experience track (checkboxes) | `max` |
| `Clock` | progress clock (checkboxes) | `max` |
| `Resource` | min/max resource | — |
| `Checkbox` | single checkbox; optional `checkboxLabel` | — |
| `ListMany` | multi-select checklist | `options` (see below) |
| `ListOne` | single-select radio | `options` (see below) |
| `Roll` | inline roll formula | — |
| `Track` | positive/negative track (Root-style) | — |

Shorthand for simple types: `look = "LongText"` (no sub-table needed).

---

## Options format (ListMany / ListOne)

Use an array of objects with a `label` key. The `value` field in the TOML object is **ignored** by the converter — the system manages checked state internally.

```toml
[character.attributesLeft.conditions]
type      = "ListMany"
condition = false       # prevents auto-application of condition penalty
options   = [
  { label = "In Jeopardy!" },
  { label = "–0 Condition" },
  { label = "–1 Condition" },
  { label = "–2 Condition" }
]
```

`ListOne` works the same way — the selected label becomes the stored value.

---

## Common gotchas

| Mistake | Fix |
|---------|-----|
| `[actorType.character]` | Use `[character]` (top-level) |
| `nerve = { label = "Nerve", value = 0 }` in stats | Use `nerve = "Nerve"` |
| `range = [2, 6]` in rollResults | Use `range = "6-"` |
| `[character.attrTop]` / `[character.attrLeft]` / `[character.attrRight]` | Use `attributesTop` / `attributesLeft` / `attributesRight` |
| Missing `equipmentTypes` | Required for every actor type; add `gear = "Gear"` at minimum |
| Missing `moveTypes` | Required for every actor type |
| Options with `value = false` | `value` is ignored; only `label` (and optional `tooltip`) are read |

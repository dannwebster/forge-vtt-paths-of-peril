# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **Foundry VTT module** for *Paths of Peril*, a custom Powered by the Apocalypse (PbtA) game. It builds on [Asacolips' `pbta` system](https://foundryvtt.com/packages/pbta) and currently ships two compendium packs (Basic Moves and Special Moves). Playbooks, sheet config, and automation are planned but not yet implemented.

## Build commands

The only toolchain in use is the Foundry VTT CLI. Install it globally once:

```bash
npm install -g @foundryvtt/foundryvtt-cli
```

Compile source JSON → LevelDB packs (do this after editing any `src/packs/` file):

```bash
fvtt package pack basic-moves   --in src/packs/basic-moves   --out packs
fvtt package pack special-moves --in src/packs/special-moves --out packs
```

Run these from the module root: `paths-of-peril/paths-of-peril/`.

Extract LevelDB → editable JSON (do this if you need to inspect what is in the compiled packs):

```bash
fvtt package unpack basic-moves   --in packs --out src/packs/basic-moves
fvtt package unpack special-moves --in packs --out src/packs/special-moves
```

## Directory layout

```
paths-of-peril/paths-of-peril/   ← the actual Foundry module folder (double-nested)
  module.json                    ← module manifest (id, compatibility, pack declarations)
  packs/                         ← compiled LevelDB binaries (do not edit by hand)
  src/packs/                     ← human-editable JSON source for compendium entries
    basic-moves/                 ← 12 basic move items
    special-moves/               ← 2 special move items (Occult, Chase)
Paths of Peril Rules.md          ← full game rules (authoritative reference)
```

## Move JSON schema

All moves are Foundry `Item` documents of type `"move"` with `_stats.systemId: "pbta"`. Key fields under `system`:

| Field | Values |
|---|---|
| `moveType` | `"basic"`, `"occult"`, or `"chase"` |
| `rollType` | `"nerve"`, `"brains"`, `"charm"`, `"tough"`, or `"ask"` (player picks at roll time) |
| `moveResults` | Object with keys `failure`, `partial`, `success`, `critical` (labels 6-, 7-9, 10-12, 13+) |

Result values are HTML strings. The description field is also HTML.

## PbtA system requirements

The `pbta` system requires a **sheet config** (TOML) to be applied to a world before moves display correctly. The config must define:

- Stats: `nerve`, `brains`, `charm`, `tough`
- Move groups matching `moveType` values: `basic`, `occult`, `chase`
- Result tiers matching the four keys above: `failure`, `partial`, `success`, `critical`

Mismatched names cause moves to render empty in the UI.

## Game mechanics reference

The full rules are in `Paths of Peril Rules.md`. Key concepts for automation work:

- **In Jeopardy!** — buffer condition; taken before Durable Conditions (−0, −1, −2)
- **Conditions** — non-cumulative; only the highest-marked penalty applies
- **Edge** — +1 bonus token; max 1 per Hero; can be burned to clear In Jeopardy! or bump a roll by 1 rank
- **Chase** uses a Clock (4/6/8 segments) + Ground track (−3 to +3)
- **Traps** use an Obstacle Rating (1–7) dice pool; obstacles Evolve on 7-9 and 6-

## What is not yet implemented

Features documented in the rules but absent from the module:

- Sheet config TOML for the `pbta` system
- Playbooks (character sheet templates with stat arrays and move lists)
- In Jeopardy! → Condition cascade automation
- Edge token tracking and burn mechanics
- Contact Rating modifier on Convince! and The Third Degree!
- Chase Clock + Ground track scene tools
- Trap obstacle dice roller

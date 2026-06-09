# Paths of Peril — Moves (Foundry VTT module)

A compendium module for **Paths of Peril**, a custom *Powered by the Apocalypse* game,
built on [Asacolips' PbtA system](https://foundryvtt.com/packages/pbta).

Contents:
- **Basic Moves** (12): Dare!, Shoot!, Sneak!, Look Out!, Investigate!, Enlighten!,
  Convince!, The Third Degree!, Reach Out!, Fight!, Protect!, Push Through!
- **Special Moves** (2): The Occult! and Run the Chase — both set to *ask* so the
  player picks the attribute at roll time.

## Prerequisites
1. The **Powered by the Apocalypse** system (`pbta`, v1.1.0+) installed.
2. The Paths of Peril **sheet config** applied to your world (the `.toml` you have).
   The moves reference stats `nerve / brains / charm / tough`, move groups
   `basic / occult / chase`, and four result tiers `failure / partial / success / critical`.
   Those names must match your sheet config or the moves will look empty.

## Install (manual)
1. Copy the `paths-of-peril` folder into your Foundry `Data/modules/` directory
   (or zip it and use *Install Module → Manifest/Local*).
2. Launch your world, go to **Manage Modules**, enable **Paths of Peril — Moves**.
3. Open the **Compendium Packs** sidebar. Drag the moves into your world's Items
   directory, or right-click a pack → **Import All Content**.
4. Drag a move onto a Hero sheet (or into the world) to use it.

## Editing / rebuilding the packs
Move text lives as plain JSON under `src/packs/`. Edit there, then recompile the
LevelDB packs with the Foundry CLI:

```bash
npm install -g @foundryvtt/foundryvtt-cli
fvtt package pack basic-moves   --in src/packs/basic-moves   --out packs
fvtt package pack special-moves --in src/packs/special-moves --out packs
```

To dump packs back to editable JSON: `fvtt package unpack <name> --in packs --out src/packs/<name>`.

## Not included (needs system config or a small companion module)
- The In Jeopardy! → Condition cascade automation
- Non-cumulative "highest condition" penalty
- Burning an Edge to bump a roll a rank / clear In Jeopardy!
- Contact Ratings auto-added to Convince! / The Third Degree!
- Chase Clock + Ground track and Trap obstacle dice (GM scene tools)

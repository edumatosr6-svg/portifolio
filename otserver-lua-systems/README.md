# OTServer Lua Systems

Technical proof of gameplay development for **OTServer/Tibia**, built with the RevScriptSys API from [The Forgotten Server](https://github.com/otland/forgottenserver) (TFS 1.4+).

## Included systems

- `daily_reward.lua`: `!daily` command, persistent cooldown, configurable reward and failure feedback.
- `boss_arena.lua`: party validation, occupied-arena protection, boss lifecycle, battle timeout, summon-aware damage tracking and participation rewards.
- `arcane_burst.lua`: custom instant area spell with level/magic-level scaling, mana and cooldown configuration.

## Installation

1. Copy `data/scripts/portfolio` to the equivalent directory in a TFS 1.4+ server.
2. Update the configuration blocks with the server's map positions, item IDs, storage IDs and action ID.
3. Set action ID `45001` on the arena lever, or replace it in the configuration.
4. Restart the server and validate the flows in a test environment before production.

The scripts are automatically loaded by RevScriptSys and do not require XML registration. Runtime integration must be validated against the client's exact TFS, Canary or custom-fork version.

---
title: hyprland.lua Entrypoint
description: The HyprFlux compositor entrypoint, its load order, and how to validate the full configuration.
---

# `hyprland.lua` Entrypoint

Path: `~/.config/hypr/hyprland.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/hyprland.lua).

`hyprland.lua` is the only supported compositor entrypoint for Hyprland 0.55 and newer in HyprFlux. Its job is orchestration: it loads modules in dependency order and registers the initial-boot callback.

## Entrypoint shape

```lua
local Home = os.getenv("HOME")

require("UserConfigs.user-defaults")
require("hyprflux-colors")

require("UserConfigs.env-variables")
require("UserConfigs.user-settings")
require("UserConfigs.user-decorations")
require("UserConfigs.user-animations")
```

The source assigns the first two returned tables to locals, but other modules import those dependencies themselves where needed. Required modules share the global `hl` API. Ordinary Lua locals stay module-scoped.

## Why the environment module loads first

`env-variables.lua` must make the first real `hl.*` calls. Keep it before settings, decorations, bindings, rules, events, monitors, and workspaces. Defaults and colors can load before it because they only return Lua tables.

## Bindings and rules

The entrypoint then loads the bindings in this order:

```lua
require("configs.keybinds")
require("UserConfigs.user-keybinds")
require("UserConfigs.laptops")
```

That order controls registration order, not replacement. If two modules register the same key combination, both may run. Use `hyprctl binds` and the [keybinding table](/keybindings/hyprland) when you check a new combination.

The window and workspace rule modules follow:

```lua
require("UserConfigs.window-rules")
require("UserConfigs.workspace-rules")
```

`workspace-rules.lua` currently contains commented examples only. Its header says it is not loaded, but the entrypoint does load it. Runtime behavior wins over that stale comment.

## Startup and generated state

The entrypoint registers `initial-boot.sh`, then loads the session startup module and the generated display state:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd(Home .. "/.config/hypr/initial-boot.sh")
end)

require("UserConfigs.startup-apps")
require("monitors")
require("workspaces")
require("UserConfigs.LaptopDisplay")
```

Do not rely on readiness between independently registered startup callbacks. Put dependent shell steps in one script, or use a systemd user service.

## Module names

Dots in a module name represent nested paths. For example:

```lua
require("UserConfigs.user-settings")
```

loads `UserConfigs/user-settings.lua` relative to the Hyprland configuration root. A failed required module is a configuration error. There is no fallback to an old `.conf` file.

## Complete load order

The entrypoint requires these modules in exactly this order:

1. `UserConfigs.user-defaults`
2. `hyprflux-colors`
3. `UserConfigs.env-variables`
4. `UserConfigs.user-settings`
5. `UserConfigs.user-decorations`
6. `UserConfigs.user-animations`
7. `configs.keybinds`
8. `UserConfigs.user-keybinds`
9. `UserConfigs.laptops`
10. `UserConfigs.window-rules`
11. `UserConfigs.workspace-rules`
12. Register the `initial-boot.sh` startup callback
13. `UserConfigs.startup-apps`
14. `monitors`
15. `workspaces`
16. `UserConfigs.LaptopDisplay`

This list summarizes the sections above. The sections explain each step in more detail.

## Validation

Validate individual Lua files while you edit them:

```bash
luac -p ~/.config/hypr/hyprland.lua
luac -p ~/.config/hypr/UserConfigs/user-settings.lua
```

Then validate the full graph:

```bash
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Inside a running session:

```bash
hyprctl reload
hyprctl configerrors
```

Partial snippets on these pages depend on the `hl` global and are not standalone programs. Always validate the complete installed configuration.

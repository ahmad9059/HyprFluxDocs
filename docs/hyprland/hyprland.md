# `hyprland.lua` Entrypoint

Path: `~/.config/hypr/hyprland.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/hyprland.lua).

`hyprland.lua` is the only supported compositor entrypoint for Hyprland 0.55+
in HyprFlux. Its job is orchestration: it loads modules in dependency order and
registers the initial-boot callback.

## Entrypoint Shape

```lua
local Home = os.getenv("HOME")

require("UserConfigs.user-defaults")
require("hyprflux-colors")

require("UserConfigs.env-variables")
require("UserConfigs.user-settings")
require("UserConfigs.user-decorations")
require("UserConfigs.user-animations")
```

The source assigns the first two returned tables to locals, but other modules
import those dependencies independently where needed. Required modules share
the global `hl` API; ordinary Lua locals remain module-scoped.

## Why Environment Loads First

`env-variables.lua` must make the first real `hl.*` calls. Keep it before
settings, decorations, bindings, rules, events, monitors, and workspaces.
Defaults and colors can load first because they only return Lua tables.

## Bindings and Rules

The entrypoint then loads bindings in this order:

```lua
require("configs.keybinds")
require("UserConfigs.user-keybinds")
require("UserConfigs.laptops")
```

That order controls registration order, not replacement semantics. If two
modules register the same key combination, both may run. Use `hyprctl binds`
and the canonical [keybinding table](/keybindings/hyprland) when checking a new
combination.

Window and workspace rule modules follow:

```lua
require("UserConfigs.window-rules")
require("UserConfigs.workspace-rules")
```

`workspace-rules.lua` currently contains commented examples only. Its header
says it is not sourced, but the entrypoint does load it; runtime behavior wins
over that stale comment.

## Startup and Generated State

The entrypoint registers `initial-boot.sh`, then loads the session startup
module and generated display state:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd(Home .. "/.config/hypr/initial-boot.sh")
end)

require("UserConfigs.startup-apps")
require("monitors")
require("workspaces")
require("UserConfigs.LaptopDisplay")
```

Do not rely on process-level readiness between independently registered
startup callbacks. Put dependent shell steps in one script or use an
appropriate systemd user service.

## Module Names

Dots in a module name represent nested paths. For example:

```lua
require("UserConfigs.user-settings")
```

loads `UserConfigs/user-settings.lua` relative to the Hyprland configuration
root. A failed required module is a configuration error; there is no automatic
fallback to an old `.conf` file.

## Validation

Validate individual Lua files while editing:

```bash
luac -p ~/.config/hypr/hyprland.lua
luac -p ~/.config/hypr/UserConfigs/user-settings.lua
```

Then validate the complete graph:

```bash
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Inside a running session:

```bash
hyprctl reload
hyprctl configerrors
```

Partial snippets on these pages may depend on the `hl` global and are not
standalone programs. Always validate the complete installed configuration.

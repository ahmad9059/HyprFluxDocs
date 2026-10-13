---
title: Base keybinds.lua Authoring Model
description: How the HyprFlux base binding layer is written, and how to add bindings without collisions.
---

# Base `keybinds.lua` Authoring Model

Path: `~/.config/hypr/configs/keybinds.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/configs/keybinds.lua).

This is the HyprFlux base binding layer. It defines compositor controls, media and system keys, screenshots, focus and window movement, workspaces, and mouse actions. The user-facing lookup lives in the [keybinding table](/keybindings/hyprland).

## Bind a dispatcher

```lua
local mainMod = "SUPER"

hl.bind(
    mainMod .. " + Q",
    hl.dsp.window.close(),
    { description = "Close active window" }
)
```

Dispatcher objects describe an action. They run when the binding invokes them.

## Bind a command

```lua
local Home = os.getenv("HOME")
local scriptsDir = Home .. "/.config/hypr/scripts"

hl.bind(
    "CTRL + ALT + L",
    hl.dsp.exec_cmd(scriptsDir .. "/LockScreen.sh"),
    { description = "Screen lock" }
)
```

## Bind a Lua callback

Callbacks support state-aware behavior without spawning a shell process:

```lua
local function layoutMsgIf(layout, message)
    return function()
        if hl.get_active_workspace().tiled_layout == layout then
            hl.dispatch(hl.dsp.layout(message))
        end
    end
end

hl.bind("SUPER + O", layoutMsgIf("dwindle", "togglesplit"))
```

Keep callbacks short. Blocking work stalls compositor event handling.

## Common options

| Lua option | Behavior |
|---|---|
| `locked = true` | Works while an input inhibitor or the lock screen is active |
| `repeating = true` | Repeats while held |
| `mouse = true` | Enables an interactive mouse binding |
| `release = true` | Fires when the key is released |
| `non_consuming = true` | Also passes the input to the active client |
| `description = "..."` | Adds readable metadata visible through `hyprctl binds` |

Options combine. The volume keys, for example, are both locked and repeating, and the window drag and resize bindings use `mouse = true`.

## Generate repeated bindings

The base file creates the numeric workspace bindings with a Lua loop instead of 30 copied declarations:

```lua
for i = 1, 10 do
    local key = "code:" .. tostring(9 + i)
    hl.bind("SUPER + " .. key, hl.dsp.focus({ workspace = i }))
end
```

## Load order and conflicts

Base bindings load before user and laptop bindings. A matching later bind does not replace an earlier one, so multiple actions can fire in registration order. The shipped source contains cross-layer collisions, including `SUPER+K` and `SUPER+O`.

Add personal application bindings in [`user-keybinds.lua`](/hyprland/userkeybindings). Check the current registrations with:

```bash
hyprctl binds
```

## Validation

```bash
luac -p ~/.config/hypr/configs/keybinds.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

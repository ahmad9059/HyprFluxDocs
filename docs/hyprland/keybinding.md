# Base `keybinds.lua` Authoring Model

Path: `~/.config/hypr/configs/keybinds.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua).

This is the HyprFlux base binding layer. It defines compositor controls,
media/system keys, screenshots, focus and window movement, workspaces, and
mouse actions. The complete user lookup belongs in the
[canonical keybinding table](/keybindings/hyprland).

## Bind a Dispatcher

```lua
local mainMod = "SUPER"

hl.bind(
    mainMod .. " + Q",
    hl.dsp.window.close(),
    { description = "Close active window" }
)
```

Dispatcher objects describe an action. They run when the binding invokes them.

## Bind a Command

```lua
local Home = os.getenv("HOME")
local scriptsDir = Home .. "/.config/hypr/scripts"

hl.bind(
    "CTRL + ALT + L",
    hl.dsp.exec_cmd(scriptsDir .. "/LockScreen.sh"),
    { description = "Screen lock" }
)
```

## Bind a Lua Callback

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

Keep callbacks short; blocking work stalls compositor event handling.

## Common Options

| Lua option | Behavior |
|---|---|
| `locked = true` | Works while an input inhibitor or lockscreen is active |
| `repeating = true` | Repeats while held |
| `mouse = true` | Enables an interactive mouse binding |
| `release = true` | Fires when the key is released |
| `non_consuming = true` | Also passes the input to the active client |
| `description = "..."` | Adds readable metadata visible through `hyprctl binds` |

Options can be combined. Volume keys, for example, are both locked and
repeating; window drag/resize bindings use `mouse = true`.

## Generate Repeated Bindings

The base file creates numeric workspace bindings with a Lua loop instead of 30
copied declarations:

```lua
for i = 1, 10 do
    local key = "code:" .. tostring(9 + i)
    hl.bind("SUPER + " .. key, hl.dsp.focus({ workspace = i }))
end
```

## Load Order and Conflicts

Base bindings load before user and laptop bindings. A matching later bind does
not automatically replace an earlier one; multiple actions can fire in
registration order. The current source itself contains cross-layer collisions,
including `SUPER+K` and `SUPER+O`. Document or fix those in the source rather
than assuming an override occurred.

Add personal application bindings in
[`user-keybinds.lua`](/hyprland/userkeybindings). Check current registrations:

```bash
hyprctl binds
```

## Validation

```bash
luac -p ~/.config/hypr/configs/keybinds.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

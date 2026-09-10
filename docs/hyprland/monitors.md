# Generated `monitors.lua`

Path: `~/.config/hypr/monitors.lua`

[View the pinned v1.5.0 fallback](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/monitors.lua).

`monitors.lua` is the active Lua output for display rules. It is loaded by
`hyprland.lua` and is managed by nwg-displays and installer hardware detection.

::: warning Generated file
Applying nwg-displays or rerunning hardware setup can overwrite this file. Use
the display tool or a saved profile instead of treating the generated output as
your primary customization file.
:::

## Current Fallback

The repository ships one catch-all rule:

```lua
hl.monitor({
    output = "",
    mode = "preferred",
    position = "auto",
    scale = 1,
})
```

An empty output matches any display not handled by a more specific rule.

## Rule Examples

```lua
hl.monitor({
    output = "eDP-1",
    mode = "2560x1440@165",
    position = "0x0",
    scale = 1,
})

hl.monitor({
    output = "HDMI-A-1",
    mode = "preferred",
    position = "auto",
    scale = 1,
    mirror = "eDP-1",
})
```

Output names, modes, positions, and scale values are machine-specific. Inspect
the running session before creating a profile:

```bash
hyprctl monitors -j
```

## Recommended Workflow

1. Open nwg-displays.
2. Arrange outputs, modes, and scaling.
3. Apply the layout.
4. Validate generated `monitors.lua` and `workspaces.lua`.
5. Reload Hyprland and confirm every output remains reachable.

Current nwg-displays writes both compatibility `.conf` output and active Lua
output for Hyprland 0.55+. Its native profiles are JSON under
`~/.config/nwg-displays/profiles/`.

HyprFlux also ships a separate Rofi profile picker under
`~/.config/hypr/Monitor_Profiles/`. That picker prefers `.lua` profiles. A
`.conf`-only profile cannot configure the current Lua session, and the shipped
picker does not create the backup promised by its older README.

## Installer Regeneration

Both numbered monitor and hardware modules generate monitor files during a full
setup; the later hardware module normally wins. To preserve an existing layout
during a deliberate `dotsSetup.sh` rerun, both modules would need to be skipped:

```bash
SKIP_MODULES="monitors,hardware" bash dotsSetup.sh
```

Skipping hardware also skips GPU, keyboard, and Waybar sensor detection. Use
this advanced option only after reviewing the installer modules and keeping a
recovery path.

## Validation

```bash
luac -p ~/.config/hypr/monitors.lua ~/.config/hypr/workspaces.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl monitors -j
```

Laptop lid examples live in `UserConfigs/laptops.lua`, but all shipped
lid-switch bindings are currently disabled.

---
title: Generated monitors.lua
description: The generated Hyprland display rules, how to change monitor layout, and how to regenerate the file safely.
---

# Generated `monitors.lua`

Path: `~/.config/hypr/monitors.lua`

`monitors.lua` is the active Lua output for display rules. `hyprland.lua` loads it, and `nwg-displays` plus installer hardware detection manage it.

::: warning Generated file
Applying `nwg-displays`, or rerunning hardware setup, can overwrite this file. Use the display tool or a saved profile instead of treating the generated output as your main customization file.
:::

## Current fallback

The repository ships one catch-all rule:

```lua
hl.monitor({
    output = "",
    mode = "preferred",
    position = "auto",
    scale = 1,
})
```

An empty output matches any display that a more specific rule does not handle.

## Rule examples

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

Output names, modes, positions, and scale values are machine-specific. Inspect the running session before you create a profile:

```bash
hyprctl monitors -j
```

## Apply a new monitor layout

1. Open `nwg-displays`.
2. Arrange outputs, modes, and scaling.
3. Apply the layout.
4. Validate the generated `monitors.lua` and `workspaces.lua`.
5. Reload Hyprland and confirm every output is still reachable.

`nwg-displays` writes both a compatibility `.conf` output and the active Lua output for Hyprland 0.55 and newer. Its native profiles are JSON under `~/.config/nwg-displays/profiles/`.

HyprFlux also ships a separate Rofi profile picker under `~/.config/hypr/Monitor_Profiles/`. That picker prefers `.lua` profiles. A `.conf`-only profile cannot configure the current Lua session, and the shipped picker does not create the backup that its older README promises.

## Installer regeneration

Both the numbered monitor module and the hardware module generate monitor files during a full setup, and the later hardware module normally wins. To preserve an existing layout during a deliberate `dotsSetup.sh` rerun, you would need to skip both modules:

```bash
SKIP_MODULES="monitors,hardware" bash dotsSetup.sh
```

Skipping hardware also skips GPU, keyboard, and Waybar sensor detection. Use this advanced option only after you review the installer modules and keep a recovery path.

## Validation

```bash
luac -p ~/.config/hypr/monitors.lua ~/.config/hypr/workspaces.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl monitors -j
```

Laptop lid examples live in `UserConfigs/laptops.lua`, but all shipped lid-switch bindings are disabled by default.

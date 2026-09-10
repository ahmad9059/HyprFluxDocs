# `env-variables.lua`

Path: `~/.config/hypr/UserConfigs/env-variables.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/env-variables.lua).

This module configures the compositor session environment with `hl.env`. It
must load before every other `hl.*` call in `hyprland.lua`.

## Syntax

```lua
hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
hl.env("MOZ_ENABLE_WAYLAND", "1")
```

Lua strings do not expand `$HOME` or other shell variables. Build paths with
`os.getenv`:

```lua
local Home = os.getenv("HOME")
hl.env("HYPRSHOT_DIR", Home .. "/Pictures/Screenshots")
```

## Active Groups

| Group | Current configuration |
|---|---|
| Toolkit backends | GTK and Qt prefer Wayland with fallbacks; Clutter is forced to Wayland |
| Session identity | `XDG_CURRENT_DESKTOP`, `XDG_SESSION_DESKTOP`, and `XDG_SESSION_TYPE` identify Hyprland/Wayland |
| Qt | Automatic scaling, client decorations, Qt platform theme, and Hyprland Qt/QML style |
| Scaling | GTK and Qt scale factors default to `1` |
| Cursor | Hyprcursor and XCursor use Bibata Modern Classic at size 24 |
| Browsers/Electron | Firefox Wayland is enabled; Electron chooses its platform automatically |

`QT_QPA_PLATFORMTHEME` is currently assigned first to `qt5ct` and then to
`qt6ct`. Do not document those lines as two simultaneous values; the later
assignment is the effective one unless upstream behavior changes.

## Scaling

Coordinate application scaling with the scale in generated `monitors.lua`.
Change one variable at a time and test both native Wayland and XWayland
applications. Some toolkit scale variables accept different value types, so do
not copy a fractional monitor scale blindly into every environment variable.

## GPU Marker Block

The installer writes detected GPU settings only between these markers:

```lua
-- >>> GPU_CONFIG_START >>>
-- generated settings
-- >>> GPU_CONFIG_END <<<
```

Do not edit inside the block. Module 16 can replace it during installation or
hardware detection. Put deliberate user overrides outside the markers and
validate them against current upstream guidance.

The NVIDIA, VM, Aquamarine, and diagnostic settings elsewhere in the file are
commented examples, not active defaults. Enable them only for a diagnosed need.
Legacy wlroots variables are not general-purpose current Hyprland tuning.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/env-variables.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Environment changes may require a new compositor session to reach processes
that were already started.

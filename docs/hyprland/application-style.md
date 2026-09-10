# `application-style.conf`

Path: `~/.config/hypr/application-style.conf`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/application-style.conf).

This small native configuration belongs to `hyprland-qt-support`. It controls
the QML style used by Hyprland ecosystem Qt applications, not the appearance of
every Qt6 application on the desktop.

The style is selected for the session in `env-variables.lua`:

```lua
hl.env("QT_QUICK_CONTROLS_STYLE", "org.hyprland.style")
```

## Supported Shape

```ini
roundness = 2
border_width = 0
reduce_motion = false
```

| Key | Purpose |
|---|---|
| `roundness` | QML control corner-rounding level |
| `border_width` | QML control border width |
| `reduce_motion` | Reduce motion in supported controls |

## Known v1.5.0 Typo

The shipped file spells `roundness` as `roundess`. Current
`hyprland-qt-support` does not recognize that key, so the requested value is not
applied. Use the supported spelling in a local correction and track the source
fix separately; documentation should not present the typo as valid syntax.

## Apply Changes

Relaunch the affected Hyprland Qt/QML application after editing. If the style
does not change, confirm that `QT_QUICK_CONTROLS_STYLE` is present in the
application's environment and that `hyprland-qt-support` is installed.

General Qt5/Qt6ct and Kvantum theming is documented separately in
[Qt theming](/features/qt-theming).

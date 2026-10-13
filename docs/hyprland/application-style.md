---
title: application-style.conf
description: The Hyprland Qt/QML application style file and its current typo.
---

# `application-style.conf`

Path: `~/.config/hypr/application-style.conf`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/application-style.conf).

This small native configuration belongs to `hyprland-qt-support`. It controls the QML style used by Hyprland ecosystem Qt applications, not the appearance of every Qt6 application on the desktop.

The style is selected for the session in `env-variables.lua`:

```lua
hl.env("QT_QUICK_CONTROLS_STYLE", "org.hyprland.style")
```

## Supported shape

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

## Known typo

The shipped file spells `roundness` as `roundess`. Current `hyprland-qt-support` does not recognize that key, so the requested value is not applied. Use the supported spelling in a local correction.

## Apply changes

Relaunch the affected Hyprland Qt/QML application after you edit the file. If the style does not change, confirm that `QT_QUICK_CONTROLS_STYLE` is present in the application's environment and that `hyprland-qt-support` is installed.

General Qt5, Qt6ct, and Kvantum theming is documented in [Qt theming](/features/qt-theming).

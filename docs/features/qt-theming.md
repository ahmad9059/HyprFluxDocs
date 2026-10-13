---
title: GTK, Qt, Kvantum, Icons, and Cursors
description: How HyprFlux configures GTK, Qt5, Qt6, Kvantum, icons, and cursors, and how to check which settings are active.
---

# GTK, Qt, Kvantum, Icons, and Cursors

HyprFlux ships toolkit configuration for GTK, Qt5, Qt6, and Kvantum. The settings are static, and first-boot overrides can take precedence over the installer defaults. There is no single wallpaper-derived or unified theme state, so check what is actually active rather than assuming one source wins.

## Configuration ownership

| Area | Owner |
|---|---|
| Qt packages | `qt5ct`, `qt6ct`, `qt6-svg`, and `kvantum` in the main package batch |
| Qt configuration | `~/.config/qt5ct/` and `~/.config/qt6ct/`, deployed by `modules/02-dotfiles.sh` |
| Kvantum | `~/.config/Kvantum/`, deployed by module 02 |
| GTK themes | Bundled `.themes`, installed by `modules/04-themes.sh`; settings written by `modules/07-gtk.sh` |
| Icons | Papirus packages and the Papirus-Dark selection from modules 04 and 07 |
| Xcursor | Future Black during theme setup; Bibata values in the Hyprland environment |
| Hyprcursor | Bibata Modern Classic, set at every session start by `startup-apps.lua` |
| First-boot overrides | `~/.config/hypr/initial-boot.sh` |

See `dotsSetup.sh` for the module order.

## Qt5ct and Qt6ct

Both shipped controller files select:

| Setting | Value |
|---|---|
| Color scheme | Bundled Catppuccin Mocha color file |
| Palette | Custom |
| Icon theme | `Papirus-Dark` |
| Widget style | `Fusion` |
| Fixed font | Adwaita Sans 10 |
| General font | Adwaita Sans 12 |

During deployment, module 02 replaces the repository home placeholder in the Qt color-file paths with the installing user's home directory. Quick Settings also exposes the controllers.

## Kvantum

HyprFlux bundles exactly two Kvantum themes:

- `catppuccin-mocha-blue`
- `catppuccin-latte-blue`

The shipped Kvantum configuration and the first-boot script select Mocha Blue:

```bash
kvantummanager --set catppuccin-mocha-blue
```

However, Qt5ct and Qt6ct both select `Fusion`, and HyprFlux does not set `QT_STYLE_OVERRIDE=kvantum`. Kvantum is therefore installed and configured but is not the active Qt widget style under the shipped controller settings.

## Environment conflict

`env-variables.lua` sets `QT_QPA_PLATFORMTHEME` first to `qt5ct` and then to `qt6ct`. One process environment cannot keep both values, so the later value wins. Check the application environment instead of assuming each Qt major version reaches its matching controller. See [Diagnose the active theme](#diagnose-the-active-theme).

## Install and first-boot precedence

| Setting | Installer and modules | First Hyprland boot | Result |
|---|---|---|---|
| GTK theme | `HyprFlux-Compact` | `Material-DeepOcean-BL` through gsettings | Gsettings-aware apps receive Material; GTK settings files still name HyprFlux-Compact |
| Icons | `Papirus-Dark` | `Papirus-Dark` | Consistent |
| GTK cursor | `Future-black Cursors` | `Moga-Cursor` | Conflicting; Moga is not installed by this source |
| Hyprcursor | `Bibata-Modern-Classic`, size 24 | `hyprctl setcursor` reapplies it | Installed and selected for Hyprland-native cursors |
| Xcursor | Environment names Bibata | Unchanged | No legacy Bibata `cursors/` payload is installed, so legacy clients may fall back |
| GTK font | Adwaita Sans 11 | Unchanged | Remains the intended GTK font |
| Kvantum theme | Catppuccin Mocha Blue | Selected again | Theme exists, but the Qt controllers still use Fusion |

The first-boot marker is written without validating all backgrounded commands. If theming looks inconsistent, inspect the current settings rather than rerunning the whole installer. See [Diagnose the active theme](#diagnose-the-active-theme).

## Static colors

Qt, Kvantum, GTK, icons, and cursors use bundled static theme data. They are not generated from the current wallpaper. The central HyprFlux color generator updates Rofi, Waybar, Kitty, SwayNC, and Wlogout, but not these toolkit themes.

## Diagnose the active theme

Because installer defaults, first-boot overrides, and the Qt environment conflict can each win, check what is actually active.

Open the controllers directly:

```bash
qt5ct
qt6ct
```

Check which `QT_QPA_PLATFORMTHEME` value a running Qt application received. Replace `<process-name>` with its executable name:

```bash
tr '\0' '\n' < /proc/$(pgrep -n '<process-name>')/environ | grep '^QT_'
```

Check the GTK and Qt settings that first-boot and the installer each wrote:

```bash
gsettings get org.gnome.desktop.interface gtk-theme
gsettings get org.gnome.desktop.interface icon-theme
gsettings get org.gnome.desktop.interface cursor-theme
grep -E '^(style|icon_theme|color_scheme_path)=' ~/.config/qt5ct/qt5ct.conf ~/.config/qt6ct/qt6ct.conf
```

## Related pages

- [Application style integration](../hyprland/application-style.md)
- [Kitty](./kitty.md)
- [Rofi](./rofi.md)

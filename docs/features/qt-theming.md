# GTK, Qt, Kvantum, Icons, and Cursors

## What It Is

HyprFlux ships toolkit configuration for GTK, Qt5, Qt6, and Kvantum. These
settings are static and currently contain first-boot precedence conflicts, so
there is no single reliable wallpaper-derived or unified theme state.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Configuration

### Ownership

| Area | Install/config owner |
|---|---|
| Qt packages | `qt5ct`, `qt6ct`, `qt6-svg`, and `kvantum` in the main package batch |
| Qt configuration | `~/.config/qt5ct/` and `~/.config/qt6ct/`, deployed by `modules/02-dotfiles.sh` |
| Kvantum | `~/.config/Kvantum/`, deployed by module 02 |
| GTK themes | Bundled `.themes`, installed by `modules/04-themes.sh`; settings written by `modules/07-gtk.sh` |
| Icons | Papirus packages and Papirus-Dark selection from modules 04 and 07 |
| Xcursor | Future Black during theme setup; Bibata values in the Hyprland environment |
| Hyprcursor | Bibata Modern Classic installed by `modules/14-bibata.sh` |
| First-boot overrides | `~/.config/hypr/initial-boot.sh` |

See the pinned [`dotsSetup.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/dotsSetup.sh#L87-L120)
for module order.

### Qt5ct and Qt6ct

Both shipped controller files select:

| Setting | Value |
|---|---|
| Color scheme | Bundled Catppuccin Mocha color file |
| Palette | Custom |
| Icon theme | `Papirus-Dark` |
| Widget style | `Fusion` |
| Fixed font | Adwaita Sans 10 |
| General font | Adwaita Sans 12 |

During deployment, module 02 replaces the repository home placeholder in the
Qt color-file paths with the installing user's home directory. The controllers
are also exposed by the `SUPER+SHIFT+E` HyprFlux Quick Settings menu.

### Kvantum

HyprFlux bundles exactly two Kvantum themes:

- `catppuccin-mocha-blue`
- `catppuccin-latte-blue`

The shipped Kvantum configuration and first-boot script select Mocha Blue:

```bash
kvantummanager --set catppuccin-mocha-blue
```

However, Qt5ct and Qt6ct both select `Fusion`, and HyprFlux does not set
`QT_STYLE_OVERRIDE=kvantum`. Kvantum is therefore installed and configured but
is not the active Qt widget style under the shipped controller settings.

### Environment conflict

`env-variables.lua` sets `QT_QPA_PLATFORMTHEME` first to `qt5ct` and then to
`qt6ct`. One process environment cannot retain both values; the later value is
expected to win. Verify the application environment instead of assuming each
Qt major version automatically reaches its matching controller - see
[Diagnose the active theme](#diagnose-the-active-theme) below.

### Install and first-boot precedence

| Setting | Installer/modules | First Hyprland boot | User-visible result |
|---|---|---|---|
| GTK theme | `HyprFlux-Compact` | `Material-DeepOcean-BL` through gsettings | Gsettings-aware apps receive Material; GTK settings files still name HyprFlux-Compact |
| Icons | `Papirus-Dark` | `Papirus-Dark` | Consistent |
| GTK cursor | `Future-black Cursors` | `Moga-Cursor` | Conflicting; Moga is not installed by this source |
| Hyprcursor | `Bibata-Modern-Classic`, size 24 | Unchanged | Installed and selected for Hyprland-native cursors |
| Xcursor | Environment names Bibata | Unchanged | No legacy Bibata `cursors/` payload is installed, so legacy clients may fall back |
| GTK font | Adwaita Sans 11 | Unchanged | Remains the intended GTK font |
| Kvantum theme | Catppuccin Mocha Blue | Selected again | Theme exists, but Qt controllers still use Fusion |

The first-boot marker is written without validating all backgrounded commands.
If theming is inconsistent, inspect current settings rather than rerunning the
whole installer - see [Diagnose the active theme](#diagnose-the-active-theme)
below.

### Static colors

Qt, Kvantum, GTK, icons, and cursors use bundled static theme data. They are
not generated from the current wallpaper. The central HyprFlux color generator
updates Rofi, Waybar, Kitty, SwayNC, and Wlogout, but not these toolkit themes.

## Common Tasks

### Diagnose the active theme

Because installer defaults, first-boot overrides, and the Qt environment
conflict can each win independently, check what's actually active rather than
assuming the tables above describe the running system.

Open the controllers directly:

```bash
qt5ct
qt6ct
```

Check which `QT_QPA_PLATFORMTHEME` value a running Qt application actually
received - replace `<process-name>` with its executable name:

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

---
title: Rofi
description: The HyprFlux application launcher and the Rofi-based menus that back several desktop tools.
---

# Rofi

Rofi provides the HyprFlux application launcher and the presentation layer for several script-backed menus. It does not own wallpaper-derived theming or a Waybar layout selector.

## Configuration chain

The normal launcher follows this chain:

```text
config.rasi
`- master-config.rasi
   `- hyprflux-colors.rasi
```

`config.rasi` imports the shared master and overrides its fonts. The master defines the one-column, eight-row launcher and imports the generated palette. Actual launch commands add window mode:

```bash
rofi -show drun -modi drun,filebrowser,run,window
```

The default binding is `SUPER+D`.

The repository's `.config/rofi/` directory is canonical. `hyprflux-colors.rasi` is generated from the central HyprFlux palette and is not regenerated at runtime. Contributors regenerate all tracked color outputs with:

```bash
./utilities/sync-colors.sh
```

CI checks that the generated files are current and that the canonical `.config` tree matches its parity mirror.

## Shipped presentations

| File | Purpose |
|---|---|
| `config.rasi` | Main launcher font override |
| `config-compact.rasi` | Two-column, five-row compact base |
| `config-calc.rasi` | Calculator input and result |
| `config-clipboard.rasi` | Clipboard history |
| `config-emoji.rasi` | Emoji picker |
| `config-wallpaper.rasi` | Wallpaper thumbnails |
| `config-wallpaper-effect.rasi` | Image effect picker |
| `config-edit.rasi` | HyprFlux Quick Settings |
| `config-Monitors.rasi` | Monitor profiles |
| `config-Animations.rasi` | Hyprland animation presets |
| `config-keybinds.rasi` | Live keybinding search |
| `config-rofi-Beats.rasi` | Media list |
| `config-rofi-Beats-menu.rasi` | Media source chooser |

These files are presentations. Their shell scripts own the data collection and the side effects.

## Live menus

| Menu | How it works |
|---|---|
| Clipboard | `ClipManager.sh` reads `cliphist`. The selection is decoded and copied |
| Calculator | `RofiCalc.sh` evaluates repeated dmenu input with `qalc` and copies the result |
| Emoji | `RofiEmoji.sh` pipes embedded emoji data to dmenu and copies the selected symbol |
| Wallpapers | `WallpaperSelect.sh` builds image and video previews and applies the selection |
| Wallpaper effects | `WallpaperEffects.sh` offers ImageMagick transformations |
| Animations | `Animations.sh` installs a selected Lua preset and reloads Hyprland |
| Monitor profiles | `MonitorProfiles.sh` prefers Lua profiles and copies the selection to `monitors.lua`. Run `hyprctl reload` afterward |
| Keybindings | `KeyBinds.sh` shows live `hyprctl binds -j` output. Selecting a row does nothing |
| Rofi Beats | `RofiBeats.sh` selects online stations, local music, shuffle, or stop |
| Quick Settings | `HyprFlux_Quick_Settings.sh` dispatches supported configuration tools and scripts |

Useful bindings from the shipped Lua modules:

| Binding | Menu |
|---|---|
| `SUPER+D` | Application launcher |
| `SUPER+V` | Clipboard |
| `SUPER+ALT+E` | Emoji |
| `SUPER+CTRL+C` | Calculator |
| `SUPER+SHIFT+E` | HyprFlux Quick Settings |
| `SUPER+SHIFT+A` | Animation presets |
| `SUPER+SHIFT+K` | Keybinding search |

The wallpaper selector and the effect selector are both bound to `SUPER+SHIFT+W`, so both commands can fire. Use the Waybar wallpaper control, or run one script directly, until that duplicate binding is fixed.

::: warning Unsupported menu entries
Quick Settings shows Kitty-theme, Rofi-theme, and dark/light-theme entries without matching handlers. They are current source defects, not supported workflows. HyprFlux also ships no Waybar layout selector and no Rofi theme selector.
:::

## Troubleshooting

Run the main launcher directly:

```bash
rofi -show drun -modi drun,filebrowser,run,window
```

Run a script from a terminal when a specialized menu closes unexpectedly:

```bash
bash ~/.config/hypr/scripts/ClipManager.sh
```

## Related pages

- [Waybar](./waybar.md)
- [Wallpapers](./wallpapers.md)
- [Hyprland keybinding authoring](../hyprland/userkeybindings.md)

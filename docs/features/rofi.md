# Rofi

## What It Is

Rofi provides the HyprFlux application launcher and the presentation layer for
several script-backed menus. It does not own wallpaper-derived theming or a
Waybar layout selector.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Configuration

### Ownership

| Concern | Owner |
|---|---|
| Package | [`rofi` in the main package batch](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/base-installer/install-scripts/01-hypr-pkgs.sh#L14-L53) |
| Configuration | [`~/.config/rofi/`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591/.config/rofi) |
| Deployment | [`modules/02-dotfiles.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/modules/02-dotfiles.sh#L9-L45) |
| User menus | Scripts under `~/.config/hypr/scripts/` and `UserScripts/` |
| Generated colors | [`hyprflux-colors.rasi`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/rofi/hyprflux-colors.rasi) |

### Configuration chain

The normal launcher follows this chain:

```text
config.rasi
`- master-config.rasi
   `- hyprflux-colors.rasi
```

[`config.rasi`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/rofi/config.rasi)
imports the shared master and overrides its fonts. The master defines the
one-column, eight-row launcher and imports the generated palette. Actual launch
commands add window mode:

```bash
rofi -show drun -modi drun,filebrowser,run,window
```

The default binding is `SUPER+D`.

### Shipped presentations

| File | Purpose |
|---|---|
| `config.rasi` | Main launcher font override |
| `config-compact.rasi` | Two-column, five-row compact base |
| `config-calc.rasi` | Calculator input/result presentation |
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

These files are presentations. Their shell scripts own data collection and
side effects.

### Wallpaper state

The repository currently tracks `.current_wallpaper` as a symlink with a
maintainer-specific target; `WallpaperAwww.sh` replaces it at runtime.
`.wallpaper_current` and `.wallpaper_modified` live under
`~/.config/hypr/wallpaper_effects/` and are used by effects. None of these files
changes the application palette. See [Wallpapers](./wallpapers.md).

### Static generated colors

`hyprflux-colors.rasi` is generated from the central HyprFlux palette and is
not regenerated at runtime. Contributors regenerate all tracked color outputs
with:

```bash
./utilities/sync-colors.sh
```

CI checks that generated files are current and that the canonical `.config`
tree matches its parity mirror.

## Common Tasks

### Live menus

| Menu | How it works |
|---|---|
| Clipboard | `ClipManager.sh` reads `cliphist`; selection is decoded and copied |
| Calculator | `RofiCalc.sh` evaluates repeated dmenu input with `qalc` and copies the result |
| Emoji | `RofiEmoji.sh` pipes embedded emoji data to dmenu and copies the selected symbol |
| Wallpapers | `WallpaperSelect.sh` builds image/video previews and applies the selection |
| Wallpaper effects | `WallpaperEffects.sh` offers ImageMagick transformations |
| Animations | `Animations.sh` installs a selected Lua preset and reloads Hyprland |
| Monitor profiles | `MonitorProfiles.sh` prefers Lua profiles and copies the selection to `monitors.lua`; run `hyprctl reload` afterward |
| Keybindings | `KeyBinds.sh` displays live `hyprctl binds -j` output; selection is informational |
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

The wallpaper selector and effect selector are both bound to
`SUPER+SHIFT+W` in the pinned source. Both commands can fire, so use the Waybar
wallpaper control or run one script directly until the duplicate binding is
fixed.

::: warning Unsupported menu entries
Quick Settings displays Kitty-theme, Rofi-theme, and dark/light-theme entries
without matching handlers. They are current source defects, not supported
workflows. HyprFlux also ships no Waybar layout selector or Rofi theme selector.
:::

### Troubleshooting

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

---
title: Yazi
description: The shipped terminal file manager, its configuration, keys, and optional command dependencies.
---

# Yazi

Yazi is the shipped terminal file manager. It is available from shells and a tmuxifier layout. Thunar remains HyprFlux's default graphical file manager.

## Configuration files

```text
~/.config/yazi/
|- yazi.toml
|- keymap.toml
|- theme.toml
`- flavors/tokyo-night.yazi/flavor.toml
```

No plugins directory or `init.lua` is shipped. The active manager settings are:

| Setting | Value |
|---|---|
| Pane ratio | `[2, 4, 3]` |
| Hidden files | Shown |
| Preview size | 600 x 600 |
| Preview filtering | Nearest |
| Preview image quality | 50 |
| Editor | `$EDITOR`, falling back to Neovim |
| Linux open/reveal | `xdg-open` |
| Media opener | VLC |
| Theme | Bundled Tokyo Night flavor |

The repository's `.config/yazi/` directory is canonical, and `base-dots/config/yazi/` is a parity mirror.

## Shipped keys

| Key | Action |
|---|---|
| `y` | Copy selected files |
| `x` | Cut selected files |
| `d` | Move selected files to trash |
| `D` | Permanently delete selected files |
| `s` | Search names with `fd` |
| `S` | Search contents with `rg` |
| `z` | Jump with `fzf` |
| `Z` | Jump with `zoxide` |
| `gh` | Go home |
| `gc` | Go to config |
| `gd` | Go to Downloads |

Review the complete [`keymap.toml`](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/yazi/keymap.toml) before you replace existing mappings.

## Launching Yazi

Run either command in a terminal:

```bash
yazi
y
```

The shipped `web-dev` tmuxifier layout also opens Yazi in one window. There is no default Hyprland keybinding or Waybar button for Yazi. `SUPER+F` and the Waybar file-manager control open Thunar.

## Optional command gaps

The configuration calls `fd`, `rg`, `exiftool`, and `mediainfo`, but the HyprFlux package inventory does not explicitly install them. If a search or metadata preview reports a missing command, install the matching Arch package instead of changing Yazi syntax:

```bash
sudo pacman -S fd ripgrep perl-image-exiftool mediainfo
```

`fzf` and `zoxide` are provisioned by HyprFlux.

## Validate changes

Start Yazi from a terminal after you edit it, so configuration errors stay visible:

```bash
yazi
```

Keep local changes within the four shipped configuration areas unless you also intend to install and maintain external plugins.

## Related pages

- [Kitty](./kitty.md)
- [Hyprland user defaults](../hyprland/01-userdefaults.md)

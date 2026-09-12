# Yazi

## What It Is

Yazi is the shipped terminal file manager. It is available from shells and a
tmuxifier layout, but Thunar remains HyprFlux's default graphical file manager.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Configuration

### Ownership

| Concern | Owner |
|---|---|
| Package | [`yazi` in the second main package batch](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/base-installer/install-scripts/01-hypr-pkgs.sh#L55-L86) |
| Configuration | [`~/.config/yazi/`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591/.config/yazi) |
| Deployment | [`modules/02-dotfiles.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/modules/02-dotfiles.sh#L9-L45) |
| Shell entry | `alias y='yazi'` in the shipped `.zshrc` |
| Desktop file manager | Thunar from `user-defaults.lua`, not Yazi |

### Configuration Files

```text
~/.config/yazi/
|- yazi.toml
|- keymap.toml
|- theme.toml
`- flavors/tokyo-night.yazi/flavor.toml
```

No plugins directory or `init.lua` is shipped. The active manager settings use
the current `[mgr]` section:

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

### Shipped keys

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

Review the complete pinned
[`keymap.toml`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/yazi/keymap.toml)
before replacing existing mappings.

## Common Tasks

### Launching Yazi

Run either command in a terminal:

```bash
yazi
y
```

The shipped `web-dev` tmuxifier layout also opens Yazi in one window. There is
no default Hyprland keybinding or Waybar button for Yazi; `SUPER+F` and the
Waybar file-manager control open Thunar.

### Optional command gaps

The configuration invokes `fd`, `rg`, `exiftool`, and `mediainfo`, but the
pinned HyprFlux package inventory does not explicitly install them. If a search
or metadata preview reports a missing command, install the corresponding Arch
package rather than changing Yazi syntax:

```bash
sudo pacman -S fd ripgrep perl-image-exiftool mediainfo
```

`fzf` and `zoxide` are explicitly provisioned by HyprFlux.

### Validate changes

Start Yazi from a terminal after editing so configuration errors remain visible:

```bash
yazi
```

Keep local changes in the four shipped configuration areas unless you also
intend to install and maintain external plugins.

## Related pages

- [Kitty](./kitty.md)
- [Hyprland user defaults](../hyprland/01-userdefaults.md)

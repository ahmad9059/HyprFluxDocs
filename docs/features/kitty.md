# Kitty

## What It Is

Kitty is the default HyprFlux terminal. Its main configuration is user-editable,
while its active color include is generated from the central static palette.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Configuration

### Ownership

| Concern | Owner |
|---|---|
| Package | [`kitty` in the main package batch](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/base-installer/install-scripts/01-hypr-pkgs.sh#L14-L53) |
| Configuration | [`~/.config/kitty/kitty.conf`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/kitty/kitty.conf) |
| Generated palette | [`~/.config/kitty/kitty-colors.conf`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/kitty/kitty-colors.conf) |
| Default selection | [`user-defaults.lua`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-defaults.lua#L10-L20) |
| Deployment | [`modules/02-dotfiles.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/modules/02-dotfiles.sh#L9-L45) |

### Shipped settings

| Setting | Value |
|---|---|
| Font | JetBrainsMono Nerd Font |
| Font size | 14 pt |
| Line height | 100% |
| Cursor | Block, with blinking effectively disabled |
| Window padding | 6 pt |
| Background opacity | 0.80 |
| Colors | Included from `kitty-colors.conf` |

The repository also carries a legacy-named file under `kitty-themes/`, but the
active include is `kitty-colors.conf`. Wallpaper changes do not regenerate it.

## Common Tasks

### Launch paths

| Entry point | Behavior |
|---|---|
| `SUPER+RETURN` | Opens the configured default terminal |
| `SUPER+SHIFT+RETURN` | Calls `Dropterminal.sh` with the configured terminal; Kitty is shipped |
| Waybar terminal control | Resolves `term` from `user-defaults.lua` |
| `SUPER+E` project selector | Starts Kitty with a selected tmuxifier project |
| Update scripts | Open Kitty for interactive update workflows |

Launch it directly with:

```bash
kitty
```

Changing `term` in `~/.config/hypr/UserConfigs/user-defaults.lua` changes the
normal and dropdown bindings, Waybar terminal path, and the terminal used when
Quick Settings opens the selected editor. Scripts that explicitly require
Kitty can still use it.

### Colors

`kitty-colors.conf` is generated from HyprFlux's central palette by
[`utilities/sync-colors.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/utilities/sync-colors.sh#L157-L173).
For source contributions, edit the central palette and regenerate tracked
outputs:

```bash
./utilities/sync-colors.sh
```

For local one-off customization, add overrides after the color include in
`kitty.conf`. A later declaration wins.

::: warning Theme selector
HyprFlux Quick Settings displays `Choose Kitty Terminal Theme`, but the pinned
script has no matching handler and no Kitty theme-switching script. Edit the
configuration directly until that source workflow is implemented.
:::

### Validate changes

Open a separate terminal, then launch a test window with the installed config.
Kitty reports parse errors to the invoking terminal:

```bash
kitty --config ~/.config/kitty/kitty.conf
```

Start a new Kitty window to confirm font and color changes without closing your
working shell.

## Related pages

- [GTK and Qt theming](./qt-theming.md)
- [Waybar](./waybar.md)
- [Hyprland user defaults](../hyprland/01-userdefaults.md)

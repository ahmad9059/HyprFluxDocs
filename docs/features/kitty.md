---
title: Kitty
description: The default HyprFlux terminal, its settings, colors, and launch paths.
---

# Kitty

Kitty is the default HyprFlux terminal. Its main configuration is user-editable, and its active color include is generated from the central static palette.

## Settings

| Setting | Value |
|---|---|
| Font | JetBrainsMono Nerd Font |
| Font size | 14 pt |
| Line height | 100% |
| Cursor | Block, with blinking effectively disabled |
| Window padding | 6 pt |
| Background opacity | 0.80 |
| Colors | Included from `kitty-colors.conf` |

The repository also carries a legacy-named file under `kitty-themes/`, but the active include is `kitty-colors.conf`. Wallpaper changes do not regenerate it.

## Launch paths

| Entry point | Behavior |
|---|---|
| `SUPER+RETURN` | Opens the configured default terminal |
| `SUPER+SHIFT+RETURN` | Calls `Dropterminal.sh` with the configured terminal. Kitty is shipped |
| Waybar terminal control | Resolves `term` from `user-defaults.lua` |
| `SUPER+E` project selector | Starts Kitty with a selected tmuxifier project |
| Update scripts | Open Kitty for interactive update workflows |

Launch it directly with:

```bash
kitty
```

Changing `term` in `~/.config/hypr/UserConfigs/user-defaults.lua` changes the normal and dropdown bindings, the Waybar terminal path, and the terminal used when Quick Settings opens the selected editor. Scripts that explicitly require Kitty still use it.

## Colors

`kitty-colors.conf` is generated from the central HyprFlux palette by `utilities/sync-colors.sh`. For source contributions, edit the central palette and regenerate the tracked outputs:

```bash
./utilities/sync-colors.sh
```

For a local one-off change, add overrides after the color include in `kitty.conf`. A later declaration wins.

::: warning Theme selector
HyprFlux Quick Settings shows a **Choose Kitty Terminal Theme** entry, but the script has no matching handler and there is no Kitty theme-switching script. Edit the configuration directly until that workflow exists.
:::

## Validate changes

Open a separate terminal and launch a test window with the installed config. Kitty reports parse errors to the invoking terminal:

```bash
kitty --config ~/.config/kitty/kitty.conf
```

Start a new Kitty window to confirm font and color changes without closing your working shell.

## Related pages

- [GTK and Qt theming](./qt-theming.md)
- [Waybar](./waybar.md)
- [Hyprland user defaults](../hyprland/01-userdefaults.md)

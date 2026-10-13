---
title: Hyprland Keybindings
description: Reference for the HyprFlux window, workspace, application, media, screenshot, and laptop shortcuts.
---

# Hyprland Keybindings

This is the lookup table for the bindings shipped with HyprFlux 1.5.0. Hyprland loads three binding layers in order:

1. Base bindings: `~/.config/hypr/configs/keybinds.lua`.
2. User bindings: `~/.config/hypr/UserConfigs/user-keybinds.lua`.
3. Laptop bindings: `~/.config/hypr/UserConfigs/laptops.lua`.

Because bindings are added, not replaced, use the live compositor as the final authority after your own changes:

```bash
hyprctl binds
```

`SUPER+SHIFT+K` opens a searchable live list. `SUPER+SHIFT+H` opens a shorter, curated cheat sheet.

## Known collisions

A later binding does not replace an earlier one automatically. Each of these combinations registers more than one action:

| Keys | Registered actions | Result |
|---|---|---|
| `SUPER+K` | Master-layout `cycleprev` and launch Kdenlive | Kdenlive launches on every press. The layout action also runs on a Master workspace. |
| `SUPER+O` | Dwindle `togglesplit` and launch Obsidian | Obsidian launches on every press. The layout action also runs on a Dwindle workspace. |
| `SUPER+SHIFT+W` | Wallpaper selector and wallpaper effects | Both scripts run, in declaration order. This is a source defect, not an intentional menu sequence. |

## Session and menus

| Keys | Action |
|---|---|
| `CTRL+ALT+Delete` | Exit Hyprland |
| `SUPER+Q` | Ask the active window to close |
| `SUPER+SHIFT+Q` | Send `kill` to the active window's process |
| `CTRL+ALT+L` | Lock the session through `loginctl` |
| `CTRL+ALT+P` | Open Wlogout |
| `SUPER+N` | Toggle the SwayNC notification panel |
| `SUPER+SHIFT+E` | Open HyprFlux Quick Settings |

## Layout and window state

| Keys | Action | Condition |
|---|---|---|
| `SUPER+CTRL+D` | Remove a window from Master | Master layout only |
| `SUPER+I` | Add a window to Master | Master layout only |
| `SUPER+K` | Cycle backward | Master layout only. Also launches Kdenlive |
| `SUPER+CTRL+Return` | Swap with Master | Master layout only |
| `SUPER+O` | Toggle the split direction | Dwindle only. Also launches Obsidian |
| `SUPER+SHIFT+I` | Rotate the split | Dwindle only |
| `SUPER+P` | Toggle pseudotiling | Dwindle |
| `SUPER+J` | Cycle to the next window | Any layout |
| `SUPER+SHIFT+L` | Cycle Dwindle, Master, and Scrolling layouts | Requires `jq` |
| `SUPER+SHIFT+O` | Toggle between the shipped low and normal blur values | Requires `jq` |
| `SUPER+SHIFT+G` | Toggle Game Mode and restore the captured visual state | State in `$XDG_RUNTIME_DIR/gamemode.state` |
| `SUPER+SHIFT+F` | Toggle fullscreen | Active window |
| `SUPER+CTRL+F` | Toggle maximized (fake fullscreen) | Active window |
| `SUPER+Space` | Toggle floating | Active window |
| `SUPER+ALT+Space` | Enable or disable floating for all windows on the workspace | Lua callback |
| `SUPER+CTRL+O` | Toggle active-window opacity | Active window |
| `SUPER+SHIFT+Return` | Toggle the dropdown terminal | Uses the configured default terminal |

## Focus, move, resize, and mouse

| Keys | Action | Behavior |
|---|---|---|
| `SUPER+Arrow` | Move focus in that direction | One action per press |
| `SUPER+CTRL+Arrow` | Move the active window in that direction | One action per press |
| `SUPER+ALT+Arrow` | Swap with the window in that direction | One action per press |
| `SUPER+SHIFT+Arrow` | Resize by 50 pixels in that direction | Repeats while held |
| `SUPER+Left drag` | Move a window | Interactive mouse bind |
| `SUPER+Right drag` | Resize a window | Interactive mouse bind |

## Workspaces

The number-row shortcuts use keycodes, so they keep their physical positions on different keyboard layouts.

| Keys | Action |
|---|---|
| `SUPER+Tab` / `SUPER+SHIFT+Tab` | Next / previous workspace on the current monitor |
| `SUPER+U` | Toggle the `nyx` special workspace |
| `SUPER+SHIFT+U` | Move the active window to `special:nyx` |
| `SUPER+1` ... `SUPER+0` | Focus workspace 1 ... 10 |
| `SUPER+SHIFT+1` ... `SUPER+SHIFT+0` | Move the active window to workspace 1 ... 10 and follow it |
| `SUPER+CTRL+1` ... `SUPER+CTRL+0` | Move the active window silently to workspace 1 ... 10 |
| `SUPER+SHIFT+[` / `SUPER+SHIFT+]` | Move the active window to the previous / next workspace |
| `SUPER+CTRL+[` / `SUPER+CTRL+]` | Move the active window silently to the previous / next workspace |
| `SUPER+wheel down` / `SUPER+wheel up` | Focus the next / previous existing workspace |
| `SUPER+.` / `SUPER+,` | Focus the next / previous existing workspace |

## Applications and utilities

| Keys | Action | Dependency or scope |
|---|---|---|
| `SUPER+D` | Rofi application launcher | Rofi |
| `SUPER+Return` | Default terminal | `user-defaults.lua` |
| `SUPER+F` | Default file manager | `user-defaults.lua` |
| `SUPER+K` | Kdenlive | Collides with the Master action |
| `SUPER+B` | Firefox | Firefox |
| `SUPER+R` | Foliate | Foliate |
| `SUPER+V` | Clipboard history | Rofi, `cliphist`, and `wl-copy` |
| `SUPER+C` | Visual Studio Code using X11/Ozone | `code` |
| `SUPER+O` | Obsidian using X11/Ozone | Collides with the Dwindle action |
| `SUPER+S` | Spotify web app in Chromium | Chromium |
| `SUPER+X` | Vesktop | Vesktop |
| `SUPER+T` | Telegram launcher | Shipped command is `(64gram-desktop\|telegram-desktop)`. Verify it locally |
| `SUPER+M` | Free Download Manager | `fdm` |
| `SUPER+E` | Tmuxifier project menu | Maintainer-oriented `UserScripts` workflow |
| `SUPER+G` | GitHub repository clone menu | GitHub CLI login and a chosen clone directory |
| `SUPER+ALT+E` | Open the emoji menu and copy the selection | Rofi and `wl-copy` |
| `SUPER+CTRL+C` | Calculator menu | Rofi and Qalculate |
| `SUPER+SHIFT+K` | Search live bindings | Rofi, Python, and a running Hyprland session |
| `SUPER+SHIFT+H` | Open the curated cheat sheet | Yad |
| `SUPER+SHIFT+A` | Select an animation preset | Rofi. See the refresh defect in [Scripts and Utilities](/hyprland/scripts) |
| `SUPER+CTRL+ALT+B` | Toggle Waybar visibility with `SIGUSR1` | Running Waybar process |
| `SUPER+ALT+wheel down` / `SUPER+ALT+wheel up` | Zoom out / in | Changes `cursor.zoom_factor` in memory |
| `SUPER+SHIFT+P` | Run the color-picker command | The current command contains a slash and a typographic dash, so treat it as a source defect |

## Maintainer-oriented workflows

These bindings are active in the distributed user module, but the scripts behind them contain personal paths, services, station lists, or publishing assumptions. Read the script before you use it.

| Keys | Shipped workflow |
|---|---|
| `SUPER+SHIFT+T` | Toggle the `tuned` daemon |
| `SUPER+SHIFT+D` | Sync the maintainer's dotfiles checkout |
| `SUPER+SHIFT+B` | Sync and publish the maintainer's blog |
| `SUPER+SHIFT+N` | Run the maintainer's Obsidian note generator |
| `SUPER+SHIFT+M` | Open the configured Rofi music menu |
| `SUPER+SHIFT+W` | Launch both wallpaper selection and wallpaper effects |
| `CTRL+ALT+W` | Choose a random wallpaper |

## Media and system keys

Bindings marked **locked** also work while an input inhibitor or the lock screen is active. Bindings marked **repeat** repeat while held.

| Key | Action | Flags |
|---|---|---|
| `XF86AudioRaiseVolume` / `XF86AudioLowerVolume` | Increase / decrease output volume by 5% | Locked, repeat |
| `XF86AudioMicMute` | Toggle default-source mute | Locked |
| `XF86AudioMute` | Toggle output mute | Locked |
| `XF86Sleep` | Run `systemctl suspend` | Locked |
| `XF86Rfkill` | Block or unblock Wi-Fi with `rfkill`. Bluetooth is not changed | Locked |
| keycode `164`, `XF86AudioPause`, or `XF86AudioPlay` | Toggle play/pause with `playerctl` | Locked |
| `XF86AudioNext` / `XF86AudioPrev` | Next / previous media item | Locked |
| `XF86AudioStop` | Stop playback | Locked |

## Screenshots

| Standard keys | Laptop alternative | Action |
|---|---|---|
| `SUPER+Print` | `SUPER+F6` | Capture all outputs now |
| `SUPER+SHIFT+Print` | `SUPER+SHIFT+F6` | Select an area |
| `SUPER+CTRL+Print` | `SUPER+CTRL+F6` | Capture all outputs after five seconds |
| `SUPER+CTRL+SHIFT+Print` | `SUPER+ALT+F6` | Capture all outputs after ten seconds |
| `ALT+Print` | `ALT+F6` | Capture the active window |
| `SUPER+SHIFT+S` | None | Select an area, save it, and copy it to the clipboard |

Screenshots are saved under `$(xdg-user-dir PICTURES)/Screenshots` and copied to the Wayland clipboard. The script uses `grim`, `slurp`, `jq`, and `wl-copy`, and it can open a capture in Swappy from the notification.

## Laptop and ASUS keys

The laptop module loads on every machine, so the generic keys stay registered. The ASUS launch keys register only when their command is installed.

| Key | Action | Condition |
|---|---|---|
| `XF86KbdBrightnessDown` / `XF86KbdBrightnessUp` | Decrease / increase keyboard backlight by 30% | A matching `*::kbd_backlight` device. Repeats while held |
| `XF86MonBrightnessDown` / `XF86MonBrightnessUp` | Decrease / increase display backlight by 10%, clamped to 5% to 95% | `brightnessctl`. Repeats while held |
| `XF86TouchpadToggle` | Toggle the configured touchpad | The device name must match both `laptops.lua` and `TouchPad.sh` |
| `XF86Launch1` | Open ROG Control Center | Registered only if `rog-control-center` exists |
| `XF86Launch3` | Select the next ASUS keyboard RGB mode | Registered only if `asusctl` exists |
| `XF86Launch4` | Select the next ASUS performance profile | Registered only if `asusctl` exists |

The lid-switch declarations in `laptops.lua` are disabled examples. See [Hardware and Generated State](/general/hardware) before you enable them.

## Customize safely

Add personal bindings in [`user-keybinds.lua`](/hyprland/userkeybindings), not in the managed base file. Then validate:

```bash
luac -p ~/.config/hypr/UserConfigs/user-keybinds.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl configerrors
```

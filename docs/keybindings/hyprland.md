---
title: Hyprland Keybindings - HyprFlux
description: Source-verified reference for HyprFlux window, workspace, application, media, screenshot, and laptop shortcuts.
---

# Hyprland Keybindings

This is the canonical lookup table for the bindings shipped at HyprFlux source
revision [`f421b6b`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591).
Hyprland loads the [base bindings](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua),
then [user bindings](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-keybinds.lua),
then [laptop bindings](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/laptops.lua).

Use the live compositor as the final authority after personal changes:

```bash
hyprctl binds
```

`SUPER+SHIFT+K` opens the searchable live list. `SUPER+SHIFT+H` opens a shorter,
curated cheat sheet.

## Known Collisions

A later declaration does not replace an earlier one automatically. Each of
these shipped combinations registers more than one action:

| Keys | Registered actions | Effective behavior |
|---|---|---|
| `SUPER+K` | Master-layout `cycleprev`; launch Kdenlive | Kdenlive launches on every press; the layout callback also runs on a Master workspace. |
| `SUPER+O` | Dwindle `togglesplit`; launch Obsidian | Obsidian launches on every press; the layout callback also runs on a Dwindle workspace. |
| `SUPER+SHIFT+W` | Wallpaper selector; wallpaper effects | Both scripts are launched in declaration order. This is a known source defect, not an intentional menu sequence. |

## Session And Menus

Source: [`configs/keybinds.lua:16-23`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L16-L23)

| Keys | Action |
|---|---|
| `CTRL+ALT+Delete` | Exit Hyprland. |
| `SUPER+Q` | Request that the active window close. |
| `SUPER+SHIFT+Q` | Send `kill` to the active window's process. |
| `CTRL+ALT+L` | Lock the session through `loginctl`. |
| `CTRL+ALT+P` | Open Wlogout. |
| `SUPER+N` | Toggle the SwayNC notification panel. |
| `SUPER+SHIFT+E` | Open HyprFlux Quick Settings. |

## Layout And Window State

Source: [`configs/keybinds.lua:25-55`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L25-L55) and
[`user-keybinds.lua:37-66`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-keybinds.lua#L37-L66)

| Keys | Action | Condition |
|---|---|---|
| `SUPER+CTRL+D` | Remove a window from Master. | Master layout only. |
| `SUPER+I` | Add a window to Master. | Master layout only. |
| `SUPER+K` | Cycle backward. | Master layout only; also launches Kdenlive. |
| `SUPER+CTRL+Return` | Swap with Master. | Master layout only. |
| `SUPER+O` | Toggle the split direction. | Dwindle only; also launches Obsidian. |
| `SUPER+SHIFT+I` | Rotate the split. | Dwindle only. |
| `SUPER+P` | Toggle pseudotiling. | Dwindle behavior. |
| `SUPER+J` | Cycle to the next window. | Any layout. |
| `SUPER+SHIFT+L` | Cycle Dwindle, Master, and Scrolling layouts. | Requires `jq`. |
| `SUPER+SHIFT+O` | Toggle between the shipped low and normal blur values. | Requires `jq`. |
| `SUPER+SHIFT+G` | Toggle Game Mode and restore the captured visual state. | Uses `$XDG_RUNTIME_DIR/gamemode.state`. |
| `SUPER+SHIFT+F` | Toggle fullscreen. | Active window. |
| `SUPER+CTRL+F` | Toggle maximized/fake fullscreen. | Active window. |
| `SUPER+Space` | Toggle floating. | Active window. |
| `SUPER+ALT+Space` | Enable or disable floating for all windows on the workspace. | Lua callback. |
| `SUPER+CTRL+O` | Toggle active-window opacity. | Active window. |
| `SUPER+SHIFT+Return` | Toggle the dropdown terminal. | Uses the configured default terminal. |

## Focus, Move, Resize, And Mouse

Source: [`configs/keybinds.lua:85-107`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L85-L107) and
[`configs/keybinds.lua:141-143`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L141-L143)

| Keys | Action | Behavior |
|---|---|---|
| `SUPER+Arrow` | Move focus in the arrow direction. | One action per press. |
| `SUPER+CTRL+Arrow` | Move the active window in the arrow direction. | One action per press. |
| `SUPER+ALT+Arrow` | Swap with the window in the arrow direction. | One action per press. |
| `SUPER+SHIFT+Arrow` | Resize by 50 pixels in the arrow direction. | Repeats while held. |
| `SUPER+Left drag` | Move a window. | Interactive mouse bind. |
| `SUPER+Right drag` | Resize a window. | Interactive mouse bind. |

## Workspaces

Source: [`configs/keybinds.lua:109-139`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L109-L139)

The number-row shortcuts use keycodes so they keep their physical positions on
different keyboard layouts.

| Keys | Action |
|---|---|
| `SUPER+Tab` / `SUPER+SHIFT+Tab` | Next / previous workspace on the current monitor. |
| `SUPER+U` | Toggle the `nyx` special workspace. |
| `SUPER+SHIFT+U` | Move the active window to `special:nyx`. |
| `SUPER+1` ... `SUPER+0` | Focus workspace 1 ... 10. |
| `SUPER+SHIFT+1` ... `SUPER+SHIFT+0` | Move the active window to workspace 1 ... 10 and follow it. |
| `SUPER+CTRL+1` ... `SUPER+CTRL+0` | Move the active window silently to workspace 1 ... 10. |
| `SUPER+SHIFT+[` / `SUPER+SHIFT+]` | Move the active window to the previous / next workspace. |
| `SUPER+CTRL+[` / `SUPER+CTRL+]` | Move the active window silently to the previous / next workspace. |
| `SUPER+wheel down` / `SUPER+wheel up` | Focus the next / previous existing workspace. |
| `SUPER+.` / `SUPER+,` | Focus the next / previous existing workspace. |

## Applications And Utilities

Source: [`user-keybinds.lua:18-35`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-keybinds.lua#L18-L35) and
[`user-keybinds.lua:37-96`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/user-keybinds.lua#L37-L96)

| Keys | Action | Dependency or scope |
|---|---|---|
| `SUPER+D` | Rofi application launcher. | Rofi. |
| `SUPER+Return` | Default terminal. | `user-defaults.lua`. |
| `SUPER+F` | Default file manager. | `user-defaults.lua`. |
| `SUPER+K` | Kdenlive. | Collides with the Master action. |
| `SUPER+B` | Firefox. | Firefox. |
| `SUPER+R` | Foliate. | Foliate. |
| `SUPER+V` | Clipboard history. | Rofi, `cliphist`, and `wl-copy`. |
| `SUPER+C` | Visual Studio Code using X11/Ozone. | `code`. |
| `SUPER+O` | Obsidian using X11/Ozone. | Collides with the Dwindle action. |
| `SUPER+S` | Spotify web app in Chromium. | Chromium. |
| `SUPER+X` | Vesktop. | Vesktop. |
| `SUPER+T` | Telegram launcher expression. | Shipped command is `(64gram-desktop\|telegram-desktop)`; verify it locally before relying on fallback behavior. |
| `SUPER+M` | Free Download Manager. | `fdm`. |
| `SUPER+E` | Tmuxifier project menu. | Maintainer-oriented `UserScripts` workflow. |
| `SUPER+G` | GitHub repository clone menu. | GitHub CLI login and a user-selected clone directory. |
| `SUPER+ALT+E` | Emoji menu; copy selection to the clipboard. | Rofi and `wl-copy`. |
| `SUPER+CTRL+C` | Calculator menu. | Rofi and Qalculate. |
| `SUPER+SHIFT+K` | Search live bindings. | Rofi, Python, and a running Hyprland session. |
| `SUPER+SHIFT+H` | Open the curated cheat sheet. | Yad. |
| `SUPER+SHIFT+A` | Select an animation preset. | Rofi; see the known refresh defect in [Scripts and Utilities](/hyprland/scripts). |
| `SUPER+CTRL+ALT+B` | Toggle Waybar visibility with `SIGUSR1`. | Running Waybar process. |
| `SUPER+ALT+wheel down` / `SUPER+ALT+wheel up` | Zoom in / out. | Changes `cursor.zoom_factor` in memory. |
| `SUPER+SHIFT+P` | Run the shipped color-picker command. | The current command contains a slash and typographic dash; treat it as a source defect. |

## Maintainer-Oriented User Workflows

These bindings are active in the distributed user module, but their scripts
contain personal paths, services, station lists, or publishing assumptions.
Review the script before use.

| Keys | Shipped workflow |
|---|---|
| `SUPER+SHIFT+T` | Toggle the `tuned` daemon. |
| `SUPER+SHIFT+D` | Sync the maintainer's dotfiles checkout. |
| `SUPER+SHIFT+B` | Sync and publish the maintainer's blog. |
| `SUPER+SHIFT+N` | Run the maintainer's Obsidian note generator. |
| `SUPER+SHIFT+M` | Open the configured Rofi music/station menu. |
| `SUPER+SHIFT+W` | Launch both wallpaper selection and wallpaper effects. |
| `CTRL+ALT+W` | Choose a random wallpaper. |

## Media And System Keys

Source: [`configs/keybinds.lua:57-73`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L57-L73)

Bindings marked **locked** also work while an input inhibitor or lockscreen is
active. Bindings marked **repeat** repeat while held.

| Key | Action | Flags |
|---|---|---|
| `XF86AudioRaiseVolume` / `XF86AudioLowerVolume` | Increase / decrease output volume by 5%. | Locked, repeat |
| `XF86AudioMicMute` | Toggle default-source mute. | Locked |
| `XF86AudioMute` | Toggle output mute. | Locked |
| `XF86Sleep` | Run `systemctl suspend`. | Locked |
| `XF86Rfkill` | Block or unblock Wi-Fi with `rfkill`. Bluetooth is not changed. | Locked |
| keycode `164`, `XF86AudioPause`, or `XF86AudioPlay` | Toggle play/pause with `playerctl`. | Locked |
| `XF86AudioNext` / `XF86AudioPrev` | Next / previous media item. | Locked |
| `XF86AudioStop` | Stop playback. | Locked |

## Screenshots

Source: [`configs/keybinds.lua:75-83`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L75-L83) and
[`laptops.lua:34-39`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/laptops.lua#L34-L39)

| Standard keys | Laptop alternative | Action |
|---|---|---|
| `SUPER+Print` | `SUPER+F6` | Capture all outputs now. |
| `SUPER+SHIFT+Print` | `SUPER+SHIFT+F6` | Select an area. |
| `SUPER+CTRL+Print` | `SUPER+CTRL+F6` | Capture all outputs after five seconds. |
| `SUPER+CTRL+SHIFT+Print` | `SUPER+ALT+F6` | Capture all outputs after ten seconds. |
| `ALT+Print` | `ALT+F6` | Capture the active window. |
| `SUPER+SHIFT+S` | None | Select an area and offer Swappy editing. |

Screenshots are saved under `$(xdg-user-dir PICTURES)/Screenshots` and copied to
the Wayland clipboard. The script uses `grim`, `slurp`, `jq`, `wl-copy`, and
optionally `swappy`.

## Laptop And ASUS Keys

Source: [`laptops.lua:12-39`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/laptops.lua#L12-L39)

The laptop module is loaded on every machine. Generic keys remain registered;
ASUS launch keys are registered only when their command is installed.

| Key | Action | Condition |
|---|---|---|
| `XF86KbdBrightnessDown` / `XF86KbdBrightnessUp` | Decrease / increase keyboard backlight by 30%. | Matching `*::kbd_backlight` device; repeat |
| `XF86MonBrightnessDown` / `XF86MonBrightnessUp` | Decrease / increase display backlight by 10%, clamped to 5%-95%. | `brightnessctl`; repeat |
| `XF86TouchpadToggle` | Toggle the configured touchpad. | Device name must match both `laptops.lua` and `TouchPad.sh`. |
| `XF86Launch1` | Open ROG Control Center. | Registered only if `rog-control-center` exists. |
| `XF86Launch3` | Select the next ASUS keyboard RGB mode. | Registered only if `asusctl` exists. |
| `XF86Launch4` | Select the next ASUS performance profile. | Registered only if `asusctl` exists. |

Lid-switch declarations in `laptops.lua` are examples and are disabled by
default. See [Hardware and Generated State](/general/hardware) before enabling
them.

## Customize Safely

Add personal bindings in
[`~/.config/hypr/UserConfigs/user-keybinds.lua`](/hyprland/userkeybindings), not
the managed base file. Validate changes with:

```bash
luac -p ~/.config/hypr/UserConfigs/user-keybinds.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl configerrors
```

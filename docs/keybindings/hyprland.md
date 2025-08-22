# HyprFlux Keybindings

## 1. Core Apps & Tools

| Keybinding         | Action / Command                                            | Description                                  |
| ------------------ | ----------------------------------------------------------- | -------------------------------------------- |
| **SUPER + D**      | `pkill rofi`                                                | Open Rofi app launcher                       |
| **SUPER + Return** | `$term`                                                     | Open default terminal (from user config)     |
| **SUPER + F**      | `$files`                                                    | Open default file manager (from user config) |
| **SUPER + K**      | `kitty`                                                     | Launch Kitty terminal                        |
| **SUPER + B**      | `firefox`                                                   | Launch Firefox browser                       |
| **SUPER + R**      | `foliate`                                                   | Launch Foliate eBook reader                  |
| **SUPER + C**      | `code --ozone-platform=x11`                                 | Launch Visual Studio Code                    |
| **SUPER + O**      | `obsidian --ozone-platform=x11`                             | Launch Obsidian                              |
| **SUPER + S**      | `spotify-launcher`                                          | Launch Spotify                               |
| **SUPER + I**      | `vesktop`                                                   | Launch Vesktop (Discord)                     |
| **SUPER + T**      | `(64gram-desktop)`                                          | Launch Telegram client                       |
| **SUPER + M**      | `fdm`                                                       | Launch Free Download Manager                 |
| **SUPER + E**      | `kitty --title tmuxifier -e tmuxifier load-session web-dev` | Launch tmuxifier Web Dev session in Kitty    |
| **SUPER + W**      | `wasistlos`                                                 | Launch WhatsApp (wasistlos client)           |

---

## 2. System & Utilities

| Keybinding            | Action / Command                       | Description                  |
| --------------------- | -------------------------------------- | ---------------------------- |
| **SUPER + V**         | `$scriptsDir/ClipManager.sh`           | Clipboard manager            |
| **SUPER + Shift + H** | `$scriptsDir/KeyHints.sh`              | Show help / cheat sheet      |
| **SUPER + Shift + R** | `$scriptsDir/Refresh.sh`               | Refresh Waybar, swaync, rofi |
| **SUPER + Shift + O** | `$scriptsDir/ChangeBlur.sh`            | Toggle blur settings         |
| **SUPER + Ctrl + O**  | `hyprctl setprop active opaque toggle` | Toggle window opacity        |
| **SUPER + Shift + K** | `$scriptsDir/KeyBinds.sh`              | Search keybinds via Rofi     |
| **SUPER + Shift + A** | `$scriptsDir/Animations.sh`            | Hyprland animations menu     |

---

## 3. Layouts & Window Management

| Keybinding                 | Action / Command                         | Description                       |
| -------------------------- | ---------------------------------------- | --------------------------------- |
| **SUPER + Shift + L**      | `$scriptsDir/ChangeLayout.sh`            | Toggle between Master and Dwindle |
| **SUPER + Shift + F**      | `fullscreen`                             | Toggle fullscreen                 |
| **SUPER + Ctrl + F**       | `fullscreen, 1`                          | Fake fullscreen                   |
| **SUPER + Space**          | `togglefloating`                         | Toggle floating mode              |
| **SUPER + Alt + Space**    | `hyprctl dispatch workspaceopt allfloat` | Set all windows floating          |
| **SUPER + Shift + Return** | `$scriptsDir/Dropterminal.sh $term`      | Dropdown floating terminal        |

---

## 4. Waybar Controls

| Keybinding                 | Action / Command              | Description             |
| -------------------------- | ----------------------------- | ----------------------- |
| **SUPER + Ctrl + Alt + B** | `pkill -SIGUSR1 waybar`       | Toggle show/hide Waybar |
| **SUPER + Ctrl + B**       | `$scriptsDir/WaybarStyles.sh` | Waybar styles menu      |
| **SUPER + Alt + B**        | `$scriptsDir/WaybarLayout.sh` | Waybar layout menu      |

---

## 5. Sync & System Scripts

| Keybinding            | Action / Command               | Description                    |
| --------------------- | ------------------------------ | ------------------------------ |
| **SUPER + Shift + G** | `$UserScripts/MountGdrive.sh`  | Mount Google Drive locally     |
| **SUPER + Shift + T** | `$UserScripts/Toggle-tuned.sh` | Toggle tuned (power profile)   |
| **SUPER + Shift + D** | `$UserScripts/SyncDotfiles.sh` | Sync dotfiles                  |
| **SUPER + Shift + B** | `$UserScripts/SyncBlog.sh`     | Sync blog                      |
| **SUPER + Shift + C** | `$UserScripts/RcloneSync.sh`   | Sync Documents to Google Drive |

---

## 6. Media, Wallpapers & Themes

| Keybinding            | Action / Command                   | Description                  |
| --------------------- | ---------------------------------- | ---------------------------- |
| **SUPER + Shift + M** | `$UserScripts/RofiBeats.sh`        | Play online music using Rofi |
| **SUPER + Shift + W** | `$UserScripts/WallpaperSelect.sh`  | Wallpaper selection menu     |
| **SUPER + Shift + W** | `$UserScripts/WallpaperEffects.sh` | Apply wallpaper effects      |
| **Ctrl + Alt + W**    | `$UserScripts/WallpaperRandom.sh`  | Set random wallpaper         |
| **SUPER + Shift + Z** | `$UserScripts/ZshChangeTheme.sh`   | Change Oh-My-Zsh theme       |

---

## 7. Extras & Productivity

| Keybinding                   | Action / Command                                         | Description                     |
| ---------------------------- | -------------------------------------------------------- | ------------------------------- |
| **SUPER + Shift + P**        | `hyprpicker -a / –autocopy`                              | Color picker                    |
| **SUPER + Shift + V**        | `systemd-run --user --scope $scriptsDir/parrotOS-KVM.sh` | Start yazi in foot (VM related) |
| **SUPER + Alt + E**          | `$scriptsDir/RofiEmoji.sh`                               | Open emoji picker               |
| **SUPER + Alt + Mouse Down** | Adjust `cursor:zoom_factor` ×2                           | Zoom in (magnifier)             |
| **SUPER + Alt + Mouse Up**   | Adjust `cursor:zoom_factor` ÷2                           | Zoom out (magnifier)            |
| **SUPER + Ctrl + C**         | `$UserScripts/RofiCalc.sh`                               | Open calculator via Rofi        |

---

## 8. Default KeyBindings

| Keybinding              | Action / Command                     | Description                                |
| ----------------------- | ------------------------------------ | ------------------------------------------ |
| **CTRL + ALT + Delete** | `hyprctl dispatch exit 0`            | Exit Hyprland                              |
| **SUPER + Q**           | `killactive`                         | Close active window (soft close, not kill) |
| **SUPER + Shift + Q**   | `$scriptsDir/KillActiveProcess.sh`   | Kill active process                        |
| **CTRL + ALT + L**      | `$scriptsDir/LockScreen.sh`          | Lock screen                                |
| **CTRL + ALT + P**      | `$scriptsDir/Wlogout.sh`             | Power menu                                 |
| **SUPER + N**           | `swaync-client -t -sw`               | Notification panel (swaync)                |
| **SUPER + Shift + E**   | `$scriptsDir/Kool_Quick_Settings.sh` | Quick settings menu                        |

## 9. Layout Controls

| Keybinding                | Action / Command            | Description                                |
| ------------------------- | --------------------------- | ------------------------------------------ |
| **SUPER + Ctrl + D**      | `layoutmsg, removemaster`   | Remove master from layout                  |
| **SUPER + I**             | `layoutmsg, addmaster`      | Add master to layout                       |
| **SUPER + J**             | `layoutmsg, cyclenext`      | Cycle to next window in layout             |
| **SUPER + K**             | `layoutmsg, cycleprev`      | Cycle to previous window in layout         |
| **SUPER + Ctrl + Return** | `layoutmsg, swapwithmaster` | Swap focused window with master            |
| **SUPER + Shift + I**     | `togglesplit`               | Toggle split (dwindle layout only)         |
| **SUPER + P**             | `pseudo`                    | Pseudo split (dwindle layout)              |
| **SUPER + J**             | `cyclenext`                 | Cycle next window (floating brings to top) |

## 10. Special / Media Keys

| Keybinding         | Action / Command                     | Description            |
| ------------------ | ------------------------------------ | ---------------------- |
| **Volume Up**      | `$scriptsDir/Volume.sh --inc`        | Increase volume        |
| **Volume Down**    | `$scriptsDir/Volume.sh --dec`        | Decrease volume        |
| **Mic Mute**       | `$scriptsDir/Volume.sh --toggle-mic` | Toggle microphone mute |
| **Mute**           | `$scriptsDir/Volume.sh --toggle`     | Toggle audio mute      |
| **Sleep**          | `systemctl suspend`                  | Suspend system         |
| **Airplane Mode**  | `$scriptsDir/AirplaneMode.sh`        | Toggle airplane mode   |
| **Play/Pause**     | `$scriptsDir/MediaCtrl.sh --pause`   | Play/Pause media       |
| **Next Track**     | `$scriptsDir/MediaCtrl.sh --nxt`     | Next media track       |
| **Previous Track** | `$scriptsDir/MediaCtrl.sh --prv`     | Previous media track   |
| **Stop**           | `$scriptsDir/MediaCtrl.sh --stop`    | Stop media             |

## 11. Screenshot Controls

| Keybinding                       | Action / Command                     | Description                    |
| -------------------------------- | ------------------------------------ | ------------------------------ |
| **SUPER + Print**                | `$scriptsDir/ScreenShot.sh --now`    | Screenshot (entire screen now) |
| **SUPER + Shift + Print**        | `$scriptsDir/ScreenShot.sh --area`   | Screenshot selected area       |
| **SUPER + Ctrl + Print**         | `$scriptsDir/ScreenShot.sh --in5`    | Screenshot after 5s delay      |
| **SUPER + Ctrl + Shift + Print** | `$scriptsDir/ScreenShot.sh --in10`   | Screenshot after 10s delay     |
| **ALT + Print**                  | `$scriptsDir/ScreenShot.sh --active` | Screenshot active window       |
| **SUPER + Shift + S**            | `$scriptsDir/ScreenShot.sh --swappy` | Screenshot with Swappy         |

## 12. Resize Windows

| Keybinding                | Action / Command     | Description                 |
| ------------------------- | -------------------- | --------------------------- |
| **SUPER + Shift + Left**  | `resizeactive,-50 0` | Resize window, shrink left  |
| **SUPER + Shift + Right** | `resizeactive,50 0`  | Resize window, expand right |
| **SUPER + Shift + Up**    | `resizeactive,0 -50` | Resize window, shrink up    |
| **SUPER + Shift + Down**  | `resizeactive,0 50`  | Resize window, expand down  |

## 13. Move Windows

| Keybinding               | Action / Command | Description       |
| ------------------------ | ---------------- | ----------------- |
| **SUPER + Ctrl + Left**  | `movewindow, l`  | Move window left  |
| **SUPER + Ctrl + Right** | `movewindow, r`  | Move window right |
| **SUPER + Ctrl + Up**    | `movewindow, u`  | Move window up    |
| **SUPER + Ctrl + Down**  | `movewindow, d`  | Move window down  |

## 14. Swap Windows

| Keybinding              | Action / Command | Description                   |
| ----------------------- | ---------------- | ----------------------------- |
| **SUPER + Alt + Left**  | `swapwindow, l`  | Swap with window on the left  |
| **SUPER + Alt + Right** | `swapwindow, r`  | Swap with window on the right |
| **SUPER + Alt + Up**    | `swapwindow, u`  | Swap with window above        |
| **SUPER + Alt + Down**  | `swapwindow, d`  | Swap with window below        |

## 15. Move Focus

| Keybinding        | Action / Command | Description        |
| ----------------- | ---------------- | ------------------ |
| **SUPER + Left**  | `movefocus, l`   | Focus window left  |
| **SUPER + Right** | `movefocus, r`   | Focus window right |
| **SUPER + Up**    | `movefocus, u`   | Focus window up    |
| **SUPER + Down**  | `movefocus, d`   | Focus window down  |

## 16. Workspaces

| Keybinding                 | Action / Command                 | Description                                     |
| -------------------------- | -------------------------------- | ----------------------------------------------- |
| **SUPER + Tab**            | `workspace, m+1`                 | Next workspace                                  |
| **SUPER + Shift + Tab**    | `workspace, m-1`                 | Previous workspace                              |
| **SUPER + U**              | `togglespecialworkspace, nyx`    | Toggle special workspace "nyx"                  |
| **SUPER + Shift + U**      | `movetoworkspace, special:nyx`   | Move active window to special workspace "nyx"   |
| **SUPER + \[1–0]**         | `workspace, [1–10]`              | Switch to workspace number                      |
| **SUPER + Shift + \[1–0]** | `movetoworkspace, [1–10]`        | Move window to workspace and follow             |
| **SUPER + Ctrl + \[1–0]**  | `movetoworkspacesilent, [1–10]`  | Move window silently to workspace               |
| **SUPER + Shift + \[ / ]** | `movetoworkspace, -1 / +1`       | Move window to previous/next workspace          |
| **SUPER + Ctrl + \[ / ]**  | `movetoworkspacesilent, -1 / +1` | Move window silently to previous/next workspace |
| **SUPER + Mouse Scroll**   | `workspace, e+1 / e-1`           | Scroll through workspaces                       |
| **SUPER + Period / Comma** | `workspace, e+1 / e-1`           | Switch to next / previous workspace             |

## 17. Mouse Controls

| Keybinding              | Action / Command | Description              |
| ----------------------- | ---------------- | ------------------------ |
| **SUPER + Left Click**  | `movewindow`     | Move window with mouse   |
| **SUPER + Right Click** | `resizewindow`   | Resize window with mouse |

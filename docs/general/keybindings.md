| Keybinding                     | Action                                    | Description                                      |
| ------------------------------ | ----------------------------------------- | ------------------------------------------------ |
| `CTRL + ALT + Delete`          | `exec hyprctl dispatch exit 0`            | Exit Hyprland                                    |
| `SUPER + Q`                    | `killactive`                              | Close active window (not kill)                   |
| `SUPER + SHIFT + Q`            | `exec $scriptsDir/KillActiveProcess.sh`   | Kill active process                              |
| `CTRL + ALT + L`               | `exec $scriptsDir/LockScreen.sh`          | Screen lock                                      |
| `CTRL + ALT + P`               | `exec $scriptsDir/Wlogout.sh`             | Power menu                                       |
| `SUPER + N`                    | `exec swaync-client -t -sw`               | Open swayNC notification panel                   |
| `SUPER + SHIFT + E`            | `exec $scriptsDir/Kool_Quick_Settings.sh` | Open KooL Hyprland Settings menu                 |
| `SUPER + CTRL + D`             | `layoutmsg removemaster`                  | Remove master                                    |
| `SUPER + I`                    | `layoutmsg addmaster`                     | Add master                                       |
| `SUPER + J`                    | `layoutmsg cyclenext`                     | Cycle to next window                             |
| `SUPER + K`                    | `layoutmsg cycleprev`                     | Cycle to previous window                         |
| `SUPER + CTRL + Return`        | `layoutmsg swapwithmaster`                | Swap with master                                 |
| `SUPER + SHIFT + I`            | `togglesplit`                             | Toggle split (only on dwindle layout)            |
| `SUPER + P`                    | `pseudo`                                  | Toggle pseudo mode (dwindle layout)              |
| `SUPER + Print`                | `exec $scriptsDir/ScreenShot.sh --now`    | Screenshot now                                   |
| `SUPER + SHIFT + Print`        | `exec $scriptsDir/ScreenShot.sh --area`   | Screenshot selected area                         |
| `SUPER + CTRL + Print`         | `exec $scriptsDir/ScreenShot.sh --in5`    | Screenshot after 5 seconds                       |
| `SUPER + CTRL + SHIFT + Print` | `exec $scriptsDir/ScreenShot.sh --in10`   | Screenshot after 10 seconds                      |
| `ALT + Print`                  | `exec $scriptsDir/ScreenShot.sh --active` | Screenshot active window                         |
| `SUPER + SHIFT + S`            | `exec $scriptsDir/ScreenShot.sh --swappy` | Screenshot with swappy                           |
| `SUPER + SHIFT + Left`         | `resizeactive -50 0`                      | Resize window left                               |
| `SUPER + SHIFT + Right`        | `resizeactive 50 0`                       | Resize window right                              |
| `SUPER + SHIFT + Up`           | `resizeactive 0 -50`                      | Resize window up                                 |
| `SUPER + SHIFT + Down`         | `resizeactive 0 50`                       | Resize window down                               |
| `SUPER + CTRL + Left`          | `movewindow l`                            | Move window left                                 |
| `SUPER + CTRL + Right`         | `movewindow r`                            | Move window right                                |
| `SUPER + CTRL + Up`            | `movewindow u`                            | Move window up                                   |
| `SUPER + CTRL + Down`          | `movewindow d`                            | Move window down                                 |
| `SUPER + ALT + Left`           | `swapwindow l`                            | Swap window left                                 |
| `SUPER + ALT + Right`          | `swapwindow r`                            | Swap window right                                |
| `SUPER + ALT + Up`             | `swapwindow u`                            | Swap window up                                   |
| `SUPER + ALT + Down`           | `swapwindow d`                            | Swap window down                                 |
| `SUPER + Left`                 | `movefocus l`                             | Move focus left                                  |
| `SUPER + Right`                | `movefocus r`                             | Move focus right                                 |
| `SUPER + Up`                   | `movefocus u`                             | Move focus up                                    |
| `SUPER + Down`                 | `movefocus d`                             | Move focus down                                  |
| `SUPER + Tab`                  | `workspace m+1`                           | Switch to next workspace                         |
| `SUPER + SHIFT + Tab`          | `workspace m-1`                           | Switch to previous workspace                     |
| `SUPER + U`                    | `togglespecialworkspace nyx`              | Toggle special workspace 'nyx'                   |
| `SUPER + SHIFT + U`            | `movetoworkspace special:nyx`             | Move window to special workspace 'nyx'           |
| `SUPER + 1-10`                 | `workspace 1-10`                          | Switch to workspace 1-10                         |
| `SUPER + SHIFT + 1-10`         | `movetoworkspace 1-10`                    | Move window to workspace 1-10                    |
| `SUPER + SHIFT + [ / ]`        | `movetoworkspace -1 / +1`                 | Move window to previous or next workspace        |
| `SUPER + CTRL + 1-10`          | `movetoworkspacesilent 1-10`              | Move window to workspace silently 1-10           |
| `SUPER + CTRL + [ / ]`         | `movetoworkspacesilent -1 / +1`           | Move window to previous or next workspace silent |
| `SUPER + Mouse Scroll Down`    | `workspace e+1`                           | Scroll to next workspace                         |
| `SUPER + Mouse Scroll Up`      | `workspace e-1`                           | Scroll to previous workspace                     |
| `SUPER + .`                    | `workspace e+1`                           | Next workspace                                   |
| `SUPER + ,`                    | `workspace e-1`                           | Previous workspace                               |
| `SUPER + Left Mouse`           | `movewindow`                              | Move window with mouse                           |
| `SUPER + Right Mouse`          | `resizewindow`                            | Resize window with mouse                         |
| `XF86AudioRaiseVolume`         | `exec $scriptsDir/Volume.sh --inc`        | Volume up                                        |
| `XF86AudioLowerVolume`         | `exec $scriptsDir/Volume.sh --dec`        | Volume down                                      |
| `XF86AudioMute`                | `exec $scriptsDir/Volume.sh --toggle`     | Toggle mute                                      |
| `XF86AudioMicMute`             | `exec $scriptsDir/Volume.sh --toggle-mic` | Toggle mic mute                                  |
| `XF86Sleep`                    | `exec systemctl suspend`                  | Sleep                                            |
| `XF86Rfkill`                   | `exec $scriptsDir/AirplaneMode.sh`        | Toggle airplane mode                             |
| `XF86AudioPlayPause`           | `exec $scriptsDir/MediaCtrl.sh --pause`   | Play or pause media                              |
| `XF86AudioPause`               | `exec $scriptsDir/MediaCtrl.sh --pause`   | Pause media                                      |
| `XF86AudioPlay`                | `exec $scriptsDir/MediaCtrl.sh --pause`   | Play media                                       |
| `XF86AudioNext`                | `exec $scriptsDir/MediaCtrl.sh --nxt`     | Next media track                                 |
| `XF86AudioPrev`                | `exec $scriptsDir/MediaCtrl.sh --prv`     | Previous media track                             |
| `XF86AudioStop`                | `exec $scriptsDir/MediaCtrl.sh --stop`    | Stop media                                       |

Perfect, you pasted your **User Keybinds** config.
Let’s make a clean **hits/cheatsheet table** out of it (like the one we did for system binds). This will give you a quick lookup reference for all your personal shortcuts.

---

## User KeyBindings (Cheat Sheet)

| Keybinding                        | Action/Command                                                | Description                         |                                                             |                               |
| --------------------------------- | ------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------- | ----------------------------- |
| `SUPER + D`                       | \`pkill rofi                                                  |                                     | true && rofi -show drun -modi drun,filebrowser,run,window\` | App Launcher (Rofi main menu) |
| `SUPER + B`                       | `xdg-open "https://"`                                         | Default browser (or Firefox if set) |                                                             |                               |
| `SUPER + Return`                  | `exec $term`                                                  | Open terminal (default)             |                                                             |                               |
| `SUPER + F`                       | `exec $files`                                                 | Open file manager                   |                                                             |                               |
| `SUPER + K`                       | `exec kitty`                                                  | Launch Kitty terminal               |                                                             |                               |
| `SUPER + B`                       | `exec firefox`                                                | Launch Firefox                      |                                                             |                               |
| `SUPER + R`                       | `exec foliate`                                                | Open Foliate (eBook reader)         |                                                             |                               |
| `SUPER + V`                       | `exec $scriptsDir/ClipManager.sh`                             | Clipboard Manager                   |                                                             |                               |
| `SUPER + C`                       | `exec code --ozone-platform=x11`                              | Launch VS Code                      |                                                             |                               |
| `SUPER + O`                       | `exec obsidian --ozone-platform=x11`                          | Launch Obsidian                     |                                                             |                               |
| `SUPER + S`                       | `exec spotify-launcher`                                       | Open Spotify                        |                                                             |                               |
| `SUPER + I`                       | `exec vesktop`                                                | Launch Vesktop (Discord)            |                                                             |                               |
| `SUPER + T`                       | \`exec (64gram-desktop                                        | telegram-desktop)\`                 | Open Telegram                                               |                               |
| `SUPER + M`                       | `exec fdm`                                                    | Free Download Manager               |                                                             |                               |
| `SUPER + E`                       | `kitty --title tmuxifier -e tmuxifier load-session web-dev`   | Start tmuxifier web-dev session     |                                                             |                               |
| `SUPER + W`                       | `exec wasistlos`                                              | Open WhatsApp-Linux                 |                                                             |                               |
| `SUPER + SHIFT + H`               | `exec $scriptsDir/KeyHints.sh`                                | Help / cheat sheet                  |
| `SUPER + SHIFT + R`               | `exec $scriptsDir/Refresh.sh`                                 | Refresh waybar, swaync, rofi        |
| `SUPER + SHIFT + O`               | `exec $scriptsDir/ChangeBlur.sh`                              | Toggle blur settings                |
| `SUPER + SHIFT + G`               | `exec $UserScripts/MountGdrive.sh`                            | Mount Google Drive                  |
| `SUPER + SHIFT + T`               | `exec $UserScripts/Toggle-tuned.sh`                           | Toggle tuned animations             |
| `SUPER + SHIFT + D`               | `exec $UserScripts/SyncDotfiles.sh`                           | Sync dotfiles                       |
| `SUPER + SHIFT + B`               | `exec $UserScripts/SyncBlog.sh`                               | Sync blog                           |
| `SUPER + SHIFT + C`               | `exec $UserScripts/RcloneSync.sh`                             | Sync documents with Google Drive    |
| `SUPER + SHIFT + L`               | `exec $scriptsDir/ChangeLayout.sh`                            | Toggle Master or Dwindle Layout     |
| `SUPER + SHIFT + P`               | `exec hyprpicker -a / –autocopy`                              | Color picker                        |
| `SUPER + SHIFT + V`               | `exec systemd-run --user --scope $scriptsDir/parrotOS-KVM.sh` | Start ParrotOS KVM                  |
| `SUPER + SHIFT + F`               | `fullscreen`                                                  | Toggle fullscreen                   |
| `SUPER + SHIFT + Return`          | `exec $scriptsDir/Dropterminal.sh $term`                      | Dropdown terminal                   |
| `SUPER + CTRL + F`                | `fullscreen 1`                                                | Fake fullscreen                     |
| `SUPER + SPACE`                   | `togglefloating`                                              | Toggle float mode                   |
| `SUPER + ALT + SPACE`             | `exec hyprctl dispatch workspaceopt allfloat`                 | Toggle all-float mode               |
| `SUPER + ALT + E`                 | `exec $scriptsDir/RofiEmoji.sh`                               | Emoji menu                          |
| `SUPER + ALT + Mouse Scroll Down` | `hyprctl keyword cursor:zoom_factor factor*2`                 | Zoom in                             |
| `SUPER + ALT + Mouse Scroll Up`   | `hyprctl keyword cursor:zoom_factor factor/2`                 | Zoom out                            |
| `SUPER + CTRL + ALT + B`          | `pkill -SIGUSR1 waybar`                                       | Toggle hide/show Waybar             |
| `SUPER + CTRL + B`                | `exec $scriptsDir/WaybarStyles.sh`                            | Waybar styles menu                  |
| `SUPER + ALT + B`                 | `exec $scriptsDir/WaybarLayout.sh`                            | Waybar layout menu                  |
| `SUPER + SHIFT + M`               | `exec $UserScripts/RofiBeats.sh`                              | Online music (Rofi)                 |
| `SUPER + SHIFT + W`               | `exec $UserScripts/WallpaperSelect.sh`                        | Select wallpaper                    |
| `SUPER + SHIFT + W` (2nd bind)    | `exec $UserScripts/WallpaperEffects.sh`                       | Wallpaper effects (Imagemagick)     |
| `CTRL + ALT + W`                  | `exec $UserScripts/WallpaperRandom.sh`                        | Random wallpapers                   |
| `SUPER + CTRL + O`                | `exec hyprctl setprop active opaque toggle`                   | Toggle window opacity               |
| `SUPER + SHIFT + K`               | `exec $scriptsDir/KeyBinds.sh`                                | Search keybinds via Rofi            |
| `SUPER + SHIFT + A`               | `exec $scriptsDir/Animations.sh`                              | Hyprland animations menu            |
| `SUPER + SHIFT + Z`               | `exec $UserScripts/ZshChangeTheme.sh`                         | Change oh-my-zsh theme              |
| `SUPER + CTRL + C`                | `exec $UserScripts/RofiCalc.sh`                               | Calculator (qalculate)              |

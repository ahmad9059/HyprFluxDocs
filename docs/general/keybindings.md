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

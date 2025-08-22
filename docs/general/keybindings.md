Got it, Ahmad. I’ll merge your **old keybindings table** with the updated **Hypr config file** you pasted, so your new table fully reflects what is actually bound in that file.

Here’s the **updated table**:

---

## User KeyBindings (Updated)

| Keybinding                   | Action / Command                                            | Description                                  |                        |     |
| ---------------------------- | ----------------------------------------------------------- | -------------------------------------------- | ---------------------- | --- |
| **SUPER + F**                | `$files`                                                    | Open default file manager (from user config) |                        |     |
| **SUPER + K**                | `kitty`                                                     | Launch Kitty terminal                        |                        |     |
| **SUPER + B**                | `firefox`                                                   | Launch Firefox browser                       |                        |     |
| **SUPER + R**                | `foliate`                                                   | Launch Foliate eBook reader                  |                        |     |
| **SUPER + V**                | `$scriptsDir/ClipManager.sh`                                | Clipboard manager                            |                        |     |
| **SUPER + C**                | `code --ozone-platform=x11`                                 | Launch Visual Studio Code                    |                        |     |
| **SUPER + O**                | `obsidian --ozone-platform=x11`                             | Launch Obsidian                              |                        |     |
| **SUPER + S**                | `spotify-launcher`                                          | Launch Spotify                               |                        |     |
| **SUPER + I**                | `vesktop`                                                   | Launch Vesktop (Discord)                     |                        |     |
| **SUPER + T**                | `(64gram-desktop)`                                          | telegram-desktop)\`                          | Launch Telegram client |     |
| **SUPER + M**                | `fdm`                                                       | Launch Free Download Manager                 |                        |     |
| **SUPER + E**                | `kitty --title tmuxifier -e tmuxifier load-session web-dev` | Launch tmuxifier Web Dev session in Kitty    |                        |     |
| **SUPER + W**                | `wasistlos`                                                 | Launch WhatsApp (wasistlos client)           |                        |     |
| **SUPER + Shift + H**        | `$scriptsDir/KeyHints.sh`                                   | Show help / cheat sheet                      |                        |     |
| **SUPER + Shift + R**        | `$scriptsDir/Refresh.sh`                                    | Refresh Waybar, swaync, rofi                 |                        |     |
| **SUPER + Shift + O**        | `$scriptsDir/ChangeBlur.sh`                                 | Toggle blur settings                         |                        |     |
| **SUPER + Shift + G**        | `$UserScripts/MountGdrive.sh`                               | Mount Google Drive locally                   |                        |     |
| **SUPER + Shift + T**        | `$UserScripts/Toggle-tuned.sh`                              | Toggle tuned (power profile)                 |                        |     |
| **SUPER + Shift + D**        | `$UserScripts/SyncDotfiles.sh`                              | Sync dotfiles                                |                        |     |
| **SUPER + Shift + B**        | `$UserScripts/SyncBlog.sh`                                  | Sync blog                                    |                        |     |
| **SUPER + Shift + C**        | `$UserScripts/RcloneSync.sh`                                | Sync Documents to Google Drive               |                        |     |
| **SUPER + Shift + L**        | `$scriptsDir/ChangeLayout.sh`                               | Toggle between Master and Dwindle layouts    |                        |     |
| **SUPER + Shift + P**        | `hyprpicker -a / –autocopy`                                 | Color picker                                 |                        |     |
| **SUPER + Shift + V**        | `systemd-run --user --scope $scriptsDir/parrotOS-KVM.sh`    | Start yazi in foot (VM related)              |                        |     |
| **SUPER + Shift + F**        | `fullscreen`                                                | Toggle fullscreen                            |                        |     |
| **SUPER + Shift + Return**   | `$scriptsDir/Dropterminal.sh $term`                         | Dropdown floating terminal                   |                        |     |
| **SUPER + Ctrl + F**         | `fullscreen, 1`                                             | Fake fullscreen                              |                        |     |
| **SUPER + Space**            | `togglefloating`                                            | Toggle floating mode for window              |                        |     |
| **SUPER + Alt + Space**      | `hyprctl dispatch workspaceopt allfloat`                    | Set all windows to floating                  |                        |     |
| **SUPER + Alt + E**          | `$scriptsDir/RofiEmoji.sh`                                  | Open emoji picker                            |                        |     |
| **SUPER + Alt + Mouse Down** | Adjust `cursor:zoom_factor` ×2                              | Zoom in (magnifier)                          |                        |     |
| **SUPER + Alt + Mouse Up**   | Adjust `cursor:zoom_factor` ÷2                              | Zoom out (magnifier)                         |                        |     |
| **SUPER + Ctrl + Alt + B**   | `pkill -SIGUSR1 waybar`                                     | Toggle show/hide Waybar                      |                        |     |
| **SUPER + Ctrl + B**         | `$scriptsDir/WaybarStyles.sh`                               | Waybar styles menu                           |                        |     |
| **SUPER + Alt + B**          | `$scriptsDir/WaybarLayout.sh`                               | Waybar layout menu                           |                        |     |
| **SUPER + Shift + M**        | `$UserScripts/RofiBeats.sh`                                 | Play online music using Rofi                 |                        |     |
| **SUPER + Shift + W**        | `$UserScripts/WallpaperSelect.sh`                           | Wallpaper selection menu                     |                        |     |
| **SUPER + Shift + W**        | `$UserScripts/WallpaperEffects.sh`                          | Apply wallpaper effects via ImageMagick      |                        |     |
| **Ctrl + Alt + W**           | `$UserScripts/WallpaperRandom.sh`                           | Set random wallpaper                         |                        |     |
| **SUPER + Ctrl + O**         | `hyprctl setprop active opaque toggle`                      | Toggle window opacity                        |                        |     |
| **SUPER + Shift + K**        | `$scriptsDir/KeyBinds.sh`                                   | Search keybinds via Rofi                     |                        |     |
| **SUPER + Shift + A**        | `$scriptsDir/Animations.sh`                                 | Hyprland animations menu                     |                        |     |
| **SUPER + Shift + Z**        | `$UserScripts/ZshChangeTheme.sh`                            | Change Oh-My-Zsh theme                       |                        |     |
| **SUPER + Ctrl + C**         | `$UserScripts/RofiCalc.sh`                                  | Open calculator via Rofi                     |                        |     |

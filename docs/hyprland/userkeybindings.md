# UserKeybinds.conf

User-customizable keybindings configuration file that defines personal keyboard shortcuts and workflow-specific bindings in HyprFlux. This file allows users to add their own keybindings without modifying the base system keybindings.

## Purpose

- **Personal Keybindings**: Define custom keyboard shortcuts for personal workflow
- **Application Shortcuts**: Quick access to frequently used applications
- **System Controls**: Custom shortcuts for system functions and scripts
- **Workflow Optimization**: Keybindings tailored to specific use cases and preferences

## File Location

```
~/.config/hypr/UserConfigs/UserKeybinds.conf
```

## Important Notes

### Conflict Avoidance

```bash
# This is where you put your own keybinds. Be Mindful to check as well ~/.config/hypr/configs/Keybinds.conf to avoid conflict
# if you think I should replace the Pre-defined Keybinds in ~/.config/hypr/configs/Keybinds.conf , submit an issue or let me know in DC and present me a valid reason as to why, such as conflicting with global shortcuts, etc etc
```

**Key Points**:

- Check base keybindings to avoid conflicts
- User keybindings override base keybindings
- Report conflicts if base keybindings need changes

## Configuration Structure

### Variables and Setup

```bash
# Variables
$mainMod = SUPER
$scriptsDir = $HOME/.config/hypr/scripts
$UserScripts = $HOME/.config/hypr/UserScripts
$UserConfigs = $HOME/.config/hypr/UserConfigs

# settings for User defaults apps - set your default terminal and file manager on this file
source= $UserConfigs/01-UserDefaults.conf
```

#### Key Variables

- **$mainMod**: Primary modifier key (SUPER/Windows key)
- **$scriptsDir**: System scripts directory
- **$UserScripts**: User scripts directory
- **$UserConfigs**: User configurations directory

### Application Shortcuts

#### Core Applications

```bash
# Main Menu and Applications
bind = $mainMod, D, exec, pkill rofi || true && rofi -show drun -modi drun,filebrowser,run,window # Main Menu (APP Launcher)
bind = $mainMod, Return, exec, $term  # Terminal
bind = $mainMod, F, exec, $files      # File manager
bind = $mainMod, K, exec, kitty       # Launch Kitty terminal
bind = $mainMod, B, exec, firefox     # Launch Firefox
```

#### Development Tools

```bash
bind = $mainMod, C, exec, code --ozone-platform=x11    # Visual Studio Code
bind = $mainMod, E, exec, kitty --title tmuxifier -e tmuxifier load-session web-dev  # Launch tmuxifier
```

#### Productivity Applications

```bash
bind = $mainMod, R, exec, foliate                      # Launch foliate eBook reader
bind = $mainMod, O, exec, obsidian --ozone-platform=x11  # Obsidian
bind = $mainMod, V, exec, $scriptsDir/ClipManager.sh   # Clipboard Manager
```

#### Communication and Media

```bash
bind = $mainMod, S, exec, spotify-launcher             # Spotify
bind = $mainMod, X, exec, vesktop                      # Vesktop (Discord)
bind = $mainMod, T, exec, (64gram-desktop|telegram-desktop)  # Telegram
bind = $mainMod, W, exec, wasistlos                    # WhatsApp-Linux
bind = $mainMod, M, exec, fdm                          # Free Download Manager
bind = ALT, N, exec, nmgui                             # Network Manager GUI
```

### System Features and Utilities

#### HyprFlux Features

```bash
bind = $mainMod SHIFT, H, exec, $scriptsDir/KeyHints.sh        # Help / cheat sheet
bind = $mainMod SHIFT, R, exec, $scriptsDir/Refresh.sh         # Refresh waybar, swaync, rofi
bind = $mainMod SHIFT, O, exec, $scriptsDir/ChangeBlur.sh      # Toggle blur settings
bind = $mainMod SHIFT, L, exec, $scriptsDir/ChangeLayout.sh    # Toggle Master or Dwindle Layout
```

#### User Scripts Integration

```bash
bind = $mainMod SHIFT, G, exec, $UserScripts/MountGdrive.sh    # Mount Google Drive
bind = $mainMod SHIFT, T, exec, $UserScripts/Toggle-tuned.sh   # Toggle performance tuning
bind = $mainMod SHIFT, D, exec, $UserScripts/SyncDotfiles.sh   # Sync dotfiles
bind = $mainMod SHIFT, B, exec, $UserScripts/SyncBlog.sh       # Sync blog
bind = $mainMod SHIFT, C, exec, $UserScripts/RcloneSync.sh     # Sync to cloud storage
```

#### System Controls

```bash
bind = $mainMod SHIFT, P, exec, hyprpicker -a / –autocopy      # Color picker
bind = $mainMod SHIFT, V, exec, systemd-run --user --scope $scriptsDir/parrotOS-KVM.sh  # VM launcher
bind = $mainMod SHIFT, F, fullscreen                          # Full screen
bind = $mainMod SHIFT, Return, exec, $scriptsDir/Dropterminal.sh $term  # Dropdown terminal
bind = $mainMod CTRL, F, fullscreen, 1                        # Fake full screen
bind = $mainMod, SPACE, togglefloating                        # Float mode
bind = $mainMod ALT, SPACE, exec, hyprctl dispatch workspaceopt allfloat  # All float mode
```

### Advanced Features

#### Desktop Zooming/Magnifier

```bash
bind = $mainMod ALT, mouse_down, exec, hyprctl keyword cursor:zoom_factor "$(hyprctl getoption cursor:zoom_factor | awk 'NR==1 {factor = $2; if (factor < 1) {factor = 1}; print factor * 2.0}')"
bind = $mainMod ALT, mouse_up, exec, hyprctl keyword cursor:zoom_factor "$(hyprctl getoption cursor:zoom_factor | awk 'NR==1 {factor = $2; if (factor < 1) {factor = 1}; print factor / 2.0}')"
```

#### Waybar Controls

```bash
bind = $mainMod CTRL ALT, B, exec, pkill -SIGUSR1 waybar      # Toggle hide/show waybar
bind = $mainMod CTRL, B, exec, $scriptsDir/WaybarStyles.sh    # Waybar Styles Menu
bind = $mainMod ALT, B, exec, $scriptsDir/WaybarLayout.sh     # Waybar Layout Menu
```

#### User Script Features

```bash
bind = $mainMod SHIFT, M, exec, $UserScripts/RofiBeats.sh     # Online music using rofi
bind = $mainMod SHIFT, W, exec, $UserScripts/WallpaperSelect.sh  # Select wallpaper
bind = CTRL ALT, W, exec, $UserScripts/WallpaperRandom.sh     # Random wallpapers
bind = $mainMod SHIFT, K, exec, $scriptsDir/KeyBinds.sh       # Search keybinds via rofi
bind = $mainMod SHIFT, A, exec, $scriptsDir/Animations.sh     # Hyprland animations menu
bind = $mainMod SHIFT, Z, exec, $UserScripts/ZshChangeTheme.sh  # Change oh-my-zsh theme
bind = $mainMod CTRL, C, exec, $UserScripts/RofiCalc.sh       # Calculator (qalculate)
```

#### Window and Workspace Management

```bash
bind = $mainMod CTRL, O, exec, hyprctl setprop active opaque toggle  # Disable opacity on active window
bind = $mainMod ALT, E, exec, $scriptsDir/RofiEmoji.sh        # Emoji menu
```

## Keybinding Categories

### Application Launchers

#### Quick Access Applications

```bash
# Essential applications with single key combinations
bind = $mainMod, Return, exec, $term     # Terminal (most used)
bind = $mainMod, B, exec, firefox        # Browser
bind = $mainMod, F, exec, $files         # File manager
bind = $mainMod, D, exec, rofi -show drun  # Application launcher
```

#### Development Environment

```bash
# Development-focused shortcuts
bind = $mainMod, C, exec, code           # Code editor
bind = $mainMod, E, exec, tmuxifier      # Terminal multiplexer session
bind = $mainMod, G, exec, lazygit        # Git interface
```

#### Communication Suite

```bash
# Communication applications
bind = $mainMod, X, exec, vesktop        # Discord client
bind = $mainMod, T, exec, telegram       # Telegram
bind = $mainMod, W, exec, whatsapp       # WhatsApp
bind = ALT, N, exec, nmgui               # Network manager
```

### System Controls

#### Window Management

```bash
# Window control shortcuts
bind = $mainMod, SPACE, togglefloating   # Toggle floating
bind = $mainMod SHIFT, F, fullscreen     # Full screen
bind = $mainMod CTRL, F, fullscreen, 1   # Fake full screen
bind = $mainMod ALT, SPACE, exec, hyprctl dispatch workspaceopt allfloat
```

#### System Features

```bash
# HyprFlux system features
bind = $mainMod SHIFT, R, exec, $scriptsDir/Refresh.sh        # Refresh system
bind = $mainMod SHIFT, O, exec, $scriptsDir/ChangeBlur.sh     # Toggle blur
bind = $mainMod SHIFT, L, exec, $scriptsDir/ChangeLayout.sh   # Change layout
```

### User Scripts Integration

#### File Management

```bash
# Cloud and file synchronization
bind = $mainMod SHIFT, G, exec, $UserScripts/MountGdrive.sh   # Mount Google Drive
bind = $mainMod SHIFT, C, exec, $UserScripts/RcloneSync.sh    # Cloud sync
bind = $mainMod SHIFT, D, exec, $UserScripts/SyncDotfiles.sh  # Dotfiles sync
```

#### Customization Tools

```bash
# Appearance and customization
bind = $mainMod SHIFT, W, exec, $UserScripts/WallpaperSelect.sh  # Wallpaper selector
bind = $mainMod SHIFT, A, exec, $scriptsDir/Animations.sh        # Animation selector
bind = $mainMod SHIFT, Z, exec, $UserScripts/ZshChangeTheme.sh   # Shell theme
```

#### Utilities

```bash
# Utility applications
bind = $mainMod SHIFT, M, exec, $UserScripts/RofiBeats.sh     # Music player
bind = $mainMod CTRL, C, exec, $UserScripts/RofiCalc.sh       # Calculator
bind = $mainMod ALT, E, exec, $scriptsDir/RofiEmoji.sh        # Emoji picker
```

## Customization Examples

### Development Workflow

```bash
# Development-focused keybindings
bind = $mainMod, I, exec, code                    # IDE
bind = $mainMod, U, exec, kitty lazygit           # Git interface
bind = $mainMod, Y, exec, kitty htop              # System monitor
bind = $mainMod SHIFT, I, exec, firefox --new-window "localhost:3000"  # Local dev server
```

### Media and Content Creation

```bash
# Media workflow keybindings
bind = $mainMod, P, exec, spotify                 # Music player
bind = $mainMod SHIFT, P, exec, obs               # Screen recording
bind = $mainMod, L, exec, libreoffice             # Office suite
bind = $mainMod SHIFT, L, exec, gimp              # Image editor
```

### Gaming Setup

```bash
# Gaming-focused shortcuts
bind = $mainMod, G, exec, steam                   # Steam launcher
bind = $mainMod SHIFT, G, exec, lutris            # Game manager
bind = $mainMod CTRL, G, exec, $scriptsDir/GameMode.sh  # Toggle game mode
bind = $mainMod ALT, G, exec, discord             # Gaming communication
```

### System Administration

```bash
# System admin shortcuts
bind = $mainMod, A, exec, kitty htop              # System monitor
bind = $mainMod SHIFT, A, exec, gnome-system-monitor  # GUI system monitor
bind = $mainMod CTRL, A, exec, kitty sudo -i      # Root terminal
bind = $mainMod ALT, A, exec, $scriptsDir/Distro_update.sh  # System update
```

## Advanced Keybinding Techniques

### Conditional Keybindings

```bash
# Different actions based on context
bind = $mainMod, E, exec, [[ -n "$TMUX" ]] && tmux new-window || $term
```

### Application-Specific Shortcuts

```bash
# Shortcuts that work only in specific applications
bind = $mainMod, N, exec, [[ "$(hyprctl activewindow | grep class | awk '{print $2}')" == "firefox" ]] && firefox --new-tab || firefox
```

### Multi-Step Actions

```bash
# Complex actions with multiple steps
bind = $mainMod SHIFT, S, exec, $scriptsDir/ScreenShot.sh --area && notify-send "Screenshot taken"
```

### Workspace-Aware Shortcuts

```bash
# Different actions based on current workspace
bind = $mainMod, Q, exec, [[ "$(hyprctl activeworkspace | grep ID | awk '{print $3}')" == "1" ]] && firefox || $term
```

## Integration with Base Keybindings

### Complementary Shortcuts

The user keybindings complement the base keybindings in `configs/Keybinds.conf`:

#### Base Keybindings (System)

- Window management (SUPER + arrows)
- Workspace switching (SUPER + numbers)
- Basic system controls (CTRL + ALT + combinations)

#### User Keybindings (Applications)

- Application launchers (SUPER + letters)
- User scripts (SUPER + SHIFT + letters)
- Custom workflows (SUPER + CTRL + letters)

### Avoiding Conflicts

#### Check Existing Bindings

```bash
# List all current keybindings
hyprctl binds

# Search for specific key combinations
hyprctl binds | grep "SUPER B"
```

#### Safe Key Combinations

```bash
# Generally safe patterns for user keybindings
bind = $mainMod, [letter], exec, application           # Single letter
bind = $mainMod SHIFT, [letter], exec, script          # With SHIFT
bind = $mainMod CTRL, [letter], exec, advanced_action  # With CTRL
bind = $mainMod ALT, [letter], exec, alternative       # With ALT
```

## Troubleshooting

### Common Issues

#### Keybinding Not Working

```bash
# Check if keybinding is registered
hyprctl binds | grep "your_key_combination"

# Test the command manually
your_command

# Check for conflicts
hyprctl binds | grep -E "(SUPER|$mainMod)" | grep "your_key"
```

#### Application Not Launching

```bash
# Check if application exists
which your_application

# Test with full path
/usr/bin/your_application

# Check application permissions
ls -la /usr/bin/your_application
```

#### Script Not Executing

```bash
# Check script permissions
ls -la ~/.config/hypr/UserScripts/your_script.sh

# Make script executable
chmod +x ~/.config/hypr/UserScripts/your_script.sh

# Test script manually
~/.config/hypr/UserScripts/your_script.sh
```

### Debug Commands

```bash
# Reload keybindings
hyprctl reload

# List all keybindings
hyprctl binds

# Test specific keybinding
hyprctl dispatch exec "your_command"

# Monitor keybinding events
hyprctl --batch "keyword bind SUPER,testkey,exec,notify-send test"
```

### Validation

#### Test New Keybindings

```bash
# Add temporary keybinding for testing
hyprctl keyword bind "SUPER,testkey,exec,notify-send 'Test successful'"

# Test the keybinding
# Press SUPER + testkey

# Remove test keybinding
hyprctl keyword unbind "SUPER,testkey"
```

## Best Practices

### Organization

#### Group Related Keybindings

```bash
# Development tools
bind = $mainMod, C, exec, code
bind = $mainMod, G, exec, lazygit
bind = $mainMod, T, exec, kitty

# Communication apps
bind = $mainMod, D, exec, discord
bind = $mainMod, S, exec, slack
bind = $mainMod, Z, exec, zoom
```

#### Use Consistent Patterns

```bash
# Application shortcuts: SUPER + letter
bind = $mainMod, B, exec, browser
bind = $mainMod, F, exec, files

# Scripts: SUPER + SHIFT + letter
bind = $mainMod SHIFT, W, exec, wallpaper_script
bind = $mainMod SHIFT, T, exec, theme_script

# System controls: SUPER + CTRL + letter
bind = $mainMod CTRL, R, exec, reload_config
bind = $mainMod CTRL, L, exec, lock_screen
```

### Documentation

#### Comment Your Keybindings

```bash
# Web development workflow
bind = $mainMod, B, exec, firefox              # Browser for testing
bind = $mainMod, C, exec, code                 # Code editor
bind = $mainMod, T, exec, kitty                # Terminal for commands
bind = $mainMod, D, exec, firefox --new-window "localhost:3000"  # Dev server
```

#### Create Keybinding Reference

```bash
# Create a reference file
echo "# My Custom Keybindings" > ~/.config/hypr/my-keybindings.md
echo "- SUPER + B: Firefox" >> ~/.config/hypr/my-keybindings.md
echo "- SUPER + C: VS Code" >> ~/.config/hypr/my-keybindings.md
```

This user keybindings configuration provides a flexible framework for creating personalized keyboard shortcuts that enhance productivity and workflow efficiency while maintaining compatibility with the base HyprFlux system.

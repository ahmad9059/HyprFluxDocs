# Keybinds.conf

Default system keybindings configuration file that provides the fundamental keyboard shortcuts for window management, workspace navigation, system controls, and essential functions in HyprFlux. This file contains the base keybindings that all users inherit.

## Purpose

- **System Keybindings**: Provides essential keyboard shortcuts for core functionality
- **Window Management**: Controls window focus, movement, resizing, and layout
- **Workspace Navigation**: Manages workspace switching and window assignment
- **System Controls**: Handles media keys, screenshots, and system functions
- **Base Foundation**: Serves as the foundation that user keybindings build upon

## File Location

```
~/.config/hypr/configs/Keybinds.conf
```

## Important Notes

### Base vs User Keybindings

- This file provides **system defaults** that should not be modified by users
- User customizations should go in `UserConfigs/UserKeybinds.conf`
- User keybindings override base keybindings when conflicts occur

## Configuration Structure

### Variables and Setup

```bash
# Variables
$mainMod = SUPER
$scriptsDir = $HOME/.config/hypr/scripts
$UserConfigs = $HOME/.config/hypr/UserConfigs
$UserScripts = $HOME/.config/hypr/UserScripts
```

#### Key Variables

- **$mainMod**: Primary modifier key (SUPER/Windows key)
- **$scriptsDir**: System scripts directory path
- **$UserConfigs**: User configurations directory path
- **$UserScripts**: User scripts directory path

### System Control Keybindings

#### Core System Functions

```bash
bind = CTRL ALT, Delete, exec, hyprctl dispatch exit 0 # exit Hyprland
bind = $mainMod, Q, killactive, # close active (not kill)
bind = $mainMod SHIFT, Q, exec, $scriptsDir/KillActiveProcess.sh # Kill active process
bind = CTRL ALT, L, exec, $scriptsDir/LockScreen.sh # screen lock
bind = CTRL ALT, P, exec, $scriptsDir/Wlogout.sh # power menu
bind = $mainMod, N, exec, swaync-client -t -sw # swayNC notification panel
bind = $mainMod SHIFT, E, exec, $scriptsDir/Kool_Quick_Settings.sh # Settings Menu
```

**System Functions**:

- **CTRL+ALT+Delete**: Exit Hyprland
- **SUPER+Q**: Close active window
- **SUPER+SHIFT+Q**: Force kill active process
- **CTRL+ALT+L**: Lock screen
- **CTRL+ALT+P**: Power menu
- **SUPER+N**: Toggle notification panel
- **SUPER+SHIFT+E**: Quick settings menu

### Layout Management

#### Master Layout Controls

```bash
# Master Layout
bind = $mainMod CTRL, D, layoutmsg, removemaster
bind = $mainMod, I, layoutmsg, addmaster
bind = $mainMod, J, layoutmsg, cyclenext
bind = $mainMod, K, layoutmsg, cycleprev
bind = $mainMod CTRL, Return, layoutmsg, swapwithmaster
```

**Master Layout Functions**:

- **SUPER+CTRL+D**: Remove master window
- **SUPER+I**: Add master window
- **SUPER+J**: Cycle to next window
- **SUPER+K**: Cycle to previous window
- **SUPER+CTRL+Enter**: Swap with master

#### Dwindle Layout Controls

```bash
# Dwindle Layout
bind = $mainMod SHIFT, I, togglesplit # only works on dwindle layout
bind = $mainMod, P, pseudo, # dwindle
```

**Dwindle Layout Functions**:

- **SUPER+SHIFT+I**: Toggle split direction
- **SUPER+P**: Toggle pseudo-tiling

#### General Layout Functions

```bash
# Works on either layout (Master or Dwindle)
# bind = $mainMod, M, exec, hyprctl dispatch splitratio 0.3

# group
# bind = $mainMod, G, togglegroup # toggle group
# bind = $mainMod CTRL, tab, changegroupactive  # change focus to another window

# Cycle windows if floating bring to top
bind = $mainMod, J, cyclenext
# bind = ALT, tab, bringactivetotop
```

### Hardware Controls

#### Audio Controls

```bash
# Special Keys / Hot Keys
bindel = , xf86audioraisevolume, exec, $scriptsDir/Volume.sh --inc # volume up
bindel = , xf86audiolowervolume, exec, $scriptsDir/Volume.sh --dec # volume down
bindl = , xf86AudioMicMute, exec, $scriptsDir/Volume.sh --toggle-mic # mic mute
bindl = , xf86audiomute, exec, $scriptsDir/Volume.sh --toggle # mute
```

#### System Hardware Keys

```bash
bindl = , xf86Sleep, exec, systemctl suspend  # sleep button
bindl = , xf86Rfkill, exec, $scriptsDir/AirplaneMode.sh # Airplane mode
```

#### Media Controls

```bash
# media controls using keyboards
bindl = , xf86AudioPlayPause, exec, $scriptsDir/MediaCtrl.sh --pause
bindl = , xf86AudioPause, exec, $scriptsDir/MediaCtrl.sh --pause
bindl = , xf86AudioPlay, exec, $scriptsDir/MediaCtrl.sh --pause
bindl = , xf86AudioNext, exec, $scriptsDir/MediaCtrl.sh --nxt
bindl = , xf86AudioPrev, exec, $scriptsDir/MediaCtrl.sh --prv
bindl = , xf86audiostop, exec, $scriptsDir/MediaCtrl.sh --stop
```

### Screenshot Functions

```bash
# Screenshot keybindings NOTE: You may need to press Fn key as well
bind = $mainMod, Print, exec, $scriptsDir/ScreenShot.sh --now  # screenshot
bind = $mainMod SHIFT, Print, exec, $scriptsDir/ScreenShot.sh --area # screenshot (area)
bind = $mainMod CTRL, Print, exec, $scriptsDir/ScreenShot.sh --in5 # screenshot  (5 secs delay)
bind = $mainMod CTRL SHIFT, Print, exec, $scriptsDir/ScreenShot.sh --in10 # screenshot (10 secs delay)
bind = ALT, Print, exec, $scriptsDir/ScreenShot.sh --active # screenshot (active window only)

# screenshot with swappy (another screenshot tool)
bind = $mainMod SHIFT, S, exec, $scriptsDir/ScreenShot.sh --swappy #screenshot (swappy)
```

**Screenshot Functions**:

- **SUPER+Print**: Immediate screenshot
- **SUPER+SHIFT+Print**: Area selection screenshot
- **SUPER+CTRL+Print**: 5-second delay screenshot
- **SUPER+CTRL+SHIFT+Print**: 10-second delay screenshot
- **ALT+Print**: Active window screenshot
- **SUPER+SHIFT+S**: Screenshot with Swappy editor

### Window Management

#### Window Resizing

```bash
# Resize windows
binde = $mainMod SHIFT, left, resizeactive,-50 0
binde = $mainMod SHIFT, right, resizeactive,50 0
binde = $mainMod SHIFT, up, resizeactive,0 -50
binde = $mainMod SHIFT, down, resizeactive,0 50
```

#### Window Movement

```bash
# Move windows
bind = $mainMod CTRL, left, movewindow, l
bind = $mainMod CTRL, right, movewindow, r
bind = $mainMod CTRL, up, movewindow, u
bind = $mainMod CTRL, down, movewindow, d
```

#### Window Swapping

```bash
# Swap windows
bind = $mainMod ALT, left, swapwindow, l
bind = $mainMod ALT, right, swapwindow, r
bind = $mainMod ALT, up, swapwindow, u
bind = $mainMod ALT, down, swapwindow, d
```

#### Focus Management

```bash
# Move focus with mainMod + arrow keys
bind = $mainMod, left, movefocus, l
bind = $mainMod, right, movefocus, r
bind = $mainMod, up, movefocus, u
bind = $mainMod, down, movefocus, d
```

### Workspace Management

#### Workspace Navigation

```bash
# Workspaces related
bind = $mainMod, tab, workspace, m+1
bind = $mainMod SHIFT, tab, workspace, m-1
```

#### Special Workspaces

```bash
# Special workspace
bind = $mainMod, U, togglespecialworkspace, nyx
bind = $mainMod SHIFT, U, movetoworkspace, special:nyx
```

#### Numbered Workspaces

```bash
# The following mappings use the key codes to better support various keyboard layouts
# 1 is code:10, 2 is code 11, etc
# Switch workspaces with mainMod + [0-9]
bind = $mainMod, code:10, workspace, 1 # NOTE: code:10 = key 1
bind = $mainMod, code:11, workspace, 2 # NOTE: code:11 = key 2
bind = $mainMod, code:12, workspace, 3 # NOTE: code:12 = key 3
bind = $mainMod, code:13, workspace, 4 # NOTE: code:13 = key 4
bind = $mainMod, code:14, workspace, 5 # NOTE: code:14 = key 5
bind = $mainMod, code:15, workspace, 6 # NOTE: code:15 = key 6
bind = $mainMod, code:16, workspace, 7 # NOTE: code:16 = key 7
bind = $mainMod, code:17, workspace, 8 # NOTE: code:17 = key 8
bind = $mainMod, code:18, workspace, 9 # NOTE: code:18 = key 9
bind = $mainMod, code:19, workspace, 10 # NOTE: code:19 = key 0
```

#### Move Windows to Workspaces

```bash
# Move active window and follow to workspace mainMod + SHIFT [0-9]
bind = $mainMod SHIFT, code:10, movetoworkspace, 1 # NOTE: code:10 = key 1
bind = $mainMod SHIFT, code:11, movetoworkspace, 2 # NOTE: code:11 = key 2
bind = $mainMod SHIFT, code:12, movetoworkspace, 3 # NOTE: code:12 = key 3
bind = $mainMod SHIFT, code:13, movetoworkspace, 4 # NOTE: code:13 = key 4
bind = $mainMod SHIFT, code:14, movetoworkspace, 5 # NOTE: code:14 = key 5
bind = $mainMod SHIFT, code:15, movetoworkspace, 6 # NOTE: code:15 = key 6
bind = $mainMod SHIFT, code:16, movetoworkspace, 7 # NOTE: code:16 = key 7
bind = $mainMod SHIFT, code:17, movetoworkspace, 8 # NOTE: code:17 = key 8
bind = $mainMod SHIFT, code:18, movetoworkspace, 9 # NOTE: code:18 = key 9
bind = $mainMod SHIFT, code:19, movetoworkspace, 10 # NOTE: code:19 = key 0
bind = $mainMod SHIFT, bracketleft, movetoworkspace, -1 # brackets [
bind = $mainMod SHIFT, bracketright, movetoworkspace, +1 # brackets ]
```

#### Silent Window Movement

```bash
# Move active window to a workspace silently mainMod + CTRL [0-9]
bind = $mainMod CTRL, code:10, movetoworkspacesilent, 1 # NOTE: code:10 = key 1
bind = $mainMod CTRL, code:11, movetoworkspacesilent, 2 # NOTE: code:11 = key 2
bind = $mainMod CTRL, code:12, movetoworkspacesilent, 3 # NOTE: code:12 = key 3
bind = $mainMod CTRL, code:13, movetoworkspacesilent, 4 # NOTE: code:13 = key 4
bind = $mainMod CTRL, code:14, movetoworkspacesilent, 5 # NOTE: code:14 = key 5
bind = $mainMod CTRL, code:15, movetoworkspacesilent, 6 # NOTE: code:15 = key 6
bind = $mainMod CTRL, code:16, movetoworkspacesilent, 7 # NOTE: code:16 = key 7
bind = $mainMod CTRL, code:17, movetoworkspacesilent, 8 # NOTE: code:17 = key 8
bind = $mainMod CTRL, code:18, movetoworkspacesilent, 9 # NOTE: code:18 = key 9
bind = $mainMod CTRL, code:19, movetoworkspacesilent, 10 # NOTE: code:19 = key 0
bind = $mainMod CTRL, bracketleft, movetoworkspacesilent, -1 # brackets [
bind = $mainMod CTRL, bracketright, movetoworkspacesilent, +1 # brackets ]
```

### Mouse Integration

#### Workspace Scrolling

```bash
# Scroll through existing workspaces with mainMod + scroll
bind = $mainMod, mouse_down, workspace, e+1
bind = $mainMod, mouse_up, workspace, e-1
bind = $mainMod, period, workspace, e+1
bind = $mainMod, comma, workspace, e-1
```

#### Window Manipulation

```bash
# Move/resize windows with mainMod + LMB/RMB and dragging
bindm = $mainMod, mouse:272, movewindow # NOTE: mouse:272 = left click
bindm = $mainMod, mouse:273, resizewindow # NOTE: mouse:272 = right click
```

## Keybinding Categories

### System Management

- **CTRL+ALT combinations**: System-level functions (exit, lock, power)
- **Function keys**: Hardware controls (volume, media, sleep)
- **Print key combinations**: Screenshot functions

### Window Management

- **SUPER + arrows**: Focus movement
- **SUPER + SHIFT + arrows**: Window resizing
- **SUPER + CTRL + arrows**: Window movement
- **SUPER + ALT + arrows**: Window swapping

### Workspace Management

- **SUPER + numbers**: Workspace switching
- **SUPER + SHIFT + numbers**: Move window to workspace
- **SUPER + CTRL + numbers**: Move window silently
- **SUPER + Tab**: Workspace cycling

### Layout Controls

- **SUPER + letters**: Layout-specific functions
- **SUPER + SHIFT + letters**: Advanced layout functions
- **SUPER + CTRL + letters**: Layout management

## Keybinding Types

### Bind Types Explained

#### `bind`

```bash
bind = $mainMod, Q, killactive
```

- Standard keybinding that triggers once per key press

#### `binde`

```bash
binde = $mainMod SHIFT, left, resizeactive,-50 0
```

- Repeating keybinding that continues while key is held

#### `bindl`

```bash
bindl = , xf86audiomute, exec, $scriptsDir/Volume.sh --toggle
```

- Locked keybinding that works even when input is inhibited

#### `bindel`

```bash
bindel = , xf86audioraisevolume, exec, $scriptsDir/Volume.sh --inc
```

- Locked and repeating keybinding

#### `bindm`

```bash
bindm = $mainMod, mouse:272, movewindow
```

- Mouse binding for drag operations

## Key Code System

### Why Key Codes?

```bash
# The following mappings use the key codes to better support various keyboard layouts
# 1 is code:10, 2 is code 11, etc
```

**Benefits**:

- Works across different keyboard layouts
- Consistent behavior regardless of language settings
- More reliable than character-based bindings

### Key Code Mapping

```bash
code:10 = 1    code:15 = 6
code:11 = 2    code:16 = 7
code:12 = 3    code:17 = 8
code:13 = 4    code:18 = 9
code:14 = 5    code:19 = 0
```

## Integration with User Keybindings

### Hierarchy

1. **Base Keybindings** (this file): System defaults
2. **User Keybindings**: Personal customizations
3. **Conflict Resolution**: User keybindings override base keybindings

### Safe Customization Areas

Users should avoid conflicting with these essential bindings:

- **CTRL+ALT combinations**: System functions
- **Function keys**: Hardware controls
- **SUPER + arrows**: Window management
- **SUPER + numbers**: Workspace management

### Recommended User Patterns

- **SUPER + letters**: Application launchers
- **SUPER + SHIFT + letters**: User scripts
- **SUPER + ALT + letters**: Alternative functions

## Troubleshooting

### Common Issues

#### Keybinding Not Working

```bash
# Check if keybinding is registered
hyprctl binds | grep "your_key"

# Check for conflicts
hyprctl binds | grep -E "(SUPER|$mainMod)" | sort
```

#### Hardware Keys Not Responding

```bash
# Test hardware key detection
wev  # Wayland event viewer

# Check if script exists and is executable
ls -la ~/.config/hypr/scripts/Volume.sh
chmod +x ~/.config/hypr/scripts/Volume.sh
```

#### Layout-Specific Issues

```bash
# Check current layout
hyprctl getoption general:layout

# Test layout-specific commands
hyprctl dispatch layoutmsg cyclenext
```

### Debug Commands

```bash
# List all keybindings
hyprctl binds

# Test specific keybinding
hyprctl dispatch killactive

# Check active window
hyprctl activewindow

# Monitor keybinding events
hyprctl --batch "keyword bind SUPER,testkey,exec,notify-send test"
```

### Validation

#### Test Essential Functions

```bash
# Test window management
# SUPER + Q (close window)
# SUPER + arrows (focus movement)
# SUPER + numbers (workspace switching)

# Test system functions
# CTRL + ALT + L (lock screen)
# Volume keys
# Screenshot keys
```

## Best Practices

### For System Administrators

#### Maintain Compatibility

- Keep essential keybindings stable
- Document any changes to base keybindings
- Test across different keyboard layouts

#### Performance Considerations

- Use efficient scripts for keybinding actions
- Avoid resource-intensive commands in frequently used bindings
- Test keybinding responsiveness

### For Users

#### Avoid Conflicts

- Check base keybindings before adding custom ones
- Use recommended patterns for user keybindings
- Test new keybindings thoroughly

#### Documentation

- Document custom keybindings
- Create reference sheets for complex workflows
- Share useful keybinding patterns with the community

This base keybindings configuration provides a solid foundation for window management and system control while allowing users to build upon it with their own customizations in the UserKeybinds.conf file.

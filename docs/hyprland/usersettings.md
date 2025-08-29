# UserSettings.conf

Main Hyprland settings configuration file that defines core window management behavior, input handling, gestures, and system-wide preferences in HyprFlux. This is where users customize the fundamental behavior of their Hyprland desktop environment.

## Purpose

- **Core Hyprland Settings**: Defines fundamental window manager behavior
- **Input Configuration**: Configures keyboard, mouse, and touchpad settings
- **Layout Management**: Sets up window layout algorithms and behavior
- **System Integration**: Configures rendering, cursor, and performance settings

## File Location

```
~/.config/hypr/UserConfigs/UserSettings.conf
```

## Configuration Structure

### Layout Configuration

#### Dwindle Layout

```bash
dwindle {
  pseudotile = true
  preserve_split = true
  #smart_split = true
  special_scale_factor = 1
}
```

**Dwindle Properties**:

- **pseudotile**: Enables pseudo-tiling for better window arrangement
- **preserve_split**: Maintains split ratios when windows are moved
- **smart_split**: Automatically chooses split direction (commented out)
- **special_scale_factor**: Scaling factor for special workspaces

#### Master Layout

```bash
master {
  new_status = master
  new_on_top = 1
  mfact = 0.5
}
```

**Master Properties**:

- **new_status**: New windows become master by default
- **new_on_top**: New windows appear on top
- **mfact**: Master area factor (0.5 = 50% of screen)

### General Settings

```bash
general {
  resize_on_border = true
  layout = dwindle
}
```

**General Properties**:

- **resize_on_border**: Allow window resizing by dragging borders
- **layout**: Default layout algorithm (dwindle or master)

### Input Configuration

#### Keyboard Settings

```bash
input {
  kb_layout = us
  kb_variant =
  kb_model =
  kb_options =
  kb_rules =
  repeat_rate = 50
  repeat_delay = 300
  numlock_by_default = true
  left_handed = false
}
```

**Keyboard Properties**:

- **kb_layout**: Keyboard layout (us, de, fr, etc.)
- **kb_variant**: Layout variant (dvorak, colemak, etc.)
- **kb_model**: Keyboard model
- **kb_options**: Additional keyboard options
- **kb_rules**: XKB rules
- **repeat_rate**: Key repeat rate (keys per second)
- **repeat_delay**: Delay before key repeat starts (ms)
- **numlock_by_default**: Enable numlock on startup
- **left_handed**: Left-handed mouse configuration

#### Mouse Settings

```bash
input {
  sensitivity = 0 # mouse sensitivity
  #accel_profile =     # flat or adaptive or blank or EMPTY means libinput's default mode
  follow_mouse = 1
  float_switch_override_focus = false
}
```

**Mouse Properties**:

- **sensitivity**: Mouse sensitivity (-1.0 to 1.0, 0 = no change)
- **accel_profile**: Mouse acceleration profile (flat, adaptive, or default)
- **follow_mouse**: Focus follows mouse behavior
- **float_switch_override_focus**: Override focus when switching to floating windows

#### Touchpad Configuration

```bash
input {
  touchpad {
    disable_while_typing = true
    natural_scroll = true
    clickfinger_behavior = false
    middle_button_emulation = false
    tap-to-click = true
    drag_lock = false
  }
}
```

**Touchpad Properties**:

- **disable_while_typing**: Disable touchpad while typing
- **natural_scroll**: Reverse scroll direction (macOS-style)
- **clickfinger_behavior**: Multi-finger click behavior
- **middle_button_emulation**: Emulate middle click with two-finger tap
- **tap-to-click**: Enable tap-to-click
- **drag_lock**: Enable drag lock functionality

#### Touch Device Support

```bash
input {
  # below for devices with touchdevice ie. touchscreen
  touchdevice {
    enabled = true
  }

  # below is for tablet see link above for proper variables
  tablet {
    transform = 0
    left_handed = 0
  }
}
```

### Gesture Configuration

```bash
gestures {
  workspace_swipe = true
  workspace_swipe_fingers = 3
  workspace_swipe_distance = 500
  workspace_swipe_invert = true
  workspace_swipe_min_speed_to_force = 30
  workspace_swipe_cancel_ratio = 0.5
  workspace_swipe_create_new = true
  workspace_swipe_forever = true
  #workspace_swipe_use_r = true #uncomment if wanted a forever create a new workspace with swipe right
}
```

**Gesture Properties**:

- **workspace_swipe**: Enable workspace swiping
- **workspace_swipe_fingers**: Number of fingers for swipe (3 recommended)
- **workspace_swipe_distance**: Distance threshold for swipe
- **workspace_swipe_invert**: Invert swipe direction
- **workspace_swipe_min_speed_to_force**: Minimum speed to force workspace change
- **workspace_swipe_cancel_ratio**: Ratio to cancel swipe
- **workspace_swipe_create_new**: Create new workspace when swiping past last
- **workspace_swipe_forever**: Allow infinite workspace creation

### Miscellaneous Settings

```bash
misc {
  disable_hyprland_logo = true
  disable_splash_rendering = true
  vfr = true
  vrr = 2
  mouse_move_enables_dpms = true
  enable_swallow = off
  swallow_regex = ^(kitty)$
  focus_on_activate = false
  initial_workspace_tracking = 0
  middle_click_paste = false
  enable_anr_dialog = true    # Application not Responding (ANR)
  anr_missed_pings = 15       # ANR Threshold default 1 is too low
}
```

**Miscellaneous Properties**:

- **disable_hyprland_logo**: Hide Hyprland logo on startup
- **disable_splash_rendering**: Disable splash screen
- **vfr**: Variable Frame Rate (saves power)
- **vrr**: Variable Refresh Rate (0=off, 1=on, 2=fullscreen only)
- **mouse_move_enables_dpms**: Mouse movement wakes up displays
- **enable_swallow**: Window swallowing feature
- **swallow_regex**: Regex for applications that should be swallowed
- **focus_on_activate**: Focus windows when they request activation
- **initial_workspace_tracking**: Track initial workspace
- **middle_click_paste**: Enable middle-click paste
- **enable_anr_dialog**: Show dialog for unresponsive applications
- **anr_missed_pings**: Threshold for ANR detection

### Keybinding Behavior

```bash
binds {
  workspace_back_and_forth = true
  allow_workspace_cycles = true
  pass_mouse_when_bound = false
}
```

**Binding Properties**:

- **workspace_back_and_forth**: Allow switching between current and previous workspace
- **allow_workspace_cycles**: Allow cycling through workspaces
- **pass_mouse_when_bound**: Pass mouse events to applications when bound

### XWayland Configuration

```bash
xwayland {
  enabled = true
  force_zero_scaling = true
}
```

**XWayland Properties**:

- **enabled**: Enable XWayland support for X11 applications
- **force_zero_scaling**: Force zero scaling for better compatibility

### Rendering Settings

```bash
render {
  direct_scanout = 0
}
```

**Rendering Properties**:

- **direct_scanout**: Direct scanout optimization (0=disabled, 1=enabled)

### Cursor Configuration

```bash
cursor {
  sync_gsettings_theme = true
  no_hardware_cursors = 2 # change to 1 if want to disable
  enable_hyprcursor = true
  warp_on_change_workspace = 2
  no_warps = true
}
```

**Cursor Properties**:

- **sync_gsettings_theme**: Sync cursor theme with GTK settings
- **no_hardware_cursors**: Disable hardware cursors (0=enabled, 1=disabled, 2=auto)
- **enable_hyprcursor**: Enable Hyprland's cursor system
- **warp_on_change_workspace**: Warp cursor when changing workspaces
- **no_warps**: Disable cursor warping

## Customization Examples

### Gaming Setup

```bash
# Gaming-optimized settings
general {
  layout = master  # Better for full-screen games
}

misc {
  vfr = false      # Disable VFR for consistent frame rates
  vrr = 1          # Enable VRR for gaming monitors
}

input {
  sensitivity = 0.5  # Higher sensitivity for gaming
  accel_profile = flat  # Flat acceleration for precision
}
```

### Productivity Setup

```bash
# Productivity-focused settings
dwindle {
  preserve_split = true
  smart_split = true
}

gestures {
  workspace_swipe = true
  workspace_swipe_fingers = 4  # 4-finger swipe for precision
}

misc {
  focus_on_activate = true  # Focus windows that request attention
}
```

### Laptop Setup

```bash
# Laptop-optimized settings
input {
  touchpad {
    natural_scroll = true
    tap-to-click = true
    disable_while_typing = true
  }
}

misc {
  vfr = true  # Save battery with variable frame rate
}

gestures {
  workspace_swipe = true
  workspace_swipe_fingers = 3
  workspace_swipe_create_new = true
}
```

### Accessibility Setup

```bash
# Accessibility-focused settings
input {
  repeat_delay = 500  # Longer delay for key repeat
  repeat_rate = 25    # Slower repeat rate

  touchpad {
    tap-to-click = false  # Disable tap-to-click for precision
    clickfinger_behavior = true  # Use click finger behavior
  }
}

misc {
  enable_anr_dialog = true
  anr_missed_pings = 5  # More sensitive ANR detection
}
```

## Advanced Configuration

### Multi-Monitor Optimization

```bash
# Multi-monitor specific settings
misc {
  mouse_move_enables_dpms = true  # Wake all monitors on mouse move
}

cursor {
  warp_on_change_workspace = 1  # Warp cursor to active monitor
}
```

### Performance Optimization

```bash
# Performance-focused settings
misc {
  vfr = true           # Variable frame rate
  disable_hyprland_logo = true
  disable_splash_rendering = true
}

render {
  direct_scanout = 1   # Enable direct scanout for better performance
}
```

### Development Environment

```bash
# Development-optimized settings
misc {
  enable_swallow = on
  swallow_regex = ^(kitty|alacritty)$  # Swallow terminal windows
}

input {
  repeat_rate = 60     # Fast key repeat for coding
  repeat_delay = 200   # Short delay for responsiveness
}
```

## Layout-Specific Configuration

### Dwindle Layout Optimization

```bash
dwindle {
  pseudotile = true              # Better handling of non-tiling windows
  preserve_split = true          # Maintain split ratios
  smart_split = true             # Automatic split direction
  special_scale_factor = 0.8     # Smaller special workspaces
}
```

### Master Layout Optimization

```bash
master {
  new_status = slave    # New windows become slaves
  new_on_top = 0        # New windows at bottom of stack
  mfact = 0.6           # 60% for master area
  orientation = left    # Master on left side
  inherit_fullscreen = true  # Inherit fullscreen state
}
```

## Input Device Specific Configuration

### Gaming Mouse

```bash
input {
  sensitivity = 0
  accel_profile = flat
  follow_mouse = 2  # Focus follows mouse with delay
}
```

### Precision Touchpad

```bash
input {
  touchpad {
    natural_scroll = true
    tap-to-click = true
    drag_lock = true
    scroll_factor = 0.5  # Slower scrolling for precision
  }
}
```

### External Keyboard

```bash
input {
  kb_layout = us
  kb_options = caps:escape  # Caps lock as escape
  repeat_rate = 50
  repeat_delay = 300
  numlock_by_default = true
}
```

## Troubleshooting

### Common Issues

#### Touchpad Not Working

```bash
# Check touchpad settings
input {
  touchpad {
    enabled = true
    disable_while_typing = false  # Temporarily disable
  }
}
```

#### Window Management Issues

```bash
# Reset to default layout
general {
  layout = dwindle
}

# Check dwindle settings
dwindle {
  pseudotile = false  # Disable if causing issues
}
```

#### Performance Issues

```bash
# Optimize for performance
misc {
  vfr = true
  vrr = 0  # Disable VRR if causing issues
}

render {
  direct_scanout = 0  # Disable if causing problems
}
```

### Debug Commands

```bash
# Check current settings
hyprctl getoption general:layout
hyprctl getoption input:sensitivity
hyprctl getoption misc:vfr

# Test input devices
hyprctl devices

# Monitor performance
hyprctl monitors
```

### Validation

#### Test Input Settings

```bash
# Test mouse sensitivity
# Move mouse and observe cursor movement

# Test touchpad
# Try various touchpad gestures

# Test keyboard
# Check key repeat behavior
```

#### Verify Layout Behavior

```bash
# Test window tiling
# Open multiple windows and observe layout

# Test workspace switching
# Switch between workspaces and check behavior
```

## Best Practices

### Configuration Management

#### Backup Settings

```bash
cp ~/.config/hypr/UserConfigs/UserSettings.conf ~/.config/hypr/UserConfigs/UserSettings.conf.backup
```

#### Incremental Changes

```bash
# Make one change at a time
# Test each change before making more
# Document what each change does
```

### Performance Optimization

#### Monitor Resource Usage

```bash
# Check CPU usage
htop

# Monitor GPU usage (if applicable)
nvidia-smi  # For NVIDIA
radeontop   # For AMD
```

#### Optimize Based on Hardware

```bash
# Low-end hardware
misc {
  vfr = true
  vrr = 0
}

# High-end hardware
misc {
  vfr = false
  vrr = 1
}
```

### User Experience

#### Consistent Behavior

- Keep settings consistent across similar devices
- Document custom settings for future reference
- Test settings with your typical workflow

#### Accessibility Considerations

- Adjust repeat rates for user comfort
- Configure gestures based on physical capabilities
- Enable helpful features like ANR dialogs

This user settings configuration provides comprehensive control over Hyprland's core behavior, allowing users to tailor the window manager to their specific needs, hardware, and workflow preferences.

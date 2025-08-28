# Hyprlock Configuration

Hyprlock is the screen lock utility for Hyprland, providing a secure and visually appealing lock screen experience in HyprFlux.

## Overview

The HyprFlux Hyprlock configuration features:

- Custom background with blur effects
- Profile image display
- Real-time clock and date
- Music information display
- Secure password input
- Customizable visual elements

## Configuration Structure

```
~/.config/hypr/
├── hyprlock.conf           # Main lock screen configuration
├── hyprlock-1080p.conf     # 1080p optimized configuration
└── hyprlock/
    ├── profile.jpg         # User profile image
    ├── relaxed_mario.png   # Background image
    ├── Fonts/             # Custom fonts
    └── Scripts/           # Helper scripts
```

## Features

### 1. Background Configuration

The lock screen uses a custom background with blur effects:

```bash
background {
    monitor =
    path = ~/.config/hypr/hyprlock/relaxed_mario.png
    blur_passes = 3
    contrast = 0.8916
    brightness = 0.8172
    vibrancy = 0.1696
    vibrancy_darkness = 0.0
}
```

**Customization Options:**

- `path`: Change background image path
- `blur_passes`: Adjust blur intensity (0-10)
- `contrast`: Modify image contrast (0.0-2.0)
- `brightness`: Adjust brightness (0.0-2.0)
- `vibrancy`: Control color saturation (0.0-1.0)

### 2. Profile Image Display

Shows user profile picture with customizable border:

```bash
image {
    monitor =
    path = ~/.config/hypr/hyprlock/profile.jpg
    border_size = 2
    border_color = rgba(255, 255, 255, 0)
    size = 160
    rounding = -1
    position = 0, 40
    halign = center
    valign = center
}
```

**Customization:**

- Replace `profile.jpg` with your image
- Adjust `size` for different dimensions
- Modify `border_size` and `border_color`
- Change `rounding` for circular effect (-1 for circle)

### 3. Date and Time Display

Real-time date and time with custom formatting:

```bash
# Date display
label {
    monitor =
    text = cmd[update:1000] echo -e "$(LC_TIME=en_US.UTF-8 date +"%A, %B %d")"
    color = rgba(216, 222, 233, 0.90)
    font_size = 25
    font_family = SF Pro Display Semibold
    position = 0, 350
    halign = center
    valign = center
}

# Time display
label {
    monitor =
    text = cmd[update:1000] echo "<span>$(date +"%I:%M")</span>"
    color = rgba(216, 222, 233, 0.90)
    font_size = 120
    font_family = SF Pro Display Bold
    position = 0, 230
    halign = center
    valign = center
}
```

### 4. Password Input Field

Secure password input with visual feedback:

```bash
input-field {
    monitor =
    size = 280, 55
    outline_thickness = 2
    dots_size = 0.2
    dots_spacing = 0.2
    dots_center = true
    outer_color = rgba(0, 0, 0, 0)
    inner_color = rgba(255, 255, 255, 0.1)
    font_color = rgb(200, 200, 200)
    fade_on_empty = false
    font_family = SF Pro Display Bold
    placeholder_text = <i><span foreground="##ffffff99">🔒 Enter Pass</span></i>
    hide_input = false
    position = 0, -210
    halign = center
    valign = center
}
```

### 5. Music Information

Displays currently playing music:

```bash
label {
    monitor =
    text = cmd[update:1000] echo "$(~/.config/hypr/hyprlock/Scripts/songdetail.sh)"
    color = rgba(255, 255, 255, 0.6)
    font_size = 18
    font_family = JetBrains Mono Nerd, SF Pro Display Bold
    position = 0, 50
    halign = center
    valign = bottom
}
```

## Customization Guide

### Changing Background Image

1. Replace the background image:

```bash
cp your-image.jpg ~/.config/hypr/hyprlock/background.jpg
```

2. Update the configuration:

```bash
# Edit hyprlock.conf
background {
    path = ~/.config/hypr/hyprlock/background.jpg
    # Adjust other properties as needed
}
```

### Customizing Colors

Modify color schemes throughout the configuration:

```bash
# Text colors
color = rgba(216, 222, 233, 0.90)  # Light gray
color = rgba(255, 255, 255, 0.6)   # Semi-transparent white

# Input field colors
inner_color = rgba(255, 255, 255, 0.1)  # Background
font_color = rgb(200, 200, 200)         # Text color
```

### Font Customization

Change fonts for different elements:

```bash
# Available font options
font_family = SF Pro Display Bold
font_family = SF Pro Display Semibold
font_family = JetBrains Mono Nerd
font_family = Noto Sans

# Font sizes
font_size = 120  # Large time display
font_size = 25   # Date display
font_size = 18   # Music info
```

### Position Adjustments

Modify element positions:

```bash
# Position format: x, y
position = 0, 350    # Center horizontally, 350px from center vertically
position = 0, -210   # Center horizontally, 210px below center

# Alignment options
halign = center      # left, center, right
valign = center      # top, center, bottom
```

## Advanced Features

### Multi-Monitor Setup

Configure for multiple monitors:

```bash
# Specific monitor
background {
    monitor = DP-1
    path = ~/.config/hypr/hyprlock/bg-monitor1.jpg
}

background {
    monitor = HDMI-A-1
    path = ~/.config/hypr/hyprlock/bg-monitor2.jpg
}

# All monitors (leave monitor empty)
background {
    monitor =
    path = ~/.config/hypr/hyprlock/bg-all.jpg
}
```

### Custom Shapes and Elements

Add custom visual elements:

```bash
# User info box
shape {
    monitor =
    size = 280, 55
    color = rgba(255, 255, 255, .1)
    rounding = -1
    border_size = 0
    position = 0, -130
    halign = center
    valign = center
}
```

### Dynamic Content

Use scripts for dynamic content:

```bash
# Weather information
label {
    monitor =
    text = cmd[update:30000] echo "$(~/.config/hypr/scripts/Weather.sh)"
    color = rgba(255, 255, 255, 0.8)
    font_size = 16
    position = 0, -300
    halign = center
    valign = center
}

# System information
label {
    monitor =
    text = cmd[update:5000] echo "$(uptime -p)"
    color = rgba(255, 255, 255, 0.6)
    font_size = 14
    position = 0, -350
    halign = center
    valign = center
}
```

## Security Configuration

### General Security Settings

```bash
general {
    no_fade_in = false        # Smooth fade-in animation
    grace = 0                 # No grace period
    disable_loading_bar = false  # Show loading indicator
}
```

### Input Field Security

```bash
input-field {
    hide_input = false        # Set to true to hide password dots
    fade_on_empty = false     # Keep field visible when empty
    fail_color = rgb(204, 34, 34)  # Color when password fails
}
```

## Integration with HyprFlux

### Automatic Lock

Hyprlock integrates with Hypridle for automatic locking:

```bash
# In hypridle.conf
listener {
    timeout = 300
    on-timeout = hyprlock
}
```

### Manual Lock

Lock screen manually:

```bash
# Via keybinding (in UserKeybinds.conf)
bind = SUPER, L, exec, hyprlock

# Via script
~/.config/hypr/scripts/LockScreen.sh
```

### Wallpaper Integration

Sync with current wallpaper:

```bash
# Use current wallpaper as background
background {
    path = ~/.config/hypr/wallpaper_effects/.wallpaper_current
}
```

## Song Detail Script

Create a script to display current music information:

```bash
#!/bin/bash
# ~/.config/hypr/hyprlock/Scripts/songdetail.sh

# Get current playing song from playerctl
if command -v playerctl &> /dev/null; then
    # Check if any player is running
    if playerctl status &> /dev/null; then
        artist=$(playerctl metadata artist 2>/dev/null)
        title=$(playerctl metadata title 2>/dev/null)

        if [[ -n "$artist" && -n "$title" ]]; then
            echo "♪ $artist - $title"
        elif [[ -n "$title" ]]; then
            echo "♪ $title"
        else
            echo "♪ Music Playing"
        fi
    else
        echo ""
    fi
else
    echo ""
fi
```

Make the script executable:

```bash
chmod +x ~/.config/hypr/hyprlock/Scripts/songdetail.sh
```

## Theming Examples

### Dark Theme

```bash
# Dark color scheme
background {
    path = ~/.config/hypr/hyprlock/dark-bg.jpg
    blur_passes = 2
    contrast = 0.9
    brightness = 0.7
}

label {
    color = rgba(255, 255, 255, 0.9)
}

input-field {
    inner_color = rgba(0, 0, 0, 0.3)
    font_color = rgb(255, 255, 255)
}
```

### Light Theme

```bash
# Light color scheme
background {
    path = ~/.config/hypr/hyprlock/light-bg.jpg
    blur_passes = 1
    contrast = 1.1
    brightness = 1.2
}

label {
    color = rgba(0, 0, 0, 0.8)
}

input-field {
    inner_color = rgba(255, 255, 255, 0.8)
    font_color = rgb(0, 0, 0)
}
```

### Minimal Theme

```bash
# Minimal design
background {
    color = #1e1e2e
}

# Remove profile image
# image { ... } # Comment out or remove

# Simple time display
label {
    text = cmd[update:1000] echo "$(date +"%H:%M")"
    color = rgba(255, 255, 255, 1.0)
    font_size = 72
    font_family = JetBrains Mono
    position = 0, 0
    halign = center
    valign = center
}
```

## Troubleshooting

### Common Issues

1. **Profile image not showing**: Check image path and permissions
2. **Fonts not loading**: Install required fonts or change font family
3. **Music info not displaying**: Ensure media player supports MPRIS
4. **Background not loading**: Verify image path and format
5. **Script not executing**: Check script permissions and paths

### Debug Commands

```bash
# Test hyprlock configuration
hyprlock --immediate

# Check for errors
journalctl -u hyprlock

# Validate configuration syntax
hyprlock --help

# Test individual scripts
~/.config/hypr/hyprlock/Scripts/songdetail.sh
```

### Performance Optimization

```bash
# Reduce blur for better performance
background {
    blur_passes = 1  # Reduce from 3 to 1
}

# Disable expensive effects
general {
    no_fade_in = true
    disable_loading_bar = true
}

# Reduce update frequency
label {
    text = cmd[update:5000] echo "$(date +"%H:%M")"  # Update every 5 seconds instead of 1
}
```

## Resolution-Specific Configurations

### 1080p Configuration

```bash
# Optimized for 1080p displays
image {
    size = 160
    position = 0, 40
}

label {
    font_size = 120  # Time
    position = 0, 230
}

input-field {
    size = 280, 55
    position = 0, -210
}
```

### 4K Configuration

```bash
# Scaled for 4K displays
image {
    size = 320
    position = 0, 80
}

label {
    font_size = 240  # Time
    position = 0, 460
}

input-field {
    size = 560, 110
    position = 0, -420
}
```

::: tip Hyprlock Official Docs
More Details : https://wiki.hypr.land/Hypr-Ecosystem/hyprlock
:::

# hyprlock.conf

The main configuration file for Hyprlock, the screen lock utility for Hyprland. This file defines the visual appearance, security settings, and interactive elements of the lock screen in HyprFlux.

## Purpose

- **Screen Lock Interface**: Defines the visual layout and elements of the lock screen
- **Security Configuration**: Sets up secure password input and authentication
- **Visual Customization**: Configures background, colors, fonts, and animations
- **System Integration**: Integrates with system services and media players

## File Location

```
~/.config/hypr/hyprlock.conf
```

## Configuration Structure

### Background Configuration

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

#### Background Properties

- **monitor**: Target monitor (empty = all monitors)
- **path**: Background image file path
- **blur_passes**: Blur intensity (0-10, higher = more blur)
- **contrast**: Image contrast adjustment (0.0-2.0)
- **brightness**: Image brightness adjustment (0.0-2.0)
- **vibrancy**: Color saturation control (0.0-1.0)
- **vibrancy_darkness**: Dark area vibrancy (0.0-1.0)

### General Settings

```bash
general {
    no_fade_in = false              # Enable smooth fade-in animation
    grace = 0                       # Grace period before requiring password
    disable_loading_bar = false     # Show loading indicator
}
```

#### Security Options

- **grace**: Time in seconds before password is required (0 = immediate)
- **no_fade_in**: Disable fade-in animation for instant lock
- **disable_loading_bar**: Hide loading progress indicator

### Profile Image Display

```bash
image {
    monitor =
    path = ~/.config/hypr/hyprlock/profile.jpg
    border_size = 2
    border_color = rgba(255, 255, 255, 0)
    size = 160
    rounding = -1                   # -1 for perfect circle
    rotate = 0
    reload_time = -1
    reload_cmd =
    position = 0, 40
    halign = center
    valign = center
}
```

#### Image Properties

- **size**: Image dimensions in pixels
- **rounding**: Corner radius (-1 for circle, 0 for square)
- **border_size**: Border thickness in pixels
- **border_color**: Border color in RGBA format
- **position**: X, Y offset from alignment point
- **halign/valign**: Horizontal/vertical alignment (left, center, right / top, center, bottom)

### Date and Time Display

#### Date Label

```bash
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
```

#### Time Label

```bash
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

#### Label Properties

- **text**: Static text or command output
- **cmd[update:N]**: Execute command every N milliseconds
- **color**: Text color in RGBA format
- **font_size**: Font size in points
- **font_family**: Font name
- **position**: X, Y coordinates relative to alignment

### User Information Box

```bash
shape {
    monitor =
    size = 280, 55
    color = rgba(255, 255, 255, .1)
    rounding = -1
    border_size = 0
    border_color = rgba(253, 198, 135, 0)
    rotate = 0
    xray = false
    position = 0, -130
    halign = center
    valign = center
}
```

#### Shape Properties

- **size**: Width, height in pixels
- **color**: Fill color in RGBA format
- **rounding**: Corner radius (-1 for maximum rounding)
- **border_size**: Border thickness
- **xray**: Create transparent "hole" in background

### Username Display

```bash
label {
    monitor =
    text = $USER
    color = rgba(216, 222, 233, 0.80)
    outline_thickness = 2
    dots_size = 0.2
    dots_spacing = 0.2
    dots_center = true
    font_size = 18
    font_family = SF Pro Display Bold
    position = 0, -130
    halign = center
    valign = center
}
```

### Password Input Field

```bash
input-field {
    monitor =
    size = 280, 55
    outline_thickness = 2
    dots_size = 0.2                 # Password dot size (0.2-0.8)
    dots_spacing = 0.2              # Spacing between dots (0.0-1.0)
    dots_center = true              # Center dots in field
    outer_color = rgba(0, 0, 0, 0)
    inner_color = rgba(255, 255, 255, 0.1)
    font_color = rgb(200, 200, 200)
    fade_on_empty = false
    font_family = SF Pro Display Bold
    placeholder_text = <i><span foreground="##ffffff99">🔒 Enter Pass</span></i>
    hide_input = false              # Show/hide password dots
    position = 0, -210
    halign = center
    valign = center
}
```

#### Input Field Properties

- **dots_size**: Size of password dots relative to field height
- **dots_spacing**: Space between password dots
- **dots_center**: Center dots vertically in field
- **outer_color**: Border/outline color
- **inner_color**: Background color
- **font_color**: Text color
- **fade_on_empty**: Fade field when empty
- **hide_input**: Hide password dots (true/false)
- **placeholder_text**: Text shown when field is empty

### Music Information Display

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

#### Music Script Integration

The `songdetail.sh` script provides current playing music information:

```bash
#!/bin/bash
# ~/.config/hypr/hyprlock/Scripts/songdetail.sh

if command -v playerctl &> /dev/null; then
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

## Customization Guide

### Changing Background

#### Static Background

```bash
background {
    monitor =
    path = /path/to/your/wallpaper.jpg
    blur_passes = 2
    brightness = 0.8
}
```

#### Dynamic Background (Current Wallpaper)

```bash
background {
    monitor =
    path = ~/.config/hypr/wallpaper_effects/.wallpaper_current
    blur_passes = 3
}
```

#### Solid Color Background

```bash
background {
    monitor =
    color = rgba(30, 30, 46, 1.0)  # Solid color instead of image
}
```

### Customizing Colors

#### Color Scheme Variables

```bash
# Define color variables at the top
$background = rgba(30, 30, 46, 1.0)
$foreground = rgba(205, 214, 244, 1.0)
$accent = rgba(137, 180, 250, 1.0)

# Use in elements
label {
    color = $foreground
}

input-field {
    inner_color = $background
    font_color = $foreground
}
```

#### Theme-Based Colors

```bash
# Light theme
$bg = rgba(239, 241, 245, 1.0)
$fg = rgba(76, 79, 105, 1.0)
$accent = rgba(30, 102, 245, 1.0)

# Dark theme
$bg = rgba(17, 17, 27, 1.0)
$fg = rgba(205, 214, 244, 1.0)
$accent = rgba(137, 180, 250, 1.0)
```

### Font Customization

#### Available Fonts

```bash
# System fonts
font_family = "Inter"
font_family = "Noto Sans"
font_family = "Ubuntu"

# Nerd fonts (with icons)
font_family = "JetBrains Mono Nerd Font"
font_family = "FiraCode Nerd Font"

# Custom fonts
font_family = "SF Pro Display"  # macOS-style font
```

#### Font Sizing

```bash
# Responsive font sizes
font_size = 120  # Large time display
font_size = 25   # Date display
font_size = 18   # Secondary information
font_size = 14   # Small details
```

### Layout Customization

#### Repositioning Elements

```bash
# Center layout
position = 0, 0      # Exact center

# Top layout
position = 0, -200   # Above center

# Bottom layout
position = 0, 200    # Below center

# Side layouts
position = -300, 0   # Left side
position = 300, 0    # Right side
```

#### Multi-Monitor Layouts

```bash
# Primary monitor
background {
    monitor = DP-1
    path = ~/.config/hypr/hyprlock/bg-primary.jpg
}

# Secondary monitor
background {
    monitor = HDMI-A-1
    path = ~/.config/hypr/hyprlock/bg-secondary.jpg
}

# Different layouts per monitor
label {
    monitor = DP-1
    position = 0, 100
    # ... primary monitor time
}

label {
    monitor = HDMI-A-1
    position = 0, -100
    # ... secondary monitor time
}
```

## Advanced Features

### Dynamic Content

#### System Information

```bash
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

#### Weather Information

```bash
label {
    monitor =
    text = cmd[update:300000] echo "$(curl -s 'wttr.in/?format=%t+%C')"
    color = rgba(255, 255, 255, 0.7)
    font_size = 16
    position = 0, -300
    halign = center
    valign = center
}
```

#### Battery Status (Laptops)

```bash
label {
    monitor =
    text = cmd[update:30000] echo "🔋 $(cat /sys/class/power_supply/BAT0/capacity)%"
    color = rgba(255, 255, 255, 0.8)
    font_size = 14
    position = -50, 50
    halign = right
    valign = bottom
}
```

### Animation Effects

#### Fade-in Animation

```bash
general {
    no_fade_in = false          # Enable fade-in
    fade_in_time = 0.5         # Fade duration in seconds
}
```

#### Element Animations

```bash
# Pulsing effect for important elements
label {
    # Add CSS-like animations (if supported)
    animation = pulse 2s infinite
}
```

### Security Enhancements

#### Failed Login Handling

```bash
input-field {
    fail_color = rgb(204, 34, 34)      # Red color on failed login
    fail_timeout = 2000                # Show fail color for 2 seconds
    fail_transition = 300              # Transition duration
}
```

#### Grace Period Configuration

```bash
general {
    grace = 5                   # 5-second grace period
    grace_no_mouse = true       # Require keyboard activity
    grace_no_touch = true       # Ignore touch during grace period
}
```

## Integration Examples

### Waybar Integration

```json
"custom/lock": {
    "format": "🔒",
    "on-click": "hyprlock",
    "tooltip-format": "Lock Screen"
}
```

### Keybinding Integration

```bash
# In UserKeybinds.conf
bind = $mainMod, L, exec, hyprlock
bind = CTRL ALT, L, exec, hyprlock
```

### Automatic Lock Integration

```bash
# In hypridle.conf
listener {
    timeout = 600
    on-timeout = hyprlock
}
```

## Troubleshooting

### Common Issues

#### Background Not Loading

```bash
# Check image path and permissions
ls -la ~/.config/hypr/hyprlock/relaxed_mario.png

# Test with absolute path
path = /home/username/.config/hypr/hyprlock/relaxed_mario.png
```

#### Fonts Not Rendering

```bash
# Install required fonts
sudo pacman -S ttf-jetbrains-mono-nerd

# Use system fonts as fallback
font_family = "monospace"
```

#### Input Field Not Working

```bash
# Check authentication setup
sudo systemctl status polkit

# Verify user permissions
groups $USER
```

### Debug Commands

```bash
# Test hyprlock
hyprlock --immediate

# Check configuration syntax
hyprlock --help

# Monitor logs
journalctl -f -u hyprlock
```

### Performance Optimization

#### Reduce Resource Usage

```bash
# Lower blur passes
blur_passes = 1

# Reduce update frequency
text = cmd[update:5000] echo "$(date +"%H:%M")"  # Update every 5 seconds

# Disable expensive effects
general {
    no_fade_in = true
    disable_loading_bar = true
}
```

This lock screen configuration provides a secure, beautiful, and functional interface that integrates seamlessly with the HyprFlux desktop environment while offering extensive customization options.

# Cava Audio Visualizer Configuration

Cava (Console-based Audio Visualizer for Alsa) is a cross-platform audio visualizer that creates beautiful real-time audio spectrum displays in HyprFlux, integrated with Waybar and terminal applications.

## Overview

The HyprFlux Cava configuration features:

- Real-time audio spectrum visualization
- Multiple output modes (terminal, raw, Waybar integration)
- Customizable colors and effects
- Various smoothing and sensitivity options
- Integration with system audio and media players

## Configuration Structure

```
~/.config/cava/
├── config                 # Main configuration file
├── shaders/              # Custom shader effects
└── wallust/              # Dynamic color schemes
```

## Key Features

### 1. Audio Input Configuration

#### Input Sources

```ini
[input]
method = pulse            # Audio input method (pulse, alsa, fifo, sndio)
source = auto            # Audio source (auto, specific device)
sample_rate = 44100      # Sample rate
samples = 512            # Number of samples
```

#### Audio Processing

```ini
[input]
# Stereo processing
stereo = true            # Enable stereo mode
mono_option = average    # Mono conversion method (left, right, average)

# Noise reduction
noise_reduction = 0.77   # Noise reduction factor (0.0-1.0)
```

### 2. Visual Configuration

#### Bar Settings

```ini
[output]
method = ncurses         # Output method (ncurses, noncurses, raw, wav)
channels = stereo        # Channel configuration
bars = 0                # Number of bars (0 = auto)
bar_width = 2           # Width of each bar
bar_spacing = 1         # Spacing between bars
```

#### Frequency Range

```ini
[output]
lower_cutoff_freq = 50   # Lower frequency cutoff (Hz)
higher_cutoff_freq = 10000  # Higher frequency cutoff (Hz)
```

### 3. Color and Styling

#### Color Gradient

```ini
[color]
# Gradient colors (bottom to top)
gradient = 1
gradient_count = 8
gradient_color_1 = '#59cc33'
gradient_color_2 = '#80cc33'
gradient_color_3 = '#a6cc33'
gradient_color_4 = '#cccc33'
gradient_color_5 = '#ccaa33'
gradient_color_6 = '#cc8833'
gradient_color_7 = '#cc6633'
gradient_color_8 = '#cc3333'
```

#### Single Color Mode

```ini
[color]
gradient = 0
foreground = '#ffffff'   # Single color for bars
background = '#000000'   # Background color
```

### 4. Smoothing and Effects

#### Smoothing Configuration

```ini
[smoothing]
# Integral smoothing
integral = 77            # Smoothing factor (0-100)

# Monstercat smoothing
monstercat = 0          # Monstercat-style smoothing (0-100)
waves = 0               # Wave effect (0-1)

# Gravity effect
gravity = 100           # Gravity factor (0-200)
ignore = 0              # Ignore small values (0-100)
```

#### Sensitivity Settings

```ini
[general]
# Sensitivity and scaling
sensitivity = 100        # Overall sensitivity (1-1000)
autosens = 1            # Auto-sensitivity adjustment
overshoot = 20          # Overshoot percentage
```

## Waybar Integration

### 1. Waybar Module Configuration

#### Custom Cava Module

```json
"custom/cava_mviz": {
    "exec": "$HOME/.config/hypr/scripts/WaybarCava.sh",
    "format": "{}",
    "restart-interval": 1,
    "on-click": "pkill cava || kitty cava"
}
```

#### Cava Script for Waybar

```bash
#!/bin/bash
# ~/.config/hypr/scripts/WaybarCava.sh

# Configuration for Waybar output
cava -p ~/.config/cava/config-waybar | while read -r line; do
    # Process cava output for Waybar
    echo "$line" | sed 's/;//g' | tr -d '\n'
    echo ""
done
```

### 2. Waybar-Specific Configuration

#### Minimal Config for Waybar

```ini
[general]
bars = 12               # Fewer bars for Waybar
bar_width = 1          # Thinner bars
bar_spacing = 0        # No spacing

[output]
method = raw           # Raw output for processing
data_format = ascii    # ASCII output format
ascii_max_range = 7    # Maximum ASCII range

[smoothing]
integral = 85          # Higher smoothing for stability
gravity = 120          # Moderate gravity
```

## Terminal Integration

### 1. Full-Screen Visualizer

#### Terminal Configuration

```ini
[general]
bars = 0               # Auto-detect terminal width
bar_width = 3          # Wider bars for visibility
bar_spacing = 1        # Spacing between bars

[output]
method = ncurses       # Terminal output
channels = stereo      # Stereo visualization
```

#### Color Configuration for Terminal

```ini
[color]
gradient = 1
gradient_count = 6
gradient_color_1 = '#0099ff'
gradient_color_2 = '#00ffff'
gradient_color_3 = '#00ff99'
gradient_color_4 = '#99ff00'
gradient_color_5 = '#ffff00'
gradient_color_6 = '#ff9900'
```

### 2. Compact Terminal Mode

#### Minimal Terminal Display

```ini
[general]
bars = 20              # Fixed number of bars
bar_width = 2          # Medium width
bar_spacing = 1        # Standard spacing

[output]
method = noncurses     # Simple output
channels = mono        # Mono for simplicity
```

## Advanced Configuration

### 1. Custom Frequency Bands

#### EQ-Style Configuration

```ini
[eq]
# Custom frequency bands (Hz)
1 = 1         # 20-60 Hz (Sub-bass)
2 = 1         # 60-250 Hz (Bass)
3 = 1         # 250-500 Hz (Low midrange)
4 = 1         # 500-2000 Hz (Midrange)
5 = 1         # 2000-4000 Hz (Upper midrange)
6 = 1         # 4000-6000 Hz (Presence)
7 = 1         # 6000-20000 Hz (Brilliance)
```

### 2. Performance Optimization

#### Low-Resource Configuration

```ini
[general]
framerate = 30         # Reduce framerate
bars = 16             # Fewer bars
sensitivity = 50      # Lower sensitivity

[smoothing]
integral = 90         # Higher smoothing (less CPU)
monstercat = 0        # Disable expensive effects
waves = 0             # Disable wave effects
```

### 3. High-Quality Configuration

#### Maximum Quality Settings

```ini
[general]
framerate = 60        # High framerate
bars = 0              # Auto-detect (maximum bars)
sensitivity = 200     # High sensitivity

[input]
sample_rate = 48000   # High sample rate
samples = 1024        # More samples

[smoothing]
integral = 50         # Less smoothing (more responsive)
monstercat = 25       # Moderate monstercat effect
```

## Integration with HyprFlux

### Hyprland Integration

#### Keybindings

```bash
# In UserConfigs/UserKeybinds.conf
bind = SUPER, V, exec, kitty cava
bind = SUPER SHIFT, V, exec, kitty --class="cava-floating" cava
bind = SUPER CTRL, V, exec, pkill cava
```

#### Window Rules

```bash
# In UserConfigs/WindowRules.conf
windowrule = float, ^(cava-floating)$
windowrule = size 800 600, ^(cava-floating)$
windowrule = center, ^(cava-floating)$
windowrule = opacity 0.9, ^(cava)$
```

### Audio System Integration

#### PulseAudio Configuration

```bash
# Monitor default audio output
pactl list short sources | grep monitor
```

#### ALSA Configuration

```ini
[input]
method = alsa
source = hw:0,0          # Specific ALSA device
```

### Dynamic Theming

#### Wallust Integration

```bash
#!/bin/bash
# ~/.config/cava/scripts/update-colors.sh

# Generate cava colors from wallust
source ~/.config/wallust/colors.sh

# Update cava config with new colors
sed -i "s/gradient_color_1 = .*/gradient_color_1 = '$color1'/" ~/.config/cava/config
sed -i "s/gradient_color_2 = .*/gradient_color_2 = '$color2'/" ~/.config/cava/config
# ... continue for all colors

# Restart cava if running
pkill cava
```

## Customization Examples

### 1. Music Genre Presets

#### Electronic/EDM Preset

```ini
[general]
bars = 32
sensitivity = 150
autosens = 1

[smoothing]
integral = 60
monstercat = 30
waves = 1
gravity = 80

[color]
gradient = 1
gradient_count = 4
gradient_color_1 = '#ff0080'
gradient_color_2 = '#8000ff'
gradient_color_3 = '#0080ff'
gradient_color_4 = '#00ff80'
```

#### Classical Music Preset

```ini
[general]
bars = 24
sensitivity = 80
autosens = 1

[smoothing]
integral = 85
monstercat = 0
waves = 0
gravity = 150

[color]
gradient = 1
gradient_count = 3
gradient_color_1 = '#ffd700'
gradient_color_2 = '#ff8c00'
gradient_color_3 = '#dc143c'
```

### 2. System Integration Presets

#### Waybar Compact

```ini
[general]
bars = 8
bar_width = 1
bar_spacing = 0
sensitivity = 100

[output]
method = raw
data_format = ascii
ascii_max_range = 5

[color]
gradient = 0
foreground = '#89b4fa'
```

#### Desktop Widget

```ini
[general]
bars = 20
bar_width = 2
bar_spacing = 1
sensitivity = 120

[output]
method = ncurses
channels = stereo

[color]
gradient = 1
gradient_count = 5
gradient_color_1 = '#a6e3a1'
gradient_color_2 = '#94e2d5'
gradient_color_3 = '#89b4fa'
gradient_color_4 = '#cba6f7'
gradient_color_5 = '#f38ba8'
```

## Troubleshooting

### Common Issues

1. **No audio input**: Check PulseAudio/ALSA configuration
2. **Poor performance**: Reduce bars, framerate, or samples
3. **Colors not showing**: Verify terminal color support
4. **Waybar integration issues**: Check script permissions and paths

### Debug Commands

```bash
# Test audio input
pactl list sources short

# Check cava configuration
cava -h

# Test different input methods
cava -p ~/.config/cava/config-test

# Monitor system audio
pavucontrol
```

### Performance Monitoring

```bash
# Monitor cava CPU usage
top -p $(pgrep cava)

# Check audio latency
pactl list sources | grep -A 10 "monitor"

# Test different configurations
hyperfine 'timeout 5s cava -p ~/.config/cava/config-performance'
```

::: tip Cava Official Docs
More Details : https://github.com/karlstav/cava
:::

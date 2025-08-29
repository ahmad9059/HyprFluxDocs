# monitors.conf

Auto-generated monitor configuration file that defines display settings, resolutions, and arrangements for all connected monitors in HyprFlux. This file is typically managed by nwg-displays but can be manually edited for advanced configurations.

## Purpose

- **Display Configuration**: Defines monitor resolutions, refresh rates, and positioning
- **Multi-Monitor Setup**: Manages complex multi-monitor arrangements
- **Auto-Detection**: Provides fallback configurations for various display scenarios
- **GUI Integration**: Integrates with nwg-displays for visual monitor management

## File Location

```
~/.config/hypr/monitors.conf
```

## Important Notes

### Auto-Generation Warning

```bash
# *********************************************************** #
#
# NOTE: This will be overwritten by NWG-Displays
# once you use and click apply. You can still find this
# default at ~/.config/hypr/Monitor_Profiles/default.conf
#
# *********************************************************** #
```

**Key Points**:

- File is overwritten when using nwg-displays
- Original defaults are preserved in Monitor_Profiles/
- Manual changes may be lost when using GUI tools

## Configuration Structure

### Basic Monitor Configuration

#### Auto-Detection (Default)

```bash
# Automatic monitor detection with preferred settings
monitor=,preferred,auto,1
```

**Properties**:

- **Monitor Name**: Empty (applies to all monitors)
- **Resolution**: `preferred` (use monitor's preferred resolution)
- **Position**: `auto` (automatic positioning)
- **Scale**: `1` (100% scaling)

#### High Refresh Rate

```bash
monitor=,highrr,auto,1
```

- Automatically selects highest available refresh rate

#### High Resolution

```bash
monitor=,highres,auto,1
```

- Automatically selects highest available resolution

### Specific Monitor Examples

#### Laptop Display

```bash
monitor = eDP-1, preferred, auto, 1
monitor = eDP-1, 2560x1440@165, 0x0, 1    # Specific resolution and refresh rate
```

#### External Monitors

```bash
monitor = DP-3, 1920x1080@240, auto, 1     # High refresh rate gaming monitor
monitor = DP-1, preferred, auto, 1         # Standard external monitor
monitor = HDMI-A-1, preferred, auto, 1     # HDMI connection
```

#### Virtual Machine Displays

```bash
monitor = Virtual-1, 1920x1080@60, auto, 1
```

### Advanced Configuration Options

#### Monitor Positioning

```bash
# Dual monitor setup with specific positioning
monitor = eDP-1, 1920x1080@60, 0x0, 1      # Left monitor at origin
monitor = DP-1, 1920x1080@60, 1920x0, 1    # Right monitor offset by 1920px
```

#### Monitor Scaling

```bash
# 4K monitor with 150% scaling
monitor = DP-1, 3840x2160@60, 0x0, 1.5

# Different scaling for different monitors
monitor = eDP-1, 1920x1080@60, 0x0, 1      # 100% scaling
monitor = DP-1, 2560x1440@144, 1920x0, 1.25 # 125% scaling
```

#### Monitor Disabling

```bash
# Disable specific monitor
monitor = HDMI-A-1, disable

# Disable when using external monitor
monitor = eDP-1, disable  # Laptop screen off when docked
```

#### Mirror Configuration

```bash
# Mirror laptop screen to external display
monitor = DP-3, 1920x1080@60, 0x0, 1, mirror, DP-2
monitor = , preferred, auto, 1, mirror, eDP-1
monitor = HDMI-A-1, 2560x1440@144, 0x0, 1, mirror, eDP-1
```

#### Advanced Features

##### 10-bit Color Support

```bash
# Enable 10-bit color depth (if supported)
monitor = DP-1, preferred, auto, 1, bitdepth, 10
```

**Notes**:

- Colors in Hyprland (e.g., border colors) don't support 10-bit
- Some applications may not support screen capture with 10-bit
- OBS may render black screen with 10-bit enabled

##### Monitor Transformation

```bash
# Rotate monitor
monitor = eDP-1, transform, 0    # 0=normal, 1=90°, 2=180°, 3=270°
```

##### Reserved Areas

```bash
# Reserve space for panels/docks
monitor = eDP-1, addreserved, 10, 10, 10, 49  # top, right, bottom, left
```

## Monitor Identification

### Finding Monitor Names

```bash
# List connected monitors
hyprctl monitors

# Detailed monitor information
hyprctl monitors all

# Using xrandr (if available)
xrandr --listmonitors
```

### Common Monitor Names

- **eDP-1**: Built-in laptop display
- **DP-1, DP-2, DP-3**: DisplayPort connections
- **HDMI-A-1, HDMI-A-2**: HDMI connections
- **DVI-D-1**: DVI connections
- **Virtual-1**: Virtual machine displays

## Resolution and Refresh Rate Options

### Common Resolutions

#### Full HD (1080p)

```bash
monitor = DP-1, 1920x1080@60, 0x0, 1
monitor = DP-1, 1920x1080@144, 0x0, 1    # High refresh rate
monitor = DP-1, 1920x1080@240, 0x0, 1    # Gaming monitor
```

#### 2K/QHD (1440p)

```bash
monitor = DP-1, 2560x1440@60, 0x0, 1
monitor = DP-1, 2560x1440@144, 0x0, 1
monitor = DP-1, 2560x1440@165, 0x0, 1
```

#### 4K/UHD (2160p)

```bash
monitor = DP-1, 3840x2160@60, 0x0, 1.5   # With scaling
monitor = DP-1, 3840x2160@120, 0x0, 2    # High refresh with scaling
```

#### Ultrawide

```bash
monitor = DP-1, 3440x1440@100, 0x0, 1    # 21:9 ultrawide
monitor = DP-1, 5120x1440@120, 0x0, 1    # 32:9 super ultrawide
```

### Custom Resolutions

```bash
# Custom resolution (if supported by monitor)
monitor = DP-1, 2048x1152@60, 0x0, 1
```

## Multi-Monitor Configurations

### Dual Monitor Setups

#### Side-by-Side (Horizontal)

```bash
monitor = eDP-1, 1920x1080@60, 0x0, 1      # Left monitor
monitor = DP-1, 1920x1080@60, 1920x0, 1    # Right monitor
```

#### Stacked (Vertical)

```bash
monitor = DP-1, 1920x1080@60, 0x0, 1       # Top monitor
monitor = eDP-1, 1920x1080@60, 0x1080, 1   # Bottom monitor
```

#### Mixed Resolutions

```bash
monitor = eDP-1, 1920x1080@60, 0x0, 1      # Laptop screen
monitor = DP-1, 2560x1440@144, 1920x0, 1   # External 1440p monitor
```

### Triple Monitor Setups

#### Three Horizontal Monitors

```bash
monitor = DP-1, 1920x1080@60, 0x0, 1       # Left
monitor = DP-2, 1920x1080@60, 1920x0, 1    # Center
monitor = DP-3, 1920x1080@60, 3840x0, 1    # Right
```

#### L-Shaped Configuration

```bash
monitor = DP-1, 2560x1440@60, 0x0, 1       # Main monitor
monitor = DP-2, 1920x1080@60, 2560x0, 1    # Right monitor
monitor = DP-3, 1920x1080@60, 0x1440, 1    # Bottom monitor
```

## Scaling Configuration

### DPI Scaling Options

#### Standard Scaling

```bash
monitor = DP-1, 1920x1080@60, 0x0, 1      # 100% (no scaling)
monitor = DP-1, 1920x1080@60, 0x0, 1.25   # 125% scaling
monitor = DP-1, 1920x1080@60, 0x0, 1.5    # 150% scaling
monitor = DP-1, 1920x1080@60, 0x0, 2      # 200% scaling
```

#### Mixed Scaling (Different DPI monitors)

```bash
monitor = eDP-1, 1920x1080@60, 0x0, 1      # Laptop: 100%
monitor = DP-1, 3840x2160@60, 1920x0, 1.5  # 4K monitor: 150%
```

### Scaling Considerations

#### Environment Variables

```bash
# In ENVariables.conf
env = GDK_SCALE, 1.5
env = QT_SCALE_FACTOR, 1.5
```

#### Application-Specific Scaling

```bash
# Force scaling for specific applications
env = GDK_SCALE, 1
env = QT_AUTO_SCREEN_SCALE_FACTOR, 1
```

## Laptop-Specific Configurations

### Laptop Display Management

```bash
# NOTE: for laptop, kindly check notes in Laptops.conf regarding display
# Created this inorder for the monitor display to not wake up if not intended.
# See here: https://github.com/hyprwm/Hyprland/issues/4090
```

### Clamshell Mode (Laptop Closed)

```bash
# Disable laptop screen when external monitor connected
monitor = eDP-1, disable
monitor = DP-1, preferred, auto, 1
```

### Hybrid Mode (Both Screens)

```bash
# Use both laptop and external monitor
monitor = eDP-1, 1920x1080@60, 0x0, 1
monitor = DP-1, 2560x1440@144, 1920x0, 1
```

## Troubleshooting

### Common Issues

#### Monitor Not Detected

```bash
# Check physical connections
# Try different cables
# Check monitor power

# Force detection
hyprctl dispatch dpms off
hyprctl dispatch dpms on
```

#### Resolution Not Supported

```bash
# Check supported modes
xrandr --query

# Use preferred resolution
monitor = DP-1, preferred, auto, 1

# Try lower resolution
monitor = DP-1, 1920x1080@60, 0x0, 1
```

#### Scaling Issues

```bash
# Reset scaling
monitor = DP-1, preferred, auto, 1

# Adjust environment variables
env = GDK_SCALE, 1
env = QT_AUTO_SCREEN_SCALE_FACTOR, 1
```

### Debug Commands

```bash
# List current monitor configuration
hyprctl monitors

# Get detailed monitor information
hyprctl monitors all

# Test monitor configuration
hyprctl keyword monitor "DP-1,1920x1080@60,0x0,1"

# Reload monitor configuration
hyprctl reload
```

### Validation

#### Test Configuration

```bash
# Apply configuration temporarily
hyprctl keyword monitor "DP-1,2560x1440@144,0x0,1"

# Check if applied correctly
hyprctl monitors
```

#### Backup and Restore

```bash
# Backup current configuration
cp ~/.config/hypr/monitors.conf ~/.config/hypr/monitors.conf.backup

# Restore if issues occur
cp ~/.config/hypr/monitors.conf.backup ~/.config/hypr/monitors.conf
hyprctl reload
```

## Integration with nwg-displays

### GUI Configuration

```bash
# Launch nwg-displays
nwg-displays

# Apply changes (overwrites monitors.conf)
# Click "Apply" in nwg-displays interface
```

### Preserving Manual Changes

```bash
# Save manual configuration to profile
cp ~/.config/hypr/monitors.conf ~/.config/hypr/Monitor_Profiles/manual.conf

# Restore manual configuration after GUI changes
cp ~/.config/hypr/Monitor_Profiles/manual.conf ~/.config/hypr/monitors.conf
```

## Best Practices

### Configuration Management

#### Use Monitor Profiles

```bash
# Create profiles for different setups
cp ~/.config/hypr/monitors.conf ~/.config/hypr/Monitor_Profiles/work.conf
cp ~/.config/hypr/monitors.conf ~/.config/hypr/Monitor_Profiles/gaming.conf
```

#### Document Changes

```bash
# Add comments for custom configurations
# Work setup: laptop + 4K external monitor
monitor = eDP-1, 1920x1080@60, 0x0, 1
monitor = DP-1, 3840x2160@60, 1920x0, 1.5
```

### Performance Optimization

#### Gaming Setup

```bash
# High refresh rate, no scaling
monitor = DP-1, 2560x1440@165, 0x0, 1
monitor = eDP-1, disable  # Disable laptop screen for performance
```

#### Productivity Setup

```bash
# Multiple monitors with appropriate scaling
monitor = DP-1, 2560x1440@60, 0x0, 1      # Main work monitor
monitor = DP-2, 1920x1080@60, 2560x0, 1   # Secondary monitor
monitor = eDP-1, 1920x1080@60, 0x1440, 1  # Laptop for communication
```

This monitor configuration system provides flexible display management that adapts to various hardware setups while maintaining compatibility with both GUI tools and manual configuration approaches.

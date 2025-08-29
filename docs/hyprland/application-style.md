# application-style.conf

Configuration file for hyprland-qt-support that provides QML styling for Qt6 applications in HyprFlux, ensuring visual consistency between Hyprland and Qt-based applications.

## Purpose

- **Qt Application Styling**: Provides consistent styling for Qt6 applications
- **Visual Integration**: Ensures Qt apps match Hyprland's visual theme
- **Performance Optimization**: Configures rendering and animation settings
- **Accessibility**: Controls motion and visual effects for better accessibility

## File Location

```
~/.config/hypr/application-style.conf
```

## Configuration Structure

### Basic Properties

```bash
roundess = 2        # Corner rounding for Qt applications
border_width = 0    # Border width for Qt application windows
reduce_motion = false  # Motion reduction for accessibility
```

## Configuration Options

### Visual Styling

#### Corner Rounding

```bash
roundess = 2
```

**Purpose**: Controls the corner radius of Qt application windows and elements
**Values**:

- `0` = Square corners (no rounding)
- `1` = Minimal rounding
- `2` = Standard rounding (default)
- `3` = More pronounced rounding
- `4+` = Maximum rounding

**Examples**:

```bash
roundess = 0    # Sharp, modern look
roundess = 1    # Subtle rounding
roundess = 3    # Pronounced rounding for softer appearance
```

#### Border Configuration

```bash
border_width = 0
```

**Purpose**: Sets the border width for Qt application windows
**Values**:

- `0` = No borders (default, matches Hyprland's borderless style)
- `1` = Thin borders
- `2` = Standard borders
- `3+` = Thick borders

**Examples**:

```bash
border_width = 0    # Borderless (recommended)
border_width = 1    # Minimal borders
border_width = 2    # Visible borders for better window definition
```

### Accessibility and Performance

#### Motion Reduction

```bash
reduce_motion = false
```

**Purpose**: Controls animation and motion effects in Qt applications
**Values**:

- `false` = Full animations and motion effects (default)
- `true` = Reduced motion for accessibility and performance

**Use Cases**:

```bash
reduce_motion = true   # For users with motion sensitivity
reduce_motion = true   # For better performance on low-end hardware
reduce_motion = false  # For full visual experience
```

## Integration with HyprFlux

### Qt Environment Variables

This configuration works in conjunction with Qt environment variables set in `ENVariables.conf`:

```bash
# Qt theming integration
env = QT_QPA_PLATFORMTHEME,qt6ct
env = QT_QUICK_CONTROLS_STYLE,org.hyprland.style  # Uses this style configuration
```

### Hyprland Window Decorations

The configuration should match Hyprland's decoration settings:

```bash
# In UserDecorations.conf
decoration {
    rounding = 10           # Should complement application-style roundess
    border_size = 0         # Should match application-style border_width
}
```

## Customization Examples

### Minimal Style (Performance Focused)

```bash
roundess = 0            # No rounding for better performance
border_width = 0        # No borders
reduce_motion = true    # Reduced animations
```

### Modern Style (Visual Appeal)

```bash
roundess = 2            # Standard rounding
border_width = 0        # Clean, borderless look
reduce_motion = false   # Full animations
```

### Accessibility Style

```bash
roundess = 1            # Minimal rounding for clarity
border_width = 1        # Borders for better definition
reduce_motion = true    # Reduced motion for accessibility
```

### Gaming Style (Performance Priority)

```bash
roundess = 0            # No rounding for maximum performance
border_width = 0        # No borders
reduce_motion = true    # Minimal animations
```

## Advanced Configuration

### Conditional Styling

While not directly supported in the configuration file, you can create different style configurations for different scenarios:

#### Performance Mode

```bash
# application-style-performance.conf
roundess = 0
border_width = 0
reduce_motion = true
```

#### Visual Mode

```bash
# application-style-visual.conf
roundess = 3
border_width = 0
reduce_motion = false
```

### Dynamic Style Switching

Create a script to switch between different style configurations:

```bash
#!/bin/bash
# ~/.config/hypr/scripts/SwitchQtStyle.sh

STYLE_DIR="$HOME/.config/hypr"
CURRENT_STYLE="$STYLE_DIR/application-style.conf"

case "$1" in
    "performance")
        cp "$STYLE_DIR/application-style-performance.conf" "$CURRENT_STYLE"
        ;;
    "visual")
        cp "$STYLE_DIR/application-style-visual.conf" "$CURRENT_STYLE"
        ;;
    "accessibility")
        cp "$STYLE_DIR/application-style-accessibility.conf" "$CURRENT_STYLE"
        ;;
    *)
        echo "Usage: $0 {performance|visual|accessibility}"
        exit 1
        ;;
esac

# Restart Qt applications to apply new style
notify-send "Qt Style Changed" "Restart Qt applications to see changes"
```

## Affected Applications

### Qt6 Applications

This configuration affects Qt6-based applications including:

- **KDE Applications**: Dolphin, Konsole, Kate, etc.
- **Qt-based IDEs**: Qt Creator, some JetBrains IDEs
- **Media Applications**: VLC (Qt interface), SMPlayer
- **System Tools**: Qt-based system configuration tools
- **Custom Qt Applications**: Any application built with Qt6

### Application-Specific Considerations

#### VLC Media Player

```bash
# VLC with hyprland-qt-support styling
roundess = 2        # Rounded corners for media controls
border_width = 0    # Borderless for immersive experience
reduce_motion = false  # Smooth animations for media controls
```

#### Development IDEs

```bash
# IDEs benefit from clear borders and minimal motion
roundess = 1        # Subtle rounding
border_width = 0    # Clean interface
reduce_motion = true   # Less distraction while coding
```

## Troubleshooting

### Common Issues

#### Qt Applications Not Using Style

```bash
# Check Qt environment variables
echo $QT_QUICK_CONTROLS_STYLE

# Verify hyprland-qt-support installation
pacman -Q hyprland-qt-support

# Check if style is being loaded
QT_LOGGING_RULES="*=true" your-qt-app
```

#### Style Not Applied

```bash
# Restart Qt applications after configuration changes
pkill -f qt-app-name
qt-app-name &

# Check configuration file permissions
ls -la ~/.config/hypr/application-style.conf

# Verify configuration syntax
cat ~/.config/hypr/application-style.conf
```

#### Performance Issues

```bash
# Use performance-optimized settings
roundess = 0
border_width = 0
reduce_motion = true
```

### Debug Commands

```bash
# Check Qt style being used
QT_LOGGING_RULES="qt.qpa.plugin=true" your-qt-app

# List available Qt styles
QT_LOGGING_RULES="qt.qpa.theme=true" your-qt-app

# Test configuration changes
# Edit application-style.conf and restart Qt application
```

### Validation

#### Test Style Changes

```bash
# Launch Qt application to test
dolphin &  # KDE file manager
vlc &      # VLC media player

# Check if rounding and borders are applied correctly
# Restart application after configuration changes
```

## Integration Examples

### Waybar Integration

```json
"custom/qt-style": {
    "exec": "echo 'Qt Style'",
    "on-click": "~/.config/hypr/scripts/SwitchQtStyle.sh visual",
    "on-click-right": "~/.config/hypr/scripts/SwitchQtStyle.sh performance",
    "tooltip-format": "Left: Visual Style, Right: Performance Style"
}
```

### Keybinding Integration

```bash
# In UserKeybinds.conf
bind = $mainMod SHIFT, Q, exec, ~/.config/hypr/scripts/SwitchQtStyle.sh performance
bind = $mainMod CTRL, Q, exec, ~/.config/hypr/scripts/SwitchQtStyle.sh visual
```

### Theme Integration

#### Match Hyprland Decorations

```bash
# Get current Hyprland rounding
HYPR_ROUNDING=$(hyprctl getoption decoration:rounding | awk 'NR==1 {print $2}')

# Set Qt rounding to complement (typically smaller)
QT_ROUNDING=$((HYPR_ROUNDING / 5))
echo "roundess = $QT_ROUNDING" > ~/.config/hypr/application-style.conf
```

## Best Practices

### Configuration Management

#### Backup Configuration

```bash
cp ~/.config/hypr/application-style.conf ~/.config/hypr/application-style.conf.backup
```

#### Version Control

```bash
cd ~/.config/hypr
git add application-style.conf
git commit -m "Update Qt application styling"
```

### Performance Optimization

#### Low-End Hardware

```bash
roundess = 0            # Disable rounding
border_width = 0        # No borders
reduce_motion = true    # Minimal animations
```

#### High-End Hardware

```bash
roundess = 3            # Enhanced visual appeal
border_width = 0        # Clean look
reduce_motion = false   # Full animations
```

### User Experience

#### Consistency with Desktop Theme

- Match rounding values with Hyprland decorations
- Keep border settings consistent across the desktop
- Consider user accessibility needs when setting motion reduction

#### Application-Specific Optimization

- Use minimal styling for productivity applications
- Enable full visual effects for media applications
- Consider performance impact for resource-intensive applications

This Qt application styling configuration ensures that Qt6 applications integrate seamlessly with the HyprFlux desktop environment while providing options for performance optimization and accessibility.

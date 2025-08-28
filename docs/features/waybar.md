# Waybar Configuration

Waybar is the highly customizable status bar for Wayland compositors, serving as the primary panel in HyprFlux. It provides system information, workspace management, and quick access to various functions.

## Overview

The HyprFlux Waybar configuration features:

- Modular design with separate configuration files
- Multiple layout options and styles
- System monitoring (CPU, memory, temperature, battery)
- Media controls and network information
- Custom modules for HyprFlux-specific functions
- Dynamic theming with wallpaper integration

## Configuration Structure

```
~/.config/waybar/
├── Modules                 # Standard waybar modules
├── ModulesCustom          # Custom HyprFlux modules
├── ModulesGroups          # Grouped module configurations
├── ModulesVertical        # Vertical layout modules
├── ModulesWorkspaces      # Workspace-specific modules
├── UserModules            # User-customizable modules
├── configs/               # Layout configurations
├── style/                 # CSS styling files
└── wallust/              # Dynamic color schemes
```

## Key Features

### 1. System Monitoring

#### CPU Usage

```json
"cpu": {
    "format": "{usage}% 󰍛",
    "interval": 1,
    "min-length": 5,
    "format-alt": "{icon0}{icon1}{icon2}{icon3} {usage:>2}% 󰍛",
    "format-icons": ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"],
    "on-click-right": "gnome-system-monitor"
}
```

#### Memory Usage

```json
"memory": {
    "interval": 10,
    "format": "{used:0.1f}G 󰾆",
    "format-alt": "{percentage}% 󰾆",
    "tooltip-format": "{used:0.1f}GB/{total:0.1f}G",
    "on-click-right": "$HOME/.config/hypr/scripts/WaybarScripts.sh --btop"
}
```

#### Temperature Monitoring

```json
"temperature": {
    "interval": 10,
    "hwmon-path": [
        "/sys/class/hwmon/hwmon1/temp1_input",
        "/sys/class/thermal/thermal_zone0/temp"
    ],
    "critical-threshold": 82,
    "format": "{temperatureC}°C {icon}",
    "format-icons": ["󰈸"],
    "on-click-right": "$HOME/.config/hypr/scripts/WaybarScripts.sh --nvtop"
}
```

### 2. Audio Controls

#### PulseAudio Integration

```json
"pulseaudio": {
    "format": "{icon} {volume}%",
    "format-bluetooth": "{icon} 󰂰 {volume}%",
    "format-muted": "󰖁",
    "format-icons": {
        "headphone": "",
        "default": ["", "", "󰕾", ""]
    },
    "on-click": "$HOME/.config/hypr/scripts/Volume.sh --toggle",
    "on-click-right": "pavucontrol -t 3",
    "on-scroll-up": "$HOME/.config/hypr/scripts/Volume.sh --inc",
    "on-scroll-down": "$HOME/.config/hypr/scripts/Volume.sh --dec"
}
```

#### Microphone Control

```json
"pulseaudio#microphone": {
    "format": "{format_source}",
    "format-source": " {volume}%",
    "format-source-muted": "",
    "on-click": "$HOME/.config/hypr/scripts/Volume.sh --toggle-mic",
    "on-scroll-up": "$HOME/.config/hypr/scripts/Volume.sh --mic-inc",
    "on-scroll-down": "$HOME/.config/hypr/scripts/Volume.sh --mic-dec"
}
```

### 3. Network Information

#### Network Status

```json
"network": {
    "format-wifi": "{icon}",
    "format-ethernet": "󰌘",
    "format-disconnected": "󰌙",
    "tooltip-format-wifi": "{essid} {icon} {signalStrength}%",
    "format-icons": ["󰤯", "󰤟", "󰤢", "󰤥", "󰤨"],
    "on-click-right": "$HOME/.config/hypr/scripts/WaybarScripts.sh --nmtui"
}
```

#### Network Speed

```json
"network#speed": {
    "interval": 1,
    "format-wifi": "{icon}  {bandwidthUpBytes}  {bandwidthDownBytes}",
    "format-ethernet": "󰌘  {bandwidthUpBytes}  {bandwidthDownBytes}",
    "min-length": 24,
    "max-length": 24
}
```

### 4. Battery Management

```json
"battery": {
    "states": {
        "good": 95,
        "warning": 30,
        "critical": 15
    },
    "format": "{icon} {capacity}%",
    "format-charging": " {capacity}%",
    "format-plugged": "󱘖 {capacity}%",
    "format-icons": ["󰂎", "󰁺", "󰁻", "󰁼", "󰁽", "󰁾", "󰁿", "󰂀", "󰂁", "󰂂", "󰁹"],
    "tooltip-format": "{timeTo} {power}w",
    "on-click-right": "$HOME/.config/hypr/scripts/Wlogout.sh"
}
```

### 5. Media Controls

#### MPRIS Integration

```json
"mpris": {
    "format": "{player_icon} ",
    "format-paused": "{status_icon} <i>{dynamic}</i>",
    "on-click-middle": "playerctl play-pause",
    "on-click": "playerctl previous",
    "on-click-right": "playerctl next",
    "player-icons": {
        "spotify": "",
        "firefox": "",
        "mpv": "󰐹",
        "vlc": "󰕼"
    },
    "max-length": 30
}
```

## Custom Modules

### 1. HyprFlux-Specific Modules

#### Settings Menu

```json
"custom/settings": {
    "format": " ",
    "on-click": "$HOME/.config/hypr/scripts/Kool_Quick_Settings.sh",
    "tooltip-format": "Launch KooL Hyprland Settings Menu"
}
```

#### Wallpaper Controls

```json
"custom/cycle_wall": {
    "format": " ",
    "on-click": "$HOME/.config/hypr/UserScripts/WallpaperSelect.sh",
    "on-click-right": "$HOME/.config/hypr/UserScripts/WallpaperRandom.sh",
    "on-click-middle": "$HOME/.config/hypr/scripts/WaybarStyles.sh",
    "tooltip-format": "Left: Wallpaper Menu\\nMiddle: Random\\nRight: Styles"
}
```

#### Notification Center

```json
"custom/swaync": {
    "format": "{} {icon} ",
    "format-icons": {
        "notification": "<span foreground='red'><sup></sup></span>",
        "none": "",
        "dnd-notification": "<span foreground='red'><sup></sup></span>",
        "dnd-none": ""
    },
    "exec": "swaync-client -swb",
    "on-click": "swaync-client -t -sw",
    "on-click-right": "swaync-client -d -sw"
}
```

### 2. Utility Modules

#### Weather Information

```json
"custom/weather": {
    "format": "{}",
    "interval": 3600,
    "return-type": "json",
    "exec": "$HOME/.config/hypr/UserScripts/Weather.py",
    "tooltip": true
}
```

#### System Updates

```json
"custom/updater": {
    "format": " {}",
    "exec": "checkupdates | wc -l",
    "interval": 43200,
    "on-click": "$HOME/.config/hypr/scripts/Distro_update.sh",
    "tooltip-format": "Left Click: Update System"
}
```

#### Hypridle Control

```json
"custom/hypridle": {
    "format": "󱫗 ",
    "exec": "$HOME/.config/hypr/scripts/Hypridle.sh status",
    "on-click": "$HOME/.config/hypr/scripts/Hypridle.sh toggle",
    "on-click-right": "hyprlock"
}
```

## Customization Guide

### Adding New Modules

1. **Create module configuration** in `UserModules`:

```json
"custom/my_module": {
    "format": "{}",
    "exec": "echo 'Hello World'",
    "interval": 30,
    "on-click": "notify-send 'Clicked!'",
    "tooltip": true
}
```

2. **Add to layout** in your chosen config file:

```json
"modules-left": ["custom/my_module"],
"modules-center": [],
"modules-right": []
```

### Modifying Existing Modules

#### Change Update Intervals

```json
"cpu": {
    "interval": 5,  // Update every 5 seconds instead of 1
    // ... other options
}
```

#### Customize Click Actions

```json
"memory": {
    "on-click": "kitty htop",           // Left click
    "on-click-right": "gnome-system-monitor",  // Right click
    "on-click-middle": "notify-send 'Memory: $(free -h)'"  // Middle click
}
```

#### Modify Display Format

```json
"clock": {
    "format": " {:%H:%M}",              // 24-hour format
    "format-alt": " {:%I:%M %p}",       // 12-hour format
    "tooltip-format": "<big>{:%Y %B}</big>\\n<tt><small>{calendar}</small></tt>"
}
```

### Creating Custom Layouts

1. **Create new config file** in `configs/`:

```json
{
  "layer": "top",
  "position": "top",
  "height": 30,
  "modules-left": ["hyprland/workspaces", "hyprland/window"],
  "modules-center": ["clock"],
  "modules-right": ["pulseaudio", "network", "battery", "tray"]
}
```

2. **Switch layouts** using the script:

```bash
~/.config/hypr/scripts/WaybarLayout.sh
```

### Styling and Themes

#### CSS Customization

Edit files in `style/` directory:

```css
/* Custom module styling */
#custom-my_module {
  background-color: #1e1e2e;
  color: #cdd6f4;
  border-radius: 10px;
  padding: 0 10px;
  margin: 0 5px;
}

/* Hover effects */
#custom-my_module:hover {
  background-color: #313244;
  transition: all 0.3s ease;
}
```

#### Dynamic Theming

Waybar integrates with wallust for automatic color generation:

```bash
# Colors are automatically applied from
~/.config/waybar/wallust/colors-waybar.css
```

## Advanced Features

### Multi-Monitor Setup

Configure different layouts for different monitors:

```json
{
  "output": "DP-1",
  "modules-left": ["hyprland/workspaces"]
  // ... primary monitor config
}
```

```json
{
  "output": "HDMI-A-1",
  "modules-left": ["clock"]
  // ... secondary monitor config
}
```

### Conditional Modules

Show modules only when conditions are met:

```json
"custom/battery": {
    "exec-if": "test -e /sys/class/power_supply/BAT0",
    // ... only show on laptops
}
```

### Workspace Integration

```json
"hyprland/workspaces": {
    "format": "{icon}",
    "format-icons": {
        "1": "",
        "2": "",
        "3": "",
        "urgent": "",
        "default": ""
    },
    "persistent-workspaces": {
        "*": 5
    }
}
```

## Troubleshooting

### Common Issues

1. **Module not updating**: Check script permissions and paths
2. **Icons not showing**: Install required fonts (Nerd Fonts)
3. **High CPU usage**: Increase update intervals
4. **Styling issues**: Verify CSS syntax and selectors

### Debug Commands

```bash
# Test waybar configuration
waybar -c ~/.config/waybar/config -s ~/.config/waybar/style.css

# Check for errors
journalctl -f -u waybar

# Reload waybar
pkill waybar && waybar &
```

### Performance Optimization

```json
// Reduce update frequency for resource-intensive modules
"cpu": { "interval": 5 },
"memory": { "interval": 10 },
"network": { "interval": 5 }

// Disable tooltips for better performance
"tooltip": false
```

This modular approach makes Waybar highly customizable while maintaining excellent performance and visual appeal in the HyprFlux environment.

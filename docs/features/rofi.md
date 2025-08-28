# Rofi Configuration

Rofi is a powerful application launcher and window switcher that serves as the primary menu system in HyprFlux. It provides a fast, customizable, and feature-rich interface for launching applications and managing windows.

## Overview

The HyprFlux Rofi configuration features:

- Multiple specialized configurations for different use cases
- Dynamic theming with wallpaper color integration
- Custom modes for various system functions
- Elegant animations and visual effects
- Keyboard and mouse navigation support

## Configuration Structure

```
~/.config/rofi/
├── config.rasi              # Main configuration
├── master-config.rasi       # Base configuration template
├── 0-shared-fonts.rasi      # Font definitions
├── config-*.rasi           # Specialized configurations
├── wallust/                # Dynamic color schemes
└── .current_wallpaper      # Current wallpaper reference
```

## Specialized Configurations

### 1. Application Launcher (`config.rasi`)

Main application launcher with clean interface:

```rasi
configuration {
    font: "JetBrains Mono 10";
    modi: "drun,run,filebrowser";
    show-icons: true;
    display-drun: "Apps";
    display-run: "Run";
    display-filebrowser: "Files";
    drun-display-format: "{name}";
    hover-select: true;
    me-select-entry: "MouseSecondary";
    me-accept-entry: "MousePrimary";
}
```

### 2. Compact Mode (`config-compact.rasi`)

Minimal launcher for quick access:

```rasi
window {
    width: 30%;
    height: 40%;
    border-radius: 8px;
}

listview {
    lines: 8;
    columns: 1;
}
```

### 3. Calculator (`config-calc.rasi`)

Built-in calculator functionality:

```rasi
configuration {
    modi: "calc";
    show-icons: false;
    display-calc: "Calculator";
}
```

### 4. Clipboard Manager (`config-clipboard.rasi`)

Clipboard history management:

```rasi
configuration {
    modi: "clipboard:greenclip print";
    show-icons: false;
    display-clipboard: "Clipboard";
}
```

### 5. Emoji Picker (`config-emoji.rasi`)

Emoji selection interface:

```rasi
configuration {
    modi: "emoji";
    show-icons: false;
    display-emoji: "Emoji";
    font: "JetBrains Mono 14";
}
```

## Key Features

### 1. Dynamic Theming

Rofi automatically adapts to wallpaper colors through wallust integration:

```rasi
/* Load dynamic colors */
@theme "~/.config/rofi/wallust/colors-rofi.rasi"

/* Color variables */
* {
    background-alt: @selected-active-background;
    selected: #9399b2;
    active: @selected-normal-background;
    urgent: @selected;
    text-selected: #181825;
    text-color: #c6e6f3;
    border-color: @selected;
}
```

### 2. Window Styling

```rasi
window {
    enabled: true;
    fullscreen: false;
    transparency: "real";
    cursor: "default";
    spacing: 0px;
    border: 0px;
    border-radius: 14px;
    location: center;
    anchor: center;
    width: 44%;
    background-color: @background;
}
```

### 3. Input Field

```rasi
inputbar {
    enabled: true;
    spacing: 10px;
    padding: 15px;
    border-radius: 10px;
    background-color: @background-alt;
    text-color: @foreground;
}

entry {
    enabled: true;
    background-color: transparent;
    text-color: inherit;
    cursor: text;
    placeholder: "Search...";
    placeholder-color: inherit;
}
```

### 4. List View

```rasi
listview {
    enabled: true;
    columns: 1;
    lines: 8;
    cycle: true;
    dynamic: true;
    scrollbar: false;
    layout: vertical;
    reverse: false;
    fixed-height: true;
    fixed-columns: true;
    spacing: 5px;
    padding: 10px;
    margin: 0px;
    background-color: transparent;
}
```

## Specialized Use Cases

### 1. Wallpaper Selection (`config-wallpaper.rasi`)

Visual wallpaper picker with thumbnails:

```bash
# Launch wallpaper selector
~/.config/hypr/UserScripts/WallpaperSelect.sh
```

### 2. Theme Selection (`config-rofi-theme.rasi`)

Theme switching interface:

```bash
# Launch theme selector
~/.config/hypr/scripts/RofiThemeSelector.sh
```

### 3. Waybar Layout (`config-waybar-layout.rasi`)

Waybar layout switching:

```bash
# Launch layout selector
~/.config/hypr/scripts/WaybarLayout.sh
```

### 4. Monitor Profiles (`config-Monitors.rasi`)

Monitor configuration management:

```bash
# Launch monitor profile selector
~/.config/hypr/scripts/MonitorProfiles.sh
```

### 5. Animation Selector (`config-Animations.rasi`)

Hyprland animation preset selection:

```bash
# Launch animation selector
~/.config/hypr/scripts/Animations.sh
```

## Customization Guide

### Changing Appearance

#### Window Size and Position

```rasi
window {
    width: 50%;           // Adjust width (percentage or pixels)
    height: 60%;          // Adjust height
    location: center;     // north, south, east, west, center
    anchor: center;       // Anchor point
    x-offset: 0;         // Horizontal offset
    y-offset: 0;         // Vertical offset
}
```

#### Font Configuration

```rasi
configuration {
    font: "JetBrains Mono 12";  // Change font and size
}

element-text {
    font: "JetBrains Mono 14";  // Different font for elements
}
```

#### Colors and Transparency

```rasi
window {
    background-color: rgba(30, 30, 46, 0.9);  // Semi-transparent background
    border: 2px solid @border-color;          // Add border
}

element selected {
    background-color: @selected;
    text-color: @text-selected;
    border-radius: 8px;
}
```

### Adding Custom Modes

#### Create Custom Script Mode

```bash
#!/bin/bash
# ~/.config/rofi/scripts/custom-mode.sh

case "$1" in
    "Option 1")
        notify-send "Selected Option 1"
        ;;
    "Option 2")
        notify-send "Selected Option 2"
        ;;
    *)
        echo "Option 1"
        echo "Option 2"
        ;;
esac
```

#### Configure Custom Mode

```rasi
configuration {
    modi: "custom:~/.config/rofi/scripts/custom-mode.sh";
    display-custom: "Custom";
}
```

### Keyboard Shortcuts

#### Navigation

- `Arrow Keys` / `hjkl`: Navigate items
- `Tab`: Switch between modes
- `Enter`: Select item
- `Escape`: Close rofi
- `Ctrl+j/k`: Navigate with Ctrl modifier

#### Custom Keybindings

```rasi
configuration {
    kb-accept-entry: "Return,KP_Enter";
    kb-cancel: "Escape,Control+c";
    kb-mode-next: "Tab";
    kb-mode-previous: "ISO_Left_Tab";
    kb-row-up: "Up,Control+k";
    kb-row-down: "Down,Control+j";
}
```

## Advanced Features

### 1. Multi-Column Layout

```rasi
listview {
    columns: 3;           // Multiple columns
    lines: 6;            // Rows per column
    flow: horizontal;    // Fill horizontally first
}
```

### 2. Icon Configuration

```rasi
configuration {
    show-icons: true;
    icon-theme: "Papirus";
}

element-icon {
    size: 32px;          // Icon size
    margin: 0 10px 0 0;  // Icon spacing
}
```

### 3. Scrollbar Customization

```rasi
scrollbar {
    enabled: true;
    width: 4px;
    border: 0;
    handle-color: @selected;
    handle-width: 8px;
    padding: 0;
}
```

### 4. Message Display

```rasi
message {
    enabled: true;
    margin: 0px;
    padding: 10px;
    border-radius: 10px;
    background-color: @background-alt;
}

textbox {
    background-color: transparent;
    text-color: @foreground;
    vertical-align: 0.5;
    horizontal-align: 0.0;
}
```

## Integration with HyprFlux

### Hyprland Keybindings

```bash
# In UserConfigs/UserKeybinds.conf
bind = SUPER, SPACE, exec, rofi -show drun
bind = SUPER, R, exec, rofi -show run
bind = SUPER, F, exec, rofi -show filebrowser
bind = SUPER, W, exec, rofi -show window
bind = SUPER, C, exec, rofi -show calc
bind = SUPER, E, exec, rofi -show emoji
```

### Waybar Integration

```json
"custom/menu": {
    "format": "  ",
    "on-click": "pkill rofi || rofi -show drun",
    "tooltip-format": "Application Launcher"
}
```

### Script Integration

#### Wallpaper Selection

```bash
# ~/.config/hypr/UserScripts/WallpaperSelect.sh
rofi -show filebrowser -config ~/.config/rofi/config-wallpaper.rasi
```

#### Quick Settings

```bash
# Custom settings menu
rofi -dmenu -config ~/.config/rofi/config-compact.rasi \
     -p "Settings" < ~/.config/rofi/menus/settings.txt
```

## Performance Optimization

### Reduce Startup Time

```rasi
configuration {
    lazy-grab: true;          // Faster startup
    parse-hosts: false;       // Skip host parsing
    parse-known-hosts: false; // Skip known hosts
}
```

### Memory Usage

```rasi
configuration {
    cache-dir: "/tmp/rofi-cache";  // Use tmpfs for cache
    max-history-size: 25;          // Limit history
}
```

## Troubleshooting

### Common Issues

1. **Rofi not showing**: Check if another instance is running
2. **Icons not displaying**: Install icon theme and verify path
3. **Fonts not loading**: Install required fonts
4. **Colors not updating**: Check wallust integration

### Debug Commands

```bash
# Test rofi configuration
rofi -show drun -config ~/.config/rofi/config.rasi

# Check for errors
rofi -show drun -no-lazy-grab

# List available modes
rofi -show help

# Dump current configuration
rofi -dump-config
```

### Performance Monitoring

```bash
# Monitor rofi performance
time rofi -show drun -config ~/.config/rofi/config.rasi

# Check memory usage
ps aux | grep rofi
```

This comprehensive launcher system provides fast, efficient, and visually appealing access to applications and system functions, perfectly integrated with the HyprFlux desktop environment.

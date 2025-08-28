# SwayNC Configuration

SwayNC (Sway Notification Center) is a notification daemon and control center for Wayland compositors, providing a modern and customizable notification experience in HyprFlux.

## Overview

The HyprFlux SwayNC configuration features:

- Elegant notification center with control panel
- Media player controls (MPRIS integration)
- Do Not Disturb functionality
- Customizable widgets and buttons
- Dynamic theming integration
- Keyboard shortcuts support

## Configuration Files

```
~/.config/swaync/
├── config.json            # Main configuration
├── style.css             # Visual styling
├── icons/                # Custom notification icons
└── images/               # Background images and assets
```

## Key Features

### 1. Notification Management

#### Basic Configuration

```json
{
  "positionX": "right",
  "positionY": "top",
  "layer": "overlay",
  "notification-window-width": 350,
  "timeout": 6,
  "timeout-low": 3,
  "timeout-critical": 3,
  "notification-icon-size": 34,
  "notification-body-image-height": 300,
  "notification-body-image-width": 300
}
```

#### Control Center Settings

```json
{
  "control-center-layer": "top",
  "control-center-width": 330,
  "control-center-height": 900,
  "control-center-margin-top": 5,
  "control-center-margin-bottom": 0,
  "control-center-margin-right": 8,
  "control-center-margin-left": 0
}
```

### 2. Widget Configuration

#### Available Widgets

```json
{
  "widgets": [
    "dnd", // Do Not Disturb toggle
    "buttons-grid", // Custom action buttons
    "mpris", // Media player controls
    "title", // Notification center title
    "notifications" // Notification list
  ]
}
```

#### Widget Customization

```json
{
  "widget-config": {
    "title": {
      "text": " Notifications",
      "clear-all-button": true,
      "button-text": " Clear"
    },
    "dnd": {
      "text": "Do Not Disturb"
    },
    "mpris": {
      "image-size": 60,
      "image-radius": 0
    }
  }
}
```

### 3. Buttons Grid

Custom action buttons for quick access:

```json
{
  "buttons-grid": {
    "actions": [
      {
        "label": " Settings",
        "command": "$HOME/.config/hypr/scripts/Kool_Quick_Settings.sh"
      },
      {
        "label": "󰐥 Power",
        "command": "$HOME/.config/hypr/scripts/Wlogout.sh"
      },
      {
        "label": " WiFi",
        "command": "$HOME/.config/hypr/scripts/WaybarScripts.sh --nmtui"
      },
      {
        "label": " Bluetooth",
        "command": "blueman-manager"
      }
    ]
  }
}
```

### 4. Media Controls (MPRIS)

Integrated media player controls:

```json
{
  "mpris": {
    "image-size": 60,
    "image-radius": 12,
    "blur": true,
    "show-player": "all",
    "show-when-paused": true
  }
}
```

## Styling and Theming

### CSS Variables

The style.css uses CSS variables for easy theming:

```css
@define-color noti-border-color @color12;
@define-color noti-bg #0e0e16;
@define-color noti-bg-alt #0e0e16;
@define-color noti-bg-hover #0e0e16;
@define-color text-color @foreground;
```

### Notification Styling

```css
.notification {
  background: #0e0e16;
  padding: 7px 7px 7px 0px;
  border-radius: 10px;
  border: 1px solid #0e0e16;
}

.notification-group {
  background-color: transparent;
  border-radius: 10px;
}
```

### Control Center Styling

```css
.control-center .notification-row:focus,
.control-center .notification-row:hover {
  opacity: 1;
  background: #0e0e16;
  border-radius: 10px;
}

.close-button {
  background: #f7768e;
  color: #0e0e16;
  text-shadow: none;
  padding: 0;
  border-radius: 10px;
}
```

## Customization Guide

### Changing Position and Size

#### Notification Position

```json
{
  "positionX": "right", // left, center, right
  "positionY": "top", // top, center, bottom
  "notification-window-width": 350
}
```

#### Control Center Position

```json
{
  "control-center-width": 330,
  "control-center-height": 900,
  "control-center-margin-top": 5,
  "control-center-margin-right": 8
}
```

### Timeout Configuration

```json
{
  "timeout": 6, // Default timeout (seconds)
  "timeout-low": 3, // Low priority notifications
  "timeout-critical": 0, // Critical notifications (0 = no timeout)
  "hide-on-clear": false,
  "hide-on-action": true
}
```

### Custom Buttons

Add custom action buttons to the control center:

```json
{
  "buttons-grid": {
    "actions": [
      {
        "label": " Terminal",
        "command": "kitty"
      },
      {
        "label": " File Manager",
        "command": "thunar"
      },
      {
        "label": " Browser",
        "command": "firefox"
      },
      {
        "label": "󰒲 System Monitor",
        "command": "gnome-system-monitor"
      }
    ]
  }
}
```

### Widget Ordering

Customize widget order and visibility:

```json
{
  "widgets": [
    "title",
    "dnd",
    "buttons-grid",
    "mpris",
    "volume",
    "backlight",
    "notifications"
  ]
}
```

### Volume and Backlight Widgets

```json
{
  "widget-config": {
    "volume": {
      "label": "󰕾",
      "show-per-app": true
    },
    "backlight": {
      "label": "󰃞",
      "device": "intel_backlight"
    }
  }
}
```

## Advanced Features

### Keyboard Shortcuts

Enable keyboard navigation:

```json
{
  "keyboard-shortcuts": true,
  "shortcuts": {
    "toggle": "Super+n",
    "clear-all": "Super+shift+n",
    "dnd-toggle": "Super+d"
  }
}
```

### Scripting Integration

#### Custom Scripts

```json
{
  "script-fail-notify": true,
  "scripts": {
    "notification-received": "$HOME/.config/swaync/scripts/on-notification.sh",
    "notification-cleared": "$HOME/.config/swaync/scripts/on-clear.sh"
  }
}
```

#### Example Script

```bash
#!/bin/bash
# ~/.config/swaync/scripts/on-notification.sh

# Play notification sound
paplay /usr/share/sounds/freedesktop/stereo/message-new-instant.oga

# Log notification
echo "$(date): Notification received" >> ~/.local/share/swaync/notifications.log
```

### Image and Icon Configuration

```json
{
  "image-visibility": "when-available",
  "notification-icon-size": 34,
  "notification-body-image-height": 300,
  "notification-body-image-width": 300,
  "fit-to-screen": false
}
```

### Layer Configuration

```json
{
  "layer": "overlay", // overlay, top, bottom
  "layer-shell": true,
  "control-center-layer": "top",
  "cssPriority": "user"
}
```

## Integration with HyprFlux

### Waybar Integration

SwayNC integrates seamlessly with Waybar:

```json
// In Waybar ModulesCustom
"custom/swaync": {
  "tooltip": true,
  "format": "{} {icon} ",
  "format-icons": {
    "notification": "<span foreground='red'><sup></sup></span>",
    "none": "",
    "dnd-notification": "<span foreground='red'><sup></sup></span>",
    "dnd-none": ""
  },
  "return-type": "json",
  "exec": "swaync-client -swb",
  "on-click": "swaync-client -t -sw",
  "on-click-right": "swaync-client -d -sw"
}
```

### Hyprland Integration

#### Startup Configuration

```bash
# In UserConfigs/Startup_Apps.conf
exec-once = swaync
```

#### Keybindings

```bash
# In UserConfigs/UserKeybinds.conf
bind = SUPER, N, exec, swaync-client -t -sw
bind = SUPER SHIFT, N, exec, swaync-client -d -sw
bind = SUPER CTRL, N, exec, swaync-client -C
```

### Dynamic Theming

SwayNC automatically adapts to wallpaper colors through wallust integration:

```css
/* Colors are automatically updated from wallust */
@import url("~/.config/swaync/wallust/colors-swaync.css");
```

## Command Line Usage

### Basic Commands

```bash
# Toggle notification center
swaync-client -t -sw

# Toggle Do Not Disturb
swaync-client -d -sw

# Clear all notifications
swaync-client -C

# Send test notification
notify-send "Test" "This is a test notification"

# Get notification count
swaync-client -c

# Subscribe to events
swaync-client -swb
```

### Advanced Commands

```bash
# Close specific notification by ID
swaync-client -close-id 123

# Get notification history
swaync-client -get-dnd

# Reload configuration
swaync-client -R

# Get inhibitors
swaync-client -get-inhibitors
```

## Troubleshooting

### Common Issues

1. **Notifications not showing**: Check if swaync daemon is running
2. **Styling not applied**: Verify CSS syntax and file permissions
3. **Media controls not working**: Ensure MPRIS-compatible media player
4. **Buttons not working**: Check script paths and permissions

### Debug Commands

```bash
# Check if swaync is running
pgrep swaync

# Start swaync with debug output
swaync -d

# Check configuration syntax
swaync --config ~/.config/swaync/config.json --style ~/.config/swaync/style.css

# View logs
journalctl -f -u swaync
```

### Performance Optimization

```json
{
  "transition-time": 200, // Reduce for faster animations
  "image-visibility": "never", // Disable images for better performance
  "fit-to-screen": true // Better for small screens
}
```

## Custom Themes

### Creating Custom Themes

1. **Copy base style**:

```bash
cp ~/.config/swaync/style.css ~/.config/swaync/themes/my-theme.css
```

2. **Modify colors**:

```css
@define-color noti-bg #your-color;
@define-color text-color #your-text-color;
```

3. **Apply theme**:

```json
{
  "cssPriority": "user",
  "style": "~/.config/swaync/themes/my-theme.css"
}
```

::: tip Cava Official Docs
More Details : https://man.archlinux.org/man/swaync.5.en
:::

# Wlogout Configuration

Wlogout is a logout menu for Wayland compositors that provides a clean and intuitive interface for session management in HyprFlux, including options to logout, reboot, shutdown, suspend, and lock the screen.

## Overview

The HyprFlux Wlogout configuration features:

- Clean, modern logout interface
- Multiple session management options
- Dynamic theming integration
- Keyboard and mouse navigation
- Customizable button layouts and actions

## Configuration Structure

```
~/.config/wlogout/
├── layout                  # Button layout configuration
├── style.css              # Visual styling
├── icons/                 # Custom icons
└── wallust/               # Dynamic color schemes
```

## Key Features

### 1. Session Management Options

#### Available Actions

- **Lock**: Lock the screen using hyprlock
- **Logout**: Exit the current session
- **Suspend**: Suspend the system to RAM
- **Hibernate**: Hibernate the system to disk
- **Reboot**: Restart the system
- **Shutdown**: Power off the system

#### Layout Configuration

```json
{
    "label" : "lock",
    "action" : "hyprlock",
    "text" : "Lock",
    "keybind" : "l"
}
{
    "label" : "logout",
    "action" : "hyprctl dispatch exit",
    "text" : "Logout",
    "keybind" : "e"
}
{
    "label" : "suspend",
    "action" : "systemctl suspend",
    "text" : "Suspend",
    "keybind" : "u"
}
{
    "label" : "hibernate",
    "action" : "systemctl hibernate",
    "text" : "Hibernate",
    "keybind" : "h"
}
{
    "label" : "shutdown",
    "action" : "systemctl poweroff",
    "text" : "Shutdown",
    "keybind" : "s"
}
{
    "label" : "reboot",
    "action" : "systemctl reboot",
    "text" : "Reboot",
    "keybind" : "r"
}
```

### 2. Visual Styling

#### Window Appearance

```css
window {
  font-family: "JetBrains Mono Nerd Font";
  font-size: 12pt;
  color: #cdd6f4;
  background-color: rgba(30, 30, 46, 0.9);
}

button {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 25%;
  border-style: solid;
  border-width: 3px;
  background-color: rgba(12, 12, 12, 0.3);
  border-color: #313244;
  margin: 5px;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
}
```

#### Button States

```css
button:hover {
  background-color: rgba(49, 50, 68, 0.1);
  border-color: #89b4fa;
  transform: scale(1.05);
}

button:focus {
  background-color: rgba(137, 180, 250, 0.2);
  border-color: #89b4fa;
}
```

### 3. Icon Configuration

#### Custom Icons

```css
#lock {
  background-image: image(url("icons/lock.png"));
}

#logout {
  background-image: image(url("icons/logout.png"));
}

#suspend {
  background-image: image(url("icons/suspend.png"));
}

#hibernate {
  background-image: image(url("icons/hibernate.png"));
}

#reboot {
  background-image: image(url("icons/reboot.png"));
}

#shutdown {
  background-image: image(url("icons/shutdown.png"));
}
```

## Customization Guide

### Modifying Button Layout

#### Change Button Order

Edit the layout file to reorder buttons:

```json
{
    "label" : "shutdown",
    "action" : "systemctl poweroff",
    "text" : "Shutdown",
    "keybind" : "s"
}
{
    "label" : "reboot",
    "action" : "systemctl reboot",
    "text" : "Reboot",
    "keybind" : "r"
}
{
    "label" : "lock",
    "action" : "hyprlock",
    "text" : "Lock",
    "keybind" : "l"
}
```

#### Add Custom Actions

```json
{
    "label" : "settings",
    "action" : "$HOME/.config/hypr/scripts/Kool_Quick_Settings.sh",
    "text" : "Settings",
    "keybind" : "t"
}
{
    "label" : "wallpaper",
    "action" : "$HOME/.config/hypr/UserScripts/WallpaperSelect.sh",
    "text" : "Wallpaper",
    "keybind" : "w"
}
```

#### Remove Buttons

Simply delete unwanted button entries from the layout file.

### Styling Customization

#### Change Colors

```css
window {
  background-color: rgba(0, 0, 0, 0.8); /* Darker background */
  color: #ffffff; /* White text */
}

button {
  background-color: rgba(255, 255, 255, 0.1); /* Light buttons */
  border-color: #ffffff; /* White borders */
}

button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: #00ff00; /* Green hover */
}
```

#### Modify Button Size and Spacing

```css
button {
  margin: 10px; /* Increase spacing */
  border-radius: 15px; /* Change roundness */
  min-width: 120px; /* Set minimum width */
  min-height: 120px; /* Set minimum height */
}
```

#### Font Customization

```css
window {
  font-family: "Noto Sans";
  font-size: 14pt;
  font-weight: bold;
}
```

### Animation Effects

#### Entrance Animation

```css
window {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

#### Button Animations

```css
button {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

button:hover {
  transform: scale(1.1) rotate(2deg);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
```

## Advanced Configuration

### 1. Conditional Actions

#### Different Actions Based on System State

```bash
#!/bin/bash
# ~/.config/wlogout/scripts/smart-suspend.sh

if [ "$(cat /sys/class/power_supply/BAT*/status 2>/dev/null)" = "Charging" ]; then
    systemctl suspend
else
    systemctl hibernate
fi
```

#### Battery-Aware Actions

```json
{
  "label": "suspend",
  "action": "$HOME/.config/wlogout/scripts/smart-suspend.sh",
  "text": "Sleep",
  "keybind": "s"
}
```

### 2. Multi-Monitor Support

#### Position on Specific Monitor

```css
window {
  /* Position on primary monitor */
  margin-left: 1920px; /* Offset for second monitor */
}
```

### 3. Confirmation Dialogs

#### Add Confirmation for Destructive Actions

```bash
#!/bin/bash
# ~/.config/wlogout/scripts/confirm-shutdown.sh

if zenity --question --text="Are you sure you want to shutdown?"; then
    systemctl poweroff
fi
```

```json
{
  "label": "shutdown",
  "action": "$HOME/.config/wlogout/scripts/confirm-shutdown.sh",
  "text": "Shutdown",
  "keybind": "s"
}
```

## Integration with HyprFlux

### Hyprland Integration

#### Keybinding

```bash
# In UserConfigs/UserKeybinds.conf
bind = SUPER, X, exec, wlogout
bind = SUPER SHIFT, Q, exec, wlogout --protocol layer-shell
```

#### Window Rules

```bash
# In UserConfigs/WindowRules.conf
layerrule = blur, wlogout
layerrule = ignorezero, wlogout
```

### Waybar Integration

```json
"custom/power": {
    "format": " ⏻ ",
    "on-click": "wlogout",
    "tooltip-format": "Power Menu"
}
```

### Script Integration

#### Launch from Scripts

```bash
# ~/.config/hypr/scripts/Wlogout.sh
#!/bin/bash

# Check if wlogout is already running
if pgrep -x "wlogout" > /dev/null; then
    pkill wlogout
else
    wlogout --protocol layer-shell
fi
```

### Dynamic Theming

#### Wallust Integration

```css
/* Import dynamic colors */
@import url("~/.config/wlogout/wallust/colors-wlogout.css");

window {
  background-color: @background;
  color: @foreground;
}

button {
  border-color: @color4;
}

button:hover {
  background-color: @color1;
  border-color: @color5;
}
```

## Command Line Usage

### Basic Commands

```bash
# Launch wlogout
wlogout

# Launch with specific protocol
wlogout --protocol layer-shell

# Launch with custom layout
wlogout --layout ~/.config/wlogout/custom-layout

# Launch with custom CSS
wlogout --css ~/.config/wlogout/custom-style.css

# Show help
wlogout --help
```

### Advanced Options

```bash
# Set button columns
wlogout --columns 3

# Set button rows
wlogout --rows 2

# Set margins
wlogout --margin-top 100 --margin-bottom 100

# Disable blur
wlogout --no-blur
```

## Troubleshooting

### Common Issues

1. **Wlogout not showing**: Check if layer-shell protocol is supported
2. **Buttons not working**: Verify script permissions and paths
3. **Styling not applied**: Check CSS syntax and file paths
4. **Icons not displaying**: Ensure icon files exist and paths are correct

### Debug Commands

```bash
# Test wlogout configuration
wlogout --css ~/.config/wlogout/style.css --layout ~/.config/wlogout/layout

# Check for errors
journalctl -f | grep wlogout

# Validate layout file
cat ~/.config/wlogout/layout | jq .

# Test individual actions
systemctl --dry-run poweroff
```

### Performance Optimization

```css
/* Reduce animations for better performance */
button {
  transition: none;
}

window {
  animation: none;
}

/* Optimize rendering */
* {
  will-change: auto;
}
```

::: tip Wlogout Official Docs
More Details : https://github.com/ArtsyMacaw/wlogout
:::

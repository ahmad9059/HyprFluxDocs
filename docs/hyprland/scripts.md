# Scripts Directory

The `scripts/` directory contains utility scripts for system management, theming, automation, and desktop functionality. These scripts provide the core functionality that powers many HyprFlux features.

## Script Categories

### System Management

- **[System Control](#system-control)**: Power management, updates, and system utilities
- **[Hardware Control](#hardware-control)**: Brightness, volume, battery, and device management
- **[Process Management](#process-management)**: Application and service control

### Desktop Environment

- **[Window Management](#window-management)**: Layout switching, window control, and workspace management
- **[Theming](#theming)**: Theme switching, wallpaper management, and visual customization
- **[Interface](#interface)**: Waybar, rofi, and UI component management

### User Interaction

- **[Input/Output](#input-output)**: Screenshots, clipboard, keyboard, and media controls
- **[Launchers](#launchers)**: Application launchers and menu systems
- **[Utilities](#utilities)**: Helper scripts and convenience functions

## System Control

### AirplaneMode.sh

**Purpose**: Toggle airplane mode (disable/enable wireless connections)
**Usage**: `./AirplaneMode.sh`
**Features**: Toggles WiFi and Bluetooth simultaneously

### Battery.sh

**Purpose**: Battery status monitoring and power management
**Usage**: `./Battery.sh [--status|--percentage|--time]`
**Features**: Battery info display, low battery warnings

### Distro_update.sh

**Purpose**: System package updates with notifications
**Usage**: `./Distro_update.sh`
**Features**: Arch/AUR updates, progress notifications, error handling

### GameMode.sh

**Purpose**: Toggle gaming optimizations and performance mode
**Usage**: `./GameMode.sh [--on|--off|--toggle]`
**Features**: Performance tweaks, notification suppression, resource optimization

### Hypridle.sh

**Purpose**: Manage hypridle daemon (idle management)
**Usage**: `./Hypridle.sh [start|stop|restart|status|toggle]`
**Features**: Idle timeout control, power management integration

### KooLsDotsUpdate.sh

**Purpose**: Update HyprFlux configuration from repository
**Usage**: `./KooLsDotsUpdate.sh`
**Features**: Git-based updates, backup creation, conflict resolution

### Polkit.sh / Polkit-NixOS.sh

**Purpose**: Authentication agent management
**Usage**: `./Polkit.sh`
**Features**: Privilege escalation, secure authentication

### PortalHyprland.sh

**Purpose**: XDG desktop portal management for Hyprland
**Usage**: `./PortalHyprland.sh`
**Features**: File picker integration, screen sharing setup

### UptimeNixOS.sh

**Purpose**: System uptime display for NixOS systems
**Usage**: `./UptimeNixOS.sh`
**Features**: Formatted uptime output, system statistics

## Hardware Control

### Brightness.sh

**Purpose**: Screen brightness control with smooth transitions
**Usage**: `./Brightness.sh [--inc|--dec|--set VALUE]`
**Features**: Smooth brightness changes, OSD notifications, multi-monitor support

### BrightnessKbd.sh

**Purpose**: Keyboard backlight brightness control
**Usage**: `./BrightnessKbd.sh [--inc|--dec|--set VALUE]`
**Features**: Keyboard backlight adjustment, brightness persistence

### SwitchKeyboardLayout.sh

**Purpose**: Cycle through keyboard layouts
**Usage**: `./SwitchKeyboardLayout.sh`
**Features**: Layout switching, layout indicator updates, persistence

### TouchPad.sh

**Purpose**: Touchpad enable/disable toggle
**Usage**: `./TouchPad.sh [--on|--off|--toggle]`
**Features**: Touchpad control, status notifications

### Volume.sh

**Purpose**: Audio volume and microphone control
**Usage**: `./Volume.sh [--inc|--dec|--toggle|--mic-inc|--mic-dec|--toggle-mic]`
**Features**: Volume adjustment, mute toggle, microphone control, OSD notifications

## Window Management

### ChangeLayout.sh

**Purpose**: Switch between Hyprland layout algorithms
**Usage**: `./ChangeLayout.sh [dwindle|master]`
**Features**: Layout switching, window reorganization

### KillActiveProcess.sh

**Purpose**: Force kill the currently active window/process
**Usage**: `./KillActiveProcess.sh`
**Features**: Safe process termination, confirmation dialogs

### MonitorProfiles.sh

**Purpose**: Switch between predefined monitor configurations
**Usage**: `./MonitorProfiles.sh`
**Features**: Profile selection via rofi, monitor setup automation

### Refresh.sh

**Purpose**: Reload Hyprland configuration and restart services
**Usage**: `./Refresh.sh`
**Features**: Config reload, waybar restart, theme reapplication

### RefreshNoWaybar.sh

**Purpose**: Reload Hyprland configuration without restarting waybar
**Usage**: `./RefreshNoWaybar.sh`
**Features**: Minimal reload, faster refresh

## Theming

### Animations.sh

**Purpose**: Switch between animation presets
**Usage**: `./Animations.sh`
**Features**: Animation preset selection, performance optimization

### ChangeBlur.sh

**Purpose**: Toggle blur effects on/off
**Usage**: `./ChangeBlur.sh`
**Features**: Blur toggle, performance optimization

### DarkLight.sh

**Purpose**: Switch between dark and light themes
**Usage**: `./DarkLight.sh`
**Features**: System-wide theme switching, application integration

### Kitty_themes.sh

**Purpose**: Change Kitty terminal color schemes
**Usage**: `./Kitty_themes.sh`
**Features**: Theme selection, live preview, persistence

### RofiThemeSelector.sh / RofiThemeSelector-modified.sh

**Purpose**: Select and apply rofi themes
**Usage**: `./RofiThemeSelector.sh`
**Features**: Theme preview, instant application

### WallustSwww.sh

**Purpose**: Generate color schemes from wallpapers using wallust
**Usage**: `./WallustSwww.sh [WALLPAPER_PATH]`
**Features**: Color extraction, theme generation, system-wide application

## Interface

### WaybarCava.sh

**Purpose**: Audio visualizer integration for waybar
**Usage**: `./WaybarCava.sh`
**Features**: Real-time audio visualization, waybar module output

### WaybarLayout.sh

**Purpose**: Switch between waybar layout configurations
**Usage**: `./WaybarLayout.sh`
**Features**: Layout selection, instant switching

### WaybarScripts.sh

**Purpose**: Waybar module helper functions
**Usage**: `./WaybarScripts.sh [--btop|--nvtop|--files|--term|--nmtui]`
**Features**: Quick application launchers, system monitors

### WaybarStyles.sh

**Purpose**: Switch between waybar visual styles
**Usage**: `./WaybarStyles.sh`
**Features**: Style selection, CSS switching

### Wlogout.sh

**Purpose**: Launch logout/power menu
**Usage**: `./Wlogout.sh`
**Features**: Session management, power options

## Input/Output

### ClipManager.sh

**Purpose**: Clipboard history management
**Usage**: `./ClipManager.sh`
**Features**: Clipboard history, rofi integration

### KeyBinds.sh

**Purpose**: Display current keybindings
**Usage**: `./KeyBinds.sh`
**Features**: Keybinding reference, searchable list

### KeyHints.sh

**Purpose**: Show helpful keyboard shortcuts
**Usage**: `./KeyHints.sh`
**Features**: Quick tips, beginner guidance

### MediaCtrl.sh

**Purpose**: Media player control (play/pause/next/previous)
**Usage**: `./MediaCtrl.sh [play|pause|next|prev|toggle]`
**Features**: MPRIS integration, multi-player support

### ScreenShot.sh

**Purpose**: Screenshot capture with various modes
**Usage**: `./ScreenShot.sh [--now|--area|--win|--delay]`
**Features**: Full screen, area selection, window capture, clipboard integration

## Launchers

### Dropterminal.sh

**Purpose**: Toggle dropdown terminal
**Usage**: `./Dropterminal.sh`
**Features**: Quake-style terminal, toggle visibility

### Kool_Quick_Settings.sh

**Purpose**: Quick settings menu launcher
**Usage**: `./Kool_Quick_Settings.sh`
**Features**: System settings access, configuration shortcuts

### LockScreen.sh

**Purpose**: Lock screen activation
**Usage**: `./LockScreen.sh`
**Features**: Secure screen locking, idle integration

### RofiEmoji.sh

**Purpose**: Emoji picker using rofi
**Usage**: `./RofiEmoji.sh`
**Features**: Emoji selection, clipboard integration

### RofiSearch.sh

**Purpose**: Web search launcher
**Usage**: `./RofiSearch.sh`
**Features**: Search engine integration, quick web searches

## Utilities

### Sounds.sh

**Purpose**: System sound management and testing
**Usage**: `./Sounds.sh [--test|--enable|--disable]`
**Features**: Sound theme management, audio testing

### Tak0-Autodispatch.sh

**Purpose**: Automatic window dispatching based on rules
**Usage**: `./Tak0-Autodispatch.sh`
**Features**: Smart window placement, rule-based automation

### Tak0-Per-Window-Switch.sh

**Purpose**: Per-window keyboard layout switching
**Usage**: `./Tak0-Per-Window-Switch.sh`
**Features**: Application-specific layouts, automatic switching

## Script Usage Patterns

### Common Parameters

- `--help` or `-h`: Display help information
- `--version` or `-v`: Show script version
- `--verbose`: Enable verbose output
- `--dry-run`: Show what would be done without executing

### Integration Examples

#### Waybar Integration

```json
"custom/brightness": {
    "exec": "~/.config/hypr/scripts/Brightness.sh --get",
    "on-scroll-up": "~/.config/hypr/scripts/Brightness.sh --inc",
    "on-scroll-down": "~/.config/hypr/scripts/Brightness.sh --dec"
}
```

#### Keybinding Integration

```bash
bind = SUPER, Print, exec, ~/.config/hypr/scripts/ScreenShot.sh --area
bind = , XF86AudioRaiseVolume, exec, ~/.config/hypr/scripts/Volume.sh --inc
bind = SUPER, L, exec, ~/.config/hypr/scripts/LockScreen.sh
```

#### Startup Integration

```bash
exec-once = ~/.config/hypr/scripts/PortalHyprland.sh
exec-once = ~/.config/hypr/scripts/Polkit.sh
```

## Development Guidelines

### Script Standards

- Use bash shebang: `#!/bin/bash`
- Include error handling
- Provide help information
- Use consistent parameter naming
- Include logging for debugging

### Error Handling

```bash
set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Function for error messages
error() {
    echo "Error: $1" >&2
    exit 1
}

# Check dependencies
command -v hyprctl >/dev/null 2>&1 || error "hyprctl not found"
```

### Logging

```bash
# Log file location
LOG_FILE="$HOME/.local/share/hyprflux/logs/script.log"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}
```

This script ecosystem provides comprehensive functionality for managing and customizing the HyprFlux desktop environment.

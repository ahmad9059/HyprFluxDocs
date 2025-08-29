# Startup_Apps.conf

Startup applications configuration file that defines which applications, services, and scripts are automatically launched when HyprFlux starts. This file manages the initialization of the desktop environment and user applications.

## Purpose

- **System Initialization**: Launches essential system services and daemons
- **Desktop Environment Setup**: Starts core HyprFlux components
- **User Applications**: Automatically opens frequently used applications
- **Service Management**: Configures background services and utilities

## File Location

```
~/.config/hypr/UserConfigs/Startup_Apps.conf
```

## Configuration Structure

### Variables and Paths

```bash
$scriptsDir = $HOME/.config/hypr/scripts
$UserScripts = $HOME/.config/hypr/UserScripts

$wallDIR=$HOME/Pictures/wallpapers
$lock = $scriptsDir/LockScreen.sh
$SwwwRandom = $UserScripts/WallpaperAutoChange.sh
$livewallpaper=""
```

#### Path Variables

- **$scriptsDir**: System scripts directory
- **$UserScripts**: User scripts directory
- **$wallDIR**: Wallpaper directory
- **$lock**: Lock screen script path
- **$SwwwRandom**: Random wallpaper script
- **$livewallpaper**: Live wallpaper path (empty by default)

### Wallpaper System

#### SWWW Daemon (Wallpaper Manager)

```bash
# wallpaper stuff
exec-once = swww-daemon --format xrgb
#exec-once = mpvpaper '*' -o "load-scripts=no no-audio --loop" $livewallpaper
```

**SWWW Configuration**:

- **swww-daemon**: Wallpaper daemon with XRGB format
- **mpvpaper**: Live wallpaper support (commented out)

#### Automatic Wallpaper Rotation

```bash
# wallpaper random
#exec-once = $SwwwRandom $wallDIR # random wallpaper switcher every 30 minutes
```

**Purpose**: Automatically changes wallpapers every 30 minutes (disabled by default)

### System Services

#### D-Bus and Environment Setup

```bash
# Startup
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
```

**Purpose**:

- Updates D-Bus activation environment for Wayland
- Imports environment variables into systemd user session

#### Authentication Agent

```bash
# Polkit (Polkit Gnome / KDE)
exec-once = $scriptsDir/Polkit.sh
```

**Purpose**: Starts authentication agent for privilege escalation

### Core Applications

#### Essential System Components

```bash
# starup apps
exec-once = nm-applet --indicator
exec-once = swaync
#exec-once = ags
#exec-once = blueman-applet
#exec-once = rog-control-center
exec-once = waybar
exec-once = qs # quickshell AGS Desktop Overview alternative
```

**Core Components**:

- **nm-applet**: Network manager system tray applet
- **swaync**: Notification daemon
- **waybar**: Status bar
- **qs (quickshell)**: Desktop overview alternative to AGS

**Optional Components** (commented out):

- **ags**: Another desktop shell
- **blueman-applet**: Bluetooth manager applet
- **rog-control-center**: ASUS ROG control center

#### Clipboard Management

```bash
#clipboard manager
exec-once = wl-paste --type text --watch cliphist store
exec-once = wl-paste --type image --watch cliphist store
```

**Purpose**:

- Monitors clipboard for text content
- Monitors clipboard for image content
- Stores clipboard history using cliphist

### User Features

#### Visual Effects

```bash
# Rainbow borders
# exec-once = $UserScripts/RainbowBorders.sh
```

**Purpose**: Animated rainbow window borders (disabled by default)

#### Idle Management

```bash
# Starting hypridle to start hyprlock
exec-once = hypridle
```

**Purpose**: Starts idle management daemon for automatic screen locking

### Optional Features

#### Persistent Wallpaper

```bash
# Here are list of features available but disabled by default
# exec-once = swww-daemon --format xrgb && swww img $HOME/Pictures/wallpapers/mecha-nostalgia.png  # persistent wallpaper
```

**Purpose**: Set a specific wallpaper on startup (disabled by default)

#### NixOS-Specific Services

```bash
#gnome polkit for nixos
#exec-once = $scriptsDir/Polkit-NixOS.sh
```

**Purpose**: NixOS-specific authentication agent

#### XDG Desktop Portal

```bash
# xdg-desktop-portal-hyprland (should be auto starting. However, you can force to start)
#exec-once = $scriptsDir/PortalHyprland.sh
```

**Purpose**: Desktop portal for file dialogs and screen sharing (usually auto-starts)

## Customization Examples

### Minimal Startup (Performance Focused)

```bash
# Essential services only
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = $scriptsDir/Polkit.sh
exec-once = swww-daemon --format xrgb
exec-once = waybar
exec-once = hypridle
```

### Full-Featured Startup

```bash
# All features enabled
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = $scriptsDir/Polkit.sh
exec-once = swww-daemon --format xrgb
exec-once = nm-applet --indicator
exec-once = blueman-applet
exec-once = swaync
exec-once = waybar
exec-once = qs
exec-once = wl-paste --type text --watch cliphist store
exec-once = wl-paste --type image --watch cliphist store
exec-once = hypridle
exec-once = $SwwwRandom $wallDIR
exec-once = $UserScripts/RainbowBorders.sh
```

### Development Environment Startup

```bash
# Development-focused startup
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = $scriptsDir/Polkit.sh
exec-once = swww-daemon --format xrgb
exec-once = waybar
exec-once = swaync
exec-once = hypridle

# Development applications
exec-once = [workspace 1 silent] code
exec-once = [workspace 2 silent] firefox
exec-once = [workspace 3 silent] kitty
exec-once = [workspace 4 silent] discord
```

### Gaming Setup Startup

```bash
# Gaming-optimized startup (minimal)
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = $scriptsDir/Polkit.sh
exec-once = swww-daemon --format xrgb
exec-once = waybar
exec-once = hypridle

# Gaming applications
exec-once = [workspace 8 silent] steam
exec-once = [workspace 4 silent] discord
```

## Advanced Startup Configuration

### Conditional Startup

```bash
# Start applications based on conditions
exec-once = [[ -f "$HOME/.config/development" ]] && code
exec-once = [[ "$(hostname)" == "work-laptop" ]] && thunderbird
exec-once = [[ -d "$HOME/Games" ]] && steam
```

### Delayed Startup

```bash
# Start applications with delays
exec-once = sleep 2 && firefox
exec-once = sleep 5 && discord
exec-once = sleep 10 && spotify
```

### Workspace-Specific Startup

```bash
# Start applications on specific workspaces
exec-once = [workspace 1 silent] firefox
exec-once = [workspace 2 silent] code
exec-once = [workspace 3 silent] thunar
exec-once = [workspace 4 silent] discord
exec-once = [workspace 5 silent] spotify
```

### Floating Application Startup

```bash
# Start applications in floating mode
exec-once = [float] pavucontrol
exec-once = [float] blueman-manager
exec-once = [float] nm-connection-editor
```

## Service Management

### Essential Services

```bash
# Core system services (always needed)
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = $scriptsDir/Polkit.sh
exec-once = swww-daemon --format xrgb
exec-once = hypridle
```

### Optional Services

```bash
# Optional services (enable as needed)
exec-once = nm-applet --indicator          # Network management
exec-once = blueman-applet                 # Bluetooth management
exec-once = swaync                         # Notifications
exec-once = waybar                         # Status bar
exec-once = wl-paste --type text --watch cliphist store  # Clipboard
```

### User Services

```bash
# User-specific services
exec-once = $UserScripts/WallpaperAutoChange.sh $wallDIR  # Auto wallpaper
exec-once = $UserScripts/RainbowBorders.sh                # Visual effects
exec-once = $UserScripts/SyncDotfiles.sh                  # Config sync
```

## Application Categories

### Communication Applications

```bash
# Communication suite
exec-once = [workspace 4 silent] discord
exec-once = [workspace 4 silent] telegram
exec-once = [workspace 4 silent] thunderbird
exec-once = [workspace 4 silent] slack
```

### Development Tools

```bash
# Development environment
exec-once = [workspace 1 silent] code
exec-once = [workspace 1 silent] jetbrains-toolbox
exec-once = [workspace 2 silent] firefox
exec-once = [workspace 3 silent] kitty
```

### Media Applications

```bash
# Media and entertainment
exec-once = [workspace 5 silent] spotify
exec-once = [workspace 5 silent] vlc
exec-once = [workspace 5 silent] obs
```

### Productivity Applications

```bash
# Productivity suite
exec-once = [workspace 6 silent] libreoffice
exec-once = [workspace 6 silent] obsidian
exec-once = [workspace 6 silent] thunderbird
```

## Troubleshooting

### Common Issues

#### Applications Not Starting

```bash
# Check if application exists
which your-application

# Test application manually
your-application &

# Check application permissions
ls -la /usr/bin/your-application
```

#### Services Not Running

```bash
# Check if service is running
pgrep service-name

# Check service logs
journalctl -u service-name --follow

# Restart service manually
systemctl --user restart service-name
```

#### Startup Delays

```bash
# Add delays between applications
exec-once = application1
exec-once = sleep 2 && application2
exec-once = sleep 5 && application3
```

### Debug Commands

```bash
# Check what's running
ps aux | grep -E "(waybar|swaync|hypridle)"

# Check startup applications
hyprctl clients

# Monitor startup process
journalctl -f | grep -E "(hyprland|exec-once)"

# Test startup command manually
swww-daemon --format xrgb &
```

### Validation

#### Verify Startup Applications

```bash
# Check if applications started correctly
pgrep -f waybar
pgrep -f swaync
pgrep -f hypridle

# Check application windows
hyprctl clients | grep -E "(waybar|discord|firefox)"
```

#### Test Startup Performance

```bash
# Measure startup time
time hyprland

# Monitor resource usage during startup
htop

# Check for startup errors
journalctl -u hyprland --since "5 minutes ago"
```

## Best Practices

### Startup Optimization

#### Prioritize Essential Services

```bash
# Start essential services first
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = $scriptsDir/Polkit.sh
exec-once = swww-daemon --format xrgb

# Then start user applications
exec-once = sleep 2 && waybar
exec-once = sleep 3 && swaync
```

#### Use Silent Workspace Assignment

```bash
# Prevent workspace switching during startup
exec-once = [workspace 1 silent] firefox
exec-once = [workspace 2 silent] code
exec-once = [workspace 4 silent] discord
```

### Configuration Management

#### Document Startup Applications

```bash
# Add comments for startup applications
exec-once = waybar                    # Status bar
exec-once = swaync                    # Notification daemon
exec-once = hypridle                  # Idle management
exec-once = [workspace 1 silent] firefox  # Default browser
```

#### Environment-Specific Configurations

```bash
# Different startup configs for different environments
if [[ "$(hostname)" == "work-laptop" ]]; then
    exec-once = [workspace 1 silent] thunderbird
    exec-once = [workspace 2 silent] teams
elif [[ "$(hostname)" == "gaming-pc" ]]; then
    exec-once = [workspace 8 silent] steam
    exec-once = [workspace 4 silent] discord
fi
```

### Performance Considerations

#### Minimize Startup Applications

```bash
# Only start applications you actually use
# Comment out unnecessary applications
# Use on-demand launching instead of startup for rarely used apps
```

#### Stagger Application Startup

```bash
# Prevent system overload during startup
exec-once = essential-service
exec-once = sleep 1 && secondary-service
exec-once = sleep 3 && user-application
```

This startup applications configuration provides comprehensive control over the HyprFlux initialization process, allowing users to customize their desktop environment startup while maintaining system performance and reliability.

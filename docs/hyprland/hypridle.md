# hypridle.conf

Hypridle configuration file that manages system idle behavior, power management, and automatic screen locking in HyprFlux. It provides progressive power-saving measures and integrates seamlessly with hyprlock.

## Purpose

- **Idle Management**: Monitors user activity and triggers actions after specified timeouts
- **Power Saving**: Implements progressive power-saving measures
- **Screen Locking**: Automatically locks the screen for security
- **System Integration**: Coordinates with power management and lock screen systems

## File Location

```
~/.config/hypr/hypridle.conf
```

## Configuration Structure

### Global Settings

```bash
$iDIR="$HOME/.config/swaync/images/ja.png"  # Notification icon path

general {
    lock_cmd = pidof hyprlock || hyprlock
    before_sleep_cmd = loginctl lock-session
    after_sleep_cmd = hyprctl dispatch dpms on
    ignore_dbus_inhibit = false
}
```

### General Configuration Options

#### Lock Command

```bash
lock_cmd = pidof hyprlock || hyprlock
```

- **Purpose**: Command executed when locking is triggered
- **Logic**: Only starts hyprlock if it's not already running
- **Integration**: Works with `loginctl lock-session`

#### Sleep Management

```bash
before_sleep_cmd = loginctl lock-session    # Lock before sleep
after_sleep_cmd = hyprctl dispatch dpms on  # Turn screen on after wake
```

- **Before Sleep**: Ensures session is locked before system suspends
- **After Sleep**: Restores display power management after wake

#### D-Bus Integration

```bash
ignore_dbus_inhibit = false
```

- **Purpose**: Respects applications that request to prevent idle (e.g., video players)
- **Applications**: Firefox, Steam, media players can prevent idle actions

## Listener Configuration

### 1. Idle Warning (9 minutes)

```bash
listener {
    timeout = 540                     # 9 minutes
    on-timeout = notify-send -i $iDIR " You are idle!"
    on-resume = notify-send -i $iDIR " Oh! you're Back" " Hello !!!"
}
```

**Features**:

- **Early Warning**: Notifies user before automatic actions
- **Visual Feedback**: Uses custom icon for notifications
- **User Friendly**: Welcome back message when activity resumes

### 2. Screen Lock (10 minutes)

```bash
listener {
    timeout = 600                     # 10 minutes
    on-timeout = loginctl lock-session
    # on-resume = notify-send -i $iDIR " System Unlocked!"
}
```

**Features**:

- **Security**: Automatically locks screen after extended idle
- **System Integration**: Uses systemd's session management
- **Configurable**: Resume action can be enabled if desired

### 3. Screen Power Management (Disabled by Default)

```bash
# listener {
#     timeout = 630                            # 10.5 minutes
#     on-timeout = hyprctl dispatch dpms off  # Turn off screen
#     on-resume = hyprctl dispatch dpms on    # Turn screen back on
# }
```

**Purpose**:

- **Power Saving**: Turns off display after lock
- **Hardware Protection**: Prevents screen burn-in
- **Quick Resume**: Instant screen activation on activity

### 4. System Suspend (Disabled by Default)

```bash
# listener {
#    timeout = 1200                            # 20 minutes
#    on-timeout = systemctl suspend
#    on-resume = notify-send -i $iDIR " Oh! you're back" "Hello !!!"
# }
```

**Features**:

- **Deep Power Saving**: Suspends entire system
- **Long Idle Protection**: Only after extended inactivity
- **Wake Notification**: Friendly welcome back message

## Customization Guide

### Adjusting Timeouts

#### Quick Lock Setup (Security Focused)

```bash
# Warning at 2 minutes
listener {
    timeout = 120
    on-timeout = notify-send "Locking soon..."
}

# Lock at 3 minutes
listener {
    timeout = 180
    on-timeout = loginctl lock-session
}
```

#### Extended Timeouts (Productivity Focused)

```bash
# Warning at 15 minutes
listener {
    timeout = 900
    on-timeout = notify-send "Still there?"
}

# Lock at 20 minutes
listener {
    timeout = 1200
    on-timeout = loginctl lock-session
}
```

### Custom Actions

#### Brightness Dimming Before Lock

```bash
listener {
    timeout = 480                    # 8 minutes
    on-timeout = brightnessctl set 10%
    on-resume = brightnessctl set 100%
}
```

#### Volume Mute on Lock

```bash
listener {
    timeout = 600
    on-timeout = loginctl lock-session && pactl set-sink-mute @DEFAULT_SINK@ 1
    on-resume = pactl set-sink-mute @DEFAULT_SINK@ 0
}
```

#### Custom Notification Sounds

```bash
listener {
    timeout = 540
    on-timeout = notify-send "Idle Warning" && paplay /usr/share/sounds/freedesktop/stereo/bell.oga
}
```

### Advanced Configuration

#### Conditional Actions Based on Power State

```bash
listener {
    timeout = 300
    on-timeout = if [ "$(cat /sys/class/power_supply/BAT*/status)" = "Discharging" ]; then loginctl lock-session; fi
}
```

#### Different Timeouts for Different Times

```bash
listener {
    timeout = 300
    on-timeout = if [ $(date +%H) -ge 18 ]; then loginctl lock-session; else notify-send "Working hours - extended timeout"; fi
}
```

#### Application-Aware Idle Management

```bash
listener {
    timeout = 600
    on-timeout = if ! pgrep -x "vlc\|mpv\|firefox" > /dev/null; then loginctl lock-session; fi
}
```

## Integration with HyprFlux

### Startup Integration

```bash
# In UserConfigs/Startup_Apps.conf
exec-once = hypridle
```

### Hyprlock Integration

```bash
# Hypridle triggers hyprlock
lock_cmd = pidof hyprlock || hyprlock

# Hyprlock configuration in hyprlock.conf
general {
    grace = 0                    # No grace period
    no_fade_in = false          # Smooth fade-in
}
```

### Power Management Integration

```bash
# System sleep integration
before_sleep_cmd = loginctl lock-session
after_sleep_cmd = hyprctl dispatch dpms on

# Manual sleep with lock
bind = $mainMod, L, exec, loginctl lock-session && systemctl suspend
```

### Notification Integration

```bash
# Custom notification icon
$iDIR="$HOME/.config/swaync/images/custom-icon.png"

# SwayNC integration
on-timeout = swaync-client -t "Idle Warning" -b "System will lock soon"
```

## Troubleshooting

### Common Issues

#### Hypridle Not Starting

```bash
# Check if hypridle is running
pgrep hypridle

# Start manually
hypridle &

# Check logs
journalctl -u hypridle --follow
```

#### Lock Not Working

```bash
# Test lock command manually
pidof hyprlock || hyprlock

# Check loginctl
loginctl lock-session

# Verify hyprlock installation
which hyprlock
```

#### Notifications Not Showing

```bash
# Test notification system
notify-send "Test" "This is a test"

# Check notification daemon
pgrep swaync

# Verify icon path
ls -la $HOME/.config/swaync/images/ja.png
```

### Debug Commands

```bash
# Run hypridle with debug output
hypridle -v

# Check current idle time
loginctl show-session $(loginctl show-user $(whoami) -p Sessions --value) -p IdleSinceHint

# Monitor hypridle activity
journalctl -f -u hypridle
```

### Performance Optimization

#### Reduce Resource Usage

```bash
# Increase check intervals (less frequent checks)
# Note: This is typically handled internally by hypridle

# Disable unnecessary listeners
# Comment out unused listener blocks
```

#### Battery Optimization

```bash
# Shorter timeouts on battery
listener {
    timeout = 300  # 5 minutes on battery
    on-timeout = if [ "$(cat /sys/class/power_supply/BAT*/status)" = "Discharging" ]; then loginctl lock-session; fi
}

# Longer timeouts on AC power
listener {
    timeout = 900  # 15 minutes on AC
    on-timeout = if [ "$(cat /sys/class/power_supply/BAT*/status)" = "Charging" ]; then loginctl lock-session; fi
}
```

## Security Considerations

### Secure Configuration

```bash
# Immediate lock for security-sensitive environments
listener {
    timeout = 60                     # 1 minute
    on-timeout = loginctl lock-session
}

# Disable resume notifications (avoid information disclosure)
# on-resume = # commented out
```

### Privacy Settings

```bash
# Clear clipboard on lock
listener {
    timeout = 600
    on-timeout = loginctl lock-session && echo "" | wl-copy
}

# Pause media on lock
listener {
    timeout = 600
    on-timeout = loginctl lock-session && playerctl pause
}
```

## Best Practices

### Configuration Management

#### Backup Configuration

```bash
cp ~/.config/hypr/hypridle.conf ~/.config/hypr/hypridle.conf.backup
```

#### Test Changes

```bash
# Kill existing hypridle
pkill hypridle

# Start with new configuration
hypridle &

# Monitor for issues
journalctl -f -u hypridle
```

### User Experience

#### Progressive Warnings

```bash
# 5-minute warning
listener {
    timeout = 300
    on-timeout = notify-send "5 minutes until lock"
}

# 1-minute warning
listener {
    timeout = 540
    on-timeout = notify-send "1 minute until lock"
}

# Lock
listener {
    timeout = 600
    on-timeout = loginctl lock-session
}
```

#### Gentle Transitions

```bash
# Dim screen before lock
listener {
    timeout = 570                    # 30 seconds before lock
    on-timeout = brightnessctl set 20%
    on-resume = brightnessctl set 100%
}
```

This idle management system provides comprehensive power management and security features while maintaining a smooth user experience and integrating seamlessly with the HyprFlux desktop environment.

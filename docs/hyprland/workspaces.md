# workspaces.conf

Auto-generated workspace configuration file that defines workspace rules, monitor assignments, and workspace-specific behaviors in HyprFlux. This file works in conjunction with monitors.conf to create a cohesive multi-monitor workspace experience.

## Purpose

- **Workspace Rules**: Defines behavior and properties for specific workspaces
- **Monitor Assignment**: Assigns workspaces to specific monitors
- **Default Workspaces**: Sets default starting workspaces per monitor
- **Workspace Customization**: Configures workspace-specific settings like gaps, borders, and decorations

## File Location

```
~/.config/hypr/workspaces.conf
```

## Important Notes

### Auto-Generation Warning

```bash
# *********************************************************** #
#
# NOTE: This will be overwritten by NWG-Displays
# once you use and click apply.
#
# *********************************************************** #
```

**Key Points**:

- File is overwritten when using nwg-displays
- Manual changes may be lost when using GUI tools
- Backup important custom rules before using nwg-displays

## Configuration Structure

### Basic Workspace Rules

#### Workspace Assignment to Monitors

```bash
# Assign workspaces to specific monitors
workspace = 1, monitor:eDP-1
workspace = 2, monitor:eDP-1
workspace = 3, monitor:eDP-1
workspace = 4, monitor:eDP-1
workspace = 5, monitor:DP-2
workspace = 6, monitor:DP-2
workspace = 7, monitor:DP-2
workspace = 8, monitor:DP-2
```

**Properties**:

- **Workspace Number**: Numeric identifier (1-10 typically)
- **Monitor Assignment**: Specific monitor name (eDP-1, DP-1, etc.)

#### Default Workspace per Monitor

```bash
# Set default starting workspace for each monitor
workspace = 1, monitor:eDP-1, default:true
workspace = 5, monitor:DP-2, default:true
```

### Advanced Workspace Rules

#### Workspace Appearance Customization

```bash
# Remove decorations and gaps for specific workspace
workspace = 3, rounding:false, decorate:false

# Gaming workspace with no distractions
workspace = 8, bordersize:8

# Coding workspace with minimal distractions
workspace = name:coding, rounding:false, decorate:false, gapsin:0, gapsout:0, border:false, decorate:false, monitor:DP-1
```

#### Named Workspaces

```bash
# Create named workspaces for specific purposes
workspace = name:Hello, monitor:DP-1, default:true
workspace = name:gaming, monitor:desc:Chimei Innolux Corporation 0x150C, default:true
workspace = name:coding, monitor:DP-1, rounding:false, decorate:false
workspace = name:media, monitor:HDMI-A-1, gapsin:0, gapsout:0
```

#### Auto-Launch Applications

```bash
# Launch applications when workspace is created
workspace = 5, on-created-empty:[float] firefox
workspace = special:scratchpad, on-created-empty:foot
workspace = name:development, on-created-empty:code
workspace = name:communication, on-created-empty:discord
```

## Workspace Properties

### Visual Properties

#### Rounding and Decoration

```bash
workspace = 3, rounding:false          # Disable window rounding
workspace = 4, decorate:false          # Disable window decorations
workspace = 5, border:false            # Disable window borders
```

#### Gaps Configuration

```bash
workspace = 6, gapsin:0               # No inner gaps
workspace = 7, gapsout:0              # No outer gaps
workspace = 8, gapsin:5, gapsout:10   # Custom gap sizes
```

#### Border Customization

```bash
workspace = 9, bordersize:8           # Custom border size
workspace = 10, bordersize:0          # No borders
```

### Monitor-Specific Properties

#### Monitor Description Assignment

```bash
# Assign workspace to monitor by description
workspace = name:gaming, monitor:desc:Chimei Innolux Corporation 0x150C, default:true
```

#### Multiple Monitor Setup

```bash
# Primary monitor workspaces (1-5)
workspace = 1, monitor:DP-1, default:true
workspace = 2, monitor:DP-1
workspace = 3, monitor:DP-1
workspace = 4, monitor:DP-1
workspace = 5, monitor:DP-1

# Secondary monitor workspaces (6-10)
workspace = 6, monitor:HDMI-A-1, default:true
workspace = 7, monitor:HDMI-A-1
workspace = 8, monitor:HDMI-A-1
workspace = 9, monitor:HDMI-A-1
workspace = 10, monitor:HDMI-A-1
```

## Common Workspace Configurations

### Dual Monitor Setup

#### Standard Dual Monitor

```bash
# Left monitor (primary) - workspaces 1-5
workspace = 1, monitor:DP-1, default:true
workspace = 2, monitor:DP-1
workspace = 3, monitor:DP-1
workspace = 4, monitor:DP-1
workspace = 5, monitor:DP-1

# Right monitor (secondary) - workspaces 6-10
workspace = 6, monitor:HDMI-A-1, default:true
workspace = 7, monitor:HDMI-A-1
workspace = 8, monitor:HDMI-A-1
workspace = 9, monitor:HDMI-A-1
workspace = 10, monitor:HDMI-A-1
```

#### Laptop + External Monitor

```bash
# Laptop screen - communication and monitoring
workspace = 1, monitor:eDP-1, default:true
workspace = 2, monitor:eDP-1
workspace = 3, monitor:eDP-1

# External monitor - main work
workspace = 4, monitor:DP-1, default:true
workspace = 5, monitor:DP-1
workspace = 6, monitor:DP-1
workspace = 7, monitor:DP-1
workspace = 8, monitor:DP-1
```

### Triple Monitor Setup

#### Productivity Setup

```bash
# Left monitor - communication
workspace = 1, monitor:DP-1, default:true, on-created-empty:discord
workspace = 2, monitor:DP-1, on-created-empty:thunderbird

# Center monitor - main work
workspace = 3, monitor:DP-2, default:true
workspace = 4, monitor:DP-2
workspace = 5, monitor:DP-2

# Right monitor - reference/monitoring
workspace = 6, monitor:HDMI-A-1, default:true
workspace = 7, monitor:HDMI-A-1, on-created-empty:firefox
```

### Specialized Workspace Configurations

#### Gaming Workspace

```bash
# Full-screen gaming workspace with minimal UI
workspace = name:gaming, monitor:DP-1, rounding:false, decorate:false, gapsin:0, gapsout:0, border:false
```

#### Development Workspace

```bash
# Coding workspace with specific layout
workspace = name:coding, monitor:DP-1, rounding:false, decorate:false, gapsin:2, gapsout:4
workspace = name:coding, on-created-empty:code
```

#### Media Workspace

```bash
# Media consumption workspace
workspace = name:media, monitor:HDMI-A-1, gapsin:0, gapsout:0, on-created-empty:mpv
```

#### Communication Workspace

```bash
# Communication apps workspace
workspace = name:chat, monitor:eDP-1, on-created-empty:discord
```

## Special Workspaces

### Scratchpad Workspace

```bash
# Special scratchpad workspace
workspace = special:scratchpad, on-created-empty:foot
workspace = special:notes, on-created-empty:obsidian
workspace = special:music, on-created-empty:spotify
```

### Named Special Workspaces

```bash
# Custom special workspaces
workspace = special:terminal, on-created-empty:kitty
workspace = special:calculator, on-created-empty:qalculate-gtk
workspace = special:notes, on-created-empty:notepadqq
```

## Dynamic Workspace Management

### Auto-Creation Rules

```bash
# Automatically create workspaces with specific applications
workspace = 1, on-created-empty:firefox
workspace = 2, on-created-empty:code
workspace = 3, on-created-empty:thunar
workspace = 4, on-created-empty:discord
workspace = 5, on-created-empty:spotify
```

### Conditional Workspace Creation

```bash
# Create workspace only if application is installed
workspace = name:development, on-created-empty:[[ -x "$(command -v code)" ]] && code
workspace = name:gaming, on-created-empty:[[ -x "$(command -v steam)" ]] && steam
```

## Integration with Window Rules

### Workspace-Specific Window Rules

```bash
# In WindowRules.conf - assign applications to specific workspaces
windowrule = workspace 1, ^(firefox)$
windowrule = workspace 2, ^(code)$
windowrule = workspace 3, ^(thunar)$
windowrule = workspace 4, ^(discord)$
windowrule = workspace 5, ^(spotify)$
```

### Monitor-Aware Window Rules

```bash
# Assign applications to workspaces on specific monitors
windowrule = workspace 1, ^(firefox)$, monitor:DP-1
windowrule = workspace 6, ^(discord)$, monitor:HDMI-A-1
```

## Customization Examples

### Productivity Setup

```bash
# Monitor 1: Communication and monitoring
workspace = 1, monitor:DP-1, default:true, on-created-empty:thunderbird
workspace = 2, monitor:DP-1, on-created-empty:discord
workspace = 3, monitor:DP-1, on-created-empty:htop

# Monitor 2: Main work
workspace = 4, monitor:DP-2, default:true, on-created-empty:code
workspace = 5, monitor:DP-2, on-created-empty:firefox
workspace = 6, monitor:DP-2

# Monitor 3: Reference and media
workspace = 7, monitor:HDMI-A-1, default:true, on-created-empty:thunar
workspace = 8, monitor:HDMI-A-1, on-created-empty:spotify
```

### Gaming Setup

```bash
# Main gaming monitor - minimal UI
workspace = 1, monitor:DP-1, default:true, rounding:false, decorate:false, gapsin:0, gapsout:0
workspace = 2, monitor:DP-1, rounding:false, decorate:false, gapsin:0, gapsout:0

# Secondary monitor - communication while gaming
workspace = 3, monitor:HDMI-A-1, default:true, on-created-empty:discord
workspace = 4, monitor:HDMI-A-1, on-created-empty:firefox
```

### Development Setup

```bash
# Code workspace with minimal distractions
workspace = name:code, monitor:DP-1, rounding:false, decorate:false, gapsin:2, gapsout:4
workspace = name:code, on-created-empty:code

# Terminal workspace
workspace = name:terminal, monitor:DP-1, gapsin:5, gapsout:10
workspace = name:terminal, on-created-empty:kitty

# Browser for testing
workspace = name:testing, monitor:HDMI-A-1, on-created-empty:firefox
```

## Troubleshooting

### Common Issues

#### Workspaces Not Assigned to Monitors

```bash
# Check monitor names
hyprctl monitors

# Verify workspace assignment
hyprctl workspaces

# Test workspace assignment
hyprctl dispatch workspace 1
```

#### Applications Not Auto-Launching

```bash
# Check if application exists
which firefox

# Test command manually
firefox &

# Check workspace creation
hyprctl dispatch workspace name:development
```

#### Workspace Rules Not Applied

```bash
# Reload configuration
hyprctl reload

# Check current workspace rules
hyprctl getoption workspace

# Test rule application
hyprctl dispatch workspace 3
```

### Debug Commands

```bash
# List current workspaces
hyprctl workspaces

# Get workspace information
hyprctl activeworkspace

# List workspace rules
hyprctl getoption workspace

# Switch to workspace for testing
hyprctl dispatch workspace 5
```

### Validation

#### Test Workspace Configuration

```bash
# Switch between workspaces
hyprctl dispatch workspace 1
hyprctl dispatch workspace 2

# Check workspace properties
hyprctl workspaces | grep -A 5 "workspace ID 1"
```

#### Monitor Workspace Assignment

```bash
# Check which workspaces are on which monitors
hyprctl monitors | grep -A 10 "Monitor"
```

## Best Practices

### Configuration Management

#### Backup Before Changes

```bash
cp ~/.config/hypr/workspaces.conf ~/.config/hypr/workspaces.conf.backup
```

#### Document Custom Rules

```bash
# Development workspaces - custom gaps for coding
workspace = name:coding, monitor:DP-1, gapsin:2, gapsout:4

# Gaming workspace - no decorations for immersion
workspace = name:gaming, monitor:DP-1, rounding:false, decorate:false
```

### Performance Optimization

#### Minimize Auto-Launch Applications

```bash
# Only auto-launch essential applications
workspace = 1, on-created-empty:firefox  # Essential browser
# workspace = 2, on-created-empty:code   # Commented out - launch manually
```

#### Use Efficient Workspace Layouts

```bash
# Disable expensive visual effects for performance-critical workspaces
workspace = name:gaming, rounding:false, decorate:false, gapsin:0, gapsout:0
```

### User Experience

#### Logical Workspace Organization

```bash
# Group related workspaces by monitor
# Monitor 1: Work (1-3)
# Monitor 2: Communication (4-6)
# Monitor 3: Media/Entertainment (7-9)
```

#### Consistent Naming

```bash
# Use descriptive names for special workspaces
workspace = name:development, monitor:DP-1
workspace = name:communication, monitor:HDMI-A-1
workspace = name:entertainment, monitor:DP-2
```

This workspace configuration system provides flexible workspace management that adapts to various monitor setups and workflow requirements while maintaining consistency and performance.

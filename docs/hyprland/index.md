# HyprFlux Hyprland Configuration Directory

This comprehensive guide covers the complete structure and functionality of the `~/.config/hypr/` directory in HyprFlux. This directory contains all configuration files, scripts, and resources needed for the Hyprland desktop environment.

## Directory Structure Overview

```
~/.config/hypr/
├── hyprland.conf              # Main Hyprland configuration file
├── hypridle.conf              # Idle management configuration
├── hyprlock.conf              # Screen lock configuration
├── hyprlock-1080p.conf        # 1080p optimized lock screen
├── monitors.conf              # Monitor configuration (auto-generated)
├── workspaces.conf            # Workspace configuration (auto-generated)
├── application-style.conf     # Application-specific styling
├── initial-boot.sh            # First-time setup script
├── v2.3.16                    # Version marker file
├── animations/                # Animation presets collection
├── configs/                   # Base configuration files
├── hyprlock/                  # Lock screen assets and scripts
├── Monitor_Profiles/          # Monitor configuration profiles
├── scripts/                   # System utility scripts
├── UserConfigs/               # User-customizable configurations
├── UserScripts/               # User-customizable scripts
├── wallpaper_effects/         # Wallpaper management files
└── wallust/                   # Dynamic theming configuration
```

## Core Configuration Files

### [hyprland.conf](./core-files.md#hyprland-conf)

The main entry point that sources all other configuration files and sets up the basic Hyprland environment.

### [hypridle.conf](./core-files.md#hypridle-conf)

Manages system idle behavior, screen timeouts, and automatic locking.

### [hyprlock.conf](./core-files.md#hyprlock-conf)

Configures the lock screen appearance, security settings, and visual elements.

### [monitors.conf](./core-files.md#monitors-conf)

Auto-generated monitor configuration from nwg-displays tool.

### [workspaces.conf](./core-files.md#workspaces-conf)

Auto-generated workspace assignments and rules.

## Configuration Directories

### [animations/](./animations.md)

Collection of animation presets for different performance levels and visual preferences.

### [configs/](./configs.md)

Base configuration files that provide default settings and keybindings.

### [hyprlock/](./hyprlock.md)

Lock screen assets including fonts, images, and helper scripts.

### [Monitor_Profiles/](./monitor-profiles.md)

Predefined monitor configurations for different setups and use cases.

### [UserConfigs/](./user-configs.md)

User-customizable configuration files for personalizing the desktop experience.

### [UserScripts/](./user-scripts.md)

User-customizable scripts for personal automation and workflows.

### [wallpaper_effects/](./wallpaper-effects.md)

Wallpaper management system with current wallpaper tracking.

### [wallust/](./wallust.md)

Dynamic theming system configuration for color scheme generation.

## System Scripts

### [scripts/](./scripts/index.md)

Comprehensive collection of utility scripts for system management, theming, and automation.

## Key Features

### 1. Modular Design

- **Separation of Concerns**: Each aspect of the configuration is isolated
- **Easy Customization**: User configs separate from base configs
- **Maintainability**: Clear structure makes updates and modifications simple

### 2. Dynamic Theming

- **Wallust Integration**: Automatic color generation from wallpapers
- **Consistent Styling**: Colors propagate across all components
- **Real-time Updates**: Theme changes apply immediately

### 3. Multi-Monitor Support

- **Profile System**: Predefined configurations for different setups
- **Auto-Detection**: Automatic monitor configuration with nwg-displays
- **Flexible Layouts**: Support for various monitor arrangements

### 4. Animation System

- **Performance Tiers**: From minimal to high-quality animations
- **Easy Switching**: Quick animation preset changes
- **Custom Presets**: User-defined animation configurations

### 5. Script Ecosystem

- **System Management**: Scripts for common system tasks
- **Theming**: Automated theme switching and customization
- **User Extensions**: Framework for custom user scripts

## Configuration Philosophy

### Base vs User Configurations

- **Base Configs**: Provide sensible defaults and core functionality
- **User Configs**: Allow customization without breaking core features
- **Separation**: User changes don't interfere with system updates

### Script Organization

- **System Scripts**: Core functionality and system integration
- **User Scripts**: Personal automation and custom workflows
- **Utility Scripts**: Helper functions and common operations

### Asset Management

- **Centralized Assets**: All resources in organized directories
- **Version Control**: Easy backup and restoration of configurations
- **Modular Resources**: Assets can be swapped without breaking functionality

## Getting Started

### For New Users

1. **Start with UserConfigs**: Modify files in `UserConfigs/` directory
2. **Explore Animations**: Try different animation presets
3. **Customize Keybindings**: Edit `UserConfigs/UserKeybinds.conf`
4. **Set Up Monitors**: Use monitor profiles or nwg-displays

### For Advanced Users

1. **Create Custom Scripts**: Add scripts to `UserScripts/` directory
2. **Develop Themes**: Create custom wallust configurations
3. **Optimize Performance**: Fine-tune animations and settings
4. **Contribute**: Share configurations and improvements

## Navigation

- **[Core Files](./core-files.md)**: Main configuration files
- **[Animations](./animations.md)**: Animation presets and configuration
- **[User Configs](./user-configs.md)**: Customizable user settings
- **[Scripts](./scripts/index.md)**: System and utility scripts
- **[Monitor Profiles](./monitor-profiles.md)**: Display configuration
- **[Wallpaper System](./wallpaper-effects.md)**: Wallpaper management
- **[Dynamic Theming](./wallust.md)**: Color scheme generation

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
└── UserScripts/               # User-customizable scripts
```

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

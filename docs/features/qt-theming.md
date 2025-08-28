# Qt Application Theming (Qt5ct, Qt6ct, Kvantum)

Qt application theming in HyprFlux ensures consistent visual appearance across all Qt-based applications through three complementary tools: Qt5ct, Qt6ct, and Kvantum. These tools provide comprehensive theming, styling, and customization for Qt applications.

## Overview

The HyprFlux Qt theming system features:

- Unified theming across Qt5 and Qt6 applications
- Advanced styling with Kvantum engine
- Custom color schemes and icon themes
- Font configuration and interface settings
- Integration with system-wide theming

## Configuration Structure

```
~/.config/
├── qt5ct/
│   ├── qt5ct.conf              # Qt5 configuration
│   ├── colors/                 # Color scheme files
│   └── qss/                    # Qt Style Sheets
├── qt6ct/
│   ├── qt6ct.conf              # Qt6 configuration
│   ├── colors/                 # Color scheme files
│   └── qss/                    # Qt Style Sheets
└── Kvantum/
    ├── kvantum.kvconfig        # Kvantum configuration
    ├── catppuccin-mocha-blue/  # Theme directory
    └── catppuccin-latte-blue/  # Alternative theme
```

## Qt5ct Configuration

### 1. Appearance Settings

#### Basic Configuration

```ini
[Appearance]
color_scheme_path=/home/user/.config/qt5ct/colors/Catppuccin-Mocha.conf
custom_palette=true
icon_theme=Papirus-Dark
standard_dialogs=default
style=Fusion
```

#### Style Options

- **Fusion**: Modern, clean Qt style (recommended)
- **Windows**: Windows-like appearance
- **kvantum**: Use Kvantum engine for advanced theming
- **Breeze**: KDE Plasma style

### 2. Font Configuration

```ini
[Fonts]
fixed="JetBrains Mono Nerd Font,10,-1,5,50,0,0,0,0,0,Regular"
general="Inter,11,-1,5,50,0,0,0,0,0,Regular"
```

**Font Categories:**

- **General**: Default UI font for most elements
- **Fixed**: Monospace font for code and terminals

### 3. Interface Settings

```ini
[Interface]
activate_item_on_single_click=1
buttonbox_layout=0
cursor_flash_time=1000
dialog_buttons_have_icons=1
double_click_interval=400
gui_effects=General, AnimateMenu, AnimateCombo, AnimateTooltip, AnimateToolBox
keyboard_scheme=2
menus_have_icons=true
show_shortcuts_in_context_menus=true
toolbutton_style=4
underline_shortcut=1
wheel_scroll_lines=3
```

## Qt6ct Configuration

### 1. Modern Qt6 Features

Qt6ct provides similar functionality to Qt5ct but with enhanced features:

```ini
[Appearance]
color_scheme_path=/home/user/.config/qt6ct/colors/Catppuccin-Mocha.conf
custom_palette=true
icon_theme=Papirus-Dark
standard_dialogs=default
style=Fusion
```

### 2. Enhanced Font Support

```ini
[Fonts]
fixed="JetBrains Mono Nerd Font,10,-1,5,400,0,0,0,0,0,0,0,0,0,0,1,Regular"
general="Inter,11,-1,5,400,0,0,0,0,0,0,0,0,0,0,1,Regular"
```

Qt6 font configuration includes additional parameters for better rendering and OpenType features.

## Kvantum Engine

### 1. Advanced Theming

Kvantum provides sophisticated theming capabilities beyond standard Qt styles:

```ini
[General]
theme=catppuccin-mocha-blue
```

### 2. Available Themes

#### Catppuccin Themes

- **catppuccin-mocha-blue**: Dark theme with blue accents
- **catppuccin-latte-blue**: Light theme with blue accents
- **catppuccin-macchiato**: Medium contrast theme
- **catppuccin-frappe**: Warm dark theme

#### Popular Third-Party Themes

- **Layan**: Modern flat design
- **McMojave**: macOS-inspired theme
- **Materia**: Material Design theme
- **Arc**: Clean, modern appearance

### 3. Theme Customization

Kvantum themes can be customized through SVG-based styling:

```
~/.config/Kvantum/theme-name/
├── theme-name.kvconfig         # Theme configuration
├── theme-name.svg              # Main theme graphics
└── theme-name#.svg             # Additional theme variants
```

## Color Schemes

### 1. Catppuccin Mocha Color Scheme

```ini
# ~/.config/qt5ct/colors/Catppuccin-Mocha.conf
[ColorScheme]
active_colors=#cdd6f4, #313244, #45475a, #585b70, #6c7086, #7f849c, #cdd6f4, #ffffff, #cdd6f4, #1e1e2e, #181825, #11111b, #89b4fa, #1e1e2e, #89b4fa, #f38ba8, #181825, #cdd6f4, #313244, #cdd6f4, #6c7086
disabled_colors=#6c7086, #313244, #45475a, #585b70, #6c7086, #7f849c, #6c7086, #ffffff, #6c7086, #1e1e2e, #181825, #11111b, #45475a, #6c7086, #89b4fa, #f38ba8, #181825, #6c7086, #313244, #6c7086, #6c7086
inactive_colors=#cdd6f4, #313244, #45475a, #585b70, #6c7086, #7f849c, #cdd6f4, #ffffff, #cdd6f4, #1e1e2e, #181825, #11111b, #45475a, #1e1e2e, #89b4fa, #f38ba8, #181825, #cdd6f4, #313244, #cdd6f4, #6c7086
```

### 2. Creating Custom Color Schemes

```bash
# Generate color scheme from current wallpaper
~/.config/hypr/scripts/generate-qt-colors.sh

# Apply color scheme
qt5ct --load-colors ~/.config/qt5ct/colors/Custom.conf
```

## Customization Guide

### 1. Changing Themes

#### Switch Qt Style

```bash
# Set environment variables
export QT_QPA_PLATFORMTHEME=qt5ct
export QT_STYLE_OVERRIDE=kvantum

# For Qt6 applications
export QT_QPA_PLATFORMTHEME=qt6ct
```

#### Change Kvantum Theme

```bash
# Using Kvantum Manager
kvantummanager

# Or edit configuration directly
echo "theme=new-theme-name" > ~/.config/Kvantum/kvantum.kvconfig
```

### 2. Font Customization

#### System-Wide Font Changes

```ini
[Fonts]
# Modern fonts
general="Inter,11,-1,5,400,0,0,0,0,0,0,0,0,0,0,1,Regular"
fixed="JetBrains Mono,10,-1,5,400,0,0,0,0,0,0,0,0,0,0,1,Regular"

# Classic fonts
general="Noto Sans,11,-1,5,400,0,0,0,0,0,0,0,0,0,0,1,Regular"
fixed="Noto Sans Mono,10,-1,5,400,0,0,0,0,0,0,0,0,0,0,1,Regular"
```

#### Font Rendering Options

```ini
[Interface]
# Enable font hinting
gui_effects=General, AnimateMenu, AnimateCombo, AnimateTooltip, AnimateToolBox

# Adjust DPI scaling
force_raster_widgets=1
```

### 3. Icon Theme Configuration

#### Popular Icon Themes

- **Papirus**: Modern, colorful icons
- **Tela**: Flat, minimalist design
- **Numix**: Simple, geometric icons
- **Breeze**: KDE's default icon theme

#### Setting Icon Theme

```ini
[Appearance]
icon_theme=Papirus-Dark
```

### 4. Custom Styling with QSS

#### Create Custom Stylesheet

```css
/* ~/.config/qt5ct/qss/custom.qss */
QWidget {
  background-color: #1e1e2e;
  color: #cdd6f4;
  font-family: "Inter";
}

QPushButton {
  background-color: #313244;
  border: 1px solid #45475a;
  border-radius: 6px;
  padding: 6px 12px;
}

QPushButton:hover {
  background-color: #45475a;
  border-color: #89b4fa;
}

QPushButton:pressed {
  background-color: #585b70;
}
```

#### Apply Custom Stylesheet

```ini
[Appearance]
stylesheets=/home/user/.config/qt5ct/qss/custom.qss
```

## Integration with HyprFlux

### 1. Environment Variables

#### Hyprland Configuration

```bash
# In UserConfigs/ENVariables.conf
env = QT_QPA_PLATFORMTHEME,qt5ct
env = QT_STYLE_OVERRIDE,kvantum
env = QT_AUTO_SCREEN_SCALE_FACTOR,1
env = QT_WAYLAND_DISABLE_WINDOWDECORATION,1
```

### 2. Dynamic Theming Integration

#### Wallust Integration

```bash
#!/bin/bash
# ~/.config/hypr/scripts/update-qt-colors.sh

# Source wallust colors
source ~/.config/wallust/colors.sh

# Generate Qt5 color scheme
cat > ~/.config/qt5ct/colors/Dynamic.conf << EOF
[ColorScheme]
active_colors=$foreground, $background, $color8, $color7, $color6, $color5, $foreground, #ffffff, $foreground, $background, $color0, $color8, $color4, $background, $color4, $color1, $color0, $foreground, $color8, $foreground, $color6
disabled_colors=$color6, $background, $color8, $color7, $color6, $color5, $color6, #ffffff, $color6, $background, $color0, $color8, $color8, $color6, $color4, $color1, $color0, $color6, $color8, $color6, $color6
inactive_colors=$foreground, $background, $color8, $color7, $color6, $color5, $foreground, #ffffff, $foreground, $background, $color0, $color8, $color8, $background, $color4, $color1, $color0, $foreground, $color8, $foreground, $color6
EOF

# Apply to Qt6 as well
cp ~/.config/qt5ct/colors/Dynamic.conf ~/.config/qt6ct/colors/Dynamic.conf
```

### 3. Application-Specific Configurations

#### Configure Specific Applications

```bash
# For applications that don't respect system theme
export QT_QPA_PLATFORMTHEME=qt5ct telegram-desktop
export QT_STYLE_OVERRIDE=kvantum vlc
```

## Advanced Configuration

### 1. High DPI Support

```ini
[Interface]
# Enable DPI scaling
force_raster_widgets=1

# Custom DPI settings
[Fonts]
general="Inter,11,-1,5,400,0,0,0,0,0,0,0,0,0,0,1,Regular"
```

### 2. Performance Optimization

```ini
[Interface]
# Disable animations for better performance
gui_effects=General

# Reduce visual effects
activate_item_on_single_click=0
```

### 3. Accessibility Features

```ini
[Interface]
# Increase contrast
cursor_flash_time=1500
double_click_interval=600

# Enable keyboard navigation
keyboard_scheme=2
underline_shortcut=1
```

## Troubleshooting

### Common Issues

1. **Qt apps not using theme**: Check environment variables
2. **Fonts not rendering correctly**: Verify font installation
3. **Icons missing**: Install and set icon theme
4. **Kvantum not working**: Ensure QT_STYLE_OVERRIDE is set

### Debug Commands

```bash
# Check Qt theme settings
echo $QT_QPA_PLATFORMTHEME
echo $QT_STYLE_OVERRIDE

# Test Qt5 configuration
qt5ct

# Test Qt6 configuration
qt6ct

# Check Kvantum themes
kvantummanager --list

# Verify font installation
fc-list | grep -i "font-name"
```

### Environment Setup

```bash
# Add to shell configuration
export QT_QPA_PLATFORMTHEME=qt5ct
export QT_STYLE_OVERRIDE=kvantum
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_WAYLAND_DISABLE_WINDOWDECORATION=1

# For Wayland-specific settings
export QT_QPA_PLATFORM=wayland
export QT_WAYLAND_FORCE_DPI=96
```

This comprehensive Qt theming system ensures that all Qt applications integrate seamlessly with the HyprFlux desktop environment, providing a consistent and beautiful user experience across all applications.

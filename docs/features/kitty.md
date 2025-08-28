# Kitty Terminal Configuration

Kitty is the default terminal emulator in HyprFlux, providing a fast, feature-rich, and GPU-accelerated terminal experience with extensive customization options.

## Overview

The HyprFlux Kitty configuration features:

- GPU acceleration for smooth performance
- Dynamic theming with wallpaper integration
- Multiple theme presets
- Advanced font rendering
- Tab and window management
- Keyboard shortcuts and mouse support

## Configuration Structure

```
~/.config/kitty/
├── kitty.conf             # Main configuration
├── themes/                # Theme collection
├── fonts/                 # Font configurations
└── sessions/              # Saved sessions
```

## Key Features

### 1. Performance and Rendering

```bash
# GPU acceleration
gpu_acceleration yes
sync_to_monitor yes

# Font rendering
font_family JetBrains Mono Nerd Font
font_size 11.0
disable_ligatures never

# Performance optimizations
repaint_delay 10
input_delay 3
```

### 2. Visual Appearance

```bash
# Window appearance
window_padding_width 10
window_margin_width 0
single_window_margin_width -1000
window_border_width 0.5pt
draw_minimal_borders yes
window_resize_step_cells 2
window_resize_step_lines 2

# Cursor
cursor_shape block
cursor_blink_interval -1
cursor_stop_blinking_after 15.0
```

### 3. Tab Management

```bash
# Tab bar
tab_bar_edge bottom
tab_bar_margin_width 0.0
tab_bar_style powerline
tab_powerline_style slanted
tab_title_template {title}{' :{}:'.format(num_windows) if num_windows > 1 else ''}

# Tab colors
active_tab_foreground #000
active_tab_background #eee
inactive_tab_foreground #444
inactive_tab_background #999
```

### 4. Color Schemes

#### Dynamic Theming

Kitty integrates with wallust for automatic color generation:

```bash
# Colors are automatically updated from wallust
include ~/.config/kitty/wallust/colors-kitty.conf
```

#### Manual Color Configuration

```bash
# Basic colors
foreground #c6e6f3
background #0e0e16
selection_foreground #0e0e16
selection_background #c6e6f3

# Cursor colors
cursor #c6e6f3
cursor_text_color #0e0e16

# URL underline color
url_color #0087BD
url_style curly
```

## Customization Guide

### Changing Fonts

```bash
# Font family
font_family JetBrains Mono Nerd Font
bold_font auto
italic_font auto
bold_italic_font auto

# Font size
font_size 11.0
font_size_delta 2

# Font features
disable_ligatures never
font_features none
```

### Window Management

```bash
# Window layout
enabled_layouts *
window_resize_step_cells 2
window_resize_step_lines 2

# New window behavior
new_window_to_right no
new_tab_to_right no

# Window titles
dynamic_background_opacity no
background_opacity 0.95
```

### Keyboard Shortcuts

#### Default Shortcuts

```bash
# Tab management
map ctrl+shift+t new_tab
map ctrl+shift+q close_tab
map ctrl+shift+right next_tab
map ctrl+shift+left previous_tab

# Window management
map ctrl+shift+enter new_window
map ctrl+shift+w close_window
map ctrl+shift+] next_window
map ctrl+shift+[ previous_window

# Font size
map ctrl+shift+equal change_font_size all +2.0
map ctrl+shift+minus change_font_size all -2.0
map ctrl+shift+backspace change_font_size all 0
```

#### Custom Shortcuts

```bash
# Copy/paste
map ctrl+shift+c copy_to_clipboard
map ctrl+shift+v paste_from_clipboard

# Scrolling
map ctrl+shift+up scroll_line_up
map ctrl+shift+down scroll_line_down
map ctrl+shift+page_up scroll_page_up
map ctrl+shift+page_down scroll_page_down

# Search
map ctrl+shift+f show_scrollback
```

### Mouse Configuration

```bash
# Mouse actions
mouse_hide_wait 3.0
url_color #0087BD
url_style curly
open_url_modifiers kitty_mod
open_url_with default

# Selection
rectangle_select_modifiers ctrl+alt
terminal_select_modifiers shift
select_by_word_characters @-./_~?&=%+#

# Scrolling
wheel_scroll_multiplier 5.0
touch_scroll_multiplier 1.0
```

## Advanced Features

### 1. Layouts and Sessions

#### Window Layouts

```bash
# Available layouts
enabled_layouts tall:bias=50;full_size=1;mirrored=false
enabled_layouts fat:bias=50;full_size=1;mirrored=false
enabled_layouts grid
enabled_layouts horizontal
enabled_layouts vertical
enabled_layouts stack

# Layout shortcuts
map ctrl+shift+l next_layout
```

#### Session Management

```bash
# Save session
kitty @ ls --session > ~/.config/kitty/sessions/current.session

# Restore session
kitty --session ~/.config/kitty/sessions/current.session
```

### 2. Remote Control

```bash
# Enable remote control
allow_remote_control yes
listen_on unix:/tmp/mykitty

# Remote commands
kitty @ set-colors --all foreground=red
kitty @ new-tab --tab-title "New Tab"
kitty @ close-tab
```

### 3. Scrollback and History

```bash
# Scrollback
scrollback_lines 2000
scrollback_pager less --chop-long-lines --RAW-CONTROL-CHARS +INPUT_LINE_NUMBER
scrollback_pager_history_size 0

# History
shell_integration enabled
```

### 4. Bell and Notifications

```bash
# Visual bell
enable_audio_bell no
visual_bell_duration 0.0
window_alert_on_bell yes
bell_on_tab yes

# Command notifications
command_on_bell none
```

## Theme Management

### Available Themes

HyprFlux includes multiple Kitty themes:

```bash
# Switch themes using script
~/.config/hypr/scripts/Kitty_themes.sh
```

### Popular Themes

- **Catppuccin Mocha**: Dark theme with purple accents
- **Tokyo Night**: Dark blue theme
- **Gruvbox**: Retro groove colors
- **Nord**: Arctic-inspired color palette
- **Dracula**: Dark theme with vibrant colors

### Creating Custom Themes

1. **Create theme file**:

```bash
# ~/.config/kitty/themes/my-theme.conf
foreground #your-foreground
background #your-background

# Normal colors
color0 #your-black
color1 #your-red
color2 #your-green
color3 #your-yellow
color4 #your-blue
color5 #your-magenta
color6 #your-cyan
color7 #your-white

# Bright colors
color8 #your-bright-black
color9 #your-bright-red
color10 #your-bright-green
color11 #your-bright-yellow
color12 #your-bright-blue
color13 #your-bright-magenta
color14 #your-bright-cyan
color15 #your-bright-white
```

2. **Apply theme**:

```bash
# In kitty.conf
include ~/.config/kitty/themes/my-theme.conf
```

## Integration with HyprFlux

### Hyprland Integration

#### Startup Configuration

```bash
# In UserConfigs/Startup_Apps.conf
exec-once = kitty --class="kitty-startup"
```

#### Window Rules

```bash
# In UserConfigs/WindowRules.conf
windowrule = float, ^(kitty-floating)$
windowrule = size 800 600, ^(kitty-floating)$
windowrule = center, ^(kitty-floating)$
```

#### Keybindings

```bash
# In UserConfigs/UserKeybinds.conf
bind = SUPER, T, exec, kitty
bind = SUPER SHIFT, T, exec, kitty --class="kitty-floating"
bind = SUPER, GRAVE, exec, kitty --class="kitty-dropdown"
```

### Waybar Integration

```json
"custom/terminal": {
    "format": " ",
    "on-click": "kitty",
    "tooltip-format": "Launch Terminal"
}
```

### Drop-down Terminal

```bash
# Special drop-down terminal configuration
# ~/.config/kitty/kitty-dropdown.conf
remember_window_size no
initial_window_width 100c
initial_window_height 30c
window_padding_width 20
background_opacity 0.9
```

## Performance Optimization

### GPU Settings

```bash
# GPU acceleration
gpu_acceleration yes
sync_to_monitor yes

# Performance tuning
repaint_delay 10
input_delay 3
```

### Memory Management

```bash
# Scrollback limits
scrollback_lines 2000
scrollback_pager_history_size 0

# Image protocol
max_image_area 0
```

## Troubleshooting

### Common Issues

1. **Font rendering issues**: Check font installation and configuration
2. **GPU acceleration not working**: Verify graphics drivers
3. **Colors not updating**: Check wallust integration
4. **Shortcuts not working**: Verify key mapping conflicts

### Debug Commands

```bash
# Check kitty configuration
kitty --debug-config

# Test GPU acceleration
kitty --debug-gl

# Check font rendering
kitty --debug-font-fallback

# List available layouts
kitty @ ls
```

### Performance Monitoring

```bash
# Monitor kitty performance
kitty --debug-rendering

# Check memory usage
ps aux | grep kitty

# GPU usage (if available)
nvidia-smi  # For NVIDIA
radeontop   # For AMD
```

::: tip Kitty Official Docs
More Details : https://sw.kovidgoyal.net/kitty
:::

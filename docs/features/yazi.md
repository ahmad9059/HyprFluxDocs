# Yazi File Manager Configuration

Yazi is a blazingly fast terminal file manager written in Rust, serving as the primary file management solution in HyprFlux. It provides a modern, efficient, and highly customizable file browsing experience.

## Overview

The HyprFlux Yazi configuration features:

- Lightning-fast file operations
- Vim-like keybindings and navigation
- Rich preview capabilities (images, videos, documents)
- Plugin system for extended functionality
- Customizable themes and layouts
- Integration with system tools and editors

## Configuration Structure

```
~/.config/yazi/
├── yazi.toml              # Main configuration
├── keymap.toml            # Keybinding configuration
├── theme.toml             # Theme and styling
├── plugins/               # Custom plugins
├── flavors/               # Color schemes
└── init.lua               # Lua initialization script
```

## Key Features

### 1. Navigation and Interface

#### Basic Configuration

```toml
[manager]
ratio = [1, 4, 3]          # Column ratios (parent, current, preview)
sort_by = "alphabetical"    # Sort method
sort_sensitive = false      # Case sensitivity
sort_reverse = false        # Reverse sort order
sort_dir_first = true      # Directories first
linemode = "none"          # Line mode display
show_hidden = false        # Show hidden files
show_symlink = true        # Show symlink indicators
```

#### Preview Configuration

```toml
[preview]
tab_size = 2               # Tab size for text files
max_width = 600            # Maximum preview width
max_height = 900           # Maximum preview height
cache_dir = ""             # Cache directory for previews
```

### 2. File Operations

#### Default Actions

```toml
[opener]
edit = [
    { run = 'nvim "$@"', block = true, for = "unix" },
    { run = 'code "$@"', block = false, for = "unix" }
]

open = [
    { run = 'xdg-open "$@"', desc = "Open with default application" }
]

extract = [
    { run = 'unar "$1"', desc = "Extract archive" }
]
```

#### Custom Openers

```toml
[opener]
image = [
    { run = 'imv "$@"', desc = "View with imv" },
    { run = 'gimp "$@"', desc = "Edit with GIMP" }
]

video = [
    { run = 'mpv "$@"', desc = "Play with mpv" },
    { run = 'vlc "$@"', desc = "Play with VLC" }
]

pdf = [
    { run = 'zathura "$@"', desc = "View with Zathura" },
    { run = 'firefox "$@"', desc = "Open in Firefox" }
]
```

### 3. Keybinding System

#### Navigation Keys

```toml
[manager]
keymap = [
    { on = [ "h" ], run = "leave", desc = "Go back" },
    { on = [ "l" ], run = "enter", desc = "Enter directory" },
    { on = [ "j" ], run = "arrow 1", desc = "Move down" },
    { on = [ "k" ], run = "arrow -1", desc = "Move up" },
    { on = [ "g", "g" ], run = "arrow -99999999", desc = "Go to top" },
    { on = [ "G" ], run = "arrow 99999999", desc = "Go to bottom" }
]
```

#### File Operations

```toml
[manager]
keymap = [
    { on = [ "y", "y" ], run = "yank", desc = "Copy files" },
    { on = [ "d", "d" ], run = "yank --cut", desc = "Cut files" },
    { on = [ "p" ], run = "paste", desc = "Paste files" },
    { on = [ "P" ], run = "paste --force", desc = "Force paste" },
    { on = [ "D" ], run = "remove", desc = "Delete files" },
    { on = [ "r" ], run = "rename", desc = "Rename file" }
]
```

#### Quick Actions

```toml
[manager]
keymap = [
    { on = [ "o" ], run = "open", desc = "Open file" },
    { on = [ "O" ], run = "open --interactive", desc = "Open with..." },
    { on = [ "e" ], run = "open --interactive", desc = "Edit file" },
    { on = [ "." ], run = "hidden toggle", desc = "Toggle hidden files" },
    { on = [ "s" ], run = "search fd", desc = "Search files" },
    { on = [ "/" ], run = "find --smart", desc = "Find in current directory" }
]
```

### 4. Theme and Styling

#### Color Scheme

```toml
[flavor]
use = "catppuccin-mocha"   # Base theme

[theme]
# File type colors
regular = { fg = "#c6d0f5" }
directory = { fg = "#8caaee", bold = true }
executable = { fg = "#a6e3a1" }
symlink = { fg = "#f9e2af" }
broken = { fg = "#e78284", crossed = true }

# Selection colors
selected = { bg = "#414559", bold = true }
hovered = { bg = "#51576d" }
```

#### Status Line

```toml
[status]
separator_open = ""
separator_close = ""
separator_style = { fg = "#45475a" }

[status.left]
left = [
    { type = "line", style = { fg = "#89b4fa" } },
    { type = "size", style = { fg = "#f9e2af" } },
    { type = "name", style = { fg = "#c6d0f5" } }
]

[status.right]
right = [
    { type = "permissions", style = { fg = "#a6e3a1" } },
    { type = "percentage", style = { fg = "#fab387" } },
    { type = "position", style = { fg = "#f38ba8" } }
]
```

## Advanced Features

### 1. Plugin System

#### Installing Plugins

```bash
# Clone plugin repository
git clone https://github.com/yazi-rs/plugins.git ~/.config/yazi/plugins

# Or install specific plugins
ya pack -a yazi-rs/plugins:git
ya pack -a yazi-rs/plugins:jump
ya pack -a yazi-rs/plugins:smart-filter
```

#### Popular Plugins

- **git**: Git integration and status display
- **jump**: Quick directory jumping
- **smart-filter**: Enhanced filtering capabilities
- **archive**: Archive management
- **chmod**: Permission management
- **full-border**: Enhanced border styling

### 2. Custom Commands

#### Shell Integration

```toml
[manager]
keymap = [
    { on = [ "!" ], run = "shell --block", desc = "Open shell" },
    { on = [ "c", "d" ], run = "cd", desc = "Change directory" },
    { on = [ "c", "w" ], run = "cd ~/Downloads", desc = "Go to Downloads" },
    { on = [ "c", "h" ], run = "cd ~", desc = "Go to Home" }
]
```

#### Custom Scripts

```toml
[manager]
keymap = [
    { on = [ "T" ], run = "shell 'kitty --working-directory=\"$PWD\" &'", desc = "Open terminal here" },
    { on = [ "C" ], run = "shell 'code \"$PWD\"'", desc = "Open in VS Code" },
    { on = [ "F" ], run = "shell 'thunar \"$PWD\" &'", desc = "Open in GUI file manager" }
]
```

### 3. Preview Enhancements

#### Image Preview

```toml
[preview]
image_filter = "triangle"   # Image scaling filter
image_quality = 75         # JPEG quality for thumbnails
sixel_fraction = 15        # Sixel preview size
```

#### Video Preview

```toml
[plugin]
prepend_previewers = [
    { mime = "video/*", run = "video" },
    { mime = "audio/*", run = "audio" }
]
```

#### Document Preview

```toml
[plugin]
prepend_previewers = [
    { name = "*.pdf", run = "pdf" },
    { name = "*.docx", run = "docx" },
    { name = "*.xlsx", run = "xlsx" }
]
```

## Customization Guide

### Changing Layout

#### Column Ratios

```toml
[manager]
ratio = [2, 5, 3]          # Wider current column
# ratio = [1, 6, 2]        # Minimal parent/preview
# ratio = [0, 1, 0]        # Single column mode
```

#### Line Mode

```toml
[manager]
linemode = "size"          # Show file sizes
# linemode = "permissions" # Show permissions
# linemode = "mtime"       # Show modification time
# linemode = "none"        # Clean view
```

### Custom Keybindings

#### Bookmark System

```toml
[manager]
keymap = [
    { on = [ "m", "h" ], run = "cd ~", desc = "Bookmark: Home" },
    { on = [ "m", "d" ], run = "cd ~/Downloads", desc = "Bookmark: Downloads" },
    { on = [ "m", "c" ], run = "cd ~/.config", desc = "Bookmark: Config" },
    { on = [ "m", "p" ], run = "cd ~/Pictures", desc = "Bookmark: Pictures" }
]
```

#### Quick Operations

```toml
[manager]
keymap = [
    { on = [ "z", "h" ], run = "hidden toggle", desc = "Toggle hidden" },
    { on = [ "z", "s" ], run = "sort modified --reverse", desc = "Sort by date" },
    { on = [ "z", "z" ], run = "sort alphabetical", desc = "Sort alphabetically" },
    { on = [ "z", "S" ], run = "sort size --reverse", desc = "Sort by size" }
]
```

### Theme Customization

#### Custom Colors

```toml
[theme]
# Custom file type colors
regular = { fg = "#ffffff" }
directory = { fg = "#89b4fa", bold = true }
executable = { fg = "#a6e3a1", bold = true }
symlink = { fg = "#f9e2af", italic = true }
broken = { fg = "#f38ba8", crossed = true }

# Selection styling
selected = { bg = "#313244", bold = true }
hovered = { bg = "#45475a" }
```

#### Border Styling

```toml
[theme]
border = { fg = "#6c7086" }
border_symbol = "│"
border_style = { fg = "#6c7086" }
```

## Integration with HyprFlux

### Hyprland Integration

#### Keybindings

```bash
# In UserConfigs/UserKeybinds.conf
bind = SUPER, E, exec, kitty yazi
bind = SUPER SHIFT, E, exec, yazi
bind = SUPER, F, exec, kitty --class="yazi-floating" yazi
```

#### Window Rules

```bash
# In UserConfigs/WindowRules.conf
windowrule = float, ^(yazi-floating)$
windowrule = size 1200 800, ^(yazi-floating)$
windowrule = center, ^(yazi-floating)$
```

### Waybar Integration

```json
"custom/file_manager": {
    "format": " ",
    "on-click": "kitty yazi",
    "tooltip-format": "File Manager"
}
```

### Shell Integration

#### Zsh Integration

```bash
# In .zshrc
function y() {
    local tmp="$(mktemp -t "yazi-cwd.XXXXXX")"
    yazi "$@" --cwd-file="$tmp"
    if cwd="$(cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
        cd -- "$cwd"
    fi
    rm -f -- "$tmp"
}
```

#### Fish Integration

```fish
# In config.fish
function y
    set tmp (mktemp -t "yazi-cwd.XXXXXX")
    yazi $argv --cwd-file="$tmp"
    if set cwd (cat -- "$tmp"); and [ -n "$cwd" ]; and [ "$cwd" != "$PWD" ]
        cd -- "$cwd"
    end
    rm -f -- "$tmp"
end
```

## Performance Optimization

### Cache Configuration

```toml
[preview]
cache_dir = "/tmp/yazi"    # Use tmpfs for cache
max_width = 400            # Reduce preview size
max_height = 600           # Reduce preview size
```

### Memory Management

```toml
[manager]
scrolloff = 5              # Reduce scroll offset
tab_size = 2               # Smaller tab size
```

## Troubleshooting

### Common Issues

1. **Slow preview generation**: Reduce preview size or disable for large files
2. **Keybindings not working**: Check for conflicts in keymap.toml
3. **Themes not loading**: Verify theme file paths and syntax
4. **Plugins not working**: Check plugin installation and dependencies

### Debug Commands

```bash
# Check yazi configuration
yazi --debug

# Test specific features
yazi --clear-cache

# Check plugin status
ya pack -l

# Validate configuration
yazi --check-config
```

### Performance Monitoring

```bash
# Monitor yazi performance
time yazi --version

# Check memory usage
ps aux | grep yazi

# Profile startup time
hyperfine 'yazi --version'
```

This file manager configuration provides a fast, efficient, and highly customizable file management experience that integrates seamlessly with the HyprFlux desktop environment.

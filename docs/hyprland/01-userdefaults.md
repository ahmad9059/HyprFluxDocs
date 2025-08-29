# 01-UserDefaults.conf

Configuration file that defines default applications and user preferences for the HyprFlux system. This file sets up the preferred applications for various tasks and provides variables that are used throughout the Hyprland configuration.

## Purpose

- **Default Applications**: Sets preferred applications for common tasks
- **Variable Definitions**: Provides variables used in keybindings and scripts
- **User Preferences**: Centralizes user-specific application choices
- **System Integration**: Integrates with scripts and other configuration files

## File Location

```
~/.config/hypr/UserConfigs/01-UserDefaults.conf
```

## Configuration Structure

### Editor Configuration

```bash
# Set your default editor here uncomment and reboot to take effect.
# NOTE, this will be automatically uncommented if you select neovim or vim to your default editor
#env = EDITOR,vim #default editor

# Define preferred text editor for the KooL Quick Settings Menu (SUPER SHIFT E)
# script will take the default EDITOR and nano as fallback
$edit=${EDITOR:-nvim}
```

#### Editor Options

- **Purpose**: Sets the default text editor for the system
- **Fallback**: Uses nvim if EDITOR environment variable is not set
- **Integration**: Used by Quick Settings Menu and various scripts

**Common Editor Choices**:

```bash
$edit=${EDITOR:-nvim}      # Neovim (default)
$edit=${EDITOR:-vim}       # Vim
$edit=${EDITOR:-nano}      # Nano (beginner-friendly)
$edit=${EDITOR:-code}      # Visual Studio Code
$edit=${EDITOR:-gedit}     # GNOME Text Editor
```

### Application Variables

```bash
# These two are for UserKeybinds.conf & Waybar Modules
$term = kitty              # Terminal
$files = thunar            # File Manager
```

#### Terminal Configuration

```bash
$term = kitty
```

**Purpose**: Defines the default terminal emulator
**Usage**: Used in keybindings and scripts throughout HyprFlux

**Alternative Terminal Options**:

```bash
$term = kitty              # Kitty (default, GPU-accelerated)
$term = alacritty          # Alacritty (fast, minimal)
$term = foot               # Foot (lightweight for Wayland)
$term = wezterm            # WezTerm (feature-rich)
$term = gnome-terminal     # GNOME Terminal
$term = konsole            # KDE Konsole
```

#### File Manager Configuration

```bash
$files = thunar
```

**Purpose**: Defines the default file manager
**Usage**: Used in keybindings and file management scripts

**Alternative File Manager Options**:

```bash
$files = thunar            # Thunar (default, lightweight)
$files = dolphin           # KDE Dolphin (feature-rich)
$files = nautilus          # GNOME Files/Nautilus
$files = pcmanfm           # PCManFM (minimal)
$files = nemo              # Nemo (Cinnamon file manager)
$files = ranger            # Ranger (terminal-based)
$files = yazi              # Yazi (modern terminal file manager)
```

### Search Engine Configuration

```bash
# Default Search Engine for ROFI Search (SUPER S)
$Search_Engine = "https://www.google.com/search?q={}"
```

**Purpose**: Sets the default search engine for Rofi web search functionality
**Usage**: Used by RofiSearch.sh script

**Alternative Search Engines**:

```bash
# Google (default)
$Search_Engine = "https://www.google.com/search?q={}"

# DuckDuckGo (privacy-focused)
$Search_Engine = "https://duckduckgo.com/?q={}"

# Bing
$Search_Engine = "https://www.bing.com/search?q={}"

# Startpage (privacy-focused Google results)
$Search_Engine = "https://www.startpage.com/sp/search?query={}"

# Searx (self-hosted search)
$Search_Engine = "https://searx.org/search?q={}"

# Brave Search
$Search_Engine = "https://search.brave.com/search?q={}"
```

## Customization Examples

### Development Setup

```bash
# Development-focused configuration
$edit=${EDITOR:-code}      # VS Code for development
$term = kitty              # Kitty with good font rendering
$files = dolphin           # Dolphin for advanced file operations
$Search_Engine = "https://duckduckgo.com/?q={}"  # Privacy-focused search
```

### Minimal Setup

```bash
# Lightweight configuration
$edit=${EDITOR:-nano}      # Simple editor
$term = foot               # Lightweight terminal
$files = pcmanfm           # Minimal file manager
$Search_Engine = "https://www.google.com/search?q={}"  # Standard search
```

### Privacy-Focused Setup

```bash
# Privacy-oriented configuration
$edit=${EDITOR:-vim}       # Terminal-based editor
$term = alacritty          # Minimal terminal
$files = thunar            # Standard file manager
$Search_Engine = "https://duckduckgo.com/?q={}"  # Privacy search engine
```

### Power User Setup

```bash
# Advanced user configuration
$edit=${EDITOR:-nvim}      # Neovim with plugins
$term = wezterm            # Feature-rich terminal
$files = ranger            # Terminal file manager
$Search_Engine = "https://searx.org/search?q={}"  # Self-hosted search
```

## Integration with HyprFlux

### Keybinding Integration

These variables are used extensively in `UserKeybinds.conf`:

```bash
# Terminal keybinding
bind = $mainMod, Return, exec, $term

# File manager keybinding
bind = $mainMod, F, exec, $files

# Editor keybinding (through scripts)
bind = $mainMod, E, exec, $edit
```

### Script Integration

Scripts throughout HyprFlux reference these variables:

#### Quick Settings Menu

```bash
# In Kool_Quick_Settings.sh
EDITOR="$edit"  # Uses the defined editor variable
```

#### File Operations

```bash
# In various scripts
$files  # Opens the defined file manager
$term   # Launches the defined terminal
```

### Waybar Integration

Waybar modules can use these variables:

```json
"custom/terminal": {
    "format": " ",
    "on-click": "kitty",  // Could reference $term variable
    "tooltip-format": "Launch Terminal"
}
```

## Advanced Configuration

### Conditional Application Selection

```bash
# Choose editor based on availability
if command -v code >/dev/null 2>&1; then
    $edit = code
elif command -v nvim >/dev/null 2>&1; then
    $edit = nvim
else
    $edit = nano
fi
```

### Environment-Specific Defaults

```bash
# Different defaults for different environments
case "$(hostname)" in
    "work-laptop")
        $edit = code
        $term = gnome-terminal
        $files = nautilus
        ;;
    "gaming-pc")
        $edit = nvim
        $term = kitty
        $files = thunar
        ;;
    *)
        $edit = ${EDITOR:-nvim}
        $term = kitty
        $files = thunar
        ;;
esac
```

### Application Categories

```bash
# Extended application definitions
$edit = ${EDITOR:-nvim}           # Text editor
$term = kitty                     # Terminal emulator
$files = thunar                   # File manager
$browser = firefox                # Web browser
$music = spotify                  # Music player
$video = mpv                      # Video player
$image = imv                      # Image viewer
$pdf = zathura                    # PDF viewer
$calculator = qalculate-gtk       # Calculator
$notes = obsidian                 # Note-taking app
```

## Troubleshooting

### Common Issues

#### Application Not Found

```bash
# Check if application is installed
which kitty
which thunar
which nvim

# Install missing applications
sudo pacman -S kitty thunar neovim
```

#### Variables Not Working

```bash
# Check if file is being sourced
grep "01-UserDefaults.conf" ~/.config/hypr/hyprland.conf

# Test variable expansion
echo $term
echo $files
echo $edit
```

#### Editor Not Set

```bash
# Check EDITOR environment variable
echo $EDITOR

# Set EDITOR in shell profile
echo 'export EDITOR=nvim' >> ~/.bashrc
echo 'export EDITOR=nvim' >> ~/.zshrc
```

### Debug Commands

```bash
# Check current variable values
hyprctl getoption $term
hyprctl getoption $files

# Test application launching
$term &
$files &
$edit test.txt
```

### Validation

#### Test Application Launches

```bash
# Test each defined application
kitty &          # Test terminal
thunar &         # Test file manager
nvim --version   # Test editor
```

#### Verify Integration

```bash
# Check keybinding integration
hyprctl binds | grep -E "(term|files|edit)"

# Test search engine
curl -s "$Search_Engine" | head -n 5
```

## Best Practices

### Configuration Management

#### Backup Before Changes

```bash
cp ~/.config/hypr/UserConfigs/01-UserDefaults.conf ~/.config/hypr/UserConfigs/01-UserDefaults.conf.backup
```

#### Document Changes

```bash
# Add comments for custom choices
$term = alacritty          # Switched to alacritty for better performance
$files = ranger            # Using terminal file manager for efficiency
```

### Application Selection

#### Consider System Resources

```bash
# Lightweight setup for older hardware
$term = foot               # Minimal terminal
$files = pcmanfm           # Lightweight file manager
$edit = nano               # Simple editor
```

#### Match Workflow Needs

```bash
# Development workflow
$edit = code               # IDE for development
$term = kitty              # Good font rendering for code
$files = dolphin           # Advanced file operations
```

### Consistency

#### Match Desktop Environment

```bash
# GNOME-style applications
$term = gnome-terminal
$files = nautilus
$edit = gedit

# KDE-style applications
$term = konsole
$files = dolphin
$edit = kate
```

#### Maintain Theme Consistency

- Choose applications that support your color scheme
- Ensure applications integrate well with Wayland
- Consider applications that support dynamic theming

This user defaults configuration provides a centralized way to manage application preferences while ensuring consistency across the entire HyprFlux desktop environment.

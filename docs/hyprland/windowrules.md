# WindowRules.conf

Window and layer rules configuration file that defines how specific applications behave, their appearance, positioning, and workspace assignments in HyprFlux. This file uses Hyprland's advanced window rule system with tags for efficient rule management.

## Purpose

- **Application Behavior**: Controls how specific applications appear and behave
- **Window Management**: Defines floating, sizing, and positioning rules
- **Workspace Assignment**: Automatically assigns applications to specific workspaces
- **Visual Customization**: Sets opacity, borders, and other visual properties
- **Layer Management**: Controls overlay and notification layer behavior

## File Location

```
~/.config/hypr/UserConfigs/WindowRules.conf
```

## Important Notes

### Hyprland Version Compatibility

```bash
# NOTES: This is only for Hyprland > 0.48
# note for ja: This should NOT be implemented on Debian and Ubuntu
```

**Key Points**:

- Requires Hyprland version 0.48 or higher
- Uses advanced tag-based rule system
- May not be compatible with older Hyprland versions

## Configuration Structure

### Tag-Based Rule System

#### Browser Tags

```bash
# browser tags
windowrule = tag +browser, class:^([Ff]irefox|org.mozilla.firefox|[Ff]irefox-esr|[Ff]irefox-bin)$
windowrule = tag +browser, class:^([Gg]oogle-chrome(-beta|-dev|-unstable)?)$
windowrule = tag +browser, class:^(chrome-.+-Default)$ # Chrome PWAs
windowrule = tag +browser, class:^([Mm]icrosoft-edge(-stable|-beta|-dev|-unstable))$
windowrule = tag +browser, class:^(Brave-browser(-beta|-dev|-unstable)?)$
windowrule = tag +browser, class:^([Tt]horium-browser|[Cc]achy-browser)$
windowrule = tag +browser, class:^(zen-alpha|zen)$
```

#### Application Category Tags

```bash
# notif tags
windowrule = tag +notif, class:^(swaync-control-center|swaync-notification-window|swaync-client|class)$

# terminal tags
windowrule = tag +terminal, class:^(Alacritty|kitty|kitty-dropterm)$

# email tags
windowrule = tag +email, class:^([Tt]hunderbird|org.gnome.Evolution)$
windowrule = tag +email, class:^(eu.betterbird.Betterbird)$

# project tags
windowrule = tag +projects, class:^(codium|codium-url-handler|VSCodium)$
windowrule = tag +projects, class:^(VSCode|code-url-handler)$
windowrule = tag +projects, class:^(jetbrains-.+)$ # JetBrains IDEs
```

#### Specialized Tags

```bash
# game tags
windowrule = tag +games, class:^(gamescope)$
windowrule = tag +games, class:^(steam_app_\d+)$

# multimedia tags
windowrule = tag +multimedia, class:^([Aa]udacious)$
windowrule = tag +multimedia_video, class:^([Mm]pv|vlc)$

# settings tags
windowrule = tag +settings, class:^(pavucontrol|org.pulseaudio.pavucontrol|com.saivert.pwvucontrol)$
windowrule = tag +settings, class:^(qt5ct|qt6ct|[Yy]ad)$
```

### Custom Application Rules

#### Special Applications

```bash
# Custom rule
windowrulev2 = tile, class:^([Cc]hromium)$
windowrule = size 25% 55%, class:^(com.network.manager)$
windowrulev2 = float, class:^(com.network.manager)$
windowrulev2 = workspace special:nyx, class:^([Vv]esktop|[Dd]iscord|[Ss]potify)$
```

#### Visual Overrides

```bash
# Some special override rules
windowrule = noblur, tag:multimedia_video*
windowrule = opacity 1.0, tag:multimedia_video*
```

## Rule Categories

### Position Rules

#### Centering Windows

```bash
# POSITION
windowrule = center, tag:KooL_Cheat*
windowrule = center, class:([Tt]hunar), title:negative:(.*[Tt]hunar.*)
windowrule = center, title:^(ROG Control)$
windowrule = center, class:^(pavucontrol|org.pulseaudio.pavucontrol|com.saivert.pwvucontrol)$
windowrule = center, class:^([Ww]hatsapp-for-linux|ZapZap|com.rtosta.zapzap)$
```

#### Specific Positioning

```bash
windowrule = move 61% 7%,title:^(Picture-in-Picture)$
#windowrule = move 72% 7%,title:^(Firefox)$
```

### Workspace Assignment

#### Automatic Workspace Assignment

```bash
# windowrule move to workspace
windowrule = workspace 1, tag:projects*
windowrule = workspace 1, tag:email*
windowrule = workspace 2, tag:browser*
windowrule = workspace 3, class:^([Tt]hunar)$
windowrule = workspace 4, tag:im*
windowrule = workspace 5, tag:gamestore*
windowrule = workspace 8, tag:games*
windowrule = workspace 1, class:^(kitty)$, title:^(tmuxifier)$
windowrulev2 = workspace 9, class:^(virt-viewer)$
windowrulev2 = workspace 10, class:^([Oo]bsidian)$
```

#### Silent Workspace Assignment

```bash
# windowrule move to workspace (silent)
windowrule = workspace 4 silent, tag:screenshare*
windowrule = workspace 9 silent, class:^(virt-manager)$
windowrule = workspace 9 silent, class:^(.virt-manager-wrapped)$
windowrule = workspace 9 silent, tag:multimedia*
```

### Floating Rules

#### Tag-Based Floating

```bash
# FLOAT
windowrule = float, tag:KooL_Cheat*
windowrule = float, tag:wallpaper*
windowrule = float, tag:settings*
windowrule = float, tag:viewer*
windowrule = float, tag:KooL-Settings*
```

#### Application-Specific Floating

```bash
windowrule = float, class:([Zz]oom|onedriver|onedriver-launcher)$
windowrule = float, class:(org.gnome.Calculator), title:(Calculator)
windowrule = float, class:^(mpv|com.github.rafostar.Clapper)$
windowrule = float, class:^([Qq]alculate-gtk)$
windowrulev2 = float, class:^(fdm|freedownloadmanager)$
```

#### Dialog and Popup Floating

```bash
# windowrule - ######### float popups and dialogue #######
windowrule = float, title:^(Authentication Required)$
windowrule = center, title:^(Authentication Required)$
windowrule = float, class:(codium|codium-url-handler|VSCodium), title:negative:(.*codium.*|.*VSCodium.*)
windowrule = float, class:^(com.heroicgameslauncher.hgl)$, title:negative:(Heroic Games Launcher)
windowrule = float, class:^([Ss]team)$, title:negative:^([Ss]team)$
```

### Size Rules

#### Tag-Based Sizing

```bash
# SIZE
windowrule = size 65% 90%, tag:KooL_Cheat*
windowrule = size 70% 70%, tag:wallpaper*
windowrule = size 70% 70%, tag:settings*
windowrule = size 60% 70%, class:^([Ww]hatsapp-for-linux|ZapZap|com.rtosta.zapzap)$
windowrule = size 60% 70%, class:^([Ff]erdium)$
```

#### Specific Window Sizing

```bash
windowrule = size 38% 38%, title:^(Picture-in-Picture)$
#windowrule = size 25% 25%, title:^(Firefox)$

# Dialog sizing
windowrule = size 70% 60%, title:^(Add Folder to Workspace)$
windowrule = size 70% 60%, title:^(Save As)$
windowrule = size 70% 60%, initialTitle:(Open Files)
```

### Opacity Rules

#### Tag-Based Opacity

```bash
# OPACITY
windowrule = opacity 0.8 0.7, tag:terminal*
windowrule = opacity 0.8 0.7, tag:settings*
windowrule = opacity 0.9 0.7, tag:wallpaper*
```

#### Application-Specific Opacity

```bash
windowrule = opacity 0.8 0.7, class:^(gedit|org.gnome.TextEditor|mousepad)$
windowrule = opacity 0.9 0.8, class:^(deluge)$
windowrule = opacity 0.9 0.8, class:^(seahorse)$ # gnome-keyring gui
```

### Special Properties

#### Pinning Windows

```bash
# PINNING
windowrule = pin, title:^(Picture-in-Picture)$
#windowrule = pin,title:^(Firefox)$
```

#### Aspect Ratio

```bash
# windowrule - extras
windowrule = keepaspectratio, title:^(Picture-in-Picture)$
```

#### Idle Inhibition

```bash
# windowrule to avoid idle for fullscreen apps
windowrule = idleinhibit fullscreen, fullscreen:1
```

#### Gaming Optimizations

```bash
# BLUR & FULLSCREEN
windowrule = noblur, tag:games*
windowrule = fullscreen, tag:games*
```

## Layer Rules

### Overlay Layer Management

```bash
# LAYER RULES
layerrule = blur, rofi
layerrule = ignorezero, rofi
layerrule = blur, notifications
layerrule = ignorezero, notifications
layerrule = blur, quickshell:overview
layerrule = ignorezero, quickshell:overview
layerrule = ignorealpha 0.5, quickshell:overview
```

**Layer Rule Properties**:

- **blur**: Apply blur effect to layer
- **ignorezero**: Ignore zero-alpha pixels
- **ignorealpha**: Ignore pixels below specified alpha threshold

## Advanced Rule Syntax

### WindowRuleV2 (Advanced Rules)

```bash
# Advanced rule syntax with multiple conditions
windowrulev2 = float, class:^(kitty)$, title:^(floating_kitty)$
windowrulev2 = workspace 2 silent, class:^(firefox)$, title:^(Mozilla Firefox)$
```

### Negative Matching

```bash
# Exclude specific titles from rules
windowrule = float, class:(codium), title:negative:(.*codium.*)
windowrule = center, class:([Tt]hunar), title:negative:(.*[Tt]hunar.*)
```

### Regular Expressions

```bash
# Complex regex patterns
windowrule = tag +projects, class:^(jetbrains-.+)$  # All JetBrains IDEs
windowrule = tag +browser, class:^([Gg]oogle-chrome(-beta|-dev|-unstable)?)$  # Chrome variants
```

## Customization Examples

### Development Workflow

```bash
# Development environment rules
windowrule = workspace 1, class:^(code)$
windowrule = workspace 2, class:^(firefox)$
windowrule = workspace 3, class:^(kitty)$, title:^(dev-terminal)$
windowrule = float, class:^(code)$, title:^(Quick Open)$
windowrule = size 80% 60%, class:^(code)$, title:^(Quick Open)$
```

### Gaming Setup

```bash
# Gaming-optimized rules
windowrule = workspace 8, class:^(steam)$
windowrule = workspace 8, class:^(lutris)$
windowrule = fullscreen, class:^(steam_app_\d+)$
windowrule = noblur, class:^(steam_app_\d+)$
windowrule = opacity 1.0, class:^(steam_app_\d+)$
windowrule = idleinhibit fullscreen, class:^(steam_app_\d+)$
```

### Media Production

```bash
# Media production rules
windowrule = workspace 5, class:^(obs)$
windowrule = workspace 5, class:^(kdenlive)$
windowrule = workspace 5, class:^(gimp)$
windowrule = float, class:^(obs)$, title:^(Settings)$
windowrule = opacity 0.9, class:^(obs)$
```

### Communication Hub

```bash
# Communication applications
windowrule = workspace 4, class:^(discord)$
windowrule = workspace 4, class:^(slack)$
windowrule = workspace 4, class:^(telegram)$
windowrule = size 70% 80%, class:^(discord)$
windowrule = opacity 0.95, class:^(discord)$
```

## Tag Management

### Creating Custom Tags

```bash
# Custom tag definitions
windowrule = tag +mydev, class:^(code|codium)$
windowrule = tag +mydev, class:^(jetbrains-.+)$
windowrule = tag +mydev, class:^(sublime_text)$

# Apply rules to custom tags
windowrule = workspace 1, tag:mydev*
windowrule = opacity 0.95, tag:mydev*
```

### Tag-Based Automation

```bash
# Automatic behavior based on tags
windowrule = workspace 1 silent, tag:projects*
windowrule = workspace 2 silent, tag:browser*
windowrule = workspace 3 silent, tag:terminal*
windowrule = workspace 4 silent, tag:communication*
```

## Troubleshooting

### Common Issues

#### Rules Not Applied

```bash
# Check window class and title
hyprctl activewindow

# Test rule syntax
hyprctl keyword windowrule "float,class:^(test)$"

# Check for conflicting rules
hyprctl getoption windowrule
```

#### Wrong Window Identification

```bash
# Get accurate window information
hyprctl clients

# Check window properties
hyprctl activewindow | grep -E "(class|title)"
```

#### Performance Issues with Rules

```bash
# Simplify complex regex patterns
# Use tags instead of individual rules
# Avoid too many opacity rules
```

### Debug Commands

```bash
# List all window rules
hyprctl getoption windowrule

# Get current window information
hyprctl activewindow

# List all clients with properties
hyprctl clients

# Test rule application
hyprctl keyword windowrule "opacity 0.5,class:^(kitty)$"
```

### Validation

#### Test Rule Application

```bash
# Open target application
your-application &

# Check if rules are applied
hyprctl clients | grep -A 10 "your-application"

# Verify workspace assignment
hyprctl workspaces
```

## Best Practices

### Rule Organization

#### Group Related Rules

```bash
# Browser applications
windowrule = tag +browser, class:^(firefox)$
windowrule = tag +browser, class:^(chromium)$
windowrule = workspace 2, tag:browser*
windowrule = opacity 0.95, tag:browser*
```

#### Use Descriptive Tags

```bash
# Clear, descriptive tag names
windowrule = tag +development_tools, class:^(code)$
windowrule = tag +communication_apps, class:^(discord)$
windowrule = tag +media_players, class:^(vlc)$
```

### Performance Optimization

#### Efficient Rule Patterns

```bash
# Use specific patterns to avoid unnecessary matching
windowrule = float, class:^(pavucontrol)$  # Specific class
# Instead of: windowrule = float, class:(pavucontrol)  # Less specific
```

#### Minimize Complex Rules

```bash
# Prefer simple rules over complex regex
windowrule = tag +browser, class:^(firefox)$
windowrule = tag +browser, class:^(chrome)$
# Instead of: windowrule = tag +browser, class:^(firefox|chrome|chromium|brave)$
```

### Maintenance

#### Document Custom Rules

```bash
# Add comments for custom rules
# Development environment setup
windowrule = workspace 1, tag:projects*
windowrule = opacity 0.95, tag:projects*

# Gaming optimization
windowrule = fullscreen, tag:games*
windowrule = noblur, tag:games*
```

#### Regular Rule Cleanup

```bash
# Remove unused rules
# Update application class names when applications change
# Consolidate similar rules using tags
```

This window rules configuration provides comprehensive control over application behavior, enabling users to create a highly customized and efficient desktop environment that automatically manages windows according to their preferences and workflow needs.

# ENVariables.conf

Environment variables configuration file that sets up the Wayland environment, toolkit backends, and application-specific settings for optimal compatibility and performance in HyprFlux.

## Purpose

- **Wayland Environment**: Configures Wayland-specific environment variables
- **Toolkit Integration**: Sets up Qt and GTK toolkit backends
- **Application Compatibility**: Ensures applications work correctly on Wayland
- **Performance Optimization**: Configures settings for optimal performance
- **Hardware Support**: Includes NVIDIA and other hardware-specific settings

## File Location

```
~/.config/hypr/UserConfigs/ENVariables.conf
```

## Configuration Structure

### Toolkit Backend Variables

```bash
# Toolkit Backend Variables
env = GDK_BACKEND,wayland,x11,*
env = QT_QPA_PLATFORM,wayland;xcb
env = CLUTTER_BACKEND,wayland
```

#### GDK Backend (GTK Applications)

```bash
env = GDK_BACKEND,wayland,x11,*
```

- **Purpose**: Sets backend preference for GTK applications
- **Order**: Wayland first, X11 fallback, then any available backend
- **Affects**: All GTK-based applications (Firefox, GNOME apps, etc.)

#### Qt Platform Abstraction

```bash
env = QT_QPA_PLATFORM,wayland;xcb
```

- **Purpose**: Configures Qt applications to use Wayland
- **Fallback**: XCB (X11) if Wayland is not available
- **Affects**: Qt-based applications (VLC, KDE apps, etc.)

#### Clutter Backend

```bash
env = CLUTTER_BACKEND,wayland
```

- **Purpose**: Sets Clutter toolkit to use Wayland
- **Affects**: Applications using Clutter (some GNOME applications)

### SDL Configuration

```bash
#Run SDL2 applications on Wayland.
#Remove or set to x11 if games that provide older versions of SDL cause compatibility issues
#env = SDL_VIDEODRIVER,wayland
```

**Purpose**: Configures SDL2 applications for Wayland
**Note**: Commented out by default due to compatibility issues with some games
**Usage**: Uncomment for better Wayland integration with SDL2 applications

### XDG Specifications

```bash
# xdg Specifications
env = XDG_CURRENT_DESKTOP,Hyprland
env = XDG_SESSION_DESKTOP,Hyprland
env = XDG_SESSION_TYPE,wayland
```

#### Desktop Environment Identification

- **XDG_CURRENT_DESKTOP**: Identifies the desktop environment as Hyprland
- **XDG_SESSION_DESKTOP**: Sets session desktop to Hyprland
- **XDG_SESSION_TYPE**: Specifies Wayland as the session type

**Importance**: These variables help applications adapt their behavior for Hyprland and Wayland.

### Qt Variables

```bash
# QT Variables
env = QT_AUTO_SCREEN_SCALE_FACTOR,1
env = QT_WAYLAND_DISABLE_WINDOWDECORATION,1
env = QT_QPA_PLATFORMTHEME,qt5ct
env = QT_QPA_PLATFORMTHEME,qt6ct
```

#### Qt Scaling

```bash
env = QT_AUTO_SCREEN_SCALE_FACTOR,1
```

- **Purpose**: Controls automatic DPI scaling for Qt applications
- **Value**: `1` = 100% scaling (no automatic scaling)
- **Customization**: Set to `1.5` for 150% scaling, `2` for 200% scaling

#### Window Decorations

```bash
env = QT_WAYLAND_DISABLE_WINDOWDECORATION,1
```

- **Purpose**: Disables Qt's built-in window decorations on Wayland
- **Reason**: Hyprland handles window decorations, Qt decorations would conflict

#### Platform Themes

```bash
env = QT_QPA_PLATFORMTHEME,qt5ct
env = QT_QPA_PLATFORMTHEME,qt6ct
```

- **Purpose**: Sets Qt applications to use qt5ct/qt6ct for theming
- **Integration**: Works with Qt theming system in HyprFlux

### Hyprland Qt Support

```bash
# hyprland-qt-support
env = QT_QUICK_CONTROLS_STYLE,org.hyprland.style
```

- **Purpose**: Uses Hyprland-specific Qt style
- **Requirement**: Requires hyprland-qt-support package
- **Integration**: Provides consistent styling with Hyprland

### Scaling Configuration

```bash
# xwayland apps scale fix (useful if you are use monitor scaling).
# Set same value if you use scaling in Monitors.conf
# 1 is 100% 1.5 is 150%
# see https://wiki.hyprland.org/Configuring/XWayland/
env = GDK_SCALE,1
env = QT_SCALE_FACTOR,1
```

#### Application Scaling

- **GDK_SCALE**: Controls scaling for GTK applications
- **QT_SCALE_FACTOR**: Controls scaling for Qt applications
- **Coordination**: Should match monitor scaling settings

**Scaling Examples**:

```bash
# 100% scaling (default)
env = GDK_SCALE,1
env = QT_SCALE_FACTOR,1

# 125% scaling
env = GDK_SCALE,1.25
env = QT_SCALE_FACTOR,1.25

# 150% scaling (common for 4K displays)
env = GDK_SCALE,1.5
env = QT_SCALE_FACTOR,1.5

# 200% scaling (high DPI)
env = GDK_SCALE,2
env = QT_SCALE_FACTOR,2
```

### Cursor Configuration

```bash
# Bibata-Modern-Ice-Cursor
# NOTE! You must have the hyprcursor version to activate this.
# https://wiki.hyprland.org/Hypr-Ecosystem/hyprcursor/
env = HYPRCURSOR_THEME,Bibata-Modern-Classic
env = HYPRCURSOR_SIZE,20
```

#### Cursor Theme

```bash
env = HYPRCURSOR_THEME,Bibata-Modern-Classic
```

- **Purpose**: Sets the cursor theme for Hyprland
- **Requirement**: Requires hyprcursor-compatible cursor theme
- **Alternatives**: `Bibata-Modern-Ice`, `Adwaita`, `breeze_cursors`

#### Cursor Size

```bash
env = HYPRCURSOR_SIZE,20
```

- **Purpose**: Sets cursor size in pixels
- **Common Sizes**: `16`, `20`, `24`, `32`, `48`
- **Scaling**: Larger sizes for high-DPI displays

### Application-Specific Variables

#### Firefox

```bash
# firefox
env = MOZ_ENABLE_WAYLAND,1
```

- **Purpose**: Enables native Wayland support in Firefox
- **Benefits**: Better performance, proper scaling, Wayland-specific features

#### Electron Applications

```bash
# electron >28 apps (may help) ##
# https://www.electronjs.org/docs/latest/api/environment-variables
env = ELECTRON_OZONE_PLATFORM_HINT,auto # auto selects Wayland if possible, X11 otherwise
```

- **Purpose**: Configures Electron applications for Wayland
- **Auto Selection**: Chooses Wayland when available, falls back to X11
- **Affects**: VS Code, Discord, Spotify, and other Electron apps

## Hardware-Specific Configuration

### NVIDIA Configuration

```bash
# NVIDIA
# This is from Hyprland Wiki. Below will be activated nvidia gpu detected
# See hyprland wiki https://wiki.hyprland.org/Nvidia/#environment-variables

#env = LIBVA_DRIVER_NAME,nvidia
#env = __GLX_VENDOR_LIBRARY_NAME,nvidia
#env = NVD_BACKEND,direct
#env = GSK_RENDERER,ngl

# additional ENV's for nvidia. Caution, activate with care
#env = GBM_BACKEND,nvidia-drm

#env = __GL_GSYNC_ALLOWED,1 #adaptive Vsync
#env = __NV_PRIME_RENDER_OFFLOAD,1
#env = __VK_LAYER_NV_optimus,NVIDIA_only
#env = WLR_DRM_NO_ATOMIC,1
```

#### Basic NVIDIA Variables

```bash
env = LIBVA_DRIVER_NAME,nvidia          # Hardware video acceleration
env = __GLX_VENDOR_LIBRARY_NAME,nvidia  # OpenGL vendor library
env = NVD_BACKEND,direct                # NVIDIA direct backend
env = GSK_RENDERER,ngl                  # GTK4 renderer
```

#### Advanced NVIDIA Variables

```bash
env = GBM_BACKEND,nvidia-drm            # GBM backend (use with caution)
env = __GL_GSYNC_ALLOWED,1              # Enable G-Sync/FreeSync
env = __NV_PRIME_RENDER_OFFLOAD,1       # PRIME render offloading
env = __VK_LAYER_NV_optimus,NVIDIA_only # Vulkan NVIDIA-only
env = WLR_DRM_NO_ATOMIC,1               # Disable atomic DRM (if needed)
```

### Virtual Machine Configuration

```bash
# FOR VM and POSSIBLY NVIDIA
# LIBGL_ALWAYS_SOFTWARE software mesa rendering
#env = LIBGL_ALWAYS_SOFTWARE,1 # Warning. May cause hyprland to crash
#env = WLR_RENDERER_ALLOW_SOFTWARE,1
```

#### Software Rendering

```bash
env = LIBGL_ALWAYS_SOFTWARE,1      # Force software rendering
env = WLR_RENDERER_ALLOW_SOFTWARE,1 # Allow software rendering in wlroots
```

- **Use Case**: Virtual machines, systems without proper GPU drivers
- **Warning**: May cause performance issues or crashes

### Firefox Hardware Acceleration (NVIDIA)

```bash
# nvidia firefox (for hardware acceleration on FF)?
# check this post https://github.com/elFarto/nvidia-vaapi-driver#configuration
#env = MOZ_DISABLE_RDD_SANDBOX,1
#env = EGL_PLATFORM,wayland
```

#### Firefox NVIDIA Acceleration

```bash
env = MOZ_DISABLE_RDD_SANDBOX,1    # Disable RDD sandbox for NVIDIA
env = EGL_PLATFORM,wayland         # Use Wayland EGL platform
```

## Advanced Environment Variables

### Aquamarine Environment Variables (Hyprland > 0.45)

```bash
#### Aquamarine Environment Variables #### ( Hyprland > 0.45 )
# https://wiki.hyprland.org/Configuring/Environment-variables/#aquamarine-environment-variables
# env = AQ_TRACE,1 # Enables more verbose logging.
# env = AQ_DRM_DEVICES,/dev/dri/card1:/dev/dri/card0 # Set explicit DRM devices
# env = AQ_MGPU_NO_EXPLICIT,1 # Disables explicit syncing on mgpu buffers
# env = AQ_NO_MODIFIERS,1 # Disables modifiers for DRM buffers
```

#### Aquamarine Debug Options

```bash
env = AQ_TRACE,1                    # Verbose logging
env = AQ_DRM_DEVICES,/dev/dri/card1:/dev/dri/card0  # Explicit GPU order
env = AQ_MGPU_NO_EXPLICIT,1         # Disable explicit sync (multi-GPU)
env = AQ_NO_MODIFIERS,1             # Disable DRM modifiers
```

### Hyprland Environment Variables

```bash
#### Hyprland Environment Variables ####
# https://wiki.hyprland.org/Configuring/Environment-variables/#hyprland-environment-variables
# env = HYPRLAND_TRACE,1 # Enables more verbose logging.
# env = HYPRLAND_NO_RT,1 # Disables realtime priority setting by Hyprland.
# env = HYPRLAND_NO_SD_NOTIFY,1 # If systemd, disables the 'sd_notify' calls.
# env = HYPRLAND_NO_SD_VARS,1 # Disables management of variables in systemd and dbus activation environments.
```

#### Hyprland Debug and Control

```bash
env = HYPRLAND_TRACE,1              # Verbose Hyprland logging
env = HYPRLAND_NO_RT,1              # Disable realtime priority
env = HYPRLAND_NO_SD_NOTIFY,1       # Disable systemd notifications
env = HYPRLAND_NO_SD_VARS,1         # Disable systemd variable management
```

## Customization Examples

### High-DPI Setup (4K Monitor)

```bash
# Scaling for 4K displays
env = GDK_SCALE,1.5
env = QT_SCALE_FACTOR,1.5
env = QT_AUTO_SCREEN_SCALE_FACTOR,1.5
env = HYPRCURSOR_SIZE,32
```

### Gaming Setup (NVIDIA)

```bash
# NVIDIA gaming optimizations
env = LIBVA_DRIVER_NAME,nvidia
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
env = __GL_GSYNC_ALLOWED,1
env = __NV_PRIME_RENDER_OFFLOAD,1
env = SDL_VIDEODRIVER,wayland
```

### Development Setup

```bash
# Development-focused configuration
env = MOZ_ENABLE_WAYLAND,1
env = ELECTRON_OZONE_PLATFORM_HINT,wayland
env = QT_QPA_PLATFORM,wayland
env = GDK_BACKEND,wayland
```

### Virtual Machine Setup

```bash
# VM-specific configuration
env = LIBGL_ALWAYS_SOFTWARE,1
env = WLR_RENDERER_ALLOW_SOFTWARE,1
env = SDL_VIDEODRIVER,x11
```

## Troubleshooting

### Common Issues

#### Applications Not Using Wayland

```bash
# Check if variables are set
echo $GDK_BACKEND
echo $QT_QPA_PLATFORM

# Force Wayland for specific application
GDK_BACKEND=wayland firefox
```

#### Scaling Issues

```bash
# Reset scaling
env = GDK_SCALE,1
env = QT_SCALE_FACTOR,1

# Check current scaling
echo $GDK_SCALE
echo $QT_SCALE_FACTOR
```

#### NVIDIA Issues

```bash
# Check NVIDIA driver
nvidia-smi

# Test NVIDIA variables
__GLX_VENDOR_LIBRARY_NAME=nvidia glxinfo | grep vendor
```

### Debug Commands

```bash
# Check environment variables
env | grep -E "(GDK|QT|XDG|WAYLAND)"

# Test application backends
GDK_BACKEND=wayland gtk3-demo
QT_QPA_PLATFORM=wayland qmlscene
```

### Validation

#### Test Wayland Integration

```bash
# Check if applications are using Wayland
xlsclients  # Should show minimal X11 clients
loginctl show-session $(loginctl show-user $(whoami) -p Sessions --value) -p Type
```

## Best Practices

### Configuration Management

#### Environment-Specific Settings

```bash
# Different settings for different systems
if [[ $(hostname) == "gaming-pc" ]]; then
    # NVIDIA gaming setup
    env = __GL_GSYNC_ALLOWED,1
elif [[ $(hostname) == "laptop" ]]; then
    # Power-saving setup
    env = GDK_SCALE,1.25
fi
```

#### Conditional NVIDIA Configuration

```bash
# Only set NVIDIA variables if NVIDIA GPU is present
if lspci | grep -i nvidia; then
    env = LIBVA_DRIVER_NAME,nvidia
    env = __GLX_VENDOR_LIBRARY_NAME,nvidia
fi
```

### Performance Optimization

#### Minimal Configuration

```bash
# Essential variables only
env = XDG_CURRENT_DESKTOP,Hyprland
env = XDG_SESSION_TYPE,wayland
env = GDK_BACKEND,wayland,x11
env = QT_QPA_PLATFORM,wayland;xcb
```

#### Maximum Compatibility

```bash
# Full compatibility configuration
env = GDK_BACKEND,wayland,x11,*
env = QT_QPA_PLATFORM,wayland;xcb
env = SDL_VIDEODRIVER,wayland
env = CLUTTER_BACKEND,wayland
env = MOZ_ENABLE_WAYLAND,1
env = ELECTRON_OZONE_PLATFORM_HINT,auto
```

This environment variables configuration ensures optimal compatibility, performance, and integration of applications within the HyprFlux Wayland desktop environment.

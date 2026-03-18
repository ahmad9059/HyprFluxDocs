# Dotfiles Installation

This guide covers installing HyprFlux configurations on an existing Arch Linux system. If you want to install the complete operating system with automated partitioning, use the [ISO Installation](/general/iso-installation) instead.

::: info Not for Clean Installs
This method is for **existing Arch Linux installations**. For clean installations on new hardware, use the [ISO Installation](/general/iso-installation) method.
:::

## Prerequisites

Before installing HyprFlux dotfiles, ensure you have:

- An existing Arch Linux installation
- A working internet connection
- `sudo` privileges
- Basic tools: `curl`, `git`, `sudo`

## Installation Methods

### Method 1: One-Liner Install (Recommended)

Run this command in your terminal:

```bash [bash]
sh <(curl -fsSL https://hyprflux.dev/install)
```

### Method 2: Manual Install

If you prefer to review the code first:

1. Clone the repository:
```bash
git clone https://github.com/ahmad9059/HyprFlux.git
cd HyprFlux
```

2. Run the installer:
```bash
chmod +x install.sh
./install.sh
```

---

## Installation Process

### Step 1: Enter Sudo Password

The installer will ask for your sudo password. Enter it when prompted.

![welcome](/welcome.png)

### Step 2: Select AUR Helper

Choose an AUR helper (`yay` or `paru`). We recommend **yay**.

![yay-paru](/yay-paru.png)

### Step 3: Select Installation Options

Choose which components to install:

![select-option](/select-option.png)

#### Essential Components (Recommended)

| Component | Description |
|-----------|-------------|
| `input_group` | Add your user to the input group for Waybar functionality |
| `sddm` | Display manager for the login screen |
| `sddm_theme` | Beautiful custom SDDM theme |
| `gtk_themes` | GTK theme integration |
| `bluetooth` | Bluetooth support |
| `thunar` | File manager |
| `xdph` | Desktop portal for Hyprland |
| `zsh` | Enhanced shell with Oh My Zsh |
| `dots` | Core dotfiles and configurations |

#### Optional Components

| Component | Description |
|-----------|-------------|
| `QuickShell` | QuickShell for desktop-like overview |
| `Pokemon` | Add Pokémon color scripts to your terminal |
| `Rog` | Pre-configured setup for ROG laptops |

::: tip Recommendation
For the best experience, install all essential components. Optional components can be added later.
:::

### Step 4: Wait for Installation

After selecting your options, the installer will:

1. Install required packages from official repositories
2. Install packages from AUR
3. Copy dotfiles to your home directory
4. Configure themes, icons, and cursors
5. Set up SDDM login theme
6. Configure Zsh shell
7. Apply all configurations

This process typically takes 15-45 minutes depending on your internet connection and system speed.

::: info Sudo Password
During the process, it may ask for your **sudo password** 2–3 times. Stay nearby to enter it when needed.
:::

---

## What's Installed

After installation completes, you'll have:

### Desktop Environment
- **Hyprland** - Tiling Wayland compositor
- **Waybar** - Status bar with custom modules
- **Rofi** - Application launcher and menu system
- **SDDM** - Login display manager with HyprFlux theme

### Terminal & Shell
- **Kitty** - GPU-accelerated terminal
- **Zsh** - Shell with Oh My Zsh and custom plugins
- **Tmux** - Terminal multiplexer

### System Components
- **GTK Themes** - HyprFlux dark theme
- **Icons & Cursors** - Custom icon packs
- **Wallpapers** - Curated wallpaper collection
- **Fonts** - Nerd Fonts and system fonts

### Optional (if selected)
- **Neovim** - Text editor with full IDE features
- **Bluetooth** - Bluetooth management tools
- **Thunar** - File manager with customizations

---

## Post-Installation

### First Boot

1. **Reboot your system** (if requested by the installer)
2. **Log in** through SDDM
3. **Wait for first-boot setup** - The system will automatically complete initial configuration
4. **Start using HyprFlux!**

### Important Locations

| Location | Description |
|----------|-------------|
| `~/.config/` | All application configurations |
| `~/.config/hypr/` | Hyprland window manager settings |
| `~/.config/waybar/` | Status bar configuration |
| `~/.config/rofi/` | Launcher themes |
| `~/Pictures/wallpapers/` | Wallpapers |
| `~/.themes/` | GTK themes |
| `~/.icons/` | Icon packs |
| `~/dotfiles_backup/` | Backup of your previous configs |

### Backup

The installer automatically backs up your existing dotfiles to `~/dotfiles_backup/` before replacing them. You can restore them if needed.

---

## Troubleshooting

### Installation Fails

If the installation fails:
1. Check your internet connection
2. Ensure you have sufficient disk space
3. Update your system: `sudo pacman -Syu`
4. Try running the installer again

### Packages Fail to Install

If AUR packages fail:
1. Try a different AUR helper (yay vs paru)
2. Manually install problematic packages
3. Check AUR package status online

### Desktop Doesn't Start

If Hyprland doesn't start:
1. Check GPU drivers are installed
2. Review logs: `hyprctl logs`
3. Verify you're in the correct groups: `groups $USER`

### Missing Features

If some features don't work:
1. Run the installer again and select missing components
2. Check [GitHub Issues](https://github.com/ahmad9059/HyprFlux/issues) for known problems
3. Ask for help in the community

---

## Next Steps

- [Quick Start Guide](/general/quickstart) - Learn the basics
- [Keybindings](/keybindings/hyprland) - Master the keyboard shortcuts
- [Configuration](/hyprland/hyprland) - Customize your setup

::: tip Enjoy!
You're all set! Enjoy your newly configured HyprFlux desktop.
:::

---

## Comparison: ISO vs Dotfiles

| Feature | ISO Installation | Dotfiles Installation |
|---------|-----------------|----------------------|
| Clean system install | ✅ Yes | ❌ No (requires Arch) |
| Automated partitioning | ✅ Yes | ❌ No |
| Complete OS | ✅ Yes | ❌ Configs only |
| Existing system | ❌ No | ✅ Yes |
| Full control | ❌ Guided | ✅ More control |
| Best for | New installs | Existing Arch users |

Not sure which to choose? See the [Download page](/general/download) for more details.

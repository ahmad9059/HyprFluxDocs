# ISO Installation Guide

This guide walks you through installing HyprFlux using the ISO image. This method installs a complete Arch Linux operating system with HyprFlux pre-configured.

## Prerequisites

Before you begin, ensure you have:

- A USB drive (8GB or larger)
- A computer with x86_64 architecture
- At least 4GB of RAM (8GB+ recommended)
- At least 20GB of free disk space
- An active internet connection (required during installation)

## Download the ISO

Download the latest HyprFlux ISO from one of these sources:

- **GitHub Releases:** [v1.0.0](https://github.com/ahmad9059/HyprFlux-ISO/releases/tag/1.0.0)
- **Google Drive:** [Download Mirror](https://drive.google.com/drive/folders/1ptOUoY4H7l4jT0jFcKoX9yxOKdc43m-_?usp=sharing)
- **SourceForge:** [Alternative Mirror](https://sourceforge.net/projects/hyprflux/files/v1.0.0/)

## Create a Bootable USB

### Linux

Using `dd`:

```bash
sudo dd if=hyprflux-*.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

Replace `/dev/sdX` with your USB device (e.g., `/dev/sdb`).

Using `balenaEtcher`:
1. Download and install [balenaEtcher](https://www.balena.io/etcher/)
2. Select the ISO file
3. Select your USB drive
4. Click "Flash"

### Windows

Using Rufus:
1. Download [Rufus](https://rufus.ie/)
2. Select your USB drive
3. Select the HyprFlux ISO
4. Click "Start"

Using balenaEtcher:
1. Download [balenaEtcher](https://www.balena.io/etcher/)
2. Select the ISO file
3. Select your USB drive
4. Click "Flash"

### macOS

Using balenaEtcher:
1. Download [balenaEtcher](https://www.balena.io/etcher/)
2. Select the ISO file
3. Select your USB drive
4. Click "Flash"

## Boot from USB

1. Insert the bootable USB drive into your computer
2. Restart your computer
3. Enter the boot menu (usually F12, F10, F2, or Escape during startup)
4. Select the USB drive from the boot menu
5. Choose "HyprFlux" from the boot menu

::: tip UEFI vs BIOS
The ISO supports both UEFI and Legacy BIOS boot modes. Select the appropriate option for your system.
:::

## Installation Process

The HyprFlux installer will launch automatically after booting. It uses a TUI (Text User Interface) with the following steps:

### Step 0: Network Setup

The installer will automatically detect and configure your network connection using NetworkManager. If you need to connect to Wi-Fi, you can use `nmtui` before starting the installation.

### Step 1: Welcome

The installer displays a welcome message with the HyprFlux logo and installation overview.

### Step 2: Timezone Selection

Select your timezone from the list or search for your location.

### Step 3: Locale Selection

Choose your system locale (language and character encoding).

### Step 4: Keyboard Layout

Select your keyboard layout from the available options.

### Step 5: Hostname

Enter a hostname for your computer (e.g., `hyprflux-pc`).

### Step 6: User Creation

Create a user account:
- Enter your full name
- Enter a username
- Set a password
- Confirm the password

::: warning Important
Remember your password! You'll need it to log in after installation.
:::

### Step 7: Disk Partitioning

Choose your partitioning method:

**Automatic (Recommended for beginners):**
- Wipes the entire selected disk
- Creates EFI, swap, and root partitions automatically
- Best for clean installations

**Manual (Advanced):**
- Allows custom partitioning
- You must create and format partitions yourself
- Best for dual-boot or custom setups

::: danger Data Loss Warning
Automatic partitioning will erase all data on the selected disk. Make sure to backup important data before proceeding!
:::

### Step 8: Base System Installation

The installer will:
- Format the partitions
- Install the base Arch Linux system using `pacstrap`
- Install essential packages

This step requires an active internet connection and may take 10-30 minutes depending on your connection speed.

### Step 9: System Configuration

The installer configures:
- Timezone and hardware clock
- Locale and language settings
- Hostname and hosts file
- User accounts and passwords
- GRUB bootloader (for both UEFI and BIOS)
- Network configuration

### Step 10: HyprFlux Integration

The installer prepares the HyprFlux desktop environment by:
- Cloning the HyprFlux dotfiles repository
- Setting up the installation pipeline
- Preparing first-boot configuration

### Step 11: Cleanup and Reboot

After installation completes:
1. The installer will unmount all partitions
2. You'll be prompted to reboot
3. Remove the USB drive when instructed
4. Press Enter to reboot

## First Boot

After rebooting:

1. **Bootloader:** Select HyprFlux from the GRUB menu
2. **Login:** Enter your username and password at the SDDM login screen
3. **First-Boot Setup:** The system will automatically complete initial setup:
   - Configure GTK themes
   - Set up PipeWire audio
   - Apply final configurations
4. **Desktop:** You'll be logged into the HyprFlux desktop

## Post-Installation

### Initial Setup

1. **Update the system:**
   ```bash
   sudo pacman -Syu
   ```

2. **Install additional software:**
   ```bash
   yay -S package-name
   ```

3. **Customize your desktop:**
   - Edit configs in `~/.config/`
   - Change wallpapers in `~/Pictures/wallpapers/`
   - Modify keybindings in `~/.config/hypr/`

### Useful Locations

- **Configs:** `~/.config/`
- **Wallpapers:** `~/Pictures/wallpapers/`
- **Themes:** `~/.themes/`
- **Icons:** `~/.icons/`

### Getting Help

- Visit the [Quick Start Guide](/general/quickstart) for usage tips
- Check the [Keybindings](/keybindings/hyprland) reference
- Report issues on [GitHub](https://github.com/ahmad9059/HyprFlux/issues)

## Troubleshooting

### Installation Hangs

If the installer appears to hang:
- Check your internet connection
- Try a wired connection instead of Wi-Fi
- Wait at least 30 minutes for slow connections

### Boot Issues

If the system won't boot:
- Check that Secure Boot is disabled in BIOS
- Verify the boot mode matches your partition scheme (UEFI/BIOS)
- Reinstall GRUB if needed

### Network Not Working

If network doesn't work after installation:
- Check that NetworkManager is running: `systemctl status NetworkManager`
- Enable it if needed: `sudo systemctl enable --now NetworkManager`
- Use `nmtui` to configure connections

### Graphics Issues

If you experience graphics problems:
- For NVIDIA GPUs, ensure the proprietary drivers are installed
- Check Hyprland logs: `hyprctl logs`
- Verify your GPU is supported by Hyprland

## Next Steps

- [Quick Start Guide](/general/quickstart) - Learn the basics
- [Keybindings Reference](/keybindings/hyprland) - Master the shortcuts
- [Configuration Guide](/hyprland/hyprland) - Customize your setup

::: tip Welcome to HyprFlux!
You're all set! Enjoy your new HyprFlux desktop environment. Don't forget to star the repository if you like it!
:::

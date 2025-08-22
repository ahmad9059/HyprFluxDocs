# Arch Linux Installation Guide - Minimal Profile

This guide walks you through installing Arch Linux using the `archinstall` script with a minimal desktop profile.

## Prerequisites

- A computer with UEFI firmware
- At least 2GB RAM and 20GB storage
- Stable internet connection
- USB drive (4GB minimum)

## Step 1: Create Bootable USB

### Download Required Files

1. Download the latest Arch Linux ISO from the [official website](https://archlinux.org/download/)
2. Download [Ventoy](https://github.com/ventoy/Ventoy/releases) for your operating system

### Create Bootable USB

1. Extract the Ventoy archive
2. Run Ventoy and select your USB drive
3. Install Ventoy to the USB drive
4. Copy the Arch Linux ISO file to the USB drive

> **Note:** For detailed Ventoy instructions, see [this guide](https://itsfoss.com/use-ventoy/)

## Step 2: Boot from USB

1. Insert the USB drive and restart your computer
2. Press the boot menu key (usually F12, F2, or Del) during startup
3. Select your USB drive from the boot menu
4. Choose the Arch Linux ISO from Ventoy's menu
5. Select "Boot in normal mode"

## Step 3: Connect to Internet

### Wired Connection

Wired connections work automatically - no configuration needed.

### Wireless Connection

Use the `iwctl` utility for WiFi setup:

```bash
iwctl
```

From the `[iwd]#` prompt, list available devices and connect:

```bash
[iwd]# device list
[iwd]# station wlan0 scan
[iwd]# station wlan0 get-networks
[iwd]# station wlan0 connect "Your-WiFi-Name"
```

Enter your WiFi password when prompted, then exit with `Ctrl+D`.

### Verify Connection

```bash
ping -c 3 archlinux.org
```

## Step 4: Prepare Disk Partitions

### View Available Disks

```bash
lsblk
```

### Create Partitions

Use `cfdisk` to create partitions:

```bash
cfdisk /dev/sdX  # Replace X with your disk letter
```

Create these three partitions:

| Partition   | Size      | Type             | Purpose        |
| ----------- | --------- | ---------------- | -------------- |
| `/dev/sdX1` | 512MB     | EFI System       | Boot partition |
| `/dev/sdX2` | 4-8GB     | Linux swap       | Swap space     |
| `/dev/sdX3` | Remaining | Linux filesystem | Root partition |

### Format Partitions

Replace `/dev/sdX#` with your actual partition paths:

```bash
# Format root partition
mkfs.ext4 /dev/sdX3

# Format EFI partition
mkfs.vfat -F 32 /dev/sdX1

# Create swap
mkswap /dev/sdX2
```

### Mount Partitions

```bash
# Create mount point and mount root
mkdir /mnt/archinstall
mount /dev/sdX3 /mnt/archinstall

# Mount EFI partition
mkdir /mnt/archinstall/boot
mount /dev/sdX1 /mnt/archinstall/boot

# Enable swap
swapon /dev/sdX2
```

## Step 5: Update System and Launch Installer

```bash
# Update package database and install latest archinstall
pacman -Sy archinstall archlinux-keyring

# Launch the installer
archinstall
```

## Step 6: Configure Installation

The `archinstall` script will present a menu. Configure each option:

### Required Settings

1. **Locales**
   - Keyboard layout: Select your keyboard layout
   - Locale language: Choose your language (e.g., en_US)
   - Locale encoding: UTF-8 (default)

2. **Mirrors**
   - Select mirror region closest to your location

3. **Disk configuration**
   - Choose "Partitioning"
   - Select "Pre-mounted configuration"
   - Enter mount point: `/mnt/archinstall`

4. **Swap**
   - Enable if you created a swap partition

5. **Bootloader**
   - Recommended: `grub-install` for broader compatibility
   - Alternative: `systemd-bootctl` for UEFI systems

6. **Hostname**
   - Enter a name for your computer (e.g., `arch`)

7. **Root password**
   - Set a strong password for the root account

8. **User account**
   - Create a regular user account
   - Add to user account to sudo group access

### Profile and Software

9. **Profile**
   - Select "Type" → "Minimal"
   - This installs a base system without desktop environment

10. **Audio**
    - Select "Pipewire" (modern audio system)

11. **Kernels**
    - Keep default "linux" kernel
    - Add "linux-lts" for stability if desired

12. **Network configuration**
    - Select "Use NetworkManager"

13. **Additional packages**
    - Add essential packages: `git vim`

14. **Optional repositories**
    - Enable `multilib` for 32-bit application support

### Final Settings

15. **Timezone**
    - Select your timezone

16. **Automatic time sync (NTP)**
    - Leave enabled (recommended)

## Step 7: Install System

1. Review all settings carefully
2. Select "Install" to begin the installation
3. Confirm when prompted
4. Wait for installation to complete (10-30 minutes)

## Step 8: Post-Installation

1. When installation completes, remove the USB drive
2. Reboot the system:

   ```bash
   reboot
   ```

3. Log in with your user account
4. Update the system:
   ```bash
   sudo pacman -Syu
   ```

## Next Steps

Your minimal Arch Linux system is now ready!

**Congratulations!** 🎉 You've successfully installed Arch Linux and can now proudly say "I use Arch, btw!"

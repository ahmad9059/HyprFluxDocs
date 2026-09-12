---
title: Install HyprFlux for the First Time - HyprFlux
description: A guided, step-by-step tutorial that installs HyprFlux from the bootable ISO, from a blank USB drive to a working Hyprland desktop.
---

# Install HyprFlux for the First Time

This tutorial walks you through installing HyprFlux on a computer that does
not have Arch Linux yet. You will boot from a USB drive, let the installer
set up Arch Linux, and finish with a fully configured HyprFlux desktop — no
prior Hyprland or Arch experience required.

By the end, you will have signed in to a working HyprFlux desktop for the
first time.

::: info Already have Arch Linux installed?
This tutorial installs Arch Linux for you. If Arch is already installed on
your system, skip this tutorial and follow the
[existing-Arch installation guide](/general/installation) instead.
:::

## Before You Start

You will need:

- An x86_64 computer with at least 4 GB of RAM (8 GB or more is recommended)
  and at least 20 GB of free storage.
- A USB drive large enough to hold the ISO.
- An internet connection — the installer downloads packages throughout.

::: warning This tutorial erases a disk
The installer will erase the entire disk you choose during setup. Use a
spare machine or virtual machine if you're unsure, and back up anything you
care about first.
:::

The full requirement list, including storage guidance, is in the
[complete ISO installation guide](/general/iso-installation#prerequisites) if
you want more detail before continuing.

## Step 1: Download and Verify the ISO

Download the latest HyprFlux ISO and its matching `.sha256` file from the
[HyprFlux releases page](https://github.com/ahmad9059/HyprFlux/releases/latest).
Put both files in the same folder, then verify the ISO:

```bash
sha256sum -c hyprflux-*.iso.sha256
```

Wait for the command to print `OK` before continuing. If it doesn't,
download the ISO again — see the [download guide](/general/download) if
you'd rather use a mirror.

## Step 2: Write the ISO to a USB Drive

Find your USB drive's device name with `lsblk`, then write the ISO to it:

::: warning This erases the USB drive
`dd` writes to the whole device, not a partition. Double-check `/dev/sdX`
before running this — the wrong device name destroys its data.
:::

```bash
lsblk
sudo dd bs=4M if=hyprflux-*.iso of=/dev/sdX status=progress oflag=sync
```

If you'd rather use a graphical tool, [balenaEtcher](https://etcher.balena.io/)
works too.

## Step 3: Boot the ISO

Insert the USB drive, restart the computer, and open its firmware boot menu.
Select the USB device.

![HyprFlux UEFI boot menu](./assets/img-1.webp)

Choose the normal HyprFlux installer option. You'll see the boot splash, and
then the installer signs you in automatically and starts:

![HyprFlux boot splash](./assets/img.webp)

## Step 4: Follow the Installer

The installer walks you through several screens in order:

1. **Network check** — the installer confirms it can reach the internet. If
   this fails, it drops you to a shell where you can run `nmtui` to connect,
   then restart it with `bash ~/hyprflux-install.sh`.
2. **Welcome and confirmation** — review the requirements and confirm you
   want to continue. Nothing is erased yet.
3. **Regional settings** — pick your timezone, locale, and keyboard layout.
4. **Hostname and user** — choose a hostname, a lowercase username, and a
   password. This password is used for both your account and the root
   account.
5. **Disk method** — choose **Automatic**. It partitions the whole selected
   disk (GPT/ext4, with the correct boot partition for your firmware) and
   asks you to type `yes` to confirm before erasing anything.

   ![Automatic and manual disk options](./assets/img-9.webp)

   ::: warning Automatic mode erases the selected disk
   Double-check the device name, path, and size before typing `yes`. This
   cannot be undone.
   :::

   There's also a **Manual** option for partitioning the disk yourself — the
   [complete ISO installation guide](/general/iso-installation#_5-choose-a-disk-method)
   covers that path if you need it.

From here, the installer takes over: it installs the Arch Linux base system,
then provisions the complete HyprFlux desktop — packages, services, themes,
and configuration — before it's done. This takes a while; let it run.

## Step 5: Reboot

When the installer finishes, remove the USB drive and press Enter. It syncs
data, unmounts everything, and reboots automatically.

## Step 6: Sign In

After rebooting, sign in through SDDM with the username and password you
created. On this first login, HyprFlux finishes a few remaining setup steps
in the background — applying your GTK, icon, cursor, and font settings, and
starting audio services — so give it a moment before things feel fully
settled.

## You're Done

You now have a working HyprFlux desktop: Hyprland as your window manager,
plus Waybar, Rofi, SwayNC, and the rest of the default stack, all configured
and running.

## Next Steps

- **[Hyprland keybindings](/keybindings/hyprland)** — learn the shortcuts
  before you start navigating; the desktop won't make sense without them.
- **[Features](/features/hyprland)** — see what each part of the desktop
  does.
- **[Configuration](/hyprland/hyprland)** — customize your setup.
- **[Troubleshooting](/general/troubleshooting)** — if something isn't
  working the way this tutorial described.
- **[Existing-Arch installation](/general/installation)** — the guide to use
  next time, if you ever install HyprFlux on a system that already runs Arch
  Linux.

If you hit a problem this tutorial doesn't cover, open a
[GitHub issue](https://github.com/ahmad9059/HyprFlux/issues) with the step
you were on and the relevant files from `~/HyprFlux/logs/`.

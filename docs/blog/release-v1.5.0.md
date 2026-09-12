---
title: HyprFlux ISO v1.5.0 Release
description: HyprFlux ISO v1.5.0 introduces Lua-based Hyprland configuration, unified installation sources, hardware-aware setup, AWWW wallpapers, and reliability improvements.
---

# HyprFlux ISO v1.5.0

_Published: September 9, 2026_

HyprFlux ISO v1.5.0 is a production-focused release spanning the desktop,
installer, live ISO, boot experience, hardware setup, and project tooling. It
provides branded UEFI and legacy BIOS boot paths and completes HyprFlux desktop
provisioning before the first reboot.

[View the official v1.5.0 release and assets](https://github.com/ahmad9059/HyprFlux/releases/tag/v1.5.0).

## Highlights

- Migrated the maintained Hyprland configuration from Hyprlang fragments to Lua.
- Unified the base installer, base dotfiles, and ISO installation source.
- Added branded UEFI GRUB and legacy BIOS Syslinux boot experiences.
- Added guided automatic and expert manual disk-partitioning paths.
- Replaced SWWW with AWWW for image wallpapers, effects, and rotation while
  retaining mpvpaper for video wallpapers.
- Added hardware-aware graphics, virtualization, laptop, power, input, and
  monitor setup.

## Installer and Reliability

- Package installation now runs in ordered phases with logs under
  `~/HyprFlux/logs/`.
- Failed package batches receive per-package recovery, including
  repository-to-AUR fallback where supported.
- One failed AUR package no longer skips the remaining package list.
- Yay bootstrap, Chaotic-AUR setup, dependency handling, and rerun behavior are
  more resilient.
- GRUB, Plymouth, initramfs, and boot artifacts receive stronger installation
  and verification checks.
- First-login recovery can retry packages that were unavailable during ISO
  provisioning.

## Desktop and Tooling

- Updated configuration syntax for current Hyprland releases.
- Refined Waybar, Rofi, SwayNC, Wlogout, Hyprlock, Kitty, Foot, Yazi,
  Fastfetch, and Cava.
- Updated GTK, Qt, Kvantum, cursor, font, workspace, and color integration.
- Improved screenshot, brightness, volume, media, keyboard, game-mode,
  weather, and clipboard tools.
- Added Neovim, Tmuxifier, Zsh, Yazi, web-app, and AI command-line tooling
  setup.
- Removed obsolete AGS and Quickshell desktop layers and duplicate
  configuration paths.

## Boot and Platform Support

- UEFI boot through GRUB.
- Legacy BIOS boot through Syslinux.
- Hybrid x86_64 ISO suitable for USB media and virtual machines.
- Automatic and manual partitioning workflows.
- Complete HyprFlux provisioning during installation.

## Download and Verify

Download these matching assets from the [v1.5.0 release](https://github.com/ahmad9059/HyprFlux/releases/tag/v1.5.0):

- `hyprflux-2026.09.09-x86_64.iso`
- `hyprflux-2026.09.09-x86_64.iso.sha256`

Verify them from the same directory:

```bash
sha256sum -c hyprflux-2026.09.09-x86_64.iso.sha256
```

The published ISO SHA-256 digest is:

```text
2f9245238dd9a5e7375f0fcbb851a710a5ec89f83ffa3ac4c88b94e96aaf6740
```

Continue with the [download and media guide](/general/download) or the full
[ISO installation guide](/general/iso-installation).

## Important Upgrade Notes

- Hyprland user overrides now use Lua; migrate existing compositor `.conf`
  customizations.
- Replace custom SWWW commands and scripts with their AWWW equivalents.
- Quickshell and AGS are no longer part of the default desktop.
- A fresh installation is recommended for the cleanest v1.5.0 experience.

The release points to source commit
[`f421b6b`](https://github.com/ahmad9059/HyprFlux/commit/f421b6bd108214079b56c435331ddbbfdfb89591).

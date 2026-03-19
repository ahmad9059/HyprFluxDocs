---
title: HyprFlux ISO v1.0.0 Release
description: The first stable release of HyprFlux ISO for Arch Linux. Download the bootable ISO with branded TUI installer, UEFI/BIOS support, and automated installation.
---

# HyprFlux ISO v1.0.0

_Published: March 19, 2026_

<p align="center">
  <img src="https://raw.githubusercontent.com/ahmad9059/HyprFlux/main/review/HyprFlux.svg" alt="HyprFlux" width="600" />
</p>

HyprFlux ISO v1.0.0 is the first public release of the HyprFlux installation image for Arch Linux. This release delivers a bootable ISO with a branded text-based installer, support for both UEFI and legacy BIOS systems, and an installation flow designed to provision a HyprFlux-based Hyprland environment on real hardware or virtual machines.

## Highlights

- First stable HyprFlux ISO release
- Arch Linux live ISO built with archiso
- UEFI boot support through GRUB
- Legacy BIOS boot support through Syslinux
- Branded TUI installer with centered HyprFlux interface
- Automatic and manual disk partitioning options
- Online installation model with repository cloning during install
- NetworkManager-based live environment
- Root auto-login on tty1 to launch the installer directly
- QEMU test workflow for local validation
- GitHub Actions build pipeline for automated ISO generation

## Included in this Release

- Custom HyprFlux TUI installer
- Timezone, locale, keyboard, hostname, and user setup
- Automatic and manual disk setup flows
- Base Arch installation using pacstrap
- Target system configuration through arch-chroot
- First-boot preparation for HyprFlux integration

## Boot and Platform Support

- UEFI boot path
- Legacy BIOS boot path
- GRUB configuration for UEFI systems
- Syslinux configuration for BIOS systems
- x86_64 target architecture

## Installation

1. Download the ISO artifact
2. Write it to USB media
3. Boot the target system from the USB device
4. Follow the HyprFlux installer prompts

Example write command:

```sh
sudo dd bs=4M if=hyprflux-*.iso of=/dev/sdX status=progress oflag=sync
```

## Known Scope of v1.0.0

This release establishes the initial ISO, installer, and CI pipeline. Additional polish, installer refinements, theme work, and deeper HyprFlux integration improvements may continue in future releases.

## Download

Download the ISO from [GitHub Releases](https://github.com/ahmad9059/HyprFlux-ISO/releases/tag/1.0.0).
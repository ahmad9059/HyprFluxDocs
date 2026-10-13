---
title: Prepare Arch Linux for HyprFlux
description: Prepare a supported existing Arch Linux base before you run the HyprFlux provisioner.
---

# Prepare Arch Linux for HyprFlux

**Goal:** get a supported, up-to-date Arch Linux base ready so you can run the HyprFlux provisioner on it.

This page is for users who want to install Arch Linux themselves and then run HyprFlux on that system. If HyprFlux should install and partition the whole machine, the [HyprFlux ISO](/general/iso-installation) is the shorter path.

## Install Arch Linux

Download Arch Linux from the [official download page](https://archlinux.org/download/) and follow the [Arch installation guide](https://wiki.archlinux.org/title/Installation_guide). You can also use the [official archinstall workflow](https://wiki.archlinux.org/title/Archinstall).

Arch installer menus and supported storage options change independently of HyprFlux, so this guide does not repeat version-specific menu labels or partition commands.

::: warning Disk operations can destroy data
Writing installation media, formatting partitions, and selecting an install disk can erase data. Verify every device and back up important files before you follow the Arch installation documentation.
:::

## Required result

Before you start HyprFlux, boot into the installed Arch system and confirm that you have:

- an x86_64 Arch Linux installation;
- a non-root user with working `sudo` access;
- an active internet connection;
- at least 4 GB of RAM and 10 GB of free storage;
- `curl`, `git`, and `sudo` available;
- an up-to-date package database and system.

Check the base system:

```bash
uname -m
findmnt /
ping -c 3 archlinux.org
sudo -v
sudo pacman -Syu
```

The architecture should report `x86_64`, the root filesystem should be mounted normally, networking should work, and the sudo and system update commands should finish without errors.

## Continue with HyprFlux

Read the safety and backup behavior in the [existing Arch installation guide](/general/installation), then run the HyprFlux provisioner from your normal user account.

The installer installs the desktop package set and services itself, so do not pre-install a desktop environment to satisfy this handoff. If the `pulseaudio` package is installed, migrate to PipeWire before you continue. The current base installer stops on that conflict.

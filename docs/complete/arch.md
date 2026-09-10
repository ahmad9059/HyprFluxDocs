---
title: Prepare Arch Linux for HyprFlux
description: Prepare a supported existing Arch Linux base before running the full HyprFlux provisioner.
---

# Prepare Arch Linux for HyprFlux

This page is for users who want to install Arch Linux themselves and then run
HyprFlux on that existing system. If HyprFlux should install and partition the
whole machine, the [HyprFlux ISO](/general/iso-installation) is the shorter path.

## Use the Official Arch Installer

Download Arch Linux from the
[official download page](https://archlinux.org/download/) and follow the
[Arch installation guide](https://wiki.archlinux.org/title/Installation_guide).
You can also use the
[official archinstall workflow](https://wiki.archlinux.org/title/Archinstall).

Arch installer menus and supported storage options change independently of
HyprFlux, so this guide does not duplicate version-specific menu labels or
partition commands.

::: danger Disk operations can destroy data
Writing installation media, formatting partitions, and selecting an install
disk can erase data. Verify every device and back up important files before
following the Arch installation documentation.
:::

## Required Result

Before starting HyprFlux, boot into the installed Arch system and confirm that
you have:

- an x86_64 Arch Linux installation;
- a non-root user with working `sudo` access;
- an active internet connection;
- at least 4 GB of RAM and 10 GB of free storage;
- `curl`, `git`, and `sudo` available;
- a fully updated package database and system.

Check the base system:

```bash
uname -m
findmnt /
ping -c 3 archlinux.org
sudo -v
sudo pacman -Syu
```

The architecture should report `x86_64`, the root filesystem should be mounted
normally, networking should work, and sudo/system update commands should
complete without errors.

## Continue with HyprFlux

Read the safety and backup behavior in the
[existing Arch installation guide](/general/installation), then run the full
HyprFlux provisioner from your normal user account.

The HyprFlux installer installs the desktop package set and services itself.
Do not pre-install a separate desktop environment merely to satisfy this
handoff. If the exact `pulseaudio` package is installed, migrate to a compatible
PipeWire setup before continuing because the current base installer stops on
that conflict.

---
title: Provision HyprFlux on an Existing Arch System
description: The complete procedure for provisioning HyprFlux on a system that already has Arch Linux installed.
---

# Provision HyprFlux on an Existing Arch System

**Goal:** provision the complete HyprFlux desktop on a system that already has Arch Linux installed. This updates the system, installs packages and services, deploys configuration, and applies themes.

Use this path when Arch Linux is already installed. The HyprFlux installer performs full desktop provisioning, not a configuration-only copy. For a new machine where the installer should create the Arch system and partition the target disk, use the [ISO installation guide](/general/iso-installation) or follow the [guided tutorial](/general/quickstart).

::: warning This is not a configuration-only install
HyprFlux makes system-wide changes to packages, services, the login manager, the boot theme, the shell, and user configuration. Read the safety notes and keep an independent backup before you run it on a system you care about.
:::

## Requirements

- Arch Linux on an x86_64 system.
- A non-root user with `sudo` access.
- An active internet connection.
- At least 4 GB of RAM and 10 GB of free storage.
- `curl`, `git`, and `sudo`.

The installer performs a full `pacman -Syu`. Resolve any existing package or keyring problems before you continue.

## Before you install

Copy important files somewhere outside `~/.config` and outside `~/dotfiles_backup`. During installation:

- the previous `~/dotfiles_backup` directory is deleted;
- the current `~/.config`, `.zshrc`, and `.tmux.conf` are copied into a new `~/dotfiles_backup`;
- each configuration directory managed by HyprFlux is then removed and replaced from the checkout;
- Neovim, Tmuxifier, wallpapers, monitor profiles, and some theme directories are refreshed by their own modules.

On a rerun, the backup represents the state immediately before that rerun. It is not necessarily your original pre-HyprFlux setup.

## Run the installer

### One-line install

```bash
sh <(curl -fsSL https://hyprflux.dev/install)
```

The endpoint serves the current `install.sh` from the main [HyprFlux repository](https://github.com/ahmad9059/HyprFlux).

### Review the source first

The local-install path expects the checkout at `~/HyprFlux` unless you configure another path:

```bash
git clone https://github.com/ahmad9059/HyprFlux.git "$HOME/HyprFlux"
cd "$HOME/HyprFlux"
bash install.sh
```

## What happens

1. **Bootstrap.** The one-line script installs Git if needed, clones HyprFlux to `~/HyprFlux`, or fast-forwards an existing checkout.
2. **Privilege setup.** The installer validates sudo once and keeps the credential active while it runs.
3. **System preparation.** It initializes the Arch keyring and performs a full system update, ensuring Git and Vim are installed.
4. **Base desktop.** The merged base installer provisions the Hyprland package set, PipeWire, fonts, SDDM, Bluetooth, Thunar, XDG portals, Zsh, and hardware-dependent actions. Yay is bootstrapped automatically when no supported AUR helper is present.
5. **HyprFlux modules.** `dotsSetup.sh` runs the numbered modules in order for backup, configuration deployment, Neovim, themes, Waybar, SDDM, GTK, boot theming, tmux, Zsh, wallpapers, web apps, cursor, monitors, and hardware detection.
6. **Reboot handoff.** Outside ISO mode, the installer asks whether to reboot. Pressing Enter alone selects No, so you can inspect the logs first.

There is no AUR-helper picker, component picker, or optional package menu in the current installer.

## Configuration ownership

The repository's `.config/` tree is the maintained source. During a normal install, module 02 deploys it into your home directory. The merged `base-dots/config/` tree is checked for parity but is not a second deployment source.

`base-dots/copy.sh` is a separate manual workflow and is not called by the normal installer. Do not use it as a substitute for this guide unless you specifically intend to run that lower-level copy path.

## Verify the installation

Before you reboot, confirm that the installer did not report a failure. See [If installation reports a failure](#if-installation-reports-a-failure) for the exact log commands. If nothing failed, continue to the reboot.

## After installation

1. Review the logs before rebooting if the installer reported warnings.
2. Reboot when ready.
3. Sign in through SDDM with your existing user account.
4. Read the [Hyprland keybindings](/keybindings/hyprland) before you navigate the desktop.

Useful locations:

| Location | Purpose |
|---|---|
| `~/HyprFlux/` | Installer checkout and retained logs |
| `~/HyprFlux/logs/install.log` | Top-level installer output |
| `~/HyprFlux/logs/dotsSetup.log` | Numbered module output |
| `~/HyprFlux/logs/installer/` | Base-installer and package logs |
| `~/dotfiles_backup/` | Backup created immediately before the most recent run |
| `~/.config/` | Installed application configuration |
| `~/Pictures/wallpapers/` | Installed wallpaper collection |

## If installation reports a failure

Do not assume the final reboot prompt means every module succeeded. Inspect the retained logs first:

```bash
less "$HOME/HyprFlux/logs/install.log"
less "$HOME/HyprFlux/logs/dotsSetup.log"
ls -la "$HOME/HyprFlux/logs/installer"
```

Check the final lines around the first reported error, and include the relevant log when you open a [GitHub issue](https://github.com/ahmad9059/HyprFlux/issues). Reruns replace `~/dotfiles_backup` and refresh several managed directories, so preserve the current logs and backup before you try again.

The [troubleshooting guide](/general/troubleshooting) covers installation, configuration, graphics, wallpaper, and service diagnostics.

## ISO or existing Arch?

| Capability | HyprFlux ISO | Existing Arch installer |
|---|---|---|
| Installs the Arch base system | Yes | No |
| Can partition a target disk | Yes | No |
| Provisions the complete HyprFlux desktop | Yes | Yes |
| Intended for an existing Arch system | No | Yes |
| Replaces managed user configuration | On the new system | On the existing system |

If you still need an Arch base, use the [HyprFlux ISO](/general/iso-installation) or follow the [Arch preparation guide](/complete/arch).

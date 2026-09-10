---
title: Getting Started - HyprFlux
description: Choose the HyprFlux ISO for a new system or fully provision HyprFlux on an existing Arch Linux installation.
---

# Getting Started

HyprFlux is an Arch Linux desktop platform powered by Hyprland. Choose one of
two installation paths; both install the maintained desktop stack and
configuration.

## Choose an Installation Path

### Install a new system from the ISO

Use the bootable ISO when HyprFlux will own the target system. The online
installer can wipe and partition a disk, installs Arch Linux, and provisions
HyprFlux before the final reboot.

::: danger Back up the target disk
Automatic partitioning erases the entire selected disk. Verify the device and
back up anything important before continuing.
:::

[Download the latest ISO](/general/download) or follow the
[ISO installation guide](/general/iso-installation).

### Provision an existing Arch system

Use the existing-Arch installer when Arch Linux is already installed. This is
not a configuration-only copy: it updates the system, installs packages and
services, replaces managed configuration directories, applies themes, and
configures the desktop.

::: warning Existing configuration is replaced
The installer creates `~/dotfiles_backup`, then replaces configuration
directories managed by HyprFlux. A later rerun replaces that backup, so keep a
separate copy of anything you need to preserve.
:::

[Install HyprFlux on existing Arch](/general/installation).

## Keybindings

::: info Essential Knowledge
Knowing the keybindings is crucial! Without them, navigating the Hyprland environment will feel difficult. Take a few minutes to learn them before diving in.
:::

[View the Hyprland keybindings](/keybindings/hyprland).

## Next Steps

After installation, explore these resources to get the most out of HyprFlux:

- **[Showcase](/general/showcase)** - See HyprFlux in action
- **[Features](/features/hyprland)** - Learn about desktop features
- **[Configuration](/hyprland/hyprland)** - Customize your setup
- **[Keybindings](/keybindings/hyprland)** - Master keyboard shortcuts

## Community and Support

Use [GitHub Issues](https://github.com/ahmad9059/HyprFlux/issues) to report a
problem. Include the installation path you used and the relevant files from
`~/HyprFlux/logs/`.

## Documentation Structure

| Section                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| **Getting Started**       | Download, installation guides, and quick start    |
| **ISO Installation**      | Complete OS installation with the ISO             |
| **Existing Arch Installation** | Full HyprFlux provisioning on an installed Arch system |
| **Keybindings**           | Keyboard shortcuts reference                      |
| **Features**              | Individual component documentation                |
| **Configuration**         | Detailed config file reference                    |

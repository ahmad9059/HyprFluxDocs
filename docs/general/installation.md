# Install HyprFlux on Existing Arch

Use this path when Arch Linux is already installed. The HyprFlux installer
performs full desktop provisioning: it updates the system, installs packages
and services, deploys managed configuration, applies themes, and configures
hardware-dependent settings.

For a new machine where the installer should create the Arch system and
partition the target disk, use the [ISO installation guide](/general/iso-installation).

::: warning This is not a configuration-only install
HyprFlux makes system-wide package, service, login-manager, boot-theme, shell,
and configuration changes. Read the safety notes and keep an independent backup
before running it on a system you care about.
:::

## Requirements

- Arch Linux on an x86_64 system
- A non-root user with `sudo` access
- An active internet connection
- At least 4 GB of RAM and 10 GB of free storage
- `curl`, `git`, and `sudo`

The installer performs a full `pacman -Syu`. Resolve any existing package or
keyring problems before continuing.

## Before You Install

Copy important files somewhere outside `~/.config` and outside
`~/dotfiles_backup`. During installation:

- the previous `~/dotfiles_backup` directory is deleted;
- the current `~/.config`, `.zshrc`, and `.tmux.conf` are copied into a new
  `~/dotfiles_backup`;
- each configuration directory managed by HyprFlux is then removed and
  replaced from the checkout;
- Neovim, Tmuxifier, wallpapers, monitor profiles, and some theme directories
  are also refreshed by their owning modules.

On a rerun, the backup therefore represents the state immediately before that
rerun, not necessarily your original pre-HyprFlux setup.

## Run the Installer

### One-line install

```bash
sh <(curl -fsSL https://hyprflux.dev/install)
```

The endpoint serves the current `install.sh` from the main
[HyprFlux repository](https://github.com/ahmad9059/HyprFlux).

### Review the source first

The current local-install path expects the checkout at `~/HyprFlux` unless you
explicitly configure another path:

```bash
git clone https://github.com/ahmad9059/HyprFlux.git "$HOME/HyprFlux"
cd "$HOME/HyprFlux"
bash install.sh
```

## What Happens

1. **Bootstrap:** The one-line script installs Git if needed, clones HyprFlux
   to `~/HyprFlux`, or attempts a fast-forward update of an existing checkout.
2. **Privilege setup:** The installer validates sudo once and keeps the
   credential active while it runs.
3. **System preparation:** It initializes the Arch keyring and performs a full
   system update, ensuring Git and Vim are installed.
4. **Base desktop:** The merged base installer provisions the fixed Hyprland
   package set, PipeWire, fonts, SDDM, Bluetooth, Thunar, XDG portals, Zsh, and
   hardware-dependent actions. Yay is bootstrapped automatically when no
   supported AUR helper is present.
5. **HyprFlux modules:** `dotsSetup.sh` runs the numbered modules in order for
   backup, configuration deployment, Neovim, themes, Waybar, SDDM, GTK, boot
   theming, Tmux, Zsh, wallpapers, web apps, cursor, monitors, and hardware
   detection.
6. **Reboot handoff:** Outside ISO mode, the installer asks whether to reboot.
   Pressing Enter alone selects No, so you can inspect logs first.

There is no AUR-helper picker, component picker, or optional package menu in
the current installer.

## Configuration Ownership

The repository's `.config/` tree is the maintained source. During the normal
install, module 02 deploys it into your home directory. The merged
`base-dots/config/` tree is checked for parity but is not a second deployment
source.

`base-dots/copy.sh` is a separate manual workflow and is not called by the
normal installer. Do not substitute it for this guide unless you specifically
intend to run that lower-level copy path.

## After Installation

1. Review the logs before rebooting if the installer reported warnings.
2. Reboot when ready.
3. Sign in through SDDM with your existing user account.
4. Read the [Hyprland keybindings](/keybindings/hyprland) before navigating the
   desktop.

Useful locations:

| Location | Purpose |
|---|---|
| `~/HyprFlux/` | Installer checkout and retained logs |
| `~/HyprFlux/logs/install.log` | Top-level installer output |
| `~/HyprFlux/logs/dotsSetup.log` | Numbered module output |
| `~/HyprFlux/logs/installer/` | Base-installer and package logs |
| `~/dotfiles_backup/` | Backup created immediately before the latest run |
| `~/.config/` | Installed application configuration |
| `~/Pictures/wallpapers/` | Installed wallpaper collection |

## If Installation Reports a Failure

Do not assume the final reboot prompt means every module succeeded. Inspect the
retained logs first:

```bash
less "$HOME/HyprFlux/logs/install.log"
less "$HOME/HyprFlux/logs/dotsSetup.log"
ls -la "$HOME/HyprFlux/logs/installer"
```

Check the final lines around the first reported error and include the relevant
log when opening a [GitHub issue](https://github.com/ahmad9059/HyprFlux/issues).
Because reruns replace `~/dotfiles_backup` and refresh several managed
directories, preserve the current logs and backup before trying again.

## ISO or Existing Arch?

| Capability | HyprFlux ISO | Existing Arch installer |
|---|---|---|
| Installs the Arch base system | Yes | No |
| Can partition a target disk | Yes | No |
| Provisions the complete HyprFlux desktop | Yes | Yes |
| Intended for an existing Arch system | No | Yes |
| Replaces managed user configuration | On the new system | On the existing system |

If you still need an Arch base, use the [HyprFlux ISO](/general/iso-installation)
or follow the [Arch preparation guide](/complete/arch).

---
title: Hardware and Generated State
description: How HyprFlux detects GPU, monitor, laptop, input, audio, and Bluetooth hardware, and which files own the generated state.
---

# Hardware and Generated State

HyprFlux detects hardware during installation and during a rerun of its modules. Detection always falls back to a safe default instead of stopping the whole install.

This page describes behavior at HyprFlux source revision [`0f62647`](https://github.com/ahmad9059/HyprFlux/tree/0f62647d95178eefa7cf8cd1b66760e93a260ef7).

## Ownership matrix

| Area | Installer or generator | Runtime owner | Inspect with |
|---|---|---|---|
| GPU | `modules/16-hardware-detect.sh`; NVIDIA installer scripts | `UserConfigs/env-variables.lua` marker block | `lspci -k`, `ls -l /dev/dri`, `sed -n '/GPU_CONFIG_START/,/GPU_CONFIG_END/p' ~/.config/hypr/UserConfigs/env-variables.lua` |
| Displays | `modules/15-monitors.sh` and `modules/16-hardware-detect.sh` | `monitors.lua`, then Hyprland | `hyprctl monitors all`, `Hyprland --config ~/.config/hypr/hyprland.lua --verify-config` |
| Workspaces | `nwg-displays` | `workspaces.lua` | `hyprctl workspaces` |
| Keyboard layout | `modules/16-hardware-detect.sh` | `UserConfigs/user-settings.lua` | `hyprctl devices`, `localectl status` |
| Laptop keys and touchpad | Shipped configuration | `UserConfigs/laptops.lua`, `TouchPad.sh` | `hyprctl devices`, `hyprctl binds` |
| Battery and backlights | Kernel, sysfs, and installed packages | `Battery.sh`, `Brightness.sh`, `BrightnessKbd.sh` | `ls /sys/class/power_supply`, `brightnessctl -l` |
| Audio | `base-installer/install-scripts/pipewire.sh` | PipeWire, WirePlumber, `Volume.sh` | `systemctl --user status pipewire wireplumber`, `wpctl status` |
| Bluetooth | `base-installer/install-scripts/bluetooth.sh` | BlueZ, plus optional Blueman UI | `systemctl status bluetooth`, `rfkill list bluetooth` |
| Temperature | `modules/16-hardware-detect.sh` | The Waybar `temperature` module | `hwmon-path` in `~/.config/waybar/Modules` |

The source paths are in the [`HyprFlux` repository](https://github.com/ahmad9059/HyprFlux/tree/0f62647d95178eefa7cf8cd1b66760e93a260ef7).

## GPU configuration

The hardware module reads display-class PCI devices and classifies them as NVIDIA, AMD, Intel, a supported hybrid combination, virtual graphics, or nothing detected. It replaces only the block between these comments in `UserConfigs/env-variables.lua`:

```lua
-- >>> GPU_CONFIG_START >>>
-- generated hl.env(...) calls
-- >>> GPU_CONFIG_END <<<
```

On hybrid systems it orders the real `/dev/dri/card*` nodes in `AQ_DRM_DEVICES`. NVIDIA installation separately installs the DKMS driver and utilities, adds the NVIDIA modules to the initramfs, enables DRM modesetting and fbdev, and blacklists Nouveau.

Do not edit the generated marker block by hand. Put deliberate environment overrides outside it, and only after you check the detected driver and card order. Then validate the full configuration:

```bash
lspci -k | less
ls -l /dev/dri
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Virtual-only graphics get an empty GPU block on purpose, so the compositor defaults apply. This is the installer's explicit handling for virtual machines. It is not a promise that every hypervisor configuration is supported.

## Displays

`hyprland.lua` loads `monitors.lua` and `workspaces.lua`. Both are generated files, and `nwg-displays` can overwrite them. For normal display changes, use Quick Settings and **Configure Monitors (nwg-displays)**.

Detection tries a live Hyprland session first, then `wlr-randr`, then `xrandr`, and finally a 1920x1080@60 fallback. The installer has two monitor generators, in modules 15 and 16. Module 16 runs later and is the more defensive writer. Both also write a legacy `monitors.conf`, but the active Lua entrypoint uses `monitors.lua`.

Inspect the current outputs before you change files:

```bash
hyprctl monitors all
hyprctl workspaces
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

`Monitor_Profiles/default.lua` is an installer snapshot, and `MonitorProfiles.sh` is a separate Rofi copy workflow. Selecting one of those profiles copies it to `monitors.lua` but does not reliably reload Hyprland. If you use it, review the result and run `hyprctl reload` yourself.

## Laptop behavior

`UserConfigs/laptops.lua` loads on desktops and laptops, so the generic backlight, touchpad, and F6 screenshot bindings are registered everywhere. They work only when the matching hardware exists. The ASUS bindings are registered only when `rog-control-center` or `asusctl` is installed.

The shipped touchpad name is specific to the maintainer's ASUS laptop. Find your device and update both files together:

```bash
hyprctl devices
```

- `~/.config/hypr/UserConfigs/laptops.lua`: `Touchpad_Device`
- `~/.config/hypr/scripts/TouchPad.sh`: `TOUCHPAD_DEVICE`

The lid-switch bindings in `laptops.lua` are commented examples. The active entrypoint also loads `UserConfigs/LaptopDisplay.lua`. If you adopt the file-writing example, test with an external display connected and keep a known-good monitor configuration available. Do not enable both example approaches at once.

## Battery and backlights

`Battery.sh` prints only batteries named `BAT0` through `BAT3`. No output means the kernel did not expose a matching path. It does not mean the battery is empty:

```bash
ls /sys/class/power_supply
~/.config/hypr/scripts/Battery.sh
```

Display brightness uses `brightnessctl` in 10% steps, clamped to 5% to 95%. Keyboard brightness targets devices matching `*::kbd_backlight` in 30% steps:

```bash
brightnessctl -l
brightnessctl -m
brightnessctl -d '*::kbd_backlight' -m
```

If a function key changes brightness twice, inspect `/sys/module/video/parameters/brightness_switch_enabled`. The script comments expect `N` when the kernel is not also handling the key.

## Audio and Bluetooth

The installer provisions PipeWire, WirePlumber, ALSA/Pulse compatibility, and SOF firmware, then enables the user sockets and services. Runtime volume controls use `pamixer`, and the media keys use `playerctl`.

```bash
systemctl --user status pipewire.socket pipewire-pulse.socket wireplumber.service
wpctl status
pamixer --get-volume
```

The PipeWire installer has a bug in its forced `pipewire-pulse` reinstall step: the loop iterates its second package list but installs the variable from the first list. The normal package loop already includes `pipewire-pulse`, so audio usually works anyway. If audio setup fails, inspect the installer log.

Bluetooth provisioning installs BlueZ, the BlueZ utilities, and Blueman, then enables `bluetooth.service`:

```bash
systemctl status bluetooth.service
rfkill list bluetooth
bluetoothctl show
```

The `XF86Rfkill` binding calls `AirplaneMode.sh`, which toggles Wi-Fi only. Manage Bluetooth separately with `rfkill`, `bluetoothctl`, or Blueman.

## Installer logs

The log root is `${HYPRFLUX_LOGS_DIR:-$HOME/HyprFlux/logs}`:

| Path | Content |
|---|---|
| `install.log` | Main installer output |
| `dotsSetup.log` | Dotfiles setup and module output |
| `installer/*.log` | Base installer steps, including NVIDIA, PipeWire, and Bluetooth |
| `copy/*.log` | Dotfile copy and deployment logs |

Start with the newest relevant file. When you ask for help, preserve the failing command and its surrounding output.

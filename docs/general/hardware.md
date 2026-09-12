---
title: Hardware and Generated State - HyprFlux
description: Source-backed guide to HyprFlux GPU, monitor, laptop, input, audio, Bluetooth, and generated configuration behavior.
---

# Hardware And Generated State

This guide describes behavior at HyprFlux source revision
[`f421b6b`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591).
Hardware detection runs during installation and intentionally falls back rather
than aborting the whole install.

## Ownership Matrix

| Area | Installer or generator | Runtime owner | User-safe inspection |
|---|---|---|---|
| GPU | `modules/16-hardware-detect.sh`; NVIDIA installer scripts | `UserConfigs/env-variables.lua` marker block | `lspci -k`, `ls -l /dev/dri`, `sed -n '/GPU_CONFIG_START/,/GPU_CONFIG_END/p' ~/.config/hypr/UserConfigs/env-variables.lua` |
| Displays | Both `modules/15-monitors.sh` and `modules/16-hardware-detect.sh` | `monitors.lua`, then Hyprland | `hyprctl monitors all`, `Hyprland --config ~/.config/hypr/hyprland.lua --verify-config` |
| Workspaces | `nwg-displays` | `workspaces.lua` | `hyprctl workspaces` |
| Keyboard layout | `modules/16-hardware-detect.sh` | `UserConfigs/user-settings.lua` | `hyprctl devices`, `localectl status` |
| Laptop keys and touchpad | Shipped configuration | `UserConfigs/laptops.lua`, `TouchPad.sh` | `hyprctl devices`, `hyprctl binds` |
| Battery and backlights | Kernel/sysfs and installed packages | `Battery.sh`, `Brightness.sh`, `BrightnessKbd.sh` | `ls /sys/class/power_supply`, `brightnessctl -l` |
| Audio | `base-installer/install-scripts/pipewire.sh` | PipeWire, WirePlumber, `Volume.sh` | `systemctl --user status pipewire wireplumber`, `wpctl status` |
| Bluetooth | `base-installer/install-scripts/bluetooth.sh` | BlueZ; optional Blueman UI | `systemctl status bluetooth`, `rfkill list bluetooth` |
| Temperature | `modules/16-hardware-detect.sh` | Selected Waybar `temperature` module | Inspect `hwmon-path` in `~/.config/waybar/Modules` |

The source paths above are available in the
[`HyprFlux` repository](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591).

## GPU Configuration

The hardware module reads display-class PCI devices and classifies NVIDIA,
AMD, Intel, supported hybrid combinations, virtual graphics, or no detected
GPU. It replaces only the block between these comments in
`UserConfigs/env-variables.lua`:

```lua
-- >>> GPU_CONFIG_START >>>
-- generated hl.env(...) calls
-- >>> GPU_CONFIG_END <<<
```

On hybrid systems it orders real `/dev/dri/card*` nodes in `AQ_DRM_DEVICES`.
NVIDIA installation separately installs the DKMS driver and utilities, adds
NVIDIA modules to initramfs, enables DRM modesetting/fbdev, and blacklists
Nouveau.

Do not hand-edit the generated marker block. Put deliberate environment
overrides outside it only after checking the detected driver and card order.
After a change, validate the complete configuration:

```bash
lspci -k | less
ls -l /dev/dri
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Virtual-only graphics deliberately gets an empty GPU block so compositor
defaults apply. This is the source's explicit VM handling; it is not a promise
that every hypervisor configuration is supported.

## Displays

`hyprland.lua` imports `monitors.lua` and `workspaces.lua`. Both are generated
files and `nwg-displays` may overwrite them. Use Quick Settings,
**Configure Monitors (nwg-displays)**, for normal display changes.

Detection tries a live Hyprland session, then `wlr-randr`, then `xrandr`, and
finally a 1920x1080@60 fallback. The installer currently has duplicate monitor
generators in modules 15 and 16; module 16 is the later, more defensive writer.
Both also write legacy `monitors.conf`, but the active Lua entrypoint uses
`monitors.lua`.

Inspect the current outputs before changing files:

```bash
hyprctl monitors all
hyprctl workspaces
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

`Monitor_Profiles/default.lua` is an installer snapshot, while
`MonitorProfiles.sh` is a separate Rofi copy workflow. Selecting one of those
profiles copies it to `monitors.lua` but does not reliably reload Hyprland. If
you use it, review the result and run `hyprctl reload` explicitly.

## Laptop Behavior

`UserConfigs/laptops.lua` is loaded on desktops and laptops. Generic backlight,
touchpad, and F6 screenshot bindings are therefore registered everywhere, but
they only work when matching hardware exists. ASUS bindings are registered
only when `rog-control-center` or `asusctl` is installed.

The shipped touchpad name is specific to the maintainer's ASUS laptop. Find
your device and update both owners together:

```bash
hyprctl devices
```

- `~/.config/hypr/UserConfigs/laptops.lua`: `Touchpad_Device`
- `~/.config/hypr/scripts/TouchPad.sh`: `TOUCHPAD_DEVICE`

Lid-switch bindings in `laptops.lua` are commented examples. The active
entrypoint also imports `UserConfigs/LaptopDisplay.lua`; if you adopt the file-
writing example, test with an external display connected and keep a known-good
monitor configuration available. Do not enable both example approaches.

## Battery And Backlights

`Battery.sh` only prints batteries named `BAT0` through `BAT3`. No output means
the kernel did not expose a matching path, not necessarily that the battery is
empty:

```bash
ls /sys/class/power_supply
~/.config/hypr/scripts/Battery.sh
```

Display brightness uses `brightnessctl` in 10% steps with a 5%-95% clamp.
Keyboard brightness targets devices matching `*::kbd_backlight` in 30% steps:

```bash
brightnessctl -l
brightnessctl -m
brightnessctl -d '*::kbd_backlight' -m
```

If a function key changes brightness twice, inspect
`/sys/module/video/parameters/brightness_switch_enabled`; the script comments
expect `N` when the kernel is not also handling the key.

## Audio And Bluetooth

The installer provisions PipeWire, WirePlumber, ALSA/Pulse compatibility, and
SOF firmware, then enables the user sockets/services. Runtime volume controls
use `pamixer`, while media keys use `playerctl`.

```bash
systemctl --user status pipewire.socket pipewire-pulse.socket wireplumber.service
wpctl status
pamixer --get-volume
```

The PipeWire installer currently repeats the wrong loop variable during its
forced `pipewire-pulse` reinstall step. The normal package loop already
includes `pipewire-pulse`, but inspect the installer log when audio setup fails.

Bluetooth provisioning installs BlueZ, BlueZ utilities, and Blueman, then
enables `bluetooth.service`:

```bash
systemctl status bluetooth.service
rfkill list bluetooth
bluetoothctl show
```

The `XF86Rfkill` binding calls `AirplaneMode.sh`, which toggles **Wi-Fi only**.
Manage Bluetooth separately with `rfkill`, `bluetoothctl`, or Blueman.

## Installer Logs

The stable root is `${HYPRFLUX_LOGS_DIR:-$HOME/HyprFlux/logs}`:

| Path | Content |
|---|---|
| `install.log` | Main installer output. |
| `dotsSetup.log` | Dotfiles setup and module output. |
| `installer/*.log` | Base installer steps, including NVIDIA, PipeWire, and Bluetooth. |
| `copy/*.log` | Dotfile copy/deployment logs. |

Start with the newest relevant file and preserve the failing command and its
surrounding output when asking for help.

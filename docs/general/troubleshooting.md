---
title: Troubleshooting - HyprFlux
description: Safe, symptom-led diagnostics for HyprFlux installation, sessions, Lua configuration, displays, desktop components, wallpapers, and hardware.
---

# Troubleshooting

Use inspection before correction. The commands below do not delete
configuration, recursively change permissions, or rerun disk provisioning.
Collect command output and relevant logs before escalating an issue.

## Installer Stops Or A Package Fails

**Likely scope:** network, package database, AUR helper, sudo, or one installer
module.

```bash
ls -lt ~/HyprFlux/logs
ls -lt ~/HyprFlux/logs/installer
less ~/HyprFlux/logs/install.log
less ~/HyprFlux/logs/dotsSetup.log
```

Look for the first failed command rather than the final summary. Package-specific
logs are under `logs/installer/`; copied-file diagnostics are under
`logs/copy/`. Resolve the reported package or network error, then rerun the
documented installer path. Do not rerun partitioning or remove all dotfiles as
a blanket fix.

When reporting the issue, include the HyprFlux commit, installation route, GPU,
the failing command, and the relevant log excerpt.

## SDDM Or The Hyprland Session Does Not Start

**Likely scope:** display manager state, session registration, compositor
configuration, or graphics driver initialization.

```bash
systemctl status sddm.service
journalctl -b -u sddm.service
ls /usr/share/wayland-sessions
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
lspci -k | less
```

A healthy check shows an active SDDM service, a Hyprland session entry, and no
config verification errors. Correct the specific service/config error, then
restart SDDM or reboot after driver/initramfs changes. Include the current boot
journal and `~/HyprFlux/logs/installer/` driver logs when escalating.

## Lua Configuration Errors

**Likely scope:** Lua syntax, a missing required module, or a rejected Hyprland
API value.

```bash
luac -p ~/.config/hypr/hyprland.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl configerrors
```

Run `luac -p` on the named module when the verifier identifies one. A successful
syntax check prints nothing; a successful Hyprland verification reports no
errors. Revert only your most recent edit or restore that one file from your
backup, then run `hyprctl reload` after validation. Do not replace the entire
configuration to fix one module.

## Black Screen, Wrong Output, Or Wrong Workspace

**Likely scope:** generated `monitors.lua`, output names/modes, workspace rules,
or the generated GPU environment block.

```bash
hyprctl monitors all
hyprctl workspaces
sed -n '1,220p' ~/.config/hypr/monitors.lua
sed -n '1,220p' ~/.config/hypr/workspaces.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Connected output names from `hyprctl` should match explicit monitor and
workspace rules. Use `nwg-displays` to regenerate normal monitor state. Keep in
mind that `MonitorProfiles.sh` copies a profile but does not reliably live-
reload it; run `hyprctl reload` after validating the file. For a black screen,
also collect `lspci -k`, `/dev/dri` listings, and the generated GPU marker block.

## Waybar, Rofi, Or SwayNC Does Not Start

**Likely scope:** a process crash, malformed component config, missing helper,
or a stale click handler.

```bash
pgrep -a waybar
pgrep -a rofi
pgrep -a swaync
waybar -l debug
swaync-client --reload-config
```

Run the failing component from a terminal to expose parser and missing-command
errors. `SUPER+SHIFT+R` runs `Refresh.sh`, which restarts Waybar and SwayNC and
closes Rofi; it does not validate or reload Hyprland. Quick Settings also
contains displayed choices without handlers, so a no-op selection is not proof
that Rofi itself failed.

Include terminal output, the component config path, and the result of
`command -v` for the missing helper when escalating.

## Wallpaper Selection Or AWWW Fails

**Likely scope:** AWWW daemon state, missing wallpaper path, Rofi selection,
optional video dependencies, or one of the known stale refresh paths.

```bash
pgrep -a awww-daemon
awww query
ls -l ~/.config/rofi/.current_wallpaper
ls -la ~/.cache/awww
```

Start `awww-daemon --format xrgb` if it is not running, then use the wallpaper
selector with an image first. Automatic rotation and persistent video have
known source defects, and `RefreshNoWaybar.sh` still calls removed
`WallpaperSwww.sh`; do not use that helper as a recovery command. See
[Wallpapers](/features/wallpapers) for the supported boundaries.

## GPU Environment Looks Wrong

**Likely scope:** PCI detection, driver selection, DRM-node order, or the
installer-managed environment block.

```bash
lspci -k | less
ls -l /dev/dri
sed -n '/GPU_CONFIG_START/,/GPU_CONFIG_END/p' ~/.config/hypr/UserConfigs/env-variables.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

The block should contain only generated `hl.env(...)` calls or comments. Do not
edit inside its markers. Correct the driver/install issue first; place deliberate
manual overrides outside the markers. For NVIDIA, include the NVIDIA installer
log and bootloader type when escalating.

## Brightness Or Touchpad Keys Do Nothing

**Likely scope:** absent backlight hardware, a different key symbol, or the
maintainer-specific touchpad name.

```bash
brightnessctl -l
hyprctl devices
hyprctl binds
wev
```

`wev` should report the key sent by the keyboard. Update both `Touchpad_Device`
in `laptops.lua` and `TOUCHPAD_DEVICE` in `TouchPad.sh` when adapting the
touchpad toggle. For keyboard backlight failures, verify that
`*::kbd_backlight` matches an entry from `brightnessctl -l`.

## Battery Status Is Empty

**Likely scope:** battery sysfs naming. The helper checks only `BAT0` through
`BAT3`.

```bash
ls /sys/class/power_supply
~/.config/hypr/scripts/Battery.sh
```

If the battery uses another name, adapt the helper or Waybar module locally.
Include the power-supply directory names and `upower -e` output when asking for
hardware-specific help.

## Audio Controls Fail

**Likely scope:** PipeWire/WirePlumber service state, missing default sink or
source, or the `pamixer` helper.

```bash
systemctl --user status pipewire.socket pipewire-pulse.socket wireplumber.service
wpctl status
pamixer --get-volume
playerctl status
```

Restart only the failed user service after reading its status. Media keys need
an MPRIS player visible to `playerctl`; volume keys need a default PipeWire
Pulse sink. The current `Volume.sh --mic-dec` path has a known typo when the
microphone is muted, so unmute it before testing microphone decrement.

## Bluetooth Is Unavailable

**Likely scope:** BlueZ service, radio block, adapter, or optional Blueman UI.

```bash
systemctl status bluetooth.service
rfkill list bluetooth
bluetoothctl show
```

Unblock only the Bluetooth radio if it is soft-blocked, then start or enable
`bluetooth.service` if its status says it is inactive. The HyprFlux airplane-
mode key changes Wi-Fi only. Include service status, `rfkill` output, and the
Bluetooth installer log when escalating.

## What To Include In A Report

- HyprFlux revision: `git -C ~/HyprFlux rev-parse HEAD`
- Installation route and the first failing command
- Relevant files from `~/HyprFlux/logs/`
- `Hyprland --version` and config verification output
- GPU from `lspci -k`, output names from `hyprctl monitors all`, and relevant
  service status
- Any local edits to the owning configuration or script

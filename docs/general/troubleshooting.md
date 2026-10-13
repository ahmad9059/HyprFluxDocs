---
title: Troubleshooting
description: Symptom-led diagnostics for HyprFlux installation, sessions, Lua configuration, displays, desktop components, wallpapers, and hardware.
---

# Troubleshooting

Find the section that matches what you are seeing, then work through it in order. Start with **Diagnose**, then apply **Fix**. The commands inspect state, so they do not delete configuration, change permissions recursively, or rerun disk provisioning. Collect the output and the relevant logs before you ask for help.

## Installer stops or a package fails

**Diagnose:**

```bash
ls -lt ~/HyprFlux/logs
ls -lt ~/HyprFlux/logs/installer
less ~/HyprFlux/logs/install.log
less ~/HyprFlux/logs/dotsSetup.log
```

Look for the first failed command, not the final summary. Package-specific logs are under `logs/installer/`, and copied-file diagnostics are under `logs/copy/`.

**Fix:** Resolve the reported package or network error, then rerun the installer. Do not rerun partitioning, and do not delete all dotfiles as a blanket fix.

When you ask for help, include the HyprFlux commit, the installation route, your GPU, the failing command, and the relevant log excerpt.

## SDDM or the Hyprland session does not start

**Diagnose:**

```bash
systemctl status sddm.service
journalctl -b -u sddm.service
ls /usr/share/wayland-sessions
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
lspci -k | less
```

A healthy check shows an active SDDM service, a Hyprland session entry, and no config verification errors.

**Fix:** Correct the specific service or config error, then restart SDDM. Reboot after driver or initramfs changes.

When you ask for help, include the current boot journal and the driver logs under `~/HyprFlux/logs/installer/`.

## Lua configuration errors

**Diagnose:**

```bash
luac -p ~/.config/hypr/hyprland.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl configerrors
```

Run `luac -p` on the named module when the verifier identifies one. A successful syntax check prints nothing, and a successful Hyprland verification reports no errors.

**Fix:** Revert only your most recent edit, or restore that one file from your backup. Then run `hyprctl reload`. Do not replace the whole configuration to fix one module.

## Black screen, wrong output, or wrong workspace

**Diagnose:**

```bash
hyprctl monitors all
hyprctl workspaces
sed -n '1,220p' ~/.config/hypr/monitors.lua
sed -n '1,220p' ~/.config/hypr/workspaces.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

The output names from `hyprctl` should match the explicit monitor and workspace rules.

**Fix:** Use `nwg-displays` to regenerate normal monitor state. `MonitorProfiles.sh` copies a profile but does not reliably reload it, so run `hyprctl reload` after you validate the file.

For a black screen, also collect `lspci -k`, the `/dev/dri` listing, and the generated GPU marker block.

## Waybar, Rofi, or SwayNC does not start

**Diagnose:**

```bash
pgrep -a waybar
pgrep -a rofi
pgrep -a swaync
waybar -l debug
swaync-client --reload-config
```

Run the failing component from a terminal to expose parser and missing-command errors.

**Fix:** `SUPER+SHIFT+R` runs `Refresh.sh`, which restarts Waybar and SwayNC and closes Rofi. It does not validate or reload Hyprland. Quick Settings also contains displayed entries without handlers, so a selection that does nothing is not proof that Rofi itself failed.

When you ask for help, include the terminal output, the component config path, and the result of `command -v` for the missing helper.

## Wallpaper selection or AWWW fails

**Diagnose:**

```bash
pgrep -a awww-daemon
awww query
ls -l ~/.config/rofi/.current_wallpaper
ls -la ~/.cache/awww
```

**Fix:** If the daemon is not running, start it with `awww-daemon --format xrgb`. Use the wallpaper selector with an image first. Automatic rotation and persistent video have known defects in the current source. `RefreshNoWaybar.sh` still calls the removed `WallpaperSwww.sh`, so do not use that helper as a recovery command. See [Wallpapers](/features/wallpapers) for the supported boundaries.

## GPU environment looks wrong

**Diagnose:**

```bash
lspci -k | less
ls -l /dev/dri
sed -n '/GPU_CONFIG_START/,/GPU_CONFIG_END/p' ~/.config/hypr/UserConfigs/env-variables.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

The block should contain only generated `hl.env(...)` calls or comments. Do not edit inside its markers.

**Fix:** Correct the driver or install issue first. Put deliberate manual overrides outside the markers.

For NVIDIA, include the NVIDIA installer log and your bootloader type when you ask for help.

## Brightness or touchpad keys do nothing

**Diagnose:**

```bash
brightnessctl -l
hyprctl devices
hyprctl binds
wev
```

`wev` should report the key your keyboard sends.

**Fix:** Update both `Touchpad_Device` in `laptops.lua` and `TOUCHPAD_DEVICE` in `TouchPad.sh` when you adapt the touchpad toggle. For keyboard backlight failures, verify that `*::kbd_backlight` matches an entry from `brightnessctl -l`.

## Battery status is empty

**Diagnose:**

```bash
ls /sys/class/power_supply
~/.config/hypr/scripts/Battery.sh
```

**Fix:** The helper checks only `BAT0` through `BAT3`. If your battery uses another name, adapt the helper or the Waybar module locally.

For hardware-specific help, include the power-supply directory names and the `upower -e` output.

## Audio controls fail

**Diagnose:**

```bash
systemctl --user status pipewire.socket pipewire-pulse.socket wireplumber.service
wpctl status
pamixer --get-volume
playerctl status
```

**Fix:** Read the service status, then restart only the failed user service. Media keys need an MPRIS player that `playerctl` can see, and volume keys need a default PipeWire Pulse sink. The current `Volume.sh --mic-dec` path has a known typo when the microphone is muted, so unmute it before you test microphone decrement.

## Bluetooth is unavailable

**Diagnose:**

```bash
systemctl status bluetooth.service
rfkill list bluetooth
bluetoothctl show
```

**Fix:** If the Bluetooth radio is soft-blocked, unblock only that radio. If `bluetooth.service` is inactive, start or enable it. The HyprFlux airplane-mode key changes Wi-Fi only.

When you ask for help, include the service status, the `rfkill` output, and the Bluetooth installer log.

## What to include in a report

Whatever the symptom, gather this information before you open an issue:

- The HyprFlux revision: `git -C ~/HyprFlux rev-parse HEAD`.
- The installation route and the first failing command.
- The relevant files from `~/HyprFlux/logs/`.
- `Hyprland --version` and the config verification output.
- Your GPU from `lspci -k`, the output names from `hyprctl monitors all`, and the relevant service status.
- Any local edits to the owning configuration or script.

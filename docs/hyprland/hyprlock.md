---
title: Hyprlock Configuration Reference
description: The native Hyprlock configuration files, their shared palette, and their current parser issues.
---

# Hyprlock Configuration Reference

Repository primary path: `~/.config/hypr/hyprlock.conf`

Repository alternate path: `~/.config/hypr/hyprlock-1080p.conf`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/hyprlock.conf).

Hyprlock is a separate application and keeps its native `.conf` format. The compositor's Lua-only requirement does not convert this file to Lua.

## Shared colors

Both variants source the central HyprFlux palette:

```ini
source = $HOME/.config/hypr/hyprflux-colors/hyprflux-colors.conf
```

Use the lock-specific variables such as `$lock_border`, `$lock_text`, `$lock_box`, `$lock_outer`, and `$lock_font` instead of copying literal colors into every widget.

## Primary layout

The default file applies its widgets to every monitor and contains:

- a bundled Mario background with blur and color adjustments;
- a circular profile image;
- date and 12-hour clock labels;
- a user label and a password input field;
- a current-song label refreshed through `playerctl`.

Widgets use native blocks such as `background`, `image`, `shape`, `label`, and `input-field`. Dynamic labels use `cmd[update:<milliseconds>]` and run repeatedly, so keep those commands fast.

## Alternate layout

`hyprlock-1080p.conf` is labeled as a low-resolution variant in the source. It uses the current wallpaper artifact and adds separate hour, minute, and second labels plus keyboard layout, uptime, battery, and cached weather.

Bare `hyprlock` uses the primary file. Test the alternate explicitly:

```bash
hyprlock --config ~/.config/hypr/hyprlock-1080p.conf
```

## Known source issues

Parser checks found rejected options in both shipped files. The primary file includes obsolete general options and input-field-only properties inside a `label`. The low-resolution file includes obsolete `grace` configuration and a stray closing brace. Hyprlock may keep running while it ignores those entries.

Do not copy the rejected lines as valid examples. Grace and fade behavior are command-line concerns in current Hyprlock, and the dot and outline properties belong inside `input-field`.

## Validate safely

Hyprlock 0.9.6 has no parser-only flag. From a non-graphical shell, force an invalid Wayland socket and inspect the output before the expected connection error:

```bash
WAYLAND_DISPLAY=__invalid__ hyprlock \
  --config ~/.config/hypr/hyprlock.conf --verbose
```

There should be no `Config has errors` block before the connection error. Repeat for every installed variant after you change it. Also confirm that the referenced image, script, and font paths exist. The primary source requests an SF Pro Semibold face that is not bundled under that exact name. Victor Mono, used by the alternate layout, is installed by the base font installer.

For the user-facing lock workflow, see [Hyprlock features](/features/hyprlock).

# Hyprlock Configuration Reference

Primary path: `~/.config/hypr/hyprlock.conf`

Optional variant: `~/.config/hypr/hyprlock-1080p.conf`

[View the pinned v1.5.0 configuration](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/hyprlock.conf).

Hyprlock is a separate application and keeps its native `.conf` format. The
Hyprland compositor's Lua-only requirement does not convert this file to Lua.

## Shared Colors

Both variants source the central HyprFlux palette:

```ini
source = $HOME/.config/hypr/hyprflux-colors/hyprflux-colors.conf
```

Use lock-specific variables such as `$lock_border`, `$lock_text`, `$lock_box`,
`$lock_outer`, and `$lock_font` instead of copying literal colors into every
widget.

## Primary Layout

The default file applies its widgets to every monitor and contains:

- a bundled Mario background with blur and color adjustments;
- a circular profile image;
- date and 12-hour clock labels;
- a user label and password input field;
- a current-song label refreshed through `playerctl` integration.

Widgets use native blocks such as `background`, `image`, `shape`, `label`, and
`input-field`. Dynamic labels use `cmd[update:<milliseconds>]` and should run
fast because they execute repeatedly.

## Low-Resolution Variant

`hyprlock-1080p.conf` is intended for displays below 1080p. It uses the current
wallpaper artifact and adds separate hour/minute/second, keyboard layout,
uptime, battery, and cached-weather labels.

The normal installed callers invoke bare `hyprlock`, so the primary
`hyprlock.conf` remains the default. Test the variant explicitly:

```bash
hyprlock --config ~/.config/hypr/hyprlock-1080p.conf
```

## Known v1.5.0 Source Issues

Current parser checks found rejected options in both shipped files. The primary
file includes obsolete general options and input-field-only properties inside a
`label`; the low-resolution file includes obsolete `grace` configuration and a
stray closing brace. Hyprlock may continue while ignoring those entries.

Do not copy the rejected lines as valid examples. Grace and fade behavior in
current Hyprlock are command-line concerns, and dot/outline properties belong
inside `input-field`.

## Validate Safely

Hyprlock 0.9.6 has no parser-only flag. From a non-graphical shell, force an
invalid Wayland socket and inspect output before the expected connection error:

```bash
WAYLAND_DISPLAY=__invalid__ hyprlock \
  --config ~/.config/hypr/hyprlock.conf --verbose
```

There should be no preceding `Config has errors` block. Repeat with the
low-resolution variant after changing it. Also confirm referenced image,
script, and font paths exist.

For the user-facing lock workflow, see [Hyprlock features](/features/hyprlock).

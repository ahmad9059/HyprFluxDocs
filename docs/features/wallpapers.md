# Wallpapers

## What It Is

HyprFlux uses AWWW for image wallpapers and mpvpaper for video wallpapers.
Wallpaper state supports image effects, the alternate Hyprlock background, and
GameMode restoration; it does not generate the desktop application palette.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Configuration

### Ownership chain

1. [`modules/12-wallpapers.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/modules/12-wallpapers.sh)
   replaces `~/Pictures/wallpapers` with a shallow clone of
   [WallpaperBank](https://github.com/ahmad9059/WallpaperBank).
2. The same module installs bundled prebuilt `awww` and `awww-daemon` binaries
   under `/usr/local/bin`, with `awww-git` through `yay` as a fallback.
3. [`startup-apps.lua`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/startup-apps.lua#L14-L25)
   starts `awww-daemon --format xrgb`.
4. Scripts under `~/.config/hypr/UserScripts/` select, transform, randomize, or
   rotate images.
5. `mpvpaper`, installed through the repository/AUR package helper, handles
   user-added video files.

The wallpaper repository and Neovim repository are external and unpinned by
the HyprFlux installer. The bank contained static images/GIFs, but no supported
video files, when this page was audited.

### Runtime state files

| File | Purpose |
|---|---|
| `~/.config/rofi/.current_wallpaper` | Symlink used by `GameMode.sh` for wallpaper restoration |
| `~/.config/hypr/wallpaper_effects/.wallpaper_current` | Effects input and alternate Hyprlock background |
| `~/.config/hypr/wallpaper_effects/.wallpaper_modified` | Generated effect output |

These are runtime artifacts. They do not feed Waybar, Kitty, SwayNC, Wlogout,
or Rofi color generation.

### AWWW versus SWWW

AWWW is the active image engine. The `swww` package remains in the install and
final-check inventories as source residue, but no active `swww-daemon` or
`swww img` workflow is shipped. Do not start both wallpaper daemons.

## Common Tasks

### Select an image

The supported selector is:

```bash
~/.config/hypr/UserScripts/WallpaperSelect.sh
```

It searches the wallpaper bank recursively, generates Rofi thumbnails, and can
show supported image and video files. For an image selection it:

1. Stops mpvpaper, swaybg, and hyprpaper.
2. Starts AWWW if needed.
3. Applies the image to the focused monitor.
4. Calls `WallpaperAwww.sh` to synchronize restoration/effect state.

The active Waybar application drawer exposes this selector. The source also
binds both the selector and effect menu to `SUPER+SHIFT+W`, so that duplicate
binding is not a reliable way to open only one menu.

### Apply image effects

Run:

```bash
~/.config/hypr/UserScripts/WallpaperEffects.sh
```

The Rofi menu applies ImageMagick transforms such as grayscale, blur, edge
detection, emboss, negate, oil paint, posterize, sepia, sharpen, vignette, and
zoom. The output is displayed through AWWW without changing the source image.

### Pick a random image

`CTRL+ALT+W` runs:

```bash
~/.config/hypr/UserScripts/WallpaperRandom.sh
```

It chooses a static image, applies it to the focused monitor, and updates the
runtime state files. It does not select videos.

### Set up automatic rotation

Automatic rotation is disabled by default. The example in `startup-apps.lua`
would call:

```bash
~/.config/hypr/UserScripts/WallpaperAutoChange.sh ~/Pictures/wallpapers
```

The script shuffles paths and waits 1,800 seconds between changes on the
focused monitor.

::: warning Auto-change source defect
The current refresh chain calls a removed `WallpaperSwww.sh`, and the script
does not filter every discovered file to image formats. Do not enable automatic
rotation as a supported unattended workflow until those source issues are
fixed.
:::

### Use a video wallpaper

Add an `.mp4`, `.mkv`, `.mov`, or `.webm` file to the wallpaper directory and
select it through `WallpaperSelect.sh`. The immediate path stops AWWW and starts:

```bash
mpvpaper '*' -o 'load-scripts=no no-audio --loop' /path/to/video
```

The selector also attempts to rewrite `startup-apps.lua` so the video returns
on the next session. The pinned rewrite has spacing, escaping, and extension
handling defects. Treat immediate playback as available, but treat persistence
as unsupported until the source rewrite is fixed. `luac -p` can detect damaged
Lua syntax but cannot prove that the generated shell command is correctly
spaced or escaped.

### Troubleshooting

Check the daemon and current AWWW cache:

```bash
pgrep -a awww-daemon
awww query
```

If selection has no effect, run `WallpaperSelect.sh` in a terminal and verify
that the focused monitor and source file are detected. The selector requires
Rofi, jq, bc, ImageMagick, and AWWW. Video thumbnails additionally call
`ffmpeg`, which is not a direct package inventory item in the pinned source.

## Related pages

- [Rofi](./rofi.md)
- [Waybar](./waybar.md)
- [Startup applications](../hyprland/startup_apps.md)

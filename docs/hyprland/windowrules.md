# `window-rules.lua`

Path: `~/.config/hypr/UserConfigs/window-rules.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/window-rules.lua).

This module classifies windows with tags, places applications on workspaces,
and applies effects such as floating, sizing, opacity, pinning, and idle
inhibition. It replaces the old `windowrule`, `windowrulev2`, and `layerrule`
lines.

## Named Window Rule

```lua
hl.window_rule({
    name = "browser-firefox",
    tag = "+browser",
    match = {
        class = "^([Ff]irefox|org.mozilla.firefox)$",
    },
})
```

A later rule can act on the tag:

```lua
hl.window_rule({
    name = "browser-workspace",
    workspace = "2",
    match = { tag = "browser*" },
})
```

All properties inside `match` must match the same window. Regular expressions
are strings; anchor a class or title when you intend an exact match.

## Structured Effects

Values containing compositor expressions remain strings or arrays of strings:

```lua
hl.window_rule({
    name = "picture-in-picture",
    move = { "(monitor_w*0.61)", "(monitor_h*0.07)" },
    size = { "monitor_w*0.38", "monitor_h*0.38" },
    float = true,
    pin = true,
    keep_aspect_ratio = true,
    match = { title = "^(Picture-in-Picture)$" },
})
```

Other current effects include `center`, `tile`, `fullscreen`, `no_blur`,
`opacity`, `idle_inhibit`, and `workspace`.

## Layer Rules

Layer-shell surfaces use `hl.layer_rule` and match a namespace:

```lua
hl.layer_rule({
    name = "rofi-blur",
    blur = true,
    match = { namespace = "rofi" },
})
```

## Ordering

Rules evaluate from top to bottom. For a given effect, the last matching rule
wins. Named rules and anonymous rules have different precedence, so preserve
the source's named-rule pattern and place broad defaults before narrow
exceptions.

Static effects such as workspace placement, float, move, and size do not
automatically re-evaluate every time a window title changes. Use an event
handler only when live title-driven behavior is required.

## Discover Window Properties

Use runtime state instead of guessing class and title strings:

```bash
hyprctl activewindow
hyprctl clients
```

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/window-rules.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
hyprctl reload
hyprctl configerrors
```

The source header's rule counts are stale. Follow active declarations and
behavior rather than copying a reported total into downstream documentation.

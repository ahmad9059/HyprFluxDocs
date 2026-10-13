---
title: window-rules.lua
description: The HyprFlux module for matching windows and applying placement and effect rules.
---

# `window-rules.lua`

Path: `~/.config/hypr/UserConfigs/window-rules.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/UserConfigs/window-rules.lua).

This module classifies windows with tags, places applications on workspaces, and applies effects such as floating, sizing, opacity, pinning, and idle inhibition. It replaces the old `windowrule`, `windowrulev2`, and `layerrule` lines.

## Named window rule

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

All properties inside `match` must match the same window. Regular expressions are strings, so anchor a class or title when you want an exact match.

## Structured effects

Values that contain compositor expressions stay as strings or arrays of strings:

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

Other current effects include `center`, `tile`, `fullscreen`, `no_blur`, `opacity`, `idle_inhibit`, and `workspace`.

## Layer rules

Layer-shell surfaces use `hl.layer_rule` and match a namespace:

```lua
hl.layer_rule({
    name = "rofi-blur",
    blur = true,
    match = { namespace = "rofi" },
})
```

## Ordering

Rules evaluate from top to bottom. For a given effect, the last matching rule wins. Named and anonymous rules have different precedence, so keep the source's named-rule pattern and place broad defaults before narrow exceptions.

Static effects such as workspace placement, float, move, and size do not re-evaluate every time a window title changes. Use an event handler only when you need live title-driven behavior.

## Discover window properties

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

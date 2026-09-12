---
title: Hyprland in HyprFlux
description: Understand Hyprland's role in the HyprFlux desktop, what HyprFlux's Lua layer adds on top of it, and why the move from Hyprlang to Lua matters.
---

# Hyprland in HyprFlux

Hyprland is the Wayland compositor at the center of the HyprFlux desktop.
HyprFlux 1.5 uses Hyprland 0.55 or newer and configures it entirely through
Lua — the old `hyprland.conf` entrypoint and sourced Hyprlang fragments are no
longer supported.

## What HyprFlux Adds on Top of Hyprland

Stock Hyprland gives you a compositor and a configuration language. HyprFlux
adds a specific way of organizing that configuration: a modular entrypoint
that splits settings by concern instead of one large file, separate base and
personal binding layers so an update doesn't silently overwrite your
shortcuts, generated Lua output for monitors and workspaces so display tools
can manage that state instead of you, a static shared color palette used
consistently across the desktop, and Hyprlock/Hypridle wired in for locking
and idle behavior.

None of this changes what Hyprland itself can do — it's an opinionated
arrangement of Hyprland's own configuration surface. See
[Understanding the Hyprland Configuration Architecture](/hyprland/) for how
the pieces fit together and the file-by-file ownership rules.

## From Hyprlang to Lua

The practical difference you'll notice first is syntax: Hyprlang's
assignment lines become calls into HyprFlux's `hl` API.

```lua
hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
hl.config({ general = { layout = "dwindle" } })
hl.bind("SUPER + RETURN", hl.dsp.exec_cmd(defaults.term))
```

The difference is more than cosmetic: Lua is a real language, not a static
assignment format, so a module can compute values instead of only declaring
them. The clearest example already in HyprFlux's own source is its numbered
workspace bindings — a `for` loop generates all ten instead of thirty
near-identical copied lines (see
[Generate Repeated Bindings](/hyprland/keybinding#generate-repeated-bindings)).
A Hyprlang file couldn't express that loop; it could only contain the
expanded result.

The exact syntax for each kind of declaration — `hl.env`, `hl.config`,
`hl.bind`, `hl.window_rule`, and so on — is documented on each owning file's
reference page, not repeated here.

## Quick Reference: Where to Make a Change

| Goal | Start here |
|---|---|
| Change terminal, editor, file manager | `UserConfigs/user-defaults.lua` |
| Change input, layout, cursor, VRR | `UserConfigs/user-settings.lua` |
| Change gaps, borders, blur, opacity | `UserConfigs/user-decorations.lua` |
| Change animation behavior | `UserConfigs/user-animations.lua` |
| Add application shortcuts | `UserConfigs/user-keybinds.lua` |
| Place or style application windows | `UserConfigs/window-rules.lua` |
| Start session applications | `UserConfigs/startup-apps.lua` |
| Configure outputs and workspace assignment | `nwg-displays` |

## Keep the Configuration Valid

After any change, validate before reloading — the
[entrypoint reference](/hyprland/hyprland#validation) has the exact commands
and what to do if validation fails.

## Further Reading

- [Hyprland configuration](https://wiki.hypr.land/Configuring/Start/)
- [Hyprland Lua configuration](https://wiki.hypr.land/Configuring/Lua/)
- [Hyprland dispatchers](https://wiki.hypr.land/Configuring/Dispatchers/)
- [HyprFlux v1.5.0 source](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr)

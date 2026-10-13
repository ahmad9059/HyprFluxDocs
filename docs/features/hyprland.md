---
title: Hyprland in HyprFlux
description: Hyprland's role in the HyprFlux desktop, what the Lua configuration layer adds, and why the move from Hyprlang to Lua matters.
---

# Hyprland in HyprFlux

Hyprland is the Wayland compositor at the center of the HyprFlux desktop. HyprFlux 1.5 uses Hyprland 0.55 or newer and configures it entirely through Lua. The old `hyprland.conf` entrypoint and sourced Hyprlang fragments are no longer supported.

## What HyprFlux adds

Stock Hyprland gives you a compositor and a configuration language. HyprFlux organizes that configuration in a particular way:

- a modular entrypoint that splits settings by concern instead of one large file;
- separate base and personal binding layers, so an update does not quietly overwrite your shortcuts;
- generated Lua output for monitors and workspaces, so display tools manage that state instead of you;
- a static shared color palette used across the desktop;
- Hyprlock and Hypridle wired in for locking and idle behavior.

None of this changes what Hyprland itself can do. It is an opinionated arrangement of Hyprland's own configuration surface. See [Hyprland Configuration Architecture](/hyprland/) for how the pieces fit together and which file owns what.

## From Hyprlang to Lua

The first difference you notice is syntax. Hyprlang's assignment lines become calls into the `hl` API:

```lua
hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
hl.config({ general = { layout = "dwindle" } })
hl.bind("SUPER + RETURN", hl.dsp.exec_cmd(defaults.term))
```

The difference is more than cosmetic. Lua is a real language, so a module can compute values instead of only declaring them. The clearest example in HyprFlux itself is the numbered workspace bindings: a `for` loop generates all ten instead of thirty near-identical copied lines (see [Generate Repeated Bindings](/hyprland/keybinding#generate-repeated-bindings)). A Hyprlang file could only contain the expanded result.

The syntax for each kind of declaration, such as `hl.env`, `hl.config`, `hl.bind`, and `hl.window_rule`, is documented on the reference page for the file that owns it.

## Where to make a change

| Goal | Start here |
|---|---|
| Change terminal, editor, or file manager | `UserConfigs/user-defaults.lua` |
| Change input, layout, cursor, or VRR | `UserConfigs/user-settings.lua` |
| Change gaps, borders, blur, or opacity | `UserConfigs/user-decorations.lua` |
| Change animation behavior | `UserConfigs/user-animations.lua` |
| Add application shortcuts | `UserConfigs/user-keybinds.lua` |
| Place or style application windows | `UserConfigs/window-rules.lua` |
| Start session applications | `UserConfigs/startup-apps.lua` |
| Configure outputs and workspace assignment | `nwg-displays` |

After any change, validate before you reload. The [entrypoint reference](/hyprland/hyprland#validation) has the commands and what to do when validation fails.

## Further reading

- [Hyprland configuration](https://wiki.hypr.land/Configuring/Start/)
- [Hyprland Lua configuration](https://wiki.hypr.land/Configuring/Lua/)
- [Hyprland dispatchers](https://wiki.hypr.land/Configuring/Dispatchers/)
- [HyprFlux source, `.config/hypr`](https://github.com/ahmad9059/HyprFlux/tree/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr)

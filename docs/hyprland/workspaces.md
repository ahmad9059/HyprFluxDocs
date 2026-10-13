---
title: Workspace Rules and Generated State
description: How HyprFlux handles workspace-to-monitor assignments and workspace rules.
---

# Workspace Rules and Generated State

Active generated path: `~/.config/hypr/workspaces.lua`

Guide module: `~/.config/hypr/UserConfigs/workspace-rules.lua`

`workspaces.lua` is the active nwg-displays output for workspace-to-monitor assignments. The repository version contains commented examples and registers no workspace rules by default.

## Rule syntax

```lua
hl.workspace_rule({
    workspace = "name:coding",
    monitor = "DP-1",
    default = true,
    no_rounding = true,
    no_border = true,
    gaps_in = 0,
    gaps_out = 0,
})
```

Current Lua field names use underscores:

| Purpose | Lua field |
|---|---|
| Remove rounding | `no_rounding` |
| Remove border | `no_border` |
| Set border size | `border_size` |
| Inner and outer gaps | `gaps_in`, `gaps_out` |
| Start an application on creation | `on_created_empty` |

For example:

```lua
hl.workspace_rule({
    workspace = "5",
    on_created_empty = "[float] firefox",
})
```

## Which file to edit

Prefer `nwg-displays` when the rule assigns workspaces to physical outputs. It writes `workspaces.lua` and can overwrite manual changes on the next apply.

`UserConfigs/workspace-rules.lua` is also required by `hyprland.lua`, despite a stale header that says otherwise. It currently contains only comments, so it has no runtime effect. If you put active rules there, keep them distinct from the nwg-displays assignments to avoid competing rules.

## Autoreload

`nwg-displays` expects configuration autoreload to stay available. If you disable autoreload, run `hyprctl reload` yourself after you apply display or workspace changes.

## Inspect and validate

```bash
hyprctl monitors -j
hyprctl workspaces -j
luac -p ~/.config/hypr/workspaces.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Application placement belongs in [`window-rules.lua`](/hyprland/windowrules). Output mode and position belong in [`monitors.lua`](/hyprland/monitors).

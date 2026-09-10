# Workspace Rules and Generated State

Active generated path: `~/.config/hypr/workspaces.lua`

Guide module: `~/.config/hypr/UserConfigs/workspace-rules.lua`

[View the pinned generated-file template](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/workspaces.lua).

`workspaces.lua` is the active nwg-displays output for workspace-to-monitor
assignments. The repository version contains commented examples and registers
no workspace rules by default.

## Rule Syntax

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
| Inner/outer gaps | `gaps_in`, `gaps_out` |
| Start an application on creation | `on_created_empty` |

For example:

```lua
hl.workspace_rule({
    workspace = "5",
    on_created_empty = "[float] firefox",
})
```

## Which File Should You Edit?

Prefer nwg-displays when the rule assigns workspaces to physical outputs. It
writes `workspaces.lua` and may overwrite manual changes on the next apply.

`UserConfigs/workspace-rules.lua` is also required by `hyprland.lua`, despite a
stale header claiming otherwise. It currently contains only comments, so it has
no runtime effect. If you place active rules there, keep them distinct from
nwg-displays-generated assignments to avoid competing rules.

## Autoreload

nwg-displays expects configuration autoreload to remain available. If you
disable autoreload, run `hyprctl reload` yourself after applying display or
workspace changes.

## Inspect and Validate

```bash
hyprctl monitors -j
hyprctl workspaces -j
luac -p ~/.config/hypr/workspaces.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Application placement belongs in
[`window-rules.lua`](/hyprland/windowrules). Output mode and position belong in
[`monitors.lua`](/hyprland/monitors).

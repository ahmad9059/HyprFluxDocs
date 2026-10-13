---
title: user-defaults.lua
description: The HyprFlux module that centralizes default application choices.
---

# `user-defaults.lua`

Path: `~/.config/hypr/UserConfigs/user-defaults.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/UserConfigs/user-defaults.lua).

This module centralizes application choices and returns them as a Lua table. It replaces the old global variables from `01-UserDefaults.conf`.

## Current fields

```lua
local defaults = {
    edit = os.getenv("EDITOR") or "nvim",
    term = "kitty",
    files = "thunar",
    search_engine = "https://www.google.com/search?q={}",
}

return defaults
```

| Field | Purpose |
|---|---|
| `edit` | Preferred editor, using `$EDITOR` when set |
| `term` | Terminal command used by user bindings |
| `files` | File-manager command used by user bindings |
| `search_engine` | Search URL template reserved by the configuration |

`search_engine` currently has no active consumer in the shipped `.config` tree. Treat it as a declared default, not as proof that a search binding uses it.

## Import the module

Other Lua modules access the returned table explicitly:

```lua
local defaults = require("UserConfigs.user-defaults")

hl.bind("SUPER + RETURN", hl.dsp.exec_cmd(defaults.term))
hl.bind("SUPER + F", hl.dsp.exec_cmd(defaults.files))
```

The values are module-scoped. Shell commands such as `echo $term` cannot read them, and Lua strings do not perform shell variable expansion.

## Safe customization

Use command names that can be run directly:

```lua
local defaults = {
    edit = "nvim",
    term = "foot",
    files = "yazi",
    search_engine = "https://duckduckgo.com/?q={}",
}
```

The HyprFlux Quick Settings script parses some fields with text tools. Keep the simple `name = "value"` layout and avoid embedding shell pipelines or commands with complex quoting unless you also update that consumer.

Validate after editing:

```bash
luac -p ~/.config/hypr/UserConfigs/user-defaults.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

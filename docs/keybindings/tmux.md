---
title: Tmux Keybindings
description: The custom tmux mappings that ship with HyprFlux.
---

# Tmux Keybindings

These are the custom declarations in the shipped [`~/.tmux.conf`](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.tmux.conf). Tmux defaults and plugin mappings vary by installed version, so inspect the effective table with `tmux list-keys`.

`ALT+O` is the configured prefix. Below, **Prefix** means press `ALT+O`, release it, then press the listed key.

## Prefix and panes

| Keys | Context | Action |
|---|---|---|
| `ALT+O` | Global | Send the tmux prefix. Press it twice to forward `ALT+O` to the application. |
| Prefix, then `r` | Prefix | Reload `~/.tmux.conf` |
| Prefix, then `*` | Prefix | Split horizontally, giving the new pane 20% width |
| Prefix, then `"` | Prefix | Split vertically, giving the new pane 20% height |
| `ALT+U` | Global | Toggle zoom for the active pane |
| Prefix, then `h/j/k/l` | Prefix | Select the pane left/down/up/right |

Mouse support is enabled, and window and pane numbering starts at 1.

## Neovim-aware navigation

| Keys | Context | Action |
|---|---|---|
| `CTRL+H/J/K/L` | Global | Select the pane left/down/up/right. Forward the key when the pane runs Vim, Neovim, or FZF. |
| `CTRL+\` | Global | Select the previously active pane. Forward the key in a detected editor. |
| `CTRL+H/J/K/L` | Copy mode (vi) | Select the pane left/down/up/right |
| `CTRL+\` | Copy mode (vi) | Select the previously active pane |

The matching Neovim mappings are in [Neovim Keybindings](/keybindings/neovim). Shell detection uses `grep`, and the `CTRL+\` version check also needs `bc`.

## Windows

| Keys | Action |
|---|---|
| `ALT+1` ... `ALT+9` | Select tmux window 1 ... 9 |
| `ALT+0` | Select tmux window 10 |

The terminal configurations forward these `ALT+number` combinations so they reach tmux. Automatic window names use the pane's current directory and refresh every five seconds.

## Plugins

The file declares TPM, Dracula, vim-tmux-navigator, and tmux-resurrect, and loads TPM from `~/.tmux/plugins/tpm/tpm`. Plugin-specific mappings exist only after TPM and the relevant plugin are installed. Use `tmux list-keys` rather than treating the plugin defaults as HyprFlux-owned bindings.

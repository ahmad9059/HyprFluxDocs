---
title: Tmux Keybindings - HyprFlux
description: Source-verified reference for the custom tmux mappings shipped with HyprFlux.
---

# Tmux Keybindings

This page documents custom declarations in the shipped
[`~/.tmux.conf`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.tmux.conf).
Tmux defaults and plugin mappings can vary by installed version; inspect the
effective table with `tmux list-keys`.

`ALT+O` is the configured prefix. In the tables below, **Prefix** means press
`ALT+O`, release it, then press the listed key.

## Prefix And Panes

| Keys | Context | Action |
|---|---|---|
| `ALT+O` | Global | Send the tmux prefix. Press it twice to forward `ALT+O` to the application. |
| Prefix, then `r` | Prefix | Reload `~/.tmux.conf`. |
| Prefix, then `*` | Prefix | Split horizontally; the new pane gets 20% width. |
| Prefix, then `"` | Prefix | Split vertically; the new pane gets 20% height. |
| `ALT+U` | Global | Toggle zoom for the active pane. |
| Prefix, then `h/j/k/l` | Prefix | Select the pane left/down/up/right. |

Mouse support is enabled, and window and pane numbering starts at 1.

## Neovim-Aware Navigation

| Keys | Context | Action |
|---|---|---|
| `CTRL+H/J/K/L` | Global | Select the pane left/down/up/right; forward the key when the pane is running Vim, Neovim, or FZF. |
| `CTRL+\` | Global | Select the previously active pane; forward the key in a detected editor. |
| `CTRL+H/J/K/L` | Copy mode (vi) | Select the pane left/down/up/right. |
| `CTRL+\` | Copy mode (vi) | Select the previously active pane. |

The matching Neovim mappings are listed in
[Neovim Keybindings](/keybindings/neovim). The shell detection uses `grep` and
the `CTRL+\` version check also requires `bc`.

## Windows

| Keys | Action |
|---|---|
| `ALT+1` ... `ALT+9` | Select tmux window 1 ... 9. |
| `ALT+0` | Select tmux window 10. |

The terminal configurations forward these `ALT+number` combinations so they
reach tmux. Automatic window names use the pane's current directory and refresh
every five seconds.

## Plugins

The file declares TPM, Dracula, vim-tmux-navigator, and tmux-resurrect, then
loads TPM from `~/.tmux/plugins/tpm/tpm`. Plugin-specific mappings exist only
after TPM and the relevant plugin are installed; use `tmux list-keys` rather
than treating their upstream defaults as HyprFlux-owned bindings.

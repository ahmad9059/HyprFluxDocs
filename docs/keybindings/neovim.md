---
title: Neovim Keybindings - HyprFlux
description: Source-verified custom mappings from the external Neovim configuration installed by HyprFlux.
---

# Neovim Keybindings

HyprFlux installs Neovim configuration from the separate
[`ahmad9059/nvim`](https://github.com/ahmad9059/nvim) repository. This page was
verified at revision
[`d11951c`](https://github.com/ahmad9059/nvim/tree/d11951c8dd548f0e9d1b470ba279d28e2d7a4696);
the installer currently clones that repository's current HEAD rather than this
exact revision.

The leader key is `Space`. NvChad also supplies default mappings, so use
`:map`, `:nmap`, or `:Telescope keymaps` in the installed editor for the full
runtime list.

## Custom Mappings

Source: [`lua/mappings.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/lua/mappings.lua)

| Mode | Keys | Action |
|---|---|---|
| Normal | `;` | Enter command mode. |
| Insert | `jk` | Return to Normal mode. |
| Normal, Insert, Visual | `CTRL+S` | Save the current file. |
| Insert | `ALT+H/J/K/L` | Move left/down/up/right. |
| Normal, Insert, Visual | `CTRL+A` | Select the entire buffer. |
| Normal | `Space L G` | Open LazyGit. |
| Normal | `g1` ... `g9` | Switch to listed buffer 1 ... 9 when it exists. |
| Normal | `g0` | Switch to the last listed buffer. |
| Normal, Terminal | `ALT+I` | Toggle the custom floating terminal. |
| Normal | `CTRL+H/J/K/L` | Navigate left/down/up/right through Neovim and tmux panes. |
| Normal | `CTRL+\` | Navigate to the previously active pane. |

The configuration removes NvChad's Normal-mode `Space H` and `Space V`
terminal mappings and disables `ALT+H` / `ALT+V` in Normal and Terminal modes.

## HTTP Requests

These mappings call the Kulala plugin in `.http` and `.rest` files.

| Keys | Action |
|---|---|
| `Space R S` | Send the current request. |
| `Space R A` | Send all requests. |
| `Space R N` / `Space R P` | Jump to the next / previous request. |
| `Space R E` | Select an environment. |
| `Space R C` | Copy the request as cURL. |
| `Space R Q` | Close the response. |

## LSP Additions

Source: [`lua/configs/lspconfig.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/lua/configs/lspconfig.lua#L17-L44)

These buffer-local mappings appear after an LSP client attaches. NvChad owns
the rest of the LSP mapping set.

| Keys | Action |
|---|---|
| `Space C A` | Request a code action. |
| `g r` | List references. |
| `K` | Show hover information. |

## VS Code Mode

When loaded by VSCode-Neovim, the configuration returns early and defines only
these custom mappings:

| Mode | Keys | Action |
|---|---|---|
| Normal, Visual | `Y` | Yank to the system clipboard. |
| Normal, Insert | `CTRL+A` | Select the entire buffer. |

The standard Vim command reference is available from `:help`; this page is
limited to behavior owned by the installed external configuration.

---
title: Neovim Keybindings
description: The custom mappings from the Neovim configuration that HyprFlux installs.
---

# Neovim Keybindings

HyprFlux installs Neovim configuration from the separate [`ahmad9059/nvim`](https://github.com/ahmad9059/nvim) repository. The mappings below were checked at revision `d11951c`, but the installer clones that repository's current HEAD, so a later install can differ.

The leader key is `Space`. NvChad adds its own mappings on top, so use `:map`, `:nmap`, or `:Telescope keymaps` in the installed editor for the full runtime list.

## Custom mappings

| Mode | Keys | Action |
|---|---|---|
| Normal | `;` | Enter command mode |
| Insert | `jk` | Return to Normal mode |
| Normal, Insert, Visual | `CTRL+S` | Save the current file |
| Insert | `ALT+H/J/K/L` | Move left/down/up/right |
| Normal, Insert, Visual | `CTRL+A` | Select the entire buffer |
| Normal | `Space L G` | Open LazyGit |
| Normal | `g1` ... `g9` | Switch to buffer 1 ... 9 when it exists |
| Normal | `g0` | Switch to the last buffer |
| Normal, Terminal | `ALT+I` | Toggle the floating terminal |
| Normal | `CTRL+H/J/K/L` | Move through Neovim and tmux panes |
| Normal | `CTRL+\` | Move to the previously active pane |

The configuration removes NvChad's Normal-mode `Space H` and `Space V` terminal mappings and disables `ALT+H` and `ALT+V` in Normal and Terminal modes.

## HTTP requests

These mappings call the Kulala plugin in `.http` and `.rest` files.

| Keys | Action |
|---|---|
| `Space R S` | Send the current request |
| `Space R A` | Send all requests |
| `Space R N` / `Space R P` | Jump to the next / previous request |
| `Space R E` | Select an environment |
| `Space R C` | Copy the request as cURL |
| `Space R Q` | Close the response |

## LSP additions

These buffer-local mappings appear after an LSP client attaches. NvChad owns the rest of the LSP mapping set.

| Keys | Action |
|---|---|
| `Space C A` | Request a code action |
| `g r` | List references |
| `K` | Show hover information |

## VS Code mode

When VSCode-Neovim loads the configuration, it returns early and defines only these custom mappings:

| Mode | Keys | Action |
|---|---|---|
| Normal, Visual | `Y` | Yank to the system clipboard |
| Normal, Insert | `CTRL+A` | Select the entire buffer |

The standard Vim command reference is available from `:help`. This page covers only behavior owned by the installed external configuration.

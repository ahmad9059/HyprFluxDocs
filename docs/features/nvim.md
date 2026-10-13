---
title: Neovim
description: The Neovim configuration HyprFlux installs, including mappings, plugins, language servers, and formatting.
---

# Neovim

HyprFlux installs Neovim, then replaces `~/.config/nvim` with the current head of the external [`ahmad9059/nvim`](https://github.com/ahmad9059/nvim) repository. Editor behavior belongs to that repository, not to the HyprFlux configuration tree.

The details below were checked against HyprFlux `0f62647` and Neovim configuration `d11951c`. HyprFlux does not pin the external revision, so the configuration installed at a later date can differ.

## How it is installed

| Concern | Owner |
|---|---|
| Neovim package | HyprFlux main package batch |
| Configuration URL | `REPO_URL_NVIM` in `dotsSetup.sh` |
| Clone and bootstrap | `modules/03-neovim.sh` |
| Editor settings and plugins | External `ahmad9059/nvim` repository |

The installer deletes an existing destination directory before it clones the external repository. Back up your local Neovim configuration before you run or rerun that module.

## Configuration structure

The verified revision contains:

```text
~/.config/nvim/
|- init.lua
|- lazy-lock.json
|- .stylua.toml
`- lua/
   |- chadrc.lua
   |- options.lua
   |- mappings.lua
   |- autocmds.lua
   |- configs/
   |  |- conform.lua
   |  |- lazy.lua
   |  `- lspconfig.lua
   `- plugins/init.lua
```

`init.lua` bootstraps NvChad 2.5 through Lazy.nvim. In VSCode-Neovim mode it installs a small clipboard and mapping branch and returns before loading the full desktop configuration.

## Interface defaults

The configuration selects:

- Tokyo Night colors
- transparent editor surfaces
- a custom dashboard
- minimal rounded statusline styling
- borderless Telescope
- relative line numbers
- rounded borders for floating windows.

## Custom mappings

The custom mapping file includes these highlights. It is not a complete key table.

| Mapping | Purpose |
|---|---|
| `;` | Enter command mode |
| `jk` | Leave insert mode |
| `CTRL+S` | Save |
| `ALT+h/j/k/l` | Move the cursor without leaving insert mode |
| Select-all mapping | Select the complete buffer |
| LazyGit mapping | Open LazyGit |
| Numbered buffer mappings | Select buffers directly |
| Floating terminal mapping | Toggle a terminal |
| tmux navigation mappings | Move across editor and tmux panes |
| `<leader>R...` family | Send and manage HTTP requests through Kulala |

Buffer selection also includes `g0`. Attached LSP buffers add code action, references, hover, and related mappings. The VSCode branch defines clipboard behavior for `Y` and insert-mode `CTRL+A`. Review both branches in the pinned mapping source for the exact keys.

Use the pinned [`lua/mappings.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/lua/mappings.lua) for desktop mappings, [`init.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/init.lua) for the VSCode branch, and [`lua/configs/lspconfig.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/lua/configs/lspconfig.lua) for buffer-local LSP mappings. The separate [Neovim cheat sheet](../keybindings/neovim.md) lists the custom mappings as a table.

## Plugins

The custom plugin specification includes:

- Conform for formatting
- native `nvim-lspconfig` integration
- lazydev for Lua development
- LazyGit integration
- blink.cmp completion overrides
- Treesitter and automatic HTML/JSX tag handling
- Telescope UI Select
- render-markdown
- Kulala for HTTP workflows
- vim-tmux-navigator
- which-key
- template-string helpers.

`noice.nvim`, `nvim-notify`, and `mini.surround` are not active custom plugins at the verified revision.

## Language servers

The external config explicitly enables servers for:

- HTML, CSS, Tailwind CSS, Emmet, and TypeScript
- JSON, YAML, GraphQL, ESLint, and Prisma
- Bash and Markdown
- C and C++ through clangd
- Docker and Docker Compose.

Lua LSP is configured through the NvChad path. Python, Rust, and Go servers are not enabled in the custom server list.

The configuration uses the current `vim.lsp.config` and `vim.lsp.enable` APIs, so it needs Neovim 0.11 or newer. Do not rely on the external README's older minimum-version claim.

TypeScript LSP formatting is disabled in favor of Conform and prettierd. ESLint runs `EslintFixAll` on save. Tailwind and GraphQL activation is limited by their configured project root markers.

## Automatic behavior

Custom autocommands mark `.env`, `.env.*`, and `*.env` as shell syntax, identify Compose files as `yaml.docker-compose`, and disable folding in floating HTTP/REST response windows.

## Formatting

Conform formats on save with a 500 ms timeout and an LSP fallback. The configured executables are:

| File types | Formatter |
|---|---|
| Lua | `stylua` |
| Shell | `shfmt` |
| Web, JSON, YAML, GraphQL, Markdown | `prettierd` where mapped |
| C and C++ | `clang-format` |

HyprFlux and the external repository do not provision every language server or formatter executable. Install the missing tools for the languages you use.

## Plugin bootstrap

After cloning, the HyprFlux module runs a headless startup and `Lazy sync`. Both commands suppress failures before the module logs success, so check the editor directly after installation:

```bash
nvim
```

Open and save a project file first so the file-event plugins load, then inspect:

```vim
:checkhealth
:Lazy
:LspInfo
:ConformInfo
```

The external `lazy-lock.json` records plugin commits for the repository snapshot, but HyprFlux then runs `Lazy sync`, which can advance plugins and rewrite that lockfile. It is not an immutable post-install dependency snapshot, and HyprFlux does not pin the configuration commit that supplies the original lockfile.

## Updating safely

Before you pull external configuration changes, inspect local modifications:

```bash
git -C ~/.config/nvim status --short
git -C ~/.config/nvim log -1 --oneline
```

Review upstream changes before you update. Rerunning the HyprFlux Neovim module is destructive to the existing directory.

## Related pages

- [Neovim cheat sheet](../keybindings/neovim.md)
- [Kitty](./kitty.md)
- [Yazi](./yazi.md)

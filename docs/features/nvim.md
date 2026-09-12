# Neovim

## What It Is

HyprFlux installs Neovim, then replaces `~/.config/nvim` with the current head
of the external [`ahmad9059/nvim`](https://github.com/ahmad9059/nvim)
repository. Editor behavior belongs to that repository, not to the HyprFlux
configuration tree.

> HyprFlux source snapshot: [`f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)
>
> Neovim configuration snapshot: [`d11951c8`](https://github.com/ahmad9059/nvim/tree/d11951c8dd548f0e9d1b470ba279d28e2d7a4696)

HyprFlux does not pin the external revision. The exact configuration installed
at a later date can differ from this page's verified snapshot.

## Configuration

### Installation ownership

| Concern | Owner |
|---|---|
| Neovim package | HyprFlux main package batch |
| Configuration URL | `REPO_URL_NVIM` in `dotsSetup.sh` |
| Clone/bootstrap | [`modules/03-neovim.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/modules/03-neovim.sh) |
| Editor settings and plugins | External `ahmad9059/nvim` repository |

The installer deletes an existing destination directory before cloning the
external repository. Back up local Neovim configuration before running or
rerunning that module.

### Configuration structure

The verified external revision contains:

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

`init.lua` bootstraps NvChad 2.5 through Lazy.nvim. In VSCode-Neovim mode it
installs a small clipboard/mapping branch and returns before loading the full
desktop configuration.

### Interface defaults

The pinned config explicitly selects:

- Tokyo Night colors.
- Transparent editor surfaces.
- A custom dashboard.
- Minimal rounded statusline styling.
- Borderless Telescope.
- Relative line numbers.
- Rounded borders for floating windows.

These are configuration-specific claims. General Neovim defaults and the
separate [Neovim cheat sheet](../keybindings/neovim.md) are not evidence of
HyprFlux's installed mappings.

### Custom mappings

The verified custom mapping file includes the following highlights; it is not
an exhaustive key table:

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
| Tmux navigation mappings | Move across editor and tmux panes |
| `<leader>R...` family | Send and manage HTTP requests through Kulala |

Buffer selection also includes `g0`; attached LSP buffers add code action,
references, hover, and related mappings. The VSCode branch defines clipboard
behavior for `Y` and insert-mode `CTRL+A`. Review both branches in the pinned
mapping source for exact keys.

Use the pinned
[`lua/mappings.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/lua/mappings.lua)
for desktop custom mappings,
[`init.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/init.lua)
for the VSCode branch, and
[`lua/configs/lspconfig.lua`](https://github.com/ahmad9059/nvim/blob/d11951c8dd548f0e9d1b470ba279d28e2d7a4696/lua/configs/lspconfig.lua)
for buffer-local LSP mappings.

### Plugins

The custom plugin specification includes:

- Conform for formatting.
- Native `nvim-lspconfig` integration.
- lazydev for Lua development.
- LazyGit integration.
- blink.cmp completion overrides.
- Treesitter and automatic HTML/JSX tag handling.
- Telescope UI Select.
- render-markdown.
- Kulala for HTTP workflows.
- vim-tmux-navigator.
- which-key.
- template-string helpers.

`noice.nvim`, `nvim-notify`, and `mini.surround` are not active custom plugins
at the pinned revision.

### Language servers

The external config explicitly enables servers for:

- HTML, CSS, Tailwind CSS, Emmet, and TypeScript.
- JSON, YAML, GraphQL, ESLint, and Prisma.
- Bash and Markdown.
- C/C++ through clangd.
- Docker and Docker Compose.

Lua LSP is configured through the NvChad path. Python, Rust, and Go servers are
not enabled in the pinned custom server list.

The configuration uses current `vim.lsp.config` and `vim.lsp.enable` APIs. Do
not rely on the external README's older minimum-version claim; Neovim 0.11 or
newer is required by these APIs and the pinned NvChad path.

TypeScript LSP formatting is disabled in favor of Conform/prettierd. ESLint
runs `EslintFixAll` on save. Tailwind and GraphQL activation is bounded by their
configured project root markers.

### Automatic behavior

Custom autocommands mark `.env`, `.env.*`, and `*.env` as shell syntax,
identify Compose files as `yaml.docker-compose`, and disable folding in
floating HTTP/REST response windows.

### Formatting

Conform formats on save with a 500 ms timeout and LSP fallback. The configured
executables include:

| File types | Formatter |
|---|---|
| Lua | `stylua` |
| Shell | `shfmt` |
| Web, JSON, YAML, GraphQL, Markdown | `prettierd` where mapped |
| C/C++ | `clang-format` |

HyprFlux and the external repository do not comprehensively provision every
language server or formatter executable. Install missing tools separately for
the languages you use.

## Common Tasks

### Plugin bootstrap

After cloning, the HyprFlux module runs a headless startup and `Lazy sync`.
Both commands currently suppress failures before the module logs success. Check
the editor directly after installation:

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

The external `lazy-lock.json` records plugin commits for the repository
snapshot. HyprFlux then runs `Lazy sync`, which can advance plugins and rewrite
that lockfile, so it is not an immutable post-install dependency snapshot.
HyprFlux also does not pin the configuration repository commit that supplies
the original lockfile.

### Updating safely

Before pulling external configuration changes, inspect local modifications:

```bash
git -C ~/.config/nvim status --short
git -C ~/.config/nvim log -1 --oneline
```

Review upstream changes before updating. Rerunning the HyprFlux Neovim module
is destructive to the existing directory.

## Related pages

- [Neovim cheat sheet](../keybindings/neovim.md)
- [Kitty](./kitty.md)
- [Yazi](./yazi.md)

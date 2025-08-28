# Neovim Configuration

Neovim is the powerful, extensible text editor configured in HyprFlux with NvChad framework, providing a modern IDE-like experience with advanced features for development and text editing.

## Overview

The HyprFlux Neovim configuration features:

- NvChad framework for modern UI and functionality
- LSP integration for intelligent code completion
- Advanced syntax highlighting with Treesitter
- Git integration with LazyGit
- Plugin management with Lazy.nvim
- VSCode-Neovim compatibility mode

## Configuration Structure

```
~/.config/nvim/
├── init.lua                    # Main entry point with VSCode compatibility
├── lazy-lock.json             # Plugin version lock file
├── lua/
│   ├── autocmds.lua           # Auto commands
│   ├── chadrc.lua             # NvChad configuration
│   ├── mappings.lua           # Key mappings
│   ├── options.lua            # Neovim options
│   ├── configs/
│   │   ├── conform.lua        # Formatter configuration
│   │   ├── lazy.lua           # Lazy.nvim setup
│   │   └── lspconfig.lua      # LSP server configurations
│   └── plugins/               # Custom plugin configurations
└── preview/                   # Screenshots and documentation
```

## Key Features

### 1. NvChad Framework

#### Base Configuration

```lua
-- chadrc.lua
local M = {}

M.base46 = {
  theme = "tokyonight",
  transparency = true,
  hl_override = {
    Comment = { italic = true },
    ["@comment"] = { italic = true },
  },
}

M.ui = {
  tabufline = {
    lazyload = false,
  },
  statusline = {
    theme = "minimal",
    separator_style = "round",
  },
}
```

#### Dashboard Configuration

```lua
M.nvdash = {
  load_on_startup = true,
  header = {
    " __  __       __     __  __     __       ",
    "/\\ \\_\\ \\     /\\ \\   /\\ \\/ /    /\\ \\      ",
    '\\ \\  __ \\   _\\_\\ \\  \\ \\  _"-.  \\ \\ \\____ ',
    " \\ \\_\\ \\_\\ /\\_____\\  \\ \\_\\ \\_\\  \\ \\_____\\",
    "  \\/_/\\/_/ \\/_____/   \\/_/\\/_/   \\/_____/",
  },
}
```

### 2. Plugin System

#### Core Plugins

```lua
-- Plugin configuration with Lazy.nvim
require("lazy").setup({
  {
    "NvChad/NvChad",
    lazy = false,
    branch = "v2.5",
    import = "nvchad.plugins",
  },
  { import = "plugins" },
}, lazy_config)
```

#### Essential Plugins

| Plugin                            | Purpose                      | Status    |
| --------------------------------- | ---------------------------- | --------- |
| `NvChad/NvChad`                   | Base configuration framework | ✅ Active |
| `folke/noice.nvim`                | Enhanced command line UI     | ✅ Active |
| `rcarriga/nvim-notify`            | Beautiful notifications      | ✅ Active |
| `neovim/nvim-lspconfig`           | LSP configuration            | ✅ Active |
| `stevearc/conform.nvim`           | Code formatting              | ✅ Active |
| `kdheepak/lazygit.nvim`           | Git integration              | ✅ Active |
| `nvim-treesitter/nvim-treesitter` | Syntax highlighting          | ✅ Active |

### 3. LSP Configuration

#### Language Server Setup

```lua
-- lspconfig.lua
local configs = require "nvchad.configs.lspconfig"

local servers = {
  html = {},
  cssls = {},
  ts_ls = {},
  pyright = {},
  rust_analyzer = {},
  gopls = {},
  lua_ls = {
    settings = {
      Lua = {
        diagnostics = {
          globals = { "vim" },
        },
      },
    },
  },
}

for name, opts in pairs(servers) do
  opts.on_init = configs.on_init
  opts.on_attach = configs.on_attach
  opts.capabilities = configs.capabilities

  require("lspconfig")[name].setup(opts)
end
```

#### Completion Engine

```lua
-- Using blink.cmp for fast completion
{
  "saghen/blink.cmp",
  lazy = false,
  dependencies = "rafamadriz/friendly-snippets",
  version = "v0.*",
  opts = {
    keymap = { preset = "default" },
    appearance = {
      use_nvim_cmp_as_default = true,
      nerd_font_variant = "mono"
    },
    sources = {
      default = { "lsp", "path", "snippets", "buffer" },
    },
  },
}
```

### 4. Code Formatting

#### Conform.nvim Configuration

```lua
-- conform.lua
local options = {
  formatters_by_ft = {
    lua = { "stylua" },
    css = { "prettier" },
    html = { "prettier" },
    javascript = { "prettier" },
    typescript = { "prettier" },
    javascriptreact = { "prettier" },
    typescriptreact = { "prettier" },
    json = { "prettier" },
    markdown = { "prettier" },
    python = { "black" },
    rust = { "rustfmt" },
    go = { "gofmt" },
  },

  format_on_save = {
    timeout_ms = 500,
    lsp_fallback = true,
  },
}

require("conform").setup(options)
```

### 5. Git Integration

#### LazyGit Integration

```lua
-- LazyGit plugin configuration
{
  "kdheepak/lazygit.nvim",
  lazy = true,
  cmd = {
    "LazyGit",
    "LazyGitConfig",
    "LazyGitCurrentFile",
    "LazyGitFilter",
    "LazyGitFilterCurrentFile",
  },
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  keys = {
    { "<leader>lg", "<cmd>LazyGit<cr>", desc = "LazyGit" }
  },
}
```

## Customization Guide

### 1. Theme Configuration

#### Available Themes

- **tokyonight**: Dark blue theme (default)
- **catppuccin**: Pastel color scheme
- **onedark**: Atom-inspired theme
- **gruvbox**: Retro groove colors
- **nord**: Arctic-inspired palette

#### Changing Theme

```lua
-- In chadrc.lua
M.base46 = {
  theme = "catppuccin",  -- Change theme here
  transparency = true,   -- Enable transparency
}
```

#### Custom Highlights

```lua
M.base46 = {
  hl_override = {
    Comment = { italic = true, fg = "#7c7c7c" },
    ["@variable"] = { fg = "#e06c75" },
    ["@function"] = { fg = "#61afef", bold = true },
    CursorLine = { bg = "#2c323c" },
  },
}
```

### 2. Key Mappings

#### Custom Keybindings

```lua
-- mappings.lua
local map = vim.keymap.set

-- General mappings
map("n", "<C-s>", "<cmd>w<CR>", { desc = "Save file" })
map("n", "<C-q>", "<cmd>q<CR>", { desc = "Quit" })
map("n", "<leader>q", "<cmd>qa<CR>", { desc = "Quit all" })

-- Buffer navigation
map("n", "<S-h>", "<cmd>bprevious<CR>", { desc = "Previous buffer" })
map("n", "<S-l>", "<cmd>bnext<CR>", { desc = "Next buffer" })
map("n", "<leader>x", "<cmd>bd<CR>", { desc = "Close buffer" })

-- Window management
map("n", "<C-h>", "<C-w>h", { desc = "Move to left window" })
map("n", "<C-j>", "<C-w>j", { desc = "Move to bottom window" })
map("n", "<C-k>", "<C-w>k", { desc = "Move to top window" })
map("n", "<C-l>", "<C-w>l", { desc = "Move to right window" })

-- LSP mappings
map("n", "gd", vim.lsp.buf.definition, { desc = "Go to definition" })
map("n", "gr", vim.lsp.buf.references, { desc = "Show references" })
map("n", "K", vim.lsp.buf.hover, { desc = "Show hover info" })
map("n", "<leader>rn", vim.lsp.buf.rename, { desc = "Rename symbol" })
```

#### Plugin-Specific Mappings

```lua
-- Telescope mappings
map("n", "<leader>ff", "<cmd>Telescope find_files<CR>", { desc = "Find files" })
map("n", "<leader>fg", "<cmd>Telescope live_grep<CR>", { desc = "Live grep" })
map("n", "<leader>fb", "<cmd>Telescope buffers<CR>", { desc = "Find buffers" })

-- Git mappings
map("n", "<leader>lg", "<cmd>LazyGit<CR>", { desc = "LazyGit" })
map("n", "<leader>gh", "<cmd>Telescope git_commits<CR>", { desc = "Git commits" })
```

### 3. Options Configuration

#### Editor Settings

```lua
-- options.lua
local opt = vim.opt

-- Line numbers
opt.relativenumber = true
opt.number = true

-- Indentation
opt.tabstop = 2
opt.shiftwidth = 2
opt.expandtab = true
opt.autoindent = true

-- Search settings
opt.ignorecase = true
opt.smartcase = true
opt.hlsearch = true
opt.incsearch = true

-- Appearance
opt.termguicolors = true
opt.background = "dark"
opt.signcolumn = "yes"
opt.wrap = false
opt.cursorline = true

-- Behavior
opt.hidden = true
opt.errorbells = false
opt.swapfile = false
opt.backup = false
opt.undofile = true
opt.backspace = "indent,eol,start"
opt.splitright = true
opt.splitbelow = true
```

### 4. Auto Commands

#### Custom Auto Commands

```lua
-- autocmds.lua
local autocmd = vim.api.nvim_create_autocmd
local augroup = vim.api.nvim_create_augroup

-- Highlight on yank
autocmd("TextYankPost", {
  group = augroup("HighlightYank", {}),
  pattern = "*",
  callback = function()
    vim.highlight.on_yank({
      higroup = "IncSearch",
      timeout = 40,
    })
  end,
})

-- Auto format on save
autocmd("BufWritePre", {
  group = augroup("AutoFormat", {}),
  pattern = "*",
  callback = function()
    require("conform").format({ async = false, lsp_fallback = true })
  end,
})

-- Remove trailing whitespace
autocmd("BufWritePre", {
  group = augroup("TrimWhitespace", {}),
  pattern = "*",
  command = [[%s/\s\+$//e]],
})
```

## Advanced Features

### 1. Language-Specific Configuration

#### JavaScript/TypeScript

```lua
-- Enhanced JS/TS support
{
  "axelvc/template-string.nvim",
  event = "InsertEnter",
  ft = { "javascript", "typescript", "javascriptreact", "typescriptreact" },
  config = function()
    require("template-string").setup({
      filetypes = { "javascript", "typescript", "javascriptreact", "typescriptreact" },
      jsx_brackets = true,
      remove_template_string = false,
      restore_quotes = {
        normal = [[']],
        jsx = [["]],
      },
    })
  end,
}
```

#### HTML/JSX Auto-tagging

```lua
{
  "windwp/nvim-ts-autotag",
  ft = { "html", "javascript", "typescript", "javascriptreact", "typescriptreact", "vue", "xml" },
  config = function()
    require("nvim-ts-autotag").setup()
  end,
}
```

#### Markdown Rendering

```lua
{
  "MeanderingProgrammer/render-markdown.nvim",
  opts = {},
  ft = { "markdown", "norg", "rmd", "org" },
  config = function(_, opts)
    require("render-markdown").setup(opts)
  end,
}
```

### 2. Text Editing Enhancements

#### Smart Surround Operations

```lua
{
  "echasnovski/mini.surround",
  version = "*",
  event = "VeryLazy",
  config = function()
    require("mini.surround").setup({
      mappings = {
        add = "sa",            -- Add surrounding in Normal and Visual modes
        delete = "sd",         -- Delete surrounding
        find = "sf",           -- Find surrounding (to the right)
        find_left = "sF",      -- Find surrounding (to the left)
        highlight = "sh",      -- Highlight surrounding
        replace = "sr",        -- Replace surrounding
        update_n_lines = "sn", -- Update `n_lines`
      },
    })
  end,
}
```

### 3. Navigation Enhancements

#### Tmux Integration

```lua
{
  "christoomey/vim-tmux-navigator",
  lazy = false,
  cmd = {
    "TmuxNavigateLeft",
    "TmuxNavigateDown",
    "TmuxNavigateUp",
    "TmuxNavigateRight",
    "TmuxNavigatePrevious",
  },
  keys = {
    { "<c-h>", "<cmd><C-U>TmuxNavigateLeft<cr>" },
    { "<c-j>", "<cmd><C-U>TmuxNavigateDown<cr>" },
    { "<c-k>", "<cmd><C-U>TmuxNavigateUp<cr>" },
    { "<c-l>", "<cmd><C-U>TmuxNavigateRight<cr>" },
    { "<c-\\>", "<cmd><C-U>TmuxNavigatePrevious<cr>" },
  },
}
```

## VSCode Integration

### 1. VSCode-Neovim Compatibility

The configuration includes special handling for VSCode-Neovim:

```lua
-- init.lua
if vim.g.vscode then
  -- Minimal config for VSCode-Neovim
  vim.opt.clipboard:prepend { "unnamed", "unnamedplus" }

  -- Key mappings for consistency
  vim.keymap.set("n", "Y", '"+y', { noremap = true, silent = true })
  vim.keymap.set("v", "Y", '"+y', { noremap = true, silent = true })
  vim.keymap.set("n", "<C-a>", "ggVG", { noremap = true, silent = true })

  return -- Skip full Neovim config
end
```

### 2. VSCode Settings

```json
// settings.json
{
  "vscode-neovim.neovimExecutablePaths.linux": "/usr/bin/nvim",
  "vscode-neovim.neovimInitVimPaths.linux": "~/.config/nvim/init.lua",
  "extensions.experimental.affinity": {
    "asvetliakov.vscode-neovim": 1
  }
}
```

## Integration with HyprFlux

### 1. Hyprland Integration

#### Keybindings

```bash
# In UserConfigs/UserKeybinds.conf
bind = SUPER, E, exec, kitty nvim
bind = SUPER SHIFT, E, exec, code
bind = SUPER CTRL, E, exec, kitty --class="nvim-floating" nvim
```

#### Window Rules

```bash
# In UserConfigs/WindowRules.conf
windowrule = float, ^(nvim-floating)$
windowrule = size 1200 800, ^(nvim-floating)$
windowrule = center, ^(nvim-floating)$
```

### 2. Terminal Integration

#### Kitty Integration

```bash
# Launch nvim in kitty with specific configuration
kitty --title="Neovim" --class="nvim" nvim
```

#### Tmux Integration

```bash
# Tmux session for development
tmux new-session -d -s dev
tmux send-keys -t dev 'nvim' C-m
```

## Performance Optimization

### 1. Lazy Loading

```lua
-- Optimize plugin loading
{
  "plugin-name",
  lazy = true,
  event = "VeryLazy",  -- Load after startup
  ft = { "lua", "vim" }, -- Load for specific filetypes
  cmd = { "Command" },   -- Load on command
  keys = { "<leader>x" }, -- Load on keypress
}
```

### 2. Startup Time Optimization

```lua
-- Disable unused providers
vim.g.loaded_ruby_provider = 0
vim.g.loaded_perl_provider = 0
vim.g.loaded_python_provider = 0

-- Use faster grep
if vim.fn.executable("rg") == 1 then
  vim.o.grepprg = "rg --vimgrep --smart-case --follow"
end
```

## Troubleshooting

### Common Issues

1. **Slow startup**: Check plugin loading and disable unused providers
2. **LSP not working**: Verify language servers are installed
3. **Formatting issues**: Check conform.nvim configuration
4. **Theme not loading**: Verify NvChad installation

### Debug Commands

```bash
# Check Neovim health
nvim --headless -c 'checkhealth' -c 'qa'

# Profile startup time
nvim --startuptime startup.log

# Check plugin status
nvim -c 'Lazy'

# Update plugins
nvim -c 'Lazy sync'
```

### Performance Monitoring

```bash
# Measure startup time
hyperfine 'nvim --headless -c "qa"'

# Check plugin load times
nvim --startuptime startup.log -c 'qa' && cat startup.log
```

This comprehensive Neovim configuration provides a powerful, modern editing experience that integrates seamlessly with the HyprFlux desktop environment, offering both standalone functionality and VSCode compatibility.
im Configuration

Neovim is the powerful, extensible text editor

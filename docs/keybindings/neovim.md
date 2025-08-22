# My Custom KeyBindings

| Mode(s)                | Key(s)                | Action / Command                                                     | Description               |
| ---------------------- | --------------------- | -------------------------------------------------------------------- | ------------------------- |
| Normal                 | `;`                   | `:`                                                                  | Enter command mode        |
| Insert                 | `jk`                  | `<ESC>`                                                              | Exit insert mode          |
| Normal, Insert, Visual | `Ctrl + S`            | `<cmd> w <cr>`                                                       | Save file                 |
| Insert                 | `Alt + h`             | `<Left>`                                                             | Move left in insert mode  |
| Insert                 | `Alt + j`             | `<Down>`                                                             | Move down in insert mode  |
| Insert                 | `Alt + k`             | `<Up>`                                                               | Move up in insert mode    |
| Insert                 | `Alt + l`             | `<Right>`                                                            | Move right in insert mode |
| Normal                 | `Ctrl + A`            | `ggVG`                                                               | Select all                |
| Insert                 | `Ctrl + A`            | `<ESC>ggVG`                                                          | Select all in insert mode |
| Visual                 | `Ctrl + A`            | `<ESC>ggVG`                                                          | Select all in visual mode |
| Normal                 | `<leader>lg`          | `<cmd>LazyGit<CR>`                                                   | Open LazyGit              |
| Visual                 | `<leader>i`           | `vi`                                                                 | Select inside {}          |
| Visual                 | `<leader>a`           | `va`                                                                 | Select around {}          |
| Normal, Visual         | `<leader>1…<leader>9` | Switch buffer using buffer list lookup                               | Buffer navigation         |
| Normal, Terminal       | `Alt + i`             | `require("nvchad.term").toggle { pos="float", id="floatTerm", ... }` | Toggle floating terminal  |
| Normal                 | `Ctrl + h`            | `<cmd>TmuxNavigateLeft<CR>`                                          | Tmux navigate left        |
| Normal                 | `Ctrl + j`            | `<cmd>TmuxNavigateDown<CR>`                                          | Tmux navigate down        |
| Normal                 | `Ctrl + k`            | `<cmd>TmuxNavigateUp<CR>`                                            | Tmux navigate up          |
| Normal                 | `Ctrl + l`            | `<cmd>TmuxNavigateRight<CR>`                                         | Tmux navigate right       |
| Normal                 | `Ctrl + \`            | `<cmd>TmuxNavigatePrevious<CR>`                                      | Tmux navigate previous    |

---

# Vim/Neovim (CheatSheet)

**Vim operates in different modes:** Normal (default, press Esc), Insert (typing text, press i/a/o), Visual (selecting text, press v), and Command (executing commands, press :)

## Tips for Beginners

- Start with **vimtutor** - run this command in your terminal for an interactive tutorial
- Use **hjkl** for movement instead of arrow keys to build muscle memory
- Stay in normal mode as much as possible - only enter insert mode when actively typing
- Learn one new command per day rather than trying to memorize everything at once
- Practice the most common operations: navigation, insertion, deletion, and saving
- Use **:help** extensively - Vim's built-in documentation is excellent

## Configuration

Add these common settings to your `~/.vimrc` file:

### Display Settings

```vim
set number          " Show line numbers
set relativenumber  " Show relative line numbers
syntax on           " Enable syntax highlighting
```

### Buffer Settings

```vim
set hidden                  " Allow unsaved buffer switching
set autowrite              " Auto-save when switching buffers
set confirm                 " Ask before discarding changes
set switchbuf=useopen       " Jump to existing window if open
```

### Indentation

```vim
set tabstop=4       " Set tab width
set shiftwidth=4    " Set indent width
set expandtab       " Use spaces instead of tabs
set autoindent      " Auto-indent new lines
```

### Search Settings

```vim
set hlsearch        " Highlight search results
set incsearch       " Incremental search
set ignorecase      " Case-insensitive search
set smartcase       " Case-sensitive if uppercase present
```

### Interface Settings

```vim
set cursorline      " Highlight current line
set showmatch       " Highlight matching brackets
set ruler           " Show cursor position
set laststatus=2    " Always show status line
set wildmenu        " Enhanced command completion
set scrolloff=5     " Keep lines above/below cursor
```

### Editor Behavior

```vim
set noswapfile              " Disable swap files
set nobackup               " Disable backup files
set undofile               " Enable persistent undo
set clipboard=unnamedplus  " Use system clipboard
set mouse=a                " Enable mouse support
```

---

## Modes

### Mode Switching

| Command  | Description       |
| -------- | ----------------- |
| `Esc`    | Normal mode       |
| `v`      | Visual mode       |
| `V`      | Visual line mode  |
| `Ctrl+v` | Visual block mode |

### Entering Insert Mode from Normal Mode

| Command | Description             |
| ------- | ----------------------- |
| `i`     | Insert mode             |
| `I`     | Insert at line start    |
| `a`     | Append after cursor     |
| `A`     | Append at line end      |
| `o`     | New line below          |
| `O`     | New line above          |
| `s`     | Delete char and insert  |
| `S`     | Delete line and insert  |
| `gi`    | Insert at last position |

## Navigation

### Basic Movement

| Command   | Description           |
| --------- | --------------------- |
| `h j k l` | Left, down, up, right |

### Word Movement

| Command | Description   |
| ------- | ------------- |
| `w`     | Word forward  |
| `b`     | Word backward |
| `e`     | End of word   |
| `W`     | WORD forward  |
| `B`     | WORD backward |
| `E`     | End of WORD   |

### Line Movement

| Command | Description          |
| ------- | -------------------- |
| `0`     | Line start           |
| `^`     | First non-blank char |
| `$`     | Line end             |

### Screen Movement

| Command | Description      |
| ------- | ---------------- |
| `H`     | Top of screen    |
| `M`     | Middle of screen |
| `L`     | Bottom of screen |

### File Navigation

| Command  | Description       |
| -------- | ----------------- |
| `gg`     | Go to top         |
| `G`      | Go to bottom      |
| `:N`     | Go to line number |
| `Ctrl+f` | Page down         |
| `Ctrl+b` | Page up           |
| `Ctrl+d` | Half page down    |
| `Ctrl+u` | Half page up      |

### Jump Navigation

| Command  | Description     |
| -------- | --------------- |
| `Ctrl+o` | Jump back       |
| `Ctrl+i` | Jump forward    |
| `g;`     | Previous change |
| `g,`     | Next change     |

### Character Motions

| Command   | Description              |
| --------- | ------------------------ |
| `f{char}` | Find character forward   |
| `F{char}` | Find character backward  |
| `t{char}` | To character forward     |
| `T{char}` | To character backward    |
| `;`       | Repeat character motion  |
| `,`       | Reverse character motion |

## Editing

### Delete & Change

| Command | Description               |
| ------- | ------------------------- |
| `x`     | Delete character          |
| `X`     | Delete char before cursor |
| `dd`    | Delete line               |
| `dw`    | Delete word               |
| `d$`    | Delete to end of line     |
| `d0`    | Delete to start of line   |
| `D`     | Delete to end of line     |
| `cw`    | Change word               |
| `cc`    | Change line               |
| `r`     | Replace character         |

### Copy & Paste

| Command | Description           |
| ------- | --------------------- |
| `yy`    | Copy line             |
| `yw`    | Copy word             |
| `y$`    | Copy to end of line   |
| `y0`    | Copy to start of line |
| `p`     | Paste after           |
| `P`     | Paste before          |

### Undo & Redo

| Command  | Description       |
| -------- | ----------------- |
| `u`      | Undo              |
| `Ctrl+r` | Redo              |
| `U`      | Undo line changes |

## Text Objects

### Word & Paragraph

| Command | Description         |
| ------- | ------------------- |
| `iw`    | Inner word          |
| `aw`    | A word (with space) |
| `is`    | Inner sentence      |
| `as`    | A sentence          |
| `ip`    | Inner paragraph     |
| `ap`    | A paragraph         |

### Brackets & Quotes

| Command | Description   |
| ------- | ------------- |
| `i(`    | Inner block   |
| `a(`    | A block       |
| `ib`    | Inner block   |
| `ab`    | A block       |
| `i"`    | Inside quotes |
| `a"`    | Around quotes |

### Useful Combinations

| Command | Description          |
| ------- | -------------------- |
| `ciw`   | Change inner word    |
| `di"`   | Delete inside quotes |
| `ya(`   | Yank around block    |
| `>ip`   | Indent paragraph     |
| `=G`    | Auto-indent to end   |

## Registers

### Named Registers

| Command | Description           |
| ------- | --------------------- |
| `"ay`   | Yank to register a    |
| `"ap`   | Paste from register a |
| `"Ay`   | Append to register a  |

### Special Registers

| Command | Description         |
| ------- | ------------------- |
| `"+`    | System clipboard    |
| `"*`    | Selection clipboard |
| `"0`    | Last yank           |
| `"1`    | Last delete         |
| `"_`    | Black hole register |
| `:reg`  | Show all registers  |

## Search & Replace

### Searching

| Command    | Description                     |
| ---------- | ------------------------------- |
| `/pattern` | Search forward                  |
| `?pattern` | Search backward                 |
| `n`        | Next match                      |
| `N`        | Previous match                  |
| `*`        | Search word under cursor        |
| `#`        | Search word under cursor (back) |

### Replacing

| Command          | Description              |
| ---------------- | ------------------------ |
| `:s/old/new/`    | Replace first on line    |
| `:s/old/new/g`   | Replace all on line      |
| `:%s/old/new/g`  | Replace all in file      |
| `:%s/old/new/gc` | Replace all with confirm |

## Global Commands

### Pattern Matching

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `:g/pattern/cmd` | Execute on matching lines     |
| `:v/pattern/cmd` | Execute on non-matching lines |

### Common Examples

| Command         | Description                     |
| --------------- | ------------------------------- |
| `:g/pattern/d`  | Delete lines containing pattern |
| `:g/^$/d`       | Delete empty lines              |
| `:g/pattern/t$` | Copy matching lines to end      |
| `:g/pattern/m$` | Move matching lines to end      |
| `:g/pattern/p`  | Print matching lines            |
| `:g/pattern/#`  | Print with line numbers         |

## File Operations

| Command         | Description           |
| --------------- | --------------------- |
| `:w`            | Save file             |
| `:w filename`   | Save as               |
| `:q`            | Quit                  |
| `:q!`           | Force quit            |
| `:wq`           | Save and quit         |
| `:x`            | Save and quit         |
| `:e filename`   | Open file             |
| `:r filename`   | Insert file contents  |
| `:sp filename`  | Horizontal split open |
| `:vsp filename` | Vertical split open   |

## Shell Commands

### Execute Commands

| Command      | Description            |
| ------------ | ---------------------- |
| `:!command`  | Run shell command      |
| `:r!command` | Insert command output  |
| `:%!command` | Filter through command |
| `:shell`     | Open shell             |

### Common Examples

| Command   | Description |
| --------- | ----------- |
| `:r!date` | Insert date |
| `:%!sort` | Sort lines  |
| `:%!jq .` | Format JSON |
| `:!wc %`  | Word count  |

## Visual Mode

### Visual Selection

| Command  | Description              |
| -------- | ------------------------ |
| `v`      | Character-wise selection |
| `V`      | Line-wise selection      |
| `Ctrl+v` | Block-wise selection     |
| `o`      | Go to other end          |
| `gv`     | Reselect last selection  |

### Operations on Selection

| Command | Description      |
| ------- | ---------------- |
| `d`     | Delete selection |
| `y`     | Copy selection   |
| `c`     | Change selection |
| `U`     | Uppercase        |
| `u`     | Lowercase        |
| `>`     | Indent right     |
| `<`     | Indent left      |
| `=`     | Auto-indent      |

## Folding

### Create & Toggle

| Command | Description |
| ------- | ----------- |
| `zf`    | Create fold |
| `za`    | Toggle fold |
| `zo`    | Open fold   |
| `zc`    | Close fold  |
| `zd`    | Delete fold |

### Fold Levels

| Command           | Description     |
| ----------------- | --------------- |
| `zR`              | Open all folds  |
| `zM`              | Close all folds |
| `zr`              | Open one level  |
| `zm`              | Close one level |
| `:set fdm=indent` | Fold on indent  |

## Buffers

| Command | Description      |
| ------- | ---------------- |
| `:ls`   | List buffers     |
| `:b N`  | Switch to buffer |
| `:bn`   | Next buffer      |
| `:bp`   | Previous buffer  |
| `:bd`   | Delete buffer    |

## Windows

### Window Splits

| Command    | Description      |
| ---------- | ---------------- |
| `:split`   | Split horizontal |
| `:vsplit`  | Split vertical   |
| `Ctrl+w s` | Split horizontal |
| `Ctrl+w v` | Split vertical   |

### Window Navigation

| Command    | Description             |
| ---------- | ----------------------- |
| `Ctrl+w w` | Switch windows          |
| `Ctrl+w h` | Move to left window     |
| `Ctrl+w j` | Move to bottom window   |
| `Ctrl+w k` | Move to top window      |
| `Ctrl+w l` | Move to right window    |
| `Ctrl+w c` | Close window            |
| `Ctrl+w o` | Close all other windows |
| `Ctrl+w =` | Equalize window sizes   |

### Window Resizing

| Command    | Description     |
| ---------- | --------------- |
| `Ctrl+w +` | Increase height |
| `Ctrl+w -` | Decrease height |
| `Ctrl+w >` | Increase width  |
| `Ctrl+w <` | Decrease width  |

## Advanced

### Marks

| Command       | Description             |
| ------------- | ----------------------- |
| `m[a-z]`      | Set local mark          |
| `m[A-Z]`      | Set global mark         |
| `'[mark]`     | Go to line of mark      |
| `` `[mark] `` | Go to exact position    |
| `''`          | Go to previous position |
| `'.`          | Go to last edit         |

### Macros

| Command  | Description       |
| -------- | ----------------- |
| `q[a-z]` | Record macro      |
| `q`      | Stop recording    |
| `@[a-z]` | Execute macro     |
| `@@`     | Repeat last macro |

### Repeat & Help

| Command       | Description         |
| ------------- | ------------------- |
| `.`           | Repeat last command |
| `:set nu`     | Show line numbers   |
| `:help [cmd]` | Get help            |

## Emergency

| Command  | Description           |
| -------- | --------------------- |
| `Esc`    | Return to normal mode |
| `Ctrl+c` | Return to normal mode |
| `:q!`    | Quit without saving   |
| `u`      | Undo mistake          |
| `:help`  | Get help              |

# Extra

---

#tech #vim #productivity #text-editor

## Basic Movement

- `h` - Move cursor left.
- `j` - Move cursor down.
- `k` - Move cursor up.
- `l` - Move cursor right.
- `0` - Move to the start of the line.
- `$` - Move to the end of the line.
- `G` - Move to the end of the file.
- `gg` - Move to the start of the file.
- `<C-g>` - Show cursor location and file status.
- `number G` - Move to a specific line number.

## Editing Commands

- `x` - Delete the character under the cursor.
- `dw` - Delete a word.
- `d$` - Delete to the end of the line.
- `dd` - Delete the entire line.
- `u` - Undo the last change.
- `U` - Undo all changes on the current line.
- `<C-r>` - Redo the last undone change.
- `p` - Paste text after the cursor.
- `P` - Paste text before the cursor.
- `r` - Replace the character under the cursor.
- `R` - Enter Replace mode (replace multiple characters).
- `ce` - Change text until the end of the word.
- `c$` - Change text until the end of the line.
- `o` - Open a new line below the cursor and enter Insert mode.
- `O` - Open a new line above the cursor and enter Insert mode.
- `a` - Append text after the cursor.
- `A` - Append text at the end of the line.
- `i` - Insert text before the cursor.
- `y` - Yank (copy) text.
- `yw` - Yank a word.
- `yy` - Yank a line.

## Search and Replace

- `/phrase` - Search forward.
- `?phrase` - Search backward/
- `n` - Repeat the last search in the same direction.
- `N` - Repeat the last search in the opposite direction.
- `%` - Move to the matching parenthesis, bracket, or brace.
- `:s/old/new/` - Substitute "new" for the first occurrence of "old" in the current line.
- `:s/old/new/g` - Substitute "new" for all occurrences of "old" in the current line.
- `:#,#s/old/new/g` - Substitute "new" for "old" between two line numbers.
- `:%s/old/new/g` - Substitute "new" for "old" in the entire file.
- `:%s/old/new/gc` - Substitute with confirmation for each occurrence.

## File Operations

- `:w` - Save the file.
- `:w FILENAME` - Save the file with a new name.
- `:q` - Quit Neovim.
- `:q!` - Quit Neovim without saving changes.
- `:wq` - Save and quit.
- `:r FILENAME` - Insert the contents of a file below the cursor.
- `:r !command` - Insert the output of a shell command below the cursor.
- `:!command` - Execute a shell command (e.g., `:!ls`).

## Visual Mode

- `v` - Start Visual mode (character-wise selection).
- `V` - Start Visual mode (line-wise selection).
- `y` - Yank (copy) the selected text.
- `d` - Delete the selected text.
- `:w FILENAME` - Save the selected lines to a file.

## Settings and Options

- `:set ic` - Ignore case in searches.
- `:set noic` - Disable ignore case in searches.
- `:set hls` - Highlight search matches.
- `:set is` - Enable incremental search.
- `:set invic` - Toggle ignore case.
- `:nohlsearch` - Remove search highlighting.

## Help and Completion

- `:help` - Open the help system.
- `:help TOPIC` - Get help on a specific topic.
- `<C-d>` - Show command completions.
- `<Tab>` - Use a completion.

## Miscellaneous

- `<Esc>` - Return to Normal mode.
- `<C-w><C-w>` - Switch between windows.
- `<C-o>` - Go back to the previous cursor position.
- `<C-i>` - Go forward to the next cursor position.

---

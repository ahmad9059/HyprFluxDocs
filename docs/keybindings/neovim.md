| Mode(s)                | Key(s)                  | Action / Command                                                     | Description               |
| ---------------------- | ----------------------- | -------------------------------------------------------------------- | ------------------------- |
| Normal                 | `;`                     | `:`                                                                  | Enter command mode        |
| Insert                 | `jk`                    | `<ESC>`                                                              | Exit insert mode          |
| Normal, Insert, Visual | `Ctrl + S`              | `<cmd> w <cr>`                                                       | Save file                 |
| Insert                 | `Alt + h`               | `<Left>`                                                             | Move left in insert mode  |
| Insert                 | `Alt + j`               | `<Down>`                                                             | Move down in insert mode  |
| Insert                 | `Alt + k`               | `<Up>`                                                               | Move up in insert mode    |
| Insert                 | `Alt + l`               | `<Right>`                                                            | Move right in insert mode |
| Normal                 | `Ctrl + A`              | `ggVG`                                                               | Select all                |
| Insert                 | `Ctrl + A`              | `<ESC>ggVG`                                                          | Select all in insert mode |
| Visual                 | `Ctrl + A`              | `<ESC>ggVG`                                                          | Select all in visual mode |
| Normal                 | `<leader>lg`            | `<cmd>LazyGit<CR>`                                                   | Open LazyGit              |
| Visual                 | `i`                     | `vi`                                                                 | Select inside ` {} `      |
| Visual                 | `a`                     | `va`                                                                 | Select around ` {} `      |
| Normal                 | `<leader>1`…`<leader>9` | Switch to buffer `1-9`                                               | Buffer navigation         |
| Normal, Terminal       | `Alt + i`               | `require("nvchad.term").toggle { pos="float", id="floatTerm", ... }` | Toggle floating terminal  |
| Normal                 | `Ctrl + h`              | `<cmd>TmuxNavigateLeft<CR>`                                          | Tmux navigate left        |
| Normal                 | `Ctrl + j`              | `<cmd>TmuxNavigateDown<CR>`                                          | Tmux navigate down        |
| Normal                 | `Ctrl + k`              | `<cmd>TmuxNavigateUp<CR>`                                            | Tmux navigate up          |
| Normal                 | `Ctrl + l`              | `<cmd>TmuxNavigateRight<CR>`                                         | Tmux navigate right       |
| Normal                 | `Ctrl + \`              | `<cmd>TmuxNavigatePrevious<CR>`                                      | Tmux navigate previous    |

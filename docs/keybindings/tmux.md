# Tmux Keybindings

## General & Prefix

| Keys / Combo      | Mode / Context  | Action                       |
| ----------------- | --------------- | ---------------------------- |
| **M-o**           | Global          | Tmux prefix key              |
| **r**             | Prefix required | Reload `~/.tmux.conf`        |
| **Mouse**         | Global          | Mouse support enabled        |
| **M-1** … **M-0** | Global          | Select window 1–10           |
| **M-u**           | Global          | Toggle zoom (resize-pane -Z) |
| **Prefix + :**    | Prefix required | Enter tmux command prompt    |
| **Prefix + ?**    | Prefix required | Show keybindings list        |
| **Prefix + d**    | Prefix required | Detach from current session  |
| **Prefix + (**)   | Prefix required | Previous session             |
| **Prefix + )**    | Prefix required | Next session                 |

## Window Management

| Keys / Combo   | Mode / Context  | Action                       |
| -------------- | --------------- | ---------------------------- |
| **Prefix + c** | Prefix required | Create new window            |
| **Prefix + ,** | Prefix required | Rename current window        |
| **Prefix + &** | Prefix required | Kill current window          |
| **Prefix + n** | Prefix required | Next window                  |
| **Prefix + p** | Prefix required | Previous window              |
| **Prefix + w** | Prefix required | List windows                 |
| **Prefix + f** | Prefix required | Find window by name          |
| **Prefix + .** | Prefix required | Move window to another index |

## Pane Management

| Keys / Combo          | Mode / Context  | Action                               |
| --------------------- | --------------- | ------------------------------------ |
| **\***                | Prefix required | Split window horizontally (20%)      |
| **"**                 | Prefix required | Split window vertically (20%)        |
| **Prefix + x**        | Prefix required | Kill pane                            |
| **Prefix + o**        | Prefix required | Switch to next pane                  |
| **Prefix + q**        | Prefix required | Show pane numbers (for quick select) |
| **Prefix + {**        | Prefix required | Swap pane with previous              |
| **Prefix + }**        | Prefix required | Swap pane with next                  |
| **Prefix + !**        | Prefix required | Break pane into new window           |
| **Prefix + Space**    | Prefix required | Cycle pane layouts                   |
| **Prefix + Alt+1..5** | Prefix required | Set specific pane layout             |

## Pane Navigation (Vim-style + Default)

| Keys / Combo | Mode / Context  | Action                                                |
| ------------ | --------------- | ----------------------------------------------------- |
| **l**        | Prefix required | Select left pane                                      |
| **j**        | Prefix required | Select pane below                                     |
| **k**        | Prefix required | Select pane above                                     |
| **h**        | Prefix required | Select right pane                                     |
| **C-h**      | Global (normal) | If in Vim → send `C-h`, else select left pane         |
| **C-j**      | Global (normal) | If in Vim → send `C-j`, else select pane below        |
| **C-k**      | Global (normal) | If in Vim → send `C-k`, else select pane above        |
| **C-l**      | Global (normal) | If in Vim → send `C-l`, else select right pane        |
| **C-\\**     | Global (normal) | If in Vim → send `C-\\`, else select last active pane |
| **C-h**      | Copy-mode (vi)  | Select left pane                                      |
| **C-j**      | Copy-mode (vi)  | Select pane below                                     |
| **C-k**      | Copy-mode (vi)  | Select pane above                                     |
| **C-l**      | Copy-mode (vi)  | Select right pane                                     |
| **C-\\**     | Copy-mode (vi)  | Select last active pane                               |

## Copy & Scroll Mode (vi keys enabled)

| Keys / Combo      | Mode / Context  | Action                            |
| ----------------- | --------------- | --------------------------------- |
| **Prefix + \[**   | Prefix required | Enter copy-mode                   |
| **Prefix + ]**    | Prefix required | Paste buffer                      |
| **h / j / k / l** | Copy-mode (vi)  | Move cursor left, down, up, right |
| **0 / \$**        | Copy-mode (vi)  | Jump to line start / end          |
| **w / e / b**     | Copy-mode (vi)  | Move by words                     |
| **Space**         | Copy-mode (vi)  | Start selection                   |
| **Enter**         | Copy-mode (vi)  | Copy selection                    |
| **q**             | Copy-mode (vi)  | Quit copy-mode                    |
| **PgUp / PgDn**   | Copy-mode       | Scroll page up/down               |

## Session & Server Management

| Keys / Combo                | Mode / Context  | Action                 |
| --------------------------- | --------------- | ---------------------- |
| **Prefix + s**              | Prefix required | List sessions          |
| **Prefix + \$**             | Prefix required | Rename current session |
| **Prefix + \:kill-session** | Command         | Kill current session   |
| **Prefix + \:kill-server**  | Command         | Kill tmux server       |

## Plugins & Extras

| Keys / Combo             | Mode / Context  | Action                                            |
| ------------------------ | --------------- | ------------------------------------------------- |
| **TPM (Prefix + I)**     | Prefix required | Install plugins                                   |
| **TPM (Prefix + U)**     | Prefix required | Update plugins                                    |
| **TPM (Prefix + Alt+u)** | Prefix required | Remove unused plugins                             |
| **Resurrect**            | Plugin          | Save/restore tmux session automatically           |
| **Dracula Theme**        | Plugin          | Powerline styled theme with weather, flags, icons |

# Dots Installation

Now After installing the archlinux follow the instruction below

## Run this magic one-liner

```bash
sh <(curl -fsSL https://hyprflux.dev/install)
```

This will start the installation. First, it will ask for your **sudo password**. Enter it when prompted.

![welcome](/welcome.png)

After entering your sudo password, you will be asked to select an **AUR Helper** (`yay` or `paru`).

I recommend using **yay**.

![yay-paru](/yay-paru.png)

Next, you will be asked to select the installation options.

---

## 🔧 Recommended Installation Options

**Essential Components (Recommended):**

- `input_group` — Add your user to the input group for some Waybar functionality
- `sddm` — Display manager for the login screen
- `sddm_theme` — Beautiful custom SDDM theme
- `gtk_themes` — GTK theme integration
- `bluetooth` — Bluetooth support
- `thunar` — File manager
- `xdph` — Desktop portal for Hyprland
- `zsh` — Enhanced shell with Oh My Zsh
- `dots` — Core dotfiles and configurations

**Optional Components:**

- `QuickShell` — QuickShell for desktop-like overview
- `Pokemon` — Add Pokémon color scripts to your terminal
- `Rog` — Pre-configured setup for ROG laptops

---

After selecting your options, just wait and watch the installation complete.

::: info
During the process, it may ask for your **sudo password** 2–3 times. Stay nearby to enter it when needed.
:::

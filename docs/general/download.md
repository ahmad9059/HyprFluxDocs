# Download HyprFlux

HyprFlux is available as both a **complete operating system** (ISO) and a **dotfiles distribution** for existing Arch installations.

## Download Links

| Source              | Link                                                                                                        | Notes                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ |
| **GitHub Releases** | [Download v1.0.0](https://github.com/ahmad9059/HyprFlux-ISO/releases/tag/1.0.0)                             | Primary release channel  |
| **Google Drive**    | [Download from Drive](https://drive.google.com/drive/folders/1ptOUoY4H7l4jT0jFcKoX9yxOKdc43m-_?usp=sharing) | Mirror for faster access |
| **SourceForge**     | [Download from SourceForge](https://sourceforge.net/projects/hyprflux/files/v1.0.0/)                        | Alternative mirror       |

### System Requirements

- **Architecture:** x86_64
- **Memory:** 4 GB minimum, 8 GB+ recommended
- **Storage:** 20 GB minimum free space
- **Network:** Active internet connection required
- **Boot Mode:** UEFI or Legacy BIOS

### Installation Steps

1. **Download the ISO** from one of the links above
2. **Create a bootable USB** using tools like:
   - [BalenaEtcher](https://www.balena.io/etcher/) (Linux/Windows/macOS)
   - [Rufus](https://rufus.ie/) (Windows)
   - `dd` command (Linux)
3. **Boot from USB** and select HyprFlux from the boot menu
4. **Follow the TUI installer** - it will guide you through:
   - Disk partitioning (Automatic or Manual)
   - Timezone and locale selection
   - User creation
   - Base system installation
   - HyprFlux configuration
5. **Reboot** into your new HyprFlux system

For detailed ISO installation instructions, see the [ISO Installation Guide](/general/iso-installation).

---

## Dotfiles Installation

If you already have Arch Linux installed and just want the HyprFlux configurations:

### Quick Install

```bash
sh <(curl -fsSL https://hyprflux.dev/install)
```

### What Gets Installed

- Hyprland window manager configuration
- Waybar with custom modules
- Rofi application launcher
- Kitty terminal configuration
- SDDM login theme
- GTK themes and icons
- Zsh with Oh My Zsh
- Neovim configuration (optional)
- And much more!

For detailed dotfiles installation, see the [Installation Guide](/general/installation).

---

## Which Should I Choose?

| Scenario                            | Recommended Path          |
| ----------------------------------- | ------------------------- |
| New computer or clean install       | **ISO Installation**      |
| Existing Arch Linux system          | **Dotfiles Installation** |
| Virtual machine testing             | **ISO Installation**      |
| Want full control over partitioning | **ISO Installation**      |
| Happy with current Arch setup       | **Dotfiles Installation** |

---

## Post-Installation

After installation (either ISO or dotfiles):

1. **Reboot** your system
2. **Log in** through SDDM (display manager)
3. **Complete first-boot setup** (automatic)
4. **Start using HyprFlux!**

Check the [Quick Start Guide](/general/quickstart) for tips on using your new HyprFlux desktop.

::: warning Important
The HyprFlux ISO is an **online installer**. An active internet connection is required during installation to download packages and configurations.
:::

::: tip Need Help?

- Visit our [GitHub Issues](https://github.com/ahmad9059/HyprFlux/issues) for support
- Check the [Documentation](/general/quickstart) for detailed guides
- Join the community discussions
  :::

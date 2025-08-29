import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from "vitepress-plugin-group-icons";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HyprFlux",
  description: "Elegance That Moves at Light Speed ⚡",
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
    config(md) {
      md.use(groupIconMdPlugin, {
        titleBar: { includeSnippet: true },
      });
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
      groupIconVitePlugin({
        customIcon: {
          // key here must match [bash] in your markdown
          sh: localIconLoader(import.meta.url, "../assets/bash.svg"),
        },
      }),
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "favicon.ico",
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "General",
        collapsed: false,
        items: [
          { text: "Showcase", link: "/general/showcase.md" },
          { text: "Quick Start", link: "/general/quickstart.md" },
          { text: "Installation", link: "/general/installation.md" },
        ],
      },
      {
        text: "Complete Installation (Arch Linux)",
        collapsed: false,
        items: [
          {
            text: "ArchLinux Installation",
            link: "/complete/arch.md",
          },
          { text: "HyprFlux Install", link: "/complete/hyprflux.md" },
        ],
      },
      {
        text: "KeyBindings",
        collapsed: false,
        items: [
          {
            text: "Hyprland",
            link: "/keybindings/hyprland.md",
          },
          { text: "NeoVim", link: "/keybindings/neovim.md" },
          { text: "Tmux", link: "/keybindings/tmux.md" },
        ],
      },
      {
        text: "Features",
        collapsed: false,
        items: [
          { text: "Index", link: "/features/index.md" },
          {
            text: "Hyprland",
            link: "/features/hyprland.md",
          },
          { text: "Hyprlock", link: "/features/hyprlock.md" },
          { text: "Waybar", link: "/features/waybar.md" },
          { text: "Rofi", link: "/features/rofi.md" },
          { text: "SwayNC", link: "/features/swaync.md" },
          { text: "Wlogout", link: "/features/wlogout.md" },
          { text: "Kitty", link: "/features/kitty.md" },
          { text: "QT Theming", link: "/features/qt-theming.md" },
          { text: "Neovim", link: "/features/nvim.md" },
          { text: "Cava", link: "/features/cava.md" },
        ],
      },
      {
        text: ".config/hypr",
        collapsed: false,
        items: [
          { text: "Index", link: "/hyprland/index.md" },
          {
            text: "hyprland.conf",
            link: "/hyprland/hyprland.md",
          },
          { text: "hyprlock.conf", link: "/hyprland/hyprlock.md" },
          { text: "hypridle.conf", link: "/hyprland/hypridle.md" },
          { text: "monitors.conf", link: "/hyprland/monitors.md" },
          { text: "workspaces.conf", link: "/hyprland/workspaces.md" },
          {
            text: "application-style.conf",
            link: "/hyprland/application-style.md",
          },
          {
            text: "01-UserDefaults.conf",
            link: "/hyprland/01-userdefaults.md",
          },
          { text: "ENVariables.conf", link: "/hyprland/envariables.md" },
          {
            text: "UserKeybindings.conf",
            link: "/hyprland/userkeybindings.md",
          },
          { text: "UserSettings.conf", link: "/hyprland/usersettings.md" },
          { text: "WindowRules.conf", link: "/hyprland/windowrules.md" },
          {
            text: "UserDecorations.conf",
            link: "/hyprland/userdecorations.md",
          },
          { text: "Startup_Apps.conf", link: "/hyprland/startup_apps.md" },
          { text: "keyBindings.conf", link: "/hyprland/keybinding.md" },
          { text: "hypr/scripts/", link: "/hyprland/scripts.md" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/ahmad9059/HyprFlux.git" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright:
        'Made with ❤️ by <a  target="_blank" href="https://github.com/ahmad9059">Ahmad Hassan</a>',
    },
  },
});

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
          { text: "Hyprlock", link: "/features/hyprland.md" },
          { text: "Waybar", link: "/features/waybar.md" },
          { text: "Rofi", link: "/features/rofi.md" },
          { text: "SwayNC", link: "/features/swaync.md" },
          { text: "Wlogout", link: "/features/wlogout.md" },
          { text: "Kitty", link: "/features/kitty.md" },
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

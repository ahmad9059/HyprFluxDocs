import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from "vitepress-plugin-group-icons";

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
      groupIconVitePlugin({
        customIcon: {
          // key here must match [bash] in your markdown
          bash: localIconLoader(import.meta.url, "../assets/bash.svg"),
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
          { text: "Quick Start", link: "/general/getting-started.md" },
          { text: "Installation", link: "/general/installation.md" },
          { text: "KeyBindings", link: "/general/keybindings.md" },
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
          { text: "HyprFlux Install", link: "/complete/hpyrflux.md" },
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
          {
            text: "Hyprland",
            link: "/installation/arch.md",
          },
          { text: "Hyprlock", link: "/api-examples" },
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

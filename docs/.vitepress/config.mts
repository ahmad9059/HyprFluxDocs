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
  titleTemplate: ":title | HyprFlux",
  description: "HyprFlux is a complete Arch Linux distribution featuring a beautiful, productive Hyprland desktop environment. Download the ISO or dotfiles.",
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", { rel: "preload", href: "/fav.avif", as: "image", type: "image/avif" }],
    ["meta", { name: "theme-color", content: "#0395cc" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],
    ["meta", { name: "author", content: "Ahmad Hassan" }],
    ["meta", { name: "keywords", content: "HyprFlux, Hyprland, Arch Linux, Linux Desktop, Wayland, Tiling Window Manager, Dotfiles, ISO" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "HyprFlux" }],
    ["meta", { property: "og:title", content: "HyprFlux - Beautiful Arch Linux Desktop" }],
    ["meta", { property: "og:description", content: "A complete Arch Linux distribution with a beautiful, productive Hyprland desktop environment. Download the ISO or dotfiles." }],
    ["meta", { property: "og:image", content: "https://hyprflux.org/og-image.png" }],
    ["meta", { property: "og:url", content: "https://hyprflux.org" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "HyprFlux - Beautiful Arch Linux Desktop" }],
    ["meta", { name: "twitter:description", content: "A complete Arch Linux distribution with a beautiful, productive Hyprland desktop environment." }],
    ["meta", { name: "twitter:image", content: "https://hyprflux.org/og-image.png" }],
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
  ],
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
          sh: localIconLoader(import.meta.url, "../assets/bash.svg"),
        },
      }),
    ],
    build: {
      minify: "terser",
      cssMinify: true,
      chunkSizeWarningLimit: 1000,
    },
  },
  sitemap: {
    hostname: "https://hyprflux.org",
  },
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "favicon.ico",
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/general/quickstart" },
      { text: "Notes", link: "/blog/" },
      {
        text: "Download",
        link: "/general/download",
        activeMatch: "^/general/download",
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "Quick Start", link: "/general/quickstart.md" },
          { text: "Showcase", link: "/general/showcase.md" },
        ],
      },
      {
        text: "ISO Installation",
        collapsed: false,
        items: [
          {
            text: "ISO Installation Guide",
            link: "/general/iso-installation.md",
          },
        ],
      },
      {
        text: "Dotfiles Installation",
        collapsed: false,
        items: [
          { text: "Dots Installation", link: "/complete/hyprflux.md" },
          {
            text: "Arch Linux Installation",
            link: "/complete/arch.md",
          },
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
          // { text: "Index", link: "/features/index.md" },
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
          // { text: "Index", link: "/hyprland/index.md" },
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
      {
        text: "Blog",
        collapsed: false,
        items: [
          { text: "Overview", link: "/blog/" },
          {
            text: "Release of HyprFlux",
            link: "/blog/release-of-hyprflux.md",
          },
          {
            text: "Inside the HyprFlux Desktop",
            link: "/blog/inside-the-hyprflux-desktop.md",
          },
          {
            text: "What Is Coming Next",
            link: "/blog/what-is-coming-next.md",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/ahmad9059/HyprFlux.git" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright:
        'Made with 🤍 by <a  target="_blank" href="https://github.com/ahmad9059">Ahmad Hassan</a>',
    },
  },
});

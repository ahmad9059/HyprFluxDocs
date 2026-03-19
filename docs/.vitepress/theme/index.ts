// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/mocha/blue.css";
import "virtual:group-icons.css";
import "./style.css";
import "./custom.css";
import { websiteSchema, softwareSchema, orgSchema } from "./structured-data";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {});
  },
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== "undefined") {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js").catch(() => {});
        });
      }
    }
  },
  setup() {
    if (typeof window !== "undefined") {
      const injectSchema = (schema: object) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      };
      
      injectSchema(websiteSchema);
      injectSchema(softwareSchema);
      injectSchema(orgSchema);
    }
  },
} satisfies Theme;

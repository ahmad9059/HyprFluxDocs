import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const source = process.env.HYPRFLUX_SOURCE
  ? path.resolve(root, process.env.HYPRFLUX_SOURCE)
  : path.resolve(root, "../HyprFlux");
const sourceRevision = "f421b6bd108214079b56c435331ddbbfdfb89591";
const errors = [];

const expectedRoutes = [
  "index.md",
  "blog/index.md",
  "blog/inside-the-hyprflux-desktop.md",
  "blog/release-v1.5.0.md",
  "blog/release-of-hyprflux.md",
  "blog/what-is-coming-next.md",
  "complete/arch.md",
  "complete/hyprflux.md",
  "features/cava.md",
  "features/hyprland.md",
  "features/hyprlock.md",
  "features/kitty.md",
  "features/nvim.md",
  "features/qt-theming.md",
  "features/rofi.md",
  "features/swaync.md",
  "features/wallpapers.md",
  "features/waybar.md",
  "features/wlogout.md",
  "features/yazi.md",
  "general/download.md",
  "general/hardware.md",
  "general/installation.md",
  "general/iso-installation.md",
  "general/quickstart.md",
  "general/showcase.md",
  "general/troubleshooting.md",
  "hyprland/01-userdefaults.md",
  "hyprland/animation.md",
  "hyprland/application-style.md",
  "hyprland/envariables.md",
  "hyprland/hypridle.md",
  "hyprland/hyprland.md",
  "hyprland/hyprlock.md",
  "hyprland/index.md",
  "hyprland/keybinding.md",
  "hyprland/monitors.md",
  "hyprland/scripts.md",
  "hyprland/startup_apps.md",
  "hyprland/userdecorations.md",
  "hyprland/userkeybindings.md",
  "hyprland/usersettings.md",
  "hyprland/windowrules.md",
  "hyprland/workspaces.md",
  "keybindings/hyprland.md",
  "keybindings/neovim.md",
  "keybindings/tmux.md",
];

for (const route of expectedRoutes) {
  if (!existsSync(path.join(docs, route))) errors.push(`Missing public route: /${route.replace(/(?:index)?\.md$/, "")}`);
}

for (const asset of ["fav.webp", "favicon.ico", "logo.webp"]) {
  if (!existsSync(path.join(docs, "public", asset))) errors.push(`Missing shared public asset: /${asset}`);
}

const contentRules = [
  ["general/installation.md", /https:\/\/hyprflux\.dev\/install/, "current install endpoint"],
  ["general/download.md", /HyprFlux\/releases\/latest/, "canonical release channel"],
  ["hyprland/index.md", /hyprland\.lua/, "Lua compositor entrypoint"],
  ["features/wallpapers.md", /AWWW/, "current wallpaper engine"],
  ["blog/release-v1.5.0.md", /releases\/tag\/v1\.5\.0/, "official v1.5.0 release link"],
  ["blog/release-of-hyprflux.md", /Archived release note/, "archive notice"],
  ["blog/inside-the-hyprflux-desktop.md", /Archived article/, "archive notice"],
  ["blog/what-is-coming-next.md", /Archived roadmap/, "archive notice"],
];

for (const [file, pattern, description] of contentRules) {
  const content = await readFile(path.join(docs, file), "utf8");
  if (!pattern.test(content)) errors.push(`${file} is missing its ${description}`);
}

const canonicalFiles = [
  "docs/.vitepress/config.mts",
  "docs/.vitepress/theme/structured-data.ts",
  "docs/public/robots.txt",
  "docs/public/llms.txt",
];
for (const file of canonicalFiles) {
  const content = await readFile(path.join(root, file), "utf8");
  if (content.includes("hyprflux.org")) errors.push(`${file} still uses hyprflux.org`);
}

const keybindings = await readFile(path.join(docs, "keybindings/hyprland.md"), "utf8");
for (const staleToken of ["spotify-launcher", "wasistlos", "Kool_Quick_Settings", "WaybarLayout.sh", "WaybarStyles.sh"]) {
  if (keybindings.includes(staleToken)) errors.push(`keybindings/hyprland.md contains removed token: ${staleToken}`);
}

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(entryPath));
    else if (entry.name.endsWith(".md")) files.push(entryPath);
  }
  return files;
}

for (const file of await markdownFiles(docs)) {
  const content = await readFile(file, "utf8");
  const assetReferences = [
    ...content.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g),
    ...content.matchAll(/<(?:img|source)\b[^>]*\bsrc=["']([^"']+)["']/gi),
  ].map((match) => match[1]);

  for (const reference of assetReferences) {
    if (/^(?:https?:|data:)/.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    const assetPath = cleanReference.startsWith("/")
      ? path.join(docs, "public", cleanReference)
      : path.resolve(path.dirname(file), cleanReference);
    if (!existsSync(assetPath)) errors.push(`${path.relative(root, file)} references missing asset: ${reference}`);
  }
}

if (existsSync(source)) {
  for (const ownerFile of [
    "install.sh",
    "modules/02-dotfiles.sh",
    ".config/hypr/hyprland.lua",
    ".config/hypr/UserConfigs/user-keybinds.lua",
    ".config/hypr/UserConfigs/startup-apps.lua",
    ".config/hypr/scripts",
  ]) {
    if (!existsSync(path.join(source, ownerFile))) errors.push(`HyprFlux source is missing owner path: ${ownerFile}`);
  }

  try {
    const currentRevision = execFileSync("git", ["rev-parse", "HEAD"], { cwd: source, encoding: "utf8" }).trim();
    if (currentRevision !== sourceRevision) {
      errors.push(`HyprFlux source moved from ${sourceRevision} to ${currentRevision}; review documentation drift`);
    }
  } catch {
    errors.push("HyprFlux source exists but its Git revision could not be read");
  }
} else {
  console.log(`Skipping source-owner checks: ${path.relative(root, source)} is not available.`);
}

if (errors.length > 0) {
  console.error("Documentation checks failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Documentation checks passed for ${expectedRoutes.length} public routes.`);
}

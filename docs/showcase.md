# Demo Video

---

<video controls >
  <source src="./video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

```sh [bun]
echo -e "${ACTION} Removing old config folders from ~/.config that are in ${REPO_DIR}...${RESET}"
if [ -d "$REPO_DIR/.config" ]; then
  for folder in "$REPO_DIR/.config/"*; do
    folder_name=$(basename "$folder")
    if [ -d "$HOME/.config/$folder_name" ]; then
      rm -rf "$HOME/.config/$folder_name" &>>"$LOG_FILE"
    fi
  done
  echo -e "${OK} Old config folders removed successfully.${RESET}"
else
  echo -e "${WARN} No .config folder found in ${REPO_DIR}, skipping removal.${RESET}"
fi

```

```tsx [theme/config.tsx]
export default defineConfig({
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin, {
        titleBar: { includeSnippet: true },
      });
    },
  },
});
```

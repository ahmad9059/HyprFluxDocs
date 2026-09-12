# Phase 1 — Tutorial and Onboarding How-To

Depends on: Master plan §2–3 decisions (approved)

Status: **Outline drafted; awaiting approval to write full content.**

---

## 1. Goal

Fill the site's Tutorial gap and tighten its onboarding How-to guides,
without changing any route or previously verified technical fact. At the end
of this phase, a newcomer has one narrated lesson to follow (`quickstart.md`)
and a set of clearly-scoped How-to guides to consult for anything the lesson
doesn't cover.

## 2. Scope

### In scope
- `docs/general/quickstart.md` — rewritten as the site's Tutorial.
- `docs/general/download.md` — restructured as a How-to (prose sections only;
  the hero/slider/download-card HTML is left as presentation, not touched).
- `docs/general/iso-installation.md` — restructured as a complete How-to
  procedure (both automatic and manual partitioning kept in full).
- `docs/general/installation.md` — restructured as a How-to with an explicit
  goal statement and a verification step.
- `docs/general/troubleshooting.md` — light-touch: explicit intro, clearer
  Diagnose/Fix labeling per symptom, no command or fact changes.
- `docs/complete/arch.md` — light-touch: explicit goal line.
- `docs/complete/hyprflux.md` — unchanged; already a correct thin redirect.

### Out of scope
- Any `hyprland/*.md`, `keybindings/*.md`, or `features/*.md` page (Phases
  2–4).
- `docs/.vitepress/config.mts` sidebar labels (Phase 5).
- Any new technical claim not already present in the current pages.

## 3. Detailed Page Outlines

### `general/quickstart.md` → Tutorial: "Install HyprFlux for the First Time"

A single narrated lesson using only the ISO path with automatic
partitioning — the true zero-to-desktop journey. Manual partitioning and
existing-Arch provisioning are explicitly deferred to How-to guides, not
covered here.

1. **What you'll do** — one-paragraph outcome statement: a booted HyprFlux
   desktop by the end.
2. **Already have Arch installed?** — one-line pointer to the existing-Arch
   How-to, so that audience isn't forced through this lesson.
3. **Before you start** — brief requirements recap (link to the ISO How-to
   for the full list), one-line disk-wipe warning.
4. **Step 1: Download and verify the ISO** — link to the download How-to,
   show the one verify command inline.
5. **Step 2: Write it to a USB drive** — the `dd` command, one safety
   callout.
6. **Step 3: Boot the ISO** — what happens (network check → welcome →
   regional settings → hostname/user → disk method).
7. **Step 4: Let the installer finish** — set expectations (Arch install,
   then HyprFlux provisioning, single reboot).
8. **Step 5: First login** — SDDM sign-in, what the first-login fixup does.
9. **You're done** — recap of what now exists on the system.
10. **Next steps** — keybindings, features, existing-Arch path (for next
    time), troubleshooting.

### `general/download.md` → How-to: "Download and Verify the HyprFlux ISO"

Presentation HTML (hero, slider, download cards) unchanged. Prose sections
restructured:
1. **Goal** (one line: get a verified ISO file)
2. **Download** (existing cards, unchanged)
3. **Verify the checksum** (existing content, tightened)
4. **If you're installing on existing Arch instead** (pointer, not a repeat)
5. **Next step** (link to the ISO installation How-to)

### `general/iso-installation.md` → How-to: "Install HyprFlux from the ISO (Complete Procedure)"

Same content as today, restructured with explicit framing:
- **Goal**
- **Prerequisites** (requirements list, unchanged)
- **Steps** (download/verify → create USB → boot → installation flow,
  covering both automatic *and* manual partitioning in full → first login)
- **Verify** (confirming a successful install / first login checks)
- **If something goes wrong** (logs and recovery section, unchanged content)

### `general/installation.md` → How-to: "Provision HyprFlux on an Existing Arch System"

Already close to the right shape. Add:
- An explicit **Goal** line at the top.
- A short **Verify installation** micro-section before "After Installation."
Otherwise keep the existing structure (Requirements → Before You Install →
Run the Installer → What Happens → Configuration Ownership → After
Installation → If Installation Reports a Failure → ISO or Existing Arch
comparison).

### `general/troubleshooting.md` → How-to (light touch)

- Add a one-line "how to use this page" intro.
- Within each symptom section, make the existing Diagnose → Fix → Escalate
  shape visually explicit with bold micro-labels, without changing any
  command or claim.

### `complete/arch.md` → How-to (light touch)

- Add an explicit **Goal** line under the title.
- Otherwise unchanged.

### `complete/hyprflux.md` → unchanged

Already a correct, minimal How-to redirect stub.

## 4. Files Touched

- `docs/general/quickstart.md`
- `docs/general/download.md`
- `docs/general/iso-installation.md`
- `docs/general/installation.md`
- `docs/general/troubleshooting.md`
- `docs/complete/arch.md`

## 5. Acceptance Criteria / QA Checklist

- [ ] `quickstart.md` reads as a single narrated lesson with one golden path,
      not a path-selector hub.
- [ ] No technical claim, command, or fact in any touched page differs from
      what is currently documented.
- [ ] Every touched How-to page has an explicit, scannable Goal statement.
- [ ] `iso-installation.md` and `installation.md` still fully cover manual
      partitioning and existing-Arch provisioning respectively (nothing was
      dropped when the Tutorial was extracted).
- [ ] All internal links between these seven pages still resolve.
- [ ] `pnpm docs:check` passes.
- [ ] The production VitePress build succeeds.
- [ ] `git diff --check` is clean.

## 6. Open Questions

- None outstanding — this outline reflects the approach already confirmed
  with the maintainer. Proceeding to full content on approval of this file.

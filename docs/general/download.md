---
title: Download the HyprFlux ISO
description: Download and verify the latest HyprFlux ISO from the canonical release channel or an approved mirror.
pageClass: download-page
sidebar: false
aside: false
---

<div class="download-hero">
  <h1>Download HyprFlux</h1>
  <p class="download-subtitle">Download the bootable ISO for a new installation, or use the installer guide for an existing Arch system</p>
</div>

<div class="slider-container">
  <div class="slider-wrapper" id="slider-wrapper">
    <div class="slider-track">
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/1.avif" type="image/avif">
          <img src="/showcase/1.webp" alt="HyprFlux desktop screenshot" loading="eager" fetchpriority="high" onload="document.getElementById('slider-wrapper').classList.add('loaded')" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/2.avif" type="image/avif">
          <img src="/showcase/2.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/3.avif" type="image/avif">
          <img src="/showcase/3.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/4.avif" type="image/avif">
          <img src="/showcase/4.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/5.avif" type="image/avif">
          <img src="/showcase/5.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/6.avif" type="image/avif">
          <img src="/showcase/6.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/8.avif" type="image/avif">
          <img src="/showcase/8.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/9.avif" type="image/avif">
          <img src="/showcase/9.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
      <div class="slider-slide">
        <picture>
          <source srcset="/showcase/10.avif" type="image/avif">
          <img src="/showcase/10.webp" alt="HyprFlux desktop screenshot" loading="lazy" />
        </picture>
      </div>
    </div>
  </div>
</div>

## Download Links

<div class="download-cards">
  <div class="download-card">
    <span class="download-card-label">Primary</span>
    <h3>GitHub Releases</h3>
    <p>Official release channel with version history</p>
    <a href="https://github.com/ahmad9059/HyprFlux/releases/latest" target="_blank" rel="noreferrer" class="download-btn">
      Latest release
    </a>
  </div>

  <div class="download-card">
    <span class="download-card-label">Mirror</span>
    <h3>Google Drive</h3>
    <p>Mirror folder for alternative access</p>
    <a href="https://drive.google.com/drive/folders/1ptOUoY4H7l4jT0jFcKoX9yxOKdc43m-_?usp=sharing" target="_blank" rel="noreferrer" class="download-btn">
      Open mirror folder
    </a>
  </div>

  <div class="download-card">
    <span class="download-card-label">Mirror</span>
    <h3>SourceForge</h3>
    <p>Latest ISO from the SourceForge mirror</p>
    <a href="https://sourceforge.net/projects/hyprflux/files/latest/download" target="_blank" rel="noreferrer" class="download-btn">
      Download latest mirror
    </a>
  </div>
</div>

::: warning Important
The HyprFlux ISO is an **online installer**. An active internet connection is required during installation to download packages and configurations.
:::

## Verify the Download

Download the `.iso` and its matching `.sha256` file from the **same release
channel**, place them in the same directory, and run:

```bash
sha256sum -c hyprflux-*.iso.sha256
```

Continue only when the command reports `OK`. A checksum from a different
release or mirror does not verify your ISO.

## Installing on Existing Arch?

You do not need the ISO. Follow the
[existing Arch installation guide](/general/installation) to run the full
HyprFlux provisioner on an installed Arch Linux system.

::: tip Need Help?

- Visit our [GitHub Issues](https://github.com/ahmad9059/HyprFlux/issues) for support
- Check [Getting Started](/general/quickstart) to choose an installation path
- See the [ISO Installation Guide](/general/iso-installation) for step-by-step instructions
  :::

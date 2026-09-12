const canonicalOrigin = "https://hyprflux.dev";

// Structured Data for SEO - JSON-LD Schemas

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HyprFlux",
  url: canonicalOrigin,
  description: "An Arch Linux desktop platform built around Hyprland, available as a bootable ISO or a full provisioner for existing Arch systems",
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HyprFlux",
  operatingSystem: "Linux",
  applicationCategory: "DesktopEnvironment",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  description: "An Arch Linux desktop platform built around Hyprland, available as a bootable ISO or an existing-system provisioner",
  author: {
    "@type": "Person",
    name: "Ahmad Hassan",
    url: "https://github.com/ahmad9059"
  },
  downloadUrl: `${canonicalOrigin}/general/download`,
  softwareVersion: "1.5.0"
};

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HyprFlux",
  url: canonicalOrigin,
  logo: `${canonicalOrigin}/logo.webp`,
  sameAs: [
    "https://github.com/ahmad9059/HyprFlux"
  ]
};

export const breadcrumbSchema = (items: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${canonicalOrigin}${item.url}`
  }))
});

export const articleSchema = (title: string, description: string, datePublished: string, dateModified?: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description: description,
  author: {
    "@type": "Person",
    name: "Ahmad Hassan"
  },
  publisher: {
    "@type": "Organization",
    name: "HyprFlux",
    logo: {
      "@type": "ImageObject",
      url: `${canonicalOrigin}/logo.webp`
    }
  },
  datePublished: datePublished,
  dateModified: dateModified || datePublished
});

export const howToSchema = (name: string, steps: Array<{text: string; name: string}>) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: name,
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text
  }))
});

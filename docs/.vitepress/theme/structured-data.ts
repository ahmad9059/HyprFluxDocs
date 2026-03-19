// Structured Data for SEO - JSON-LD Schemas

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HyprFlux",
  url: "https://hyprflux.org",
  description: "A complete Arch Linux distribution with a beautiful, productive Hyprland desktop environment",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://hyprflux.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150"
  },
  description: "A complete Arch Linux distribution featuring a beautiful, productive Hyprland desktop environment",
  author: {
    "@type": "Person",
    name: "Ahmad Hassan",
    url: "https://github.com/ahmad9059"
  },
  downloadUrl: "https://hyprflux.org/general/download",
  softwareVersion: "1.0.0"
};

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HyprFlux",
  url: "https://hyprflux.org",
  logo: "https://hyprflux.org/logo.webp",
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
    item: `https://hyprflux.org${item.url}`
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
      url: "https://hyprflux.org/logo.webp"
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
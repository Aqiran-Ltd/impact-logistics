/**
 * Real photography from Unsplash (free license, verified individually — not Unsplash+
 * premium). Centralized here so every hotlinked URL has one place to audit or swap out,
 * e.g. once real facility/fleet photography exists to replace it.
 */
export interface StockImage {
  src: string
  alt: string
}

export const heroDeliveryImage: StockImage = {
  src: 'https://images.unsplash.com/photo-1774456566981-8daf9252befb?q=80&w=900&auto=format&fit=crop',
  alt: 'Medical supplies organized in a tray, ready for pickup',
}

export const servicesHeroImage: StockImage = {
  src: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1600&auto=format&fit=crop',
  alt: 'Freight truck on the road, mid-route',
}

export const platformHeroImage: StockImage = {
  src: 'https://images.unsplash.com/photo-1669101602104-bfa264a17cce?q=80&w=1600&auto=format&fit=crop',
  alt: 'Hand holding a tablet, scanning a barcode in a clinical setting',
}

export const complianceHeroImage: StockImage = {
  src: 'https://images.unsplash.com/photo-1642188537432-41c8a331ebdb?q=80&w=1600&auto=format&fit=crop',
  alt: 'Clipboard with a completed checklist on a desk',
}

export const aboutHeroImage: StockImage = {
  src: 'https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?q=80&w=1600&auto=format&fit=crop',
  alt: 'Two team members walking through a warehouse aisle, one holding a clipboard',
}

export const contactHeroImage: StockImage = {
  src: 'https://images.unsplash.com/photo-1706169582307-8ae586631e8a?q=80&w=1600&auto=format&fit=crop',
  alt: 'A minimal office desk with a phone, keyboard, and mouse',
}

export const pricingHeroImage: StockImage = {
  src: 'https://images.unsplash.com/photo-1725258080098-727051947997?q=80&w=1600&auto=format&fit=crop',
  alt: 'A calculator resting on a stack of banknotes and receipts',
}

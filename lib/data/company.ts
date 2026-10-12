export interface CompanySettings {
  name: string;
  tagline: string;
  legalName: string;
  businessType: string;
  whatsappNumber: string; // e.g. 628123456789 (format numeric without + or dashes for wa.me)
  whatsappDisplay: string;
  email: string;
  officeAddress?: string;
  operationalHours?: string;
  instagramUrl?: string;
  marketplaceUrl?: string;
  catalogDownloadUrl?: string;
}

export const COMPANY_CONFIG: CompanySettings = {
  name: 'PT Prima Dekorasi Group',
  legalName: 'PT PRIMA DEKORASI GROUP',
  tagline: 'Manufaktur Konveksi & Supplier Perlengkapan Event, Hospitality, dan Tenda B2B',
  businessType: 'Manufaktur & Supplier B2B',
  whatsappNumber: '6281234567890', // Configurable official contact
  whatsappDisplay: '+62 812-3456-7890',
  email: 'kontak@primadekorasi.co.id',
  operationalHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
  // Verified business location note
  officeAddress: 'Pusat Produksi & Workshop Manufaktur Tekstil Event Indonesia',
};

export function buildWhatsAppUrl(message: string, overrideNumber?: string): string {
  const number = overrideNumber || COMPANY_CONFIG.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://game-lobby-kappa.vercel.app/api';
export const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL ?? 'https://cdn-dev.gladiatorgames.io/lobby';
export const CLIENT_AREA_URL = import.meta.env.VITE_CLIENT_AREA_URL ?? 'https://cdn-dev.gladiatorgames.io/lobby';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/gladiatorstudio',
  linkedin: 'https://linkedin.com/company/gladiator-studio',
  instagram: 'https://instagram.com/gladiatorstudio',
  youtube: 'https://youtube.com/@gladiatorstudio',
  github: 'https://github.com/gladiator-studio',
  website: 'https://gladiatorstudios.co.uk',
} as const;

export const CONTACT = {
  email: 'cwang@metawin.inc',
  phone: '+44 7737 244081',
  location: 'London, UK',
  hours: 'Monday - Friday, 9:00 AM - 6:00 PM GMT',
} as const;

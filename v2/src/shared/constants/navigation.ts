import { Home, Gamepad2, Info, Briefcase, Mail } from 'lucide-react';
import type { ComponentType } from 'react';

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Games', href: '#games', icon: Gamepad2 },
  { label: 'About', href: '#about', icon: Info },
  { label: 'Careers', href: '#careers', icon: Briefcase },
  { label: 'Contact', href: '#contact', icon: Mail },
] as const;

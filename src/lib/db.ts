export type ProjectStatus = 'Active' | 'In Development' | 'Planned';

export interface Project {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  status: ProjectStatus;
  domain?: string;
  subdomain?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EcosystemItem {
  id: string;
  layer: 'Infrastructure' | 'Intelligence' | 'Governance' | 'Commerce' | 'Finance';
  name: string;
  description: string;
  domain?: string;
}

export interface Section {
  id: string;
  type: string;
  title: string;
  description: string;
  data: Record<string, any>;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  sections: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Read' | 'Archived';
}

let projects: Project[] = [
  { 
    id: 'p1', 
    name: 'Nexus Trade Engine', 
    category: 'Core', 
    type: 'Platform',
    description: 'High-performance trade execution and settlement infrastructure for global logistics.', 
    status: 'Active',
    domain: 'baalvion.nexus',
    subdomain: 'trade',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p2', 
    name: 'Intel-V3 Risk Matrix', 
    category: 'Industrial', 
    type: 'AI',
    description: 'Advanced predictive analytics engine for assessing global supply chain volatility.', 
    status: 'In Development',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p3', 
    name: 'Lex Ledger', 
    category: 'Governance', 
    type: 'Compliance',
    description: 'Automated legal compliance mapping for 180+ international jurisdictions.', 
    status: 'Planned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p4', 
    name: 'Nexus Settlement', 
    category: 'Core', 
    type: 'Finance',
    description: 'Multi-currency digital settlement layer for seamless cross-border payments.', 
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let sections: Section[] = [
  { 
    id: 'sec-hero-home', 
    type: 'hero', 
    title: 'Building the Infrastructure Layer for Global Trade', 
    description: 'Baalvion Nexus connects businesses, finance, compliance, and intelligence systems into a unified global execution engine.',
    data: { ctaPrimary: 'Explore Platform', ctaSecondary: 'Schedule Briefing', label: 'Infrastructure 2.0' }
  },
  {
    id: 'sec-problem-home',
    type: 'problem',
    title: 'Solving the inefficiencies of siloed trade systems.',
    description: 'The current global trade landscape is fragmented, reliant on legacy protocols that hinder speed and transparency.',
    data: {
      points: [
        { title: "Legacy Protocols", desc: "Outdated paperwork slows down global execution." },
        { title: "Regulatory Friction", desc: "Complex laws create high entry barriers." },
        { title: "Disconnected Data", desc: "Siloed intel leads to high-risk logistics gaps." }
      ]
    }
  },
  {
    id: 'sec-hero-company',
    type: 'hero-simple',
    title: 'Unified Global Trade',
    description: 'We are architecting the foundational layer for the next century of international commerce.',
    data: { label: 'The Vision' }
  },
  {
    id: 'sec-hero-platform',
    type: 'hero-simple',
    title: 'Nexus Core',
    description: 'The high-speed execution layer for global enterprise logistics and financial settlement.',
    data: { label: 'Technology', features: [
      { title: 'Unified Ledger', desc: 'Single source of truth for all trade events.' },
      { title: 'Autonomous AI', desc: 'Real-time compliance and risk assessment.' },
      { title: 'Digital Settlement', desc: 'Instant multi-currency financial clearing.' }
    ]}
  },
  {
    id: 'sec-hero-trust',
    type: 'hero-simple',
    title: 'Built on Unwavering Trust',
    description: 'Security, transparency, and international law are at the core of the Baalvion Nexus infrastructure.',
    data: { label: 'Governance & Compliance' }
  }
];

let pages: Page[] = [
  { id: 'pg-home', slug: 'home', title: 'Baalvion Nexus | Global Trade Infrastructure', sections: ['sec-hero-home', 'sec-problem-home'] },
  { id: 'pg-company', slug: 'company', title: 'Company | Baalvion', sections: ['sec-hero-company'] },
  { id: 'pg-platform', slug: 'platform', title: 'Platform | Nexus Core', sections: ['sec-hero-platform'] },
  { id: 'pg-trust', slug: 'trust', title: 'Trust & Compliance | Baalvion', sections: ['sec-hero-trust'] }
];

let ecosystem: EcosystemItem[] = [
  { id: 'eco-1', layer: 'Infrastructure', name: 'Nexus Bedrock', description: 'The fundamental connectivity layer for global commerce networks.', domain: 'infra.baalvion.nexus' },
  { id: 'eco-2', layer: 'Intelligence', name: 'Baalvion Insight', description: 'Real-time global trade intelligence and predictive analytics.', domain: 'intel.baalvion.nexus' },
  { id: 'eco-3', layer: 'Governance', name: 'LexNetwork', description: 'Unified legal and compliance protocol across borders.', domain: 'legal.baalvion.nexus' },
  { id: 'eco-4', layer: 'Commerce', name: 'TradeFlow', description: 'Standardized operational execution for enterprise logistics.', domain: 'flow.baalvion.nexus' },
  { id: 'eco-5', layer: 'Finance', name: 'Settlement Core', description: 'Next-gen settlement infrastructure for trade finance.', domain: 'finance.baalvion.nexus' }
];

let inquiries: Inquiry[] = [];

export const db = {
  projects: {
    getAll: () => projects,
    add: (p: any) => {
      const newP = { ...p, id: `p-${Math.random().toString(36).substring(2, 7)}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      projects.push(newP);
      return newP;
    },
    update: (id: string, p: any) => {
      projects = projects.map(item => item.id === id ? { ...item, ...p, updatedAt: new Date().toISOString() } : item);
      return projects.find(item => item.id === id);
    },
    delete: (id: string) => { projects = projects.filter(p => p.id !== id); }
  },
  pages: {
    getAll: () => pages,
    getBySlug: (slug: string, populate: boolean = false) => {
      const page = pages.find(p => p.slug === slug);
      if (!page) return null;
      if (populate) {
        return {
          ...page,
          sectionData: page.sections.map(sid => sections.find(s => s.id === sid)).filter(Boolean)
        };
      }
      return page;
    },
    update: (id: string, p: Partial<Page>) => {
      pages = pages.map(item => item.id === id ? { ...item, ...p } : item);
    }
  },
  sections: {
    getAll: () => sections,
    update: (id: string, s: Partial<Section>) => {
      sections = sections.map(item => item.id === id ? { ...item, ...s } : item);
      return sections.find(item => item.id === id);
    }
  },
  ecosystem: {
    getAll: () => ecosystem,
    add: (e: any) => {
      const newE = { ...e, id: `eco-${Math.random().toString(36).substring(2, 7)}` };
      ecosystem.push(newE);
      return newE;
    },
    update: (id: string, e: any) => {
      ecosystem = ecosystem.map(item => item.id === id ? { ...item, ...e } : item);
      return ecosystem.find(item => item.id === id);
    },
    delete: (id: string) => { ecosystem = ecosystem.filter(e => e.id !== id); }
  },
  inquiries: {
    getAll: () => inquiries,
    add: (i: any) => {
      const newI: Inquiry = { ...i, id: `inq-${Math.random().toString(36).substring(2, 7)}`, createdAt: new Date().toISOString(), status: 'New' };
      inquiries.push(newI);
      return newI;
    },
    updateStatus: (id: string, status: Inquiry['status']) => {
      inquiries = inquiries.map(item => item.id === id ? { ...item, status } : item);
    }
  }
};
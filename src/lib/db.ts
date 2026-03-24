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
  isFeatured: boolean;
  priority: number;
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
    type: 'Execution Platform',
    description: 'High-performance proprietary trade execution and settlement infrastructure designed for ultra-low latency global logistics and financial clearing.', 
    status: 'Active',
    isFeatured: true,
    priority: 1,
    domain: 'baalvion.nexus',
    subdomain: 'trade',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p2', 
    name: 'Intel-V3 Risk Matrix', 
    category: 'Industrial', 
    type: 'Compliance AI',
    description: 'Advanced predictive analytics engine utilizing multi-layer neural networks to assess global supply chain volatility and regulatory shifts in real-time.', 
    status: 'In Development',
    isFeatured: true,
    priority: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p3', 
    name: 'Lex Ledger', 
    category: 'Governance', 
    type: 'Legal Infrastructure',
    description: 'Automated legal compliance mapping protocol providing immutable audit trails and regulatory alignment across 180+ international jurisdictions.', 
    status: 'Planned',
    isFeatured: false,
    priority: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p4', 
    name: 'Settlement Node 01', 
    category: 'Core', 
    type: 'Finance Protocol',
    description: 'Multi-currency digital settlement layer architected for seamless cross-border value transfer and automated trade finance liquidity.', 
    status: 'Active',
    isFeatured: true,
    priority: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let sections: Section[] = [
  { 
    id: 'sec-hero-home', 
    type: 'hero', 
    title: 'Building the Infrastructure Layer for Global Trade', 
    description: 'Baalvion Nexus integrates businesses, finance, compliance, and intelligence systems into a unified global execution engine for the next century of commerce.',
    data: { ctaPrimary: 'Explore Platform', ctaSecondary: 'Partner With Us', label: 'Infrastructure 2.0' }
  },
  {
    id: 'sec-problem-home',
    type: 'problem',
    title: 'Resolving terminal fragmentation in global commerce.',
    description: 'The current global trade landscape is a patchwork of legacy systems, creating friction that hinders growth and increases systemic risk.',
    data: {
      points: [
        { title: "Manual Fragmentation", desc: "Disconnected systems lead to data silos and execution delays." },
        { title: "Compliance Opacity", desc: "Complex jurisdictional laws create high regulatory friction." },
        { title: "Financial Inefficiency", desc: "Legacy clearing systems slow down global value transfer." }
      ]
    }
  },
  {
    id: 'sec-solution-home',
    type: 'solution',
    title: 'A Unified Operating System for Global Markets.',
    description: 'Baalvion Nexus resolves fragmentation by architecting a single, interoperable layer where trade, finance, and law converge.',
    data: {
      features: [
        { title: "Standardized Protocols", desc: "Unified data formats for seamless cross-border interoperability." },
        { title: "Autonomous Compliance", desc: "AI-driven legal mapping integrated directly into the trade flow." },
        { title: "Instant Settlement", desc: "Real-time financial clearing using high-speed digital nodes." }
      ]
    }
  },
  {
    id: 'sec-trust-home',
    type: 'trust',
    title: 'Enterprise-Grade Governance',
    description: 'Our architecture is built on the highest global standards of security and transparency.',
    data: {
      metrics: [
        { label: "Global Reach", value: "180+ Jurisdictions" },
        { label: "Security Standard", value: "AES-256 / Zero-Knowledge" },
        { label: "Compliance", value: "Real-Time AI Mapping" }
      ]
    }
  },
  {
    id: 'sec-cta-home',
    type: 'cta-final',
    title: 'Join the Future of Global Trade',
    description: 'Establish your Nexus link today and integrate with the foundational layer of international commerce.',
    data: { ctaPrimary: 'Establish Nexus Link', ctaSecondary: 'Governance Specs' }
  },
  {
    id: 'sec-hero-company',
    type: 'hero-simple',
    title: 'Unified Global Trade',
    description: 'Baalvion Industries is architecting the foundational layer for the next century of international commerce, bridging the gap between legacy systems and future automation.',
    data: { label: 'The Vision' }
  },
  {
    id: 'sec-hero-platform',
    type: 'hero-simple',
    title: 'Nexus Core',
    description: 'The high-speed execution layer for global enterprise logistics and financial settlement.',
    data: { label: 'Technology', features: [
      { title: 'Unified Ledger', desc: 'A cryptographically signed single source of truth for all global trade events and transactions.' },
      { title: 'Autonomous AI', desc: 'Real-time regulatory mapping and compliance monitoring across 180+ jurisdictions.' },
      { title: 'Digital Settlement', desc: 'Instant multi-currency financial clearing with automated liquidity and risk management.' }
    ]}
  },
  {
    id: 'sec-hero-trust',
    type: 'hero-simple',
    title: 'Governance & Compliance',
    description: 'Security, transparency, and international law are not just features—they are the core of the Baalvion Nexus infrastructure.',
    data: { label: 'Trust Architecture' }
  }
];

let pages: Page[] = [
  { 
    id: 'pg-home', 
    slug: 'home', 
    title: 'Baalvion Nexus | Global Trade Infrastructure', 
    sections: ['sec-hero-home', 'sec-problem-home', 'sec-solution-home', 'sec-trust-home', 'sec-cta-home'] 
  },
  { id: 'pg-company', slug: 'company', title: 'Strategic Vision | Baalvion Industries', sections: ['sec-hero-company'] },
  { id: 'pg-platform', slug: 'platform', title: 'Nexus Core Platform | Technology', sections: ['sec-hero-platform'] },
  { id: 'pg-trust', slug: 'trust', title: 'Trust & Governance Architecture | Baalvion', sections: ['sec-hero-trust'] }
];

let ecosystem: EcosystemItem[] = [
  { id: 'eco-1', layer: 'Infrastructure', name: 'Nexus Bedrock', description: 'The fundamental high-availability connectivity layer for global commerce networks.', domain: 'infra.baalvion.nexus' },
  { id: 'eco-2', layer: 'Intelligence', name: 'Baalvion Insight', description: 'Real-time global trade intelligence utilizes neural networks for predictive risk modeling.', domain: 'intel.baalvion.nexus' },
  { id: 'eco-3', layer: 'Governance', name: 'LexNetwork', description: 'Unified legal and compliance protocol providing automated jurisdictional mapping.', domain: 'legal.baalvion.nexus' },
  { id: 'eco-4', layer: 'Commerce', name: 'TradeFlow', description: 'Standardized operational execution engine for global enterprise logistics.', domain: 'flow.baalvion.nexus' },
  { id: 'eco-5', layer: 'Finance', name: 'Settlement Core', description: 'Next-generation settlement infrastructure for institutional trade finance.', domain: 'finance.baalvion.nexus' }
];

let inquiries: Inquiry[] = [];

export const db = {
  projects: {
    getAll: () => projects,
    add: (p: any) => {
      const newP = { 
        ...p, 
        id: `p-${Math.random().toString(36).substring(2, 7)}`, 
        isFeatured: p.isFeatured || false,
        priority: p.priority || 10,
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      };
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

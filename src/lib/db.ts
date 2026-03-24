export type ProjectStatus = 'Active' | 'In Development' | 'Planned';

export interface Project {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  longDescription?: string;
  ecosystemRole?: string;
  futureScope?: string;
  status: ProjectStatus;
  domain?: string;
  subdomain?: string;
  isFeatured: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  priority: number;
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

export const projectCategories: ProjectCategory[] = [
  { 
    id: 'cat-core', 
    name: 'Core Platform', 
    description: 'Foundation systems powering global trade infrastructure.', 
    priority: 1 
  },
  { 
    id: 'cat-industrial', 
    name: 'Industrial', 
    description: 'Mining, manufacturing, and high-scale industrial projects.', 
    priority: 2 
  },
  { 
    id: 'cat-internal', 
    name: 'Internal Systems', 
    description: 'Internal tools and operational management dashboards.', 
    priority: 3 
  },
  { 
    id: 'cat-intel', 
    name: 'Intelligence', 
    description: 'AI-driven research, analytics, and market insights.', 
    priority: 4 
  },
  { 
    id: 'cat-gov', 
    name: 'Governance', 
    description: 'Compliance, legal frameworks, and corporate policy tools.', 
    priority: 5 
  },
  { 
    id: 'cat-comm', 
    name: 'Commerce', 
    description: 'Verified luxury brands and high-end trade operations.', 
    priority: 6 
  }
];

let projects: Project[] = [
  { 
    id: 'p1', 
    name: 'Baalvion Trade Platform', 
    category: 'Core Platform', 
    type: 'SaaS',
    description: 'Global trade infrastructure connecting businesses, finance, and compliance.', 
    status: 'In Development',
    isFeatured: true,
    priority: 1,
    domain: 'baalvionstack.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p2', 
    name: 'Mining Operations Dashboard', 
    category: 'Industrial', 
    type: 'Industrial Tool',
    description: 'Real-time monitoring and management for high-scale mining initiatives.', 
    status: 'Active',
    isFeatured: true,
    priority: 2,
    domain: 'mining.baalvion.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p3', 
    name: 'Employee Monitoring App', 
    category: 'Internal Systems', 
    type: 'Internal Tool',
    description: 'Track and optimize internal team productivity and node performance.', 
    status: 'Active',
    isFeatured: true,
    priority: 3,
    domain: 'app.baalvionstack.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p4', 
    name: 'Intelligence Hub', 
    category: 'Intelligence', 
    type: 'Research Portal',
    description: 'Unified portal for research, data analytics, and market sentiment insights.', 
    status: 'Active',
    isFeatured: false,
    priority: 4,
    domain: 'imperialpedia.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p5', 
    name: 'Legal Compliance System', 
    category: 'Governance', 
    type: 'Policy System',
    description: 'Centralized compliance and governance protocols for global trade nodes.', 
    status: 'Active',
    isFeatured: false,
    priority: 5,
    domain: 'lawelitenetwork.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p6', 
    name: 'Market Exposure Reports', 
    category: 'Intelligence', 
    type: 'Insights Tool',
    description: 'In-depth analytical reports revealing hidden market structures and trends.', 
    status: 'Planned',
    isFeatured: false,
    priority: 6,
    domain: 'marketunderworld.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p7', 
    name: 'Strategy Education Platform', 
    category: 'Governance', 
    type: 'Education',
    description: 'Curated guides and tutorials for navigating and controlling complex global markets.', 
    status: 'In Development',
    isFeatured: false,
    priority: 7,
    domain: 'controlthemarket.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p8', 
    name: 'Amarise Maison Avenue Catalog', 
    category: 'Commerce', 
    type: 'Luxury Catalog',
    description: 'Premium product catalog and lifestyle offerings for verified trade partners.', 
    status: 'Active',
    isFeatured: true,
    priority: 8,
    domain: 'amarisemaisonavenue.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p9', 
    name: 'Investor Relations Portal', 
    category: 'Core Platform', 
    type: 'IR Portal',
    description: 'Direct nexus for quarterly updates, financial disclosures, and stakeholder briefings.', 
    status: 'Active',
    isFeatured: false,
    priority: 9,
    domain: 'ir.baalvion.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p10', 
    name: 'Global Hiring Portal', 
    category: 'Internal Systems', 
    type: 'Recruitment',
    description: 'End-to-end recruitment and candidate management for the global nexus network.', 
    status: 'Active',
    isFeatured: false,
    priority: 10,
    domain: 'jobs.baalvion.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let sections: Section[] = [
  { 
    id: 'sec-hero-home', 
    type: 'hero', 
    title: 'Operating the Global Trade Infrastructure', 
    description: 'Connecting businesses, finance, compliance, and logistics across 198 countries — all through a single unified system.',
    data: { 
      ctaPrimary: 'Explore Our Platform', 
      ctaSecondary: 'Partner With Us', 
      label: 'NEXUS OPERATING SYSTEM',
      stats: [
        { label: "Markets", value: "198" },
        { label: "Active Partners", value: "125+" },
        { label: "Transactions", value: "500K+" }
      ]
    }
  },
  {
    id: 'sec-problem-home',
    type: 'problem',
    title: 'The Global Trade Challenge',
    description: 'Fragmented supply chains, opaque financing, slow compliance, and lack of trust hinder global business expansion. Companies struggle to scale efficiently.',
    data: {
      points: [
        { title: "Fragmented Trade", desc: "Disconnected systems lead to terminal data silos." },
        { title: "Compliance Gaps", desc: "Complex jurisdictional laws create regulatory friction." },
        { title: "Finance Barriers", desc: "Legacy clearing systems slow down global value transfer." }
      ]
    }
  },
  {
    id: 'sec-solution-home',
    type: 'solution',
    title: 'Baalvion: The Operating System for Trade',
    description: 'Baalvion unifies trade, finance, compliance, and intelligence into a single, scalable infrastructure. Every transaction, every partner, every process — connected, secure, and efficient.',
    data: {
      features: [
        { title: "Unified OS", desc: "A single execution layer for all global operations." },
        { title: "Secure Nexus", desc: "Enterprise-grade security across all nodes." },
        { title: "Global Scale", desc: "Architected for 180+ jurisdictions." }
      ]
    }
  },
  {
    id: 'sec-cta-home',
    type: 'cta-final',
    title: 'Join the Future of Global Trade',
    description: 'Whether you are a partner, investor, or supplier, Baalvion provides a secure, scalable platform to connect and grow globally.',
    data: { ctaPrimary: 'Explore Platform', ctaSecondary: 'Contact Us' }
  }
];

let pages: Page[] = [
  { id: 'pg-home', slug: 'home', title: 'Baalvion — Global Trade Infrastructure Platform', sections: ['sec-hero-home', 'sec-problem-home', 'sec-solution-home', 'sec-cta-home'] }
];

let ecosystem: EcosystemItem[] = [
  { id: 'eco-1', layer: 'Infrastructure', name: 'Infrastructure Layer', description: 'The backbone for global business operations.', domain: 'baalvionstack.com' },
  { id: 'eco-2', layer: 'Intelligence', name: 'Intelligence Layer', description: 'AI-driven insights for smarter decisions.', domain: 'imperialpedia.com' },
  { id: 'eco-3', layer: 'Governance', name: 'Governance Layer', description: 'Compliance, contracts, and risk management at enterprise scale.', domain: 'lawelitenetwork.com' },
  { id: 'eco-4', layer: 'Commerce', name: 'Commerce Layer', description: 'Luxury, premium, and verified trade commerce.', domain: 'amarisemaisonavenue.com' }
];

let inquiries: Inquiry[] = [];

export const db = {
  projects: {
    getAll: () => projects,
    getById: (id: string) => projects.find(p => p.id === id),
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

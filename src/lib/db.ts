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
  layer: string; // e.g. "Infrastructure", "Intelligence"
  name: string;
  description: string;
  domain?: string;
}

export interface Section {
  id: string;
  type: string; // "hero", "content", "cards", "cta", "split"
  title: string;
  description: string;
  data: Record<string, any>;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  sections: string[]; // Array of Section IDs
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Read' | 'Archived';
}

// Internal State
let projects: Project[] = [
  { 
    id: 'p1', 
    name: 'Global Trade Platform', 
    category: 'Core', 
    type: 'Platform',
    description: 'Next-gen cross-border commerce execution engine for enterprise logistics.', 
    status: 'Active',
    domain: 'baalvion.nexus',
    subdomain: 'trade',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p2', 
    name: 'Vendor Intel AI', 
    category: 'Intelligence', 
    type: 'AI',
    description: 'AI-driven supplier risk and compliance assessment system.', 
    status: 'In Development',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p3', 
    name: 'Nexus Finance', 
    category: 'Internal', 
    type: 'Tool',
    description: 'Embedded trade finance and multi-currency settlement layer.', 
    status: 'Planned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let sections: Section[] = [
  { 
    id: 'sec-hero-home', 
    type: 'hero', 
    title: 'The Digital Nexus for Global Commerce', 
    description: 'Connecting businesses, finance, compliance, and intelligence systems into a unified global infrastructure.',
    data: { accent: 'Infrastructure 2.0', ctaPrimary: 'Explore Platform', ctaSecondary: 'Contact Us' }
  },
  { 
    id: 'sec-problem-home', 
    type: 'split', 
    title: 'Solving Fragmented Trade', 
    description: 'Siloed systems create operational bottlenecks. We provide a unified layer for global connectivity.',
    data: { 
      problems: [
        { title: 'Isolated Networks', desc: 'Fragmented supply chains lack real-time visibility.' },
        { title: 'Complex Compliance', desc: 'Divergent international standards delay execution.' }
      ],
      solution: 'One integration, global reach. Unified Execution Engine.'
    }
  }
];

let pages: Page[] = [
  { id: 'pg-home', slug: 'home', title: 'Baalvion Nexus | Home', sections: ['sec-hero-home', 'sec-problem-home'] },
  { id: 'pg-company', slug: 'company', title: 'Company | Baalvion', sections: [] },
  { id: 'pg-platform', slug: 'platform', title: 'Platform | Nexus Core', sections: [] }
];

let ecosystem: EcosystemItem[] = [
  { id: 'eco-1', layer: 'Infrastructure', name: 'Nexus Bedrock', description: 'The fundamental layer of global connectivity.', domain: 'infra.baalvion.nexus' },
  { id: 'eco-2', layer: 'Intelligence', name: 'Baalvion Insight', description: 'Data-driven decision making at scale.', domain: 'intel.baalvion.nexus' },
  { id: 'eco-3', layer: 'Governance', name: 'LexNetwork', description: 'Unified compliance across 150+ jurisdictions.', domain: 'legal.baalvion.nexus' }
];

let inquiries: Inquiry[] = [];

// Reusable Database Interface
export const db = {
  projects: {
    getAll: () => projects,
    add: (p: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newP: Project = { 
        ...p, 
        id: `p-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      projects.push(newP);
      return newP;
    },
    update: (id: string, p: Partial<Project>) => {
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
    add: (e: Omit<EcosystemItem, 'id'>) => {
      const newE = { ...e, id: `eco-${Math.random().toString(36).substring(2, 7)}` };
      ecosystem.push(newE);
      return newE;
    },
    update: (id: string, e: Partial<EcosystemItem>) => {
      ecosystem = ecosystem.map(item => item.id === id ? { ...item, ...e } : item);
      return ecosystem.find(item => item.id === id);
    },
    delete: (id: string) => { ecosystem = ecosystem.filter(e => e.id !== id); }
  },
  inquiries: {
    getAll: () => inquiries,
    add: (i: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
      const newI: Inquiry = {
        ...i,
        id: `inq-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        status: 'New'
      };
      inquiries.push(newI);
      return newI;
    },
    updateStatus: (id: string, status: Inquiry['status']) => {
      inquiries = inquiries.map(item => item.id === id ? { ...item, status } : item);
    }
  }
};
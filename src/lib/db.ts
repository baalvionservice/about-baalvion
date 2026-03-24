export type ProjectStatus = 'Active' | 'In Development' | 'Planned';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: ProjectStatus;
}

export interface EcosystemLayer {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Section {
  id: string;
  type: 'hero' | 'features' | 'cta' | 'text' | 'split' | 'cards';
  title: string;
  description: string;
  data?: Record<string, any>;
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
  date: string;
  status: 'New' | 'Read' | 'Archived';
}

// Internal State
let projects: Project[] = [
  { id: 'p1', name: 'Global Trade Platform', description: 'Next-gen cross-border commerce execution engine.', category: 'Core Platform Projects', status: 'Active' },
  { id: 'p2', name: 'Vendor Intel', description: 'AI-driven supplier risk and compliance assessment.', category: 'Core Platform Projects', status: 'In Development' },
  { id: 'p3', name: 'Nexus Finance', description: 'Embedded trade finance and settlement layer.', category: 'Core Platform Projects', status: 'Planned' },
  { id: 'p4', name: 'Alpha Mining Ops', description: 'Automated extraction and supply chain integration.', category: 'Industrial Projects', status: 'Active' },
  { id: 'p5', name: 'Imperialpedia', description: 'Central intelligence and strategy repository.', category: 'Intelligence Platforms', status: 'Active' },
  { id: 'p6', name: 'LexNetwork', description: 'Global compliance and legal governance framework.', category: 'Governance', status: 'In Development' },
  { id: 'p7', name: 'Elysium Luxury', description: 'Exclusive commerce and lifestyle ecosystem.', category: 'Commerce', status: 'Planned' },
];

let sections: Section[] = [
  { 
    id: 'sec-hero-home', 
    type: 'hero', 
    title: 'The Future of Global Trade Infrastructure', 
    description: 'Connecting businesses, finance, compliance, and intelligence systems into a unified global nexus.',
    data: { accent: 'Nexus Industries', cta: 'Explore Platform' }
  },
  { 
    id: 'sec-problem-home', 
    type: 'split', 
    title: 'Solving Fragmented Global Systems', 
    description: 'Global trade is fragmented by archaic systems. Baalvion Nexus provides a streamlined, intelligent infrastructure for the modern enterprise.',
    data: { points: ['Fragmented Networks', 'Compliance Headaches'] }
  },
  {
    id: 'sec-mission-company',
    type: 'text',
    title: 'Our Mission',
    description: 'To architect the infrastructure that powers the next century of global commerce through intelligence and integrity.'
  }
];

let pages: Page[] = [
  {
    id: 'pg-home',
    slug: 'home',
    title: 'Home | Baalvion Nexus',
    sections: ['sec-hero-home', 'sec-problem-home']
  },
  {
    id: 'pg-company',
    slug: 'company',
    title: 'About | Baalvion Industries',
    sections: ['sec-mission-company']
  }
];

let ecosystem: EcosystemLayer[] = [
  { id: 'eco-1', title: 'Infrastructure', description: 'The bedrock of global trade, providing connectivity and scale.', icon: 'Layers' },
  { id: 'eco-2', title: 'Intelligence', description: 'Data-driven insights for smarter decision making in complex markets.', icon: 'BrainCircuit' },
  { id: 'eco-3', title: 'Governance', description: 'Ensuring compliance, trust, and transparency across jurisdictions.', icon: 'ShieldCheck' },
  { id: 'eco-4', title: 'Commerce', description: 'The transactional layer facilitating seamless global exchange.', icon: 'ShoppingCart' },
];

let inquiries: Inquiry[] = [];

let users: User[] = [
  { id: 'u1', email: 'admin@baalvion.nexus', role: 'admin' }
];

// Reusable Database Interface
export const db = {
  projects: {
    getAll: () => projects,
    getById: (id: string) => projects.find(p => p.id === id),
    add: (p: Omit<Project, 'id'>) => {
      const newP = { ...p, id: `p-${Math.random().toString(36).substr(2, 5)}` };
      projects.push(newP);
      return newP;
    },
    update: (id: string, p: Partial<Project>) => {
      projects = projects.map(item => item.id === id ? { ...item, ...p } : item);
      return projects.find(item => item.id === id);
    },
    delete: (id: string) => { projects = projects.filter(p => p.id !== id); }
  },
  sections: {
    getAll: () => sections,
    getById: (id: string) => sections.find(s => s.id === id),
    update: (id: string, s: Partial<Section>) => {
      sections = sections.map(item => item.id === id ? { ...item, ...s } : item);
    }
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
  ecosystem: {
    getAll: () => ecosystem,
    update: (id: string, e: Partial<EcosystemLayer>) => {
      ecosystem = ecosystem.map(item => item.id === id ? { ...item, ...e } : item);
    }
  },
  inquiries: {
    getAll: () => inquiries,
    add: (i: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
      const newI: Inquiry = {
        ...i,
        id: `inq-${Math.random().toString(36).substr(2, 5)}`,
        date: new Date().toISOString(),
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

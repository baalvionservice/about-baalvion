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
  title: string;
  content: string;
  type: 'hero' | 'features' | 'cta' | 'text' | 'split';
}

export interface PageContent {
  slug: string;
  title: string;
  sections: Section[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Archived';
}

// Initial Mock Data
let projects: Project[] = [
  { id: '1', name: 'Global Trade Platform', description: 'Next-gen cross-border commerce execution engine.', category: 'Core Platform Projects', status: 'Active' },
  { id: '2', name: 'Vendor Intel', description: 'AI-driven supplier risk and compliance assessment.', category: 'Core Platform Projects', status: 'In Development' },
  { id: '3', name: 'Nexus Finance', description: 'Embedded trade finance and settlement layer.', category: 'Core Platform Projects', status: 'Planned' },
  { id: '4', name: 'Alpha Mining Ops', description: 'Automated extraction and supply chain integration.', category: 'Industrial Projects', status: 'Active' },
  { id: '5', name: 'Imperialpedia', description: 'Central intelligence and strategy repository.', category: 'Intelligence Platforms', status: 'Active' },
  { id: '6', name: 'LexNetwork', description: 'Global compliance and legal governance framework.', category: 'Governance', status: 'In Development' },
  { id: '7', name: 'Elysium Luxury', description: 'Exclusive commerce and lifestyle ecosystem.', category: 'Commerce', status: 'Planned' },
];

let ecosystem: EcosystemLayer[] = [
  { id: '1', title: 'Infrastructure', description: 'The bedrock of global trade, providing connectivity and scale.', icon: 'Layers' },
  { id: '2', title: 'Intelligence', description: 'Data-driven insights for smarter decision making in complex markets.', icon: 'BrainCircuit' },
  { id: '3', title: 'Governance', description: 'Ensuring compliance, trust, and transparency across jurisdictions.', icon: 'ShieldCheck' },
  { id: '4', title: 'Commerce', description: 'The transactional layer facilitating seamless global exchange.', icon: 'ShoppingCart' },
];

let inquiries: Inquiry[] = [];

let pages: PageContent[] = [
  {
    slug: 'home',
    title: 'Connecting Global Trade',
    sections: [
      { id: 'h1', type: 'hero', title: 'The Future of Global Trade Infrastructure', content: 'Connecting businesses, finance, compliance, and intelligence systems into a unified global nexus.' },
      { id: 'h2', type: 'split', title: 'The Problem vs Our Solution', content: 'Global trade is fragmented by archaic systems. Baalvion Nexus provides a streamlined, intelligent infrastructure for the modern enterprise.' }
    ]
  },
  {
    slug: 'company',
    title: 'About Baalvion Industries',
    sections: [
      { id: 'c1', type: 'text', title: 'Our Mission', content: 'To architect the infrastructure that powers the next century of global commerce through intelligence and integrity.' }
    ]
  }
];

// Helper functions for mock persistence
export const db = {
  projects: {
    getAll: () => projects,
    getById: (id: string) => projects.find(p => p.id === id),
    add: (p: Omit<Project, 'id'>) => {
      const newP = { ...p, id: Math.random().toString(36).substr(2, 9) };
      projects.push(newP);
      return newP;
    },
    update: (id: string, p: Partial<Project>) => {
      projects = projects.map(item => item.id === id ? { ...item, ...p } : item);
      return projects.find(item => item.id === id);
    },
    delete: (id: string) => { projects = projects.filter(p => p.id !== id); }
  },
  ecosystem: {
    getAll: () => ecosystem,
    update: (id: string, e: Partial<EcosystemLayer>) => {
      ecosystem = ecosystem.map(item => item.id === id ? { ...item, ...e } : item);
    }
  },
  pages: {
    getAll: () => pages,
    getBySlug: (slug: string) => pages.find(p => p.slug === slug),
    update: (slug: string, content: PageContent) => {
      pages = pages.map(p => p.slug === slug ? content : p);
    }
  },
  inquiries: {
    getAll: () => inquiries,
    add: (i: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
      const newI: Inquiry = {
        ...i,
        id: Math.random().toString(36).substr(2, 9),
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

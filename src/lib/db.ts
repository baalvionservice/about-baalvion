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
    description: 'Projects related to Baalvion’s core technology infrastructure and SaaS platforms.', 
    priority: 1 
  },
  { 
    id: 'cat-industrial', 
    name: 'Industrial', 
    description: 'Projects in mining, manufacturing, and industrial applications.', 
    priority: 2 
  },
  { 
    id: 'cat-internal', 
    name: 'Internal Systems', 
    description: 'Projects for internal tools, employee monitoring, dashboards, and administration.', 
    priority: 3 
  },
  { 
    id: 'cat-intel', 
    name: 'Intelligence', 
    description: 'Research, data, analytics, insights, and learning modules.', 
    priority: 4 
  },
  { 
    id: 'cat-gov', 
    name: 'Governance', 
    description: 'Legal, compliance, policies, startup & enterprise governance tools.', 
    priority: 5 
  },
  { 
    id: 'cat-comm', 
    name: 'Commerce', 
    description: 'Premium brands, lifestyle products, e-commerce, and business operations.', 
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
    longDescription: 'The flagship Baalvion Trade Platform is a comprehensive SaaS solution designed to unify the fragmented landscape of international commerce. It provides a single execution layer for logistics management, automated trade finance, and real-time regulatory compliance mapping.',
    ecosystemRole: 'Acts as the primary operating system for the entire Baalvion Nexus ecosystem.',
    status: 'Active',
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
    type: 'Mining Project',
    description: 'Monitoring and management system for high-scale industrial mining operations.', 
    longDescription: 'A heavy-duty industrial analytics platform that provides real-time telemetry and resource management for global mining sites. It utilizes IoT integration to track machinery performance, safety protocols, and output efficiency in the most demanding environments.',
    status: 'In Development',
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
    description: 'Track and manage internal employee productivity and performance across global nodes.', 
    status: 'Active',
    isFeatured: false,
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
    description: 'Data, research, and analytics platform providing deep market insights.', 
    longDescription: 'ImperialPedia is the central repository of Baalvion’s collective intelligence. It serves as a specialized research portal for global market trends, geopolitical risk analysis, and macro-economic forecasting, turning raw data into strategic foresight.',
    status: 'Active',
    isFeatured: true,
    priority: 4,
    domain: 'imperialpedia.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p5', 
    name: 'Legal Compliance System', 
    category: 'Governance', 
    type: 'Legal/Policy Platform',
    description: 'Centralized governance system for startups and enterprises.', 
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
    type: 'Reports / Insights',
    description: 'Analytical reports revealing market trends and hidden strategic structures.', 
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
    type: 'Educational Tools',
    description: 'Step-by-step guides and tutorials to navigate and scale in global markets.', 
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
    type: 'Luxury / Lifestyle',
    description: 'Premium product catalog and private labels for high-end lifestyle offerings.', 
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
    type: 'IR',
    description: 'Financial reports and strategic updates for the Baalvion investment community.', 
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
    type: 'Jobs / Recruitment',
    description: 'End-to-end recruitment management for global talent acquisition.', 
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
        { title: "Manual Fragmentation", desc: "Disconnected systems lead to data silos and execution delays." }
        ,{ title: "Compliance Opacity", desc: "Complex jurisdictional laws create high regulatory friction." }
        ,{ title: "Financial Inefficiency", desc: "Legacy clearing systems slow down global value transfer." }
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
        { title: "Standardized Protocols", desc: "Unified data formats for seamless cross-border interoperability." }
        ,{ title: "Autonomous Compliance", desc: "AI-driven legal mapping integrated directly into the trade flow." }
        ,{ title: "Instant Settlement", desc: "Real-time financial clearing using high-speed digital nodes." }
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
        { label: "Global Reach", value: "180+ Jurisdictions" }
        ,{ label: "Security Standard", value: "AES-256 / Zero-Knowledge" }
        ,{ label: "Compliance", value: "Real-Time AI Mapping" }
      ]
    }
  },
  {
    id: 'sec-cta-home',
    type: 'cta-final',
    title: 'Join the Future of Global Trade',
    description: 'Establish your Nexus link today and integrate with the foundational layer of international commerce.',
    data: { ctaPrimary: 'Establish Nexus Link', ctaSecondary: 'Governance Specs' }
  }
];

let pages: Page[] = [
  { id: 'pg-home', slug: 'home', title: 'Baalvion Nexus | Global Trade Infrastructure', sections: ['sec-hero-home', 'sec-problem-home', 'sec-solution-home', 'sec-trust-home', 'sec-cta-home'] }
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
    getById: (id: string) => projects.find(p => p.id === id),
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

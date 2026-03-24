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
    name: 'Nexus Trade Engine', 
    category: 'Core Platform', 
    type: 'Execution Platform',
    description: 'High-performance proprietary trade execution and settlement infrastructure designed for ultra-low latency global logistics.', 
    longDescription: 'The Nexus Trade Engine is the heartbeat of the Baalvion infrastructure. It facilitates the high-speed execution of trade orders across diverse asset classes and jurisdictions. Built with a focus on ultra-low latency, it ensures that global commerce moves at the speed of light, bypassing traditional clearing house delays.',
    ecosystemRole: 'Acts as the primary execution layer connecting commerce platforms with financial settlement nodes.',
    futureScope: 'Integration of autonomous agent-based trading protocols and cross-chain liquidity bridging for decentralized finance nodes.',
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
    category: 'Intelligence', 
    type: 'Compliance AI',
    description: 'Advanced predictive analytics engine utilizing multi-layer neural networks to assess global supply chain volatility.', 
    longDescription: 'Intel-V3 is a sophisticated risk assessment framework that processes trillions of data points across global supply chains. By analyzing geopolitical shifts, weather patterns, and market fluctuations, it provides strategic foresight to businesses and governments, turning uncertainty into actionable intelligence.',
    ecosystemRole: 'Provides the critical intelligence layer for risk mitigation and strategic decision-making within the nexus.',
    futureScope: 'Deployment of localized "edge" intelligence nodes for real-time risk assessment in remote industrial corridors.',
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
    description: 'Automated legal compliance mapping protocol providing immutable audit trails and regulatory alignment.', 
    longDescription: 'Lex Ledger solves the terminal complexity of international trade law. By digitizing jurisdictional regulations into executable code, it ensures that every transaction is compliant by design. It creates a "Global Legal Bridge" that allows businesses to operate seamlessly across 180+ countries.',
    ecosystemRole: 'Ensures absolute compliance and trust across all commerce and finance operations within the nexus.',
    futureScope: 'Autonomous arbitration protocols for cross-border dispute resolution without traditional court delays.',
    status: 'Planned',
    isFeatured: false,
    priority: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p4', 
    name: 'Settlement Node 01', 
    category: 'Core Platform', 
    type: 'Finance Protocol',
    description: 'Multi-currency digital settlement layer architected for seamless cross-border value transfer.', 
    longDescription: 'Settlement Node 01 is a high-security financial clearing terminal. It enables the instant transfer of value between global accounts, eliminating the 3-5 day delay typical of legacy banking systems. It supports major fiat currencies and a curated list of digital assets.',
    ecosystemRole: 'Provides the financial clearing foundation for the entire trade engine.',
    futureScope: 'Expansion into 50+ localized currency clearing pools and direct integration with central bank digital currencies.',
    status: 'Active',
    isFeatured: true,
    priority: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 'p5', 
    name: 'Imperial ERP Nexus', 
    category: 'Internal Systems', 
    type: 'Enterprise Resource',
    description: 'Proprietary internal resource management system linking global administrative nodes.', 
    longDescription: 'The Imperial ERP is the administrative nervous system of Baalvion Industries. It synchronizes resource allocation, human capital, and strategic objectives across our global hubs in real-time, ensuring maximum operational efficiency.',
    ecosystemRole: 'Internal governance and resource orchestration node.',
    futureScope: 'AI-driven resource optimization and automated strategic planning modules.',
    status: 'Active',
    isFeatured: false,
    priority: 10,
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

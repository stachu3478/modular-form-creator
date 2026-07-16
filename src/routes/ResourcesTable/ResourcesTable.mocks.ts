import type { Resource } from './ResourcesTable.types'

export const resourceWithIncompleteBasicInfo: Resource = {
  resourceId: 6,
  name: 'Customer Portal Redesign',
  status: 'draft',
  basicInfo: {
    resourceName: 'Customer Portal',
    owner: 'Alicia Chen',
    email: 'alicia.chen@company.com',
    description: '',
    priority: '',
  },
  projectDetails: {
    projectName: '',
    budget: '',
    category: '',
    options: [],
  },
}

export const resourceWithIncompleteProjectDetails: Resource = {
  resourceId: 7,
  name: 'Customer Portal Redesign',
  status: 'draft',
  basicInfo: {
    resourceName: 'Customer Portal',
    owner: 'Alicia Chen',
    email: 'alicia.chen@company.com',
    description:
      'Redesign the customer-facing portal to improve onboarding and support workflows.',
    priority: 'High',
  },
  projectDetails: {
    projectName: 'Portal Experience',
    budget: '$120,000',
    category: '',
    options: [],
  },
}

export const exampleResources: Resource[] = [
  {
    resourceId: 1,
    name: 'Customer Portal Redesign',
    status: 'completed',
    basicInfo: {
      resourceName: 'Customer Portal',
      owner: 'Alicia Chen',
      email: 'alicia.chen@company.com',
      description:
        'Redesign the customer-facing portal to improve onboarding and support workflows.',
      priority: 'High',
    },
    projectDetails: {
      projectName: 'Portal Experience',
      budget: '$120,000',
      category: 'UX',
      options: ['Accessibility', 'Analytics', 'Mobile-first'],
    },
  },
  {
    resourceId: 2,
    name: 'Warehouse Inventory Sync',
    status: 'draft',
    basicInfo: {
      resourceName: 'Inventory Sync',
      owner: 'Marcus Lee',
      email: 'marcus.lee@company.com',
      description:
        'Integrate warehouse inventory updates with the order management system.',
      priority: 'Medium',
    },
    projectDetails: {
      projectName: 'Operations Automation',
      budget: '$75,000',
      category: 'Integration',
      options: ['Realtime Sync', 'Bulk Import', 'Audit Logs'],
    },
  },
  {
    resourceId: 3,
    name: 'Internal Knowledge Base',
    status: 'completed',
    basicInfo: {
      resourceName: 'Knowledge Base',
      owner: 'Nadia Patel',
      email: 'nadia.patel@company.com',
      description: 'Launch an internal knowledge base for support and engineering teams.',
      priority: 'Low',
    },
    projectDetails: {
      projectName: 'Team Enablement',
      budget: '$40,000',
      category: 'Content',
      options: ['Search', 'Versioning', 'Permissions'],
    },
  },
  {
    resourceId: 4,
    name: 'Marketing Campaign Dashboard',
    status: 'draft',
    basicInfo: {
      resourceName: 'Campaign Dashboard',
      owner: 'Derek Brooks',
      email: 'derek.brooks@company.com',
      description:
        'Create a dashboard for tracking campaign performance across channels.',
      priority: 'High',
    },
    projectDetails: {
      projectName: 'Growth Analytics',
      budget: '$90,000',
      category: 'Analytics',
      options: ['Filtering', 'Exports', 'Alerts'],
    },
  },
  {
    resourceId: 5,
    name: 'Client Onboarding Workflow',
    status: 'completed',
    basicInfo: {
      resourceName: 'Onboarding Workflow',
      owner: 'Sara Gomez',
      email: 'sara.gomez@company.com',
      description:
        'Standardize the process for onboarding new clients with automated checkpoints.',
      priority: 'Medium',
    },
    projectDetails: {
      projectName: 'Client Success',
      budget: '$65,000',
      category: 'Process',
      options: ['Automation', 'Notifications', 'Templates'],
    },
  },
]

export const filledDraftResource: Resource = { ...exampleResources[0], status: 'draft' }

export const completeResource = exampleResources[0]

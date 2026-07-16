export interface Paginated<T> {
  items: T[],
  pagination: {
    page: number,
    pageSize: number,
    totalItems: number,
    totalPages: number
  }
}

export interface Resource {
  resourceId: number;
  name: string;
  status: 'draft' | 'completed';
  basicInfo: {
    resourceName: string;
    owner: string;
    email: string;
    description: string;
    priority: string;
  };
  projectDetails: {
    projectName: string;
    budget: string;
    category: string;
    options: string[];
  };
}

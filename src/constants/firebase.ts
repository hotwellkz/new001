export const COLLECTIONS = {
  CLIENTS: 'clients',
  CATEGORIES: 'categories',
  TRANSACTIONS: 'transactions'
} as const;

export const CATEGORY_TYPES = {
  CLIENT: 'client',
  EMPLOYEE: 'employee',
  PROJECT: 'project',
  WAREHOUSE: 'warehouse'
} as const;

export const TRANSACTION_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit'
} as const;

export const CATEGORY_ROWS = {
  CLIENTS: 1,
  EMPLOYEES: 2,
  PROJECTS: 3,
  WAREHOUSE: 4
} as const;

export const CATEGORY_COLORS = {
  CLIENT: 'blue',
  EMPLOYEE: 'green',
  PROJECT: 'purple',
  WAREHOUSE: 'orange'
} as const;
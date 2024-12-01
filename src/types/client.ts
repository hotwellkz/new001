export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  clientNumber: string;
  constructionAddress: string;
  objectName?: string;
  status: 'building' | 'deposit' | 'built';
  isIconsVisible: boolean;
  year: number;
  balance?: number;
  progress?: number;
}

export type NewClient = Omit<Client, 'id'>;

export const initialClientState: NewClient = {
  firstName: '',
  lastName: '',
  clientNumber: '',
  constructionAddress: '',
  objectName: '',
  status: 'deposit',
  isIconsVisible: true,
  year: new Date().getFullYear(),
  balance: 0,
  progress: 0
};
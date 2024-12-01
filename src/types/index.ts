export interface CategoryCardType {
  id: string;
  title: string;
  amount: number;
  iconName: string;
  color: string;
  row: number;
  isVisible?: boolean;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  clientNumber: string;
  constructionAddress: string;
  objectName?: string;
  status: 'building' | 'deposit' | 'built';
  isIconsVisible: boolean;
}

export const initialClientState = {
  firstName: '',
  lastName: '',
  clientNumber: '',
  constructionAddress: '',
  objectName: '',
  status: 'deposit' as const,
  isIconsVisible: true
};
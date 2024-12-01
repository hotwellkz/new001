export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatClientStatus = (status: 'building' | 'deposit' | 'built'): string => {
  switch (status) {
    case 'building':
      return 'Строим';
    case 'deposit':
      return 'Задаток';
    case 'built':
      return 'Построено';
    default:
      return status;
  }
};
import { toast } from 'react-hot-toast';

export const showErrorNotification = (message: string) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
  });
};

export const showSuccessNotification = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
  });
};
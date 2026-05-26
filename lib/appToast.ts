import { toast, type ToastOptions } from 'react-toastify';

/** Matches btn-primary / edit actions (blue-500 / blue-600) */
export const TOAST_EDIT = '#3b82f6';
/** Matches btn-danger / delete actions (red-500) */
export const TOAST_DELETE = '#ef4444';
/** Matches btn-success / add actions (green-500) */
export const TOAST_ADD = '#22c55e';
/** Matches auth brand orange (#F97316) */
export const TOAST_LOGIN = '#F97316';

type ToastVariant = 'edit' | 'delete' | 'add' | 'login';

function variantOptions(variant: ToastVariant): ToastOptions {
  return {
    className: `toast-${variant}`,
    progressClassName: `toast-${variant}-progress`,
  };
}

export const appToast = {
  edit: {
    success: (message: string) => toast.success(message, variantOptions('edit')),
    error: (message: string) => toast.error(message, variantOptions('edit')),
  },
  delete: {
    success: (message: string) => toast.success(message, variantOptions('delete')),
    error: (message: string) => toast.error(message, variantOptions('delete')),
  },
  add: {
    success: (message: string) => toast.success(message, variantOptions('add')),
    error: (message: string) => toast.error(message, variantOptions('add')),
  },
  login: {
    success: (message: string) => toast.success(message, variantOptions('login')),
    error: (message: string) => toast.error(message, variantOptions('login')),
    info: (message: string) => toast.info(message, variantOptions('login')),
  },
};

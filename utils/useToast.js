import toast from 'react-hot-toast';

export default function useToast() {
  const pushToast = ({ message, isError, isLoading }) => {
    if (!isError && !isLoading) {
      toast.success(<span className='text-sm font-medium'>{message}</span>, {
        duration: 4000,
        position: 'top-right',
      });
    } else if (!isLoading) {
      toast.error(<span className='text-sm font-medium'>{message}</span>, {
        id: message,
        position: 'top-right',
      });
    } else {
      return toast.loading(<span className='text-sm font-medium'>{message}</span>, {
        position: 'top-right',
      });
    }
  };

  const updateToast = ({ toastId, message, isError }) => {
    if (!isError) {
      toast.success(<span className='text-sm font-medium'>{message}</span>, {
        id: toastId,
        duration: 4000,
        position: 'top-right',
      });
    } else {
      toast.error(<span className='text-sm font-medium'>{message}</span>, {
        id: toastId,
        position: 'top-right',
      });
    }
  };

  const dismissToast = () => {
    toast.dismiss();
  };

  return { updateToast, pushToast, dismissToast };
}

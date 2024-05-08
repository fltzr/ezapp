import { Button } from '@cloudscape-design/components';
import { type MutationFunction, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ReactNode } from 'react';
import { useNotificationStore } from '@/store/use-notification-store';

type UseMutationWithNotificationProps<TData, TVariables> = {
  mutationFn: MutationFunction<TData, TVariables>;
  options?: UseMutationOptions<TData, AxiosError, TVariables>;
  successHeader?: ReactNode;
  successMessage?: ReactNode;
  errorMessage?: ReactNode;
  retryOnFailure?: boolean;
};

export const useMutationWithNotification = <TData, TVariables>({
  mutationFn,
  options,
  successMessage,
  errorMessage,
  retryOnFailure = true,
}: UseMutationWithNotificationProps<TData, TVariables>) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      addNotification({
        type: 'success',
        header: successMessage ?? 'Success',
        content: successMessage,
      });

      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      addNotification({
        type: 'error',
        header: errorMessage ?? 'Error',
        action: retryOnFailure ? (
          <Button
            iconName='refresh'
            onClick={() => {
              mutationFn(variables)
                .then((data) => {
                  addNotification({
                    message: 'Operation successful after retry!',
                    type: 'success',
                  });
                  options?.onSuccess?.(data, variables, context);
                })
                .catch((error_) => {
                  addNotification({ message: `Retry failed: ${error_.message}`, type: 'erroror' });
                  options?.onError?.(error, variables, context);
                });
            }}
          >
            Retry
          </Button>
        ) : undefined,
      });
    },
  });
};

import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { nanoid } from 'nanoid';
import { useNotificationStore } from '@/store/use-notification-store';

//https://chat.openai.com/share/9de00e1c-8eab-4d5a-9f70-15cf88628448

type MutationOptions<TData, TVariables> = UseMutationOptions<TData, AxiosError, TVariables> & {
  successMessage?: string;
  errorMessage?: string;
};

type UseMutationWithNotificationProps<TData, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  options?: MutationOptions<TData, TVariables>;
};

export const useMutationWithNotification = <TData, TVariables>({
  mutationFn,
  options,
}: UseMutationWithNotificationProps<TData, TVariables>) => {
  const queryClient = useQueryClient();
  const { addNotification, removeNotification } = useNotificationStore();

  const mutation = useMutation<TData, AxiosError, TVariables>({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.successMessage) {
        addNotification({
          id: nanoid(11),
          type: 'success',
          header: options.successMessage,
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const uid = nanoid(11);

      addNotification({
        id: uid,
        type: 'error',
      });
    },
  });
};

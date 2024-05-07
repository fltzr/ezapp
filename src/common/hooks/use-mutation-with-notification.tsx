import { MutationFunction, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseMutationWithNotificationProps<TData, TVariables, TError = AxiosError> = 
  Omit<UseMutationOptions<TData, TVariables, TError>, 'mutationFn'> & MutationFunction<TData, TVariables>;

export const useMutationWithNotification = <TData, TVariables, TError = AxiosError>({
  mutationFn: 
}: UseMutationWithNotificationProps<TData, TVariables, TError>) => {

}
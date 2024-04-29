import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { EventAPIResponse } from '../util/types';

const eventsApi = async () => {
  const response = await axios.get<EventAPIResponse>('http://localhost:3000/courtreserve/events');

  return response.data;
};

export const useCourtreserveEventsApi = () => {
  return useQuery({
    queryKey: ['courtreserve-events'],
    queryFn: eventsApi,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    gcTime: 0,
    retry: false,
  });
};

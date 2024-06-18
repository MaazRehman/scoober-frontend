import { useState, useEffect, useMemo } from 'react';
import { usePresentationLogic } from '../contexts/PresentationLogicContext';
import * as Sentry from '@sentry/react';

type RoomData = {
  id: string;
  name: string;
  owner: string;
  type: string;
};

type UseGetRoomDataResult = {
  data: RoomData[];
};

const useGetRoomsInfo = (): UseGetRoomDataResult => {
  const [data, setData] = useState<RoomData[] | null>(null);
  const { setLoading } = usePresentationLogic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3004/rooms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: RoomData[] = await response.json();
        setData(result);
      } catch (error) {
        Sentry.captureMessage('Api response failed for fetching room', {
          level: 'error',
          tags: {
            action: 're-fetch',
            component: 'FallbackComponent',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData || [] };
};

export default useGetRoomsInfo;

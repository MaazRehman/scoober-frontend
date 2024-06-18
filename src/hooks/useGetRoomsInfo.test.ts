import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useGetRoomInfo from './useGetRoomsInfo';
import { usePresentationLogic } from '../contexts/PresentationLogicContext';
import * as Sentry from '@sentry/react';

jest.mock('../contexts/PresentationLogicContext');
jest.mock('@sentry/react', () => ({
  captureMessage: jest.fn(),
}));

const mockSetLoading = jest.fn();
const mockUsePresentationLogic = usePresentationLogic as jest.Mock;

beforeEach(() => {
  mockUsePresentationLogic.mockReturnValue({
    loading: false,
    setLoading: mockSetLoading,
  });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('useGetRoomInfo', () => {
  it('should fetch data successfully', async () => {
    const mockData = [
      { id: '1', name: 'Room 1', owner: 'Owner 1', type: 'cpu' },
      { id: '2', name: 'Room 2', owner: 'Owner 2', type: 'human' },
    ];

    // Mocking fetch API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useGetRoomInfo());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(mockSetLoading).toHaveBeenCalledTimes(2);
    expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
  });

  it('should handle fetch error and reporting metrics to sentry', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useGetRoomInfo());

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });

    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      'Api response failed for fetching room',
      {
        level: 'error',
        tags: {
          action: 're-fetch',
          component: 'FallbackComponent',
        },
      }
    );

    expect(mockSetLoading).toHaveBeenCalledTimes(2);
    expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
  });
});

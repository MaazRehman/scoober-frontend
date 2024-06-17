import { renderHook, act } from '@testing-library/react';
import { notification } from 'antd';
import useSuccessNotification from './useSuccessNotification';
import React from 'react';

jest.mock('antd', () => ({
  notification: {
    useNotification: jest.fn(),
  },
}));

describe('useSuccessNotification', () => {
  let mockUseNotification: jest.Mock;
  let mockApi: { success: jest.Mock };
  let mockContextHolder: JSX.Element;

  beforeEach(() => {
    mockApi = { success: jest.fn() };
    mockContextHolder = <div>Context Holder</div>;

    mockUseNotification = notification.useNotification as jest.Mock;
    mockUseNotification.mockReturnValue([mockApi, mockContextHolder]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return openNotificationWithIcon and contextHolder', () => {
    const { result } = renderHook(() =>
      useSuccessNotification('Test Message', 'Test Description')
    );

    expect(result.current.openNotificationWithIcon).toBeInstanceOf(Function);
    expect(result.current.contextHolder).toBe(mockContextHolder);
  });

  it('should call success notification with correct parameters', () => {
    const { result } = renderHook(() =>
      useSuccessNotification('Test Message', 'Test Description')
    );

    act(() => {
      result.current.openNotificationWithIcon();
    });

    expect(mockApi.success).toHaveBeenCalledWith({
      message: 'Test Message',
      description: 'Test Description',
    });
  });
});

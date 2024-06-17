import { notification } from 'antd';

const useSuccessNotification = (message: string, description: string) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api['success']({
      message,
      description,
    });
  };

  return { openNotificationWithIcon, contextHolder };
};

export default useSuccessNotification;

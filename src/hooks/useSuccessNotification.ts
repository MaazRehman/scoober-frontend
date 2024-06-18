import { notification } from 'antd';

/**
 * Custom hook to display a success notification.
 *
 * @param {string} message - The message to display in the notification.
 * @param {string} description - The description to display in the notification.
 * @returns {object} - An object containing the function to open the notification and the context holder.
 */
const useSuccessNotification = (message: string, description: string) => {
  const [api, contextHolder] = notification.useNotification();

  /**
   * Opens a success notification with the provided message and description.
   */
  const openNotificationWithIcon = () => {
    api['success']({
      message,
      description,
    });
  };

  return { openNotificationWithIcon, contextHolder };
};

export default useSuccessNotification;

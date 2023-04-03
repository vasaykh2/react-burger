import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import styles from './notifications-styles.module.css';

type TNotificationsProps = {
  children: ReactNode;
};

const notificationRoot = document.getElementById(
  'react-notifications'
) as HTMLElement;

const Notifications: FC<TNotificationsProps> = (children) => {
  return children
    ? null
    : ReactDOM.createPortal(
        <>
          <div className={styles.notification}>{children}</div>
        </>,
        notificationRoot
      );
};

export default Notifications;

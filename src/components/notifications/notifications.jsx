//import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './notifications-styles.module.css';

const notificationRoot = document.getElementById('react-notifications');

function Notifications(children) {
  return children
    ? null
    : ReactDOM.createPortal(
        <>
          <div className={styles.notification}>{children}</div>
        </>,
        notificationRoot
      );
}

export default Notifications;

Notifications.propTypes = PropTypes.node.isRequired;


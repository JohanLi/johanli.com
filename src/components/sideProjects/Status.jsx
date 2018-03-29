import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './status.scss';

const Status = (props) => {
  let status;

  if (props.state === 0) {
    status = <div className={classNames(styles.status, styles.inactive)}>Inactive</div>;
  } else if (props.state === 1) {
    status = <div className={classNames(styles.status, styles.complete)}>Complete</div>;
  } else if (props.state === 2) {
    status = <div className={classNames(styles.status, styles.inProgress)}>In Progress</div>;
  }

  return status;
};

Status.propTypes = {
  state: PropTypes.number.isRequired,
};

export default Status;

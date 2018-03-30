import React from 'react';

import styles from './loading.scss';
import LoadingIcon from '../../public/img/loading.svg';

const Loading = () => (
  <div
    className={styles.loading}
  >
    <LoadingIcon />
  </div>
);

export default Loading;

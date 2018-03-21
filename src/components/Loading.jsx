/* eslint react/no-danger: "off" */
/* can't use CSS for svg fill unless inlined */

import React from 'react';

import styles from './loading.scss';
import loadingIcon from '../../public/img/loading.svg';

const Loading = () => (
  <div
    className={styles.loading}
    dangerouslySetInnerHTML={{ __html: loadingIcon }}
  />
);

export default Loading;

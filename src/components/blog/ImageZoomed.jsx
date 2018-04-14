import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from './imageZoomed.scss';

const { Fragment } = React;

class ImageZoomed extends React.Component {
  constructor(props) {
    super(props);

    this.element = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.element);
    this.element.addEventListener('click', this.props.toggle);
    window.addEventListener('keyup', this.props.toggle);
    window.addEventListener('scroll', this.props.toggle);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
    this.element.removeEventListener('click', this.props.toggle);
    window.removeEventListener('keyup', this.props.toggle);
    window.removeEventListener('scroll', this.props.toggle);
  }

  render() {
    return createPortal(
      <Fragment>
        <div className={styles.overlay} />
        <img src={this.props.src} className={styles.imageZoomed} alt="" />
      </Fragment>,
      this.element,
    );
  }
}

ImageZoomed.propTypes = {
  src: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ImageZoomed;

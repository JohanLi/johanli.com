import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ImageZoomed from './ImageZoomed';

import styles from './imageZoom.scss';

const pressedKeyButNotEscape = event => event && event.type === 'keyup' && event.key !== 'Escape';

class ImageZoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      preloaded: false,
    };
  }

  componentDidMount() {
    if (!window.matchMedia('(min-width: 992px)').matches) {
      return;
    }

    const preload = new Image();
    preload.src = this.props.zoomSrc;

    preload.onload = () => {
      this.setState({
        preloaded: true,
      });
    };
  }

  toggle(event) {
    if (this.state.preloaded === false) {
      return;
    }

    if (pressedKeyButNotEscape(event)) {
      return;
    }

    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    const imageClass = classNames({
      [styles.preloaded]: this.state.preloaded,
    });

    const image = (
      <img
        key="image"
        src={this.props.src}
        alt={this.props.alt}
        onClick={() => this.toggle()}
        className={imageClass}
      />
    );

    if (this.state.active) {
      return (
        <>
          {image}
          <ImageZoomed
            key={this.props.zoomSrc}
            src={this.props.zoomSrc}
            toggle={event => this.toggle(event)}
          />
        </>
      );
    }

    return image;
  }
}

ImageZoom.propTypes = {
  src: PropTypes.string.isRequired,
  zoomSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageZoom;

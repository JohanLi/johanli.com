import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import ImageZoom from './ImageZoom';

import styles from './entry.scss';

const isImageZoom = (domNode) => {
  const { name, attribs } = domNode;
  return name === 'img' && attribs.src && attribs['data-zoom-src'] && attribs.alt;
};

const parserOptions = {
  replace: (domNode) => {
    if (isImageZoom(domNode)) {
      const { attribs } = domNode;
      return <ImageZoom src={attribs.src} zoomSrc={attribs['data-zoom-src']} alt={attribs.alt} />;
    }

    return null;
  },
};

const Entry = ({ entry }) => (
  <article className={styles.entry}>
    <div className={styles.published}>
      <span className={styles.month}>{entry.published.month}</span>
      <span className={styles.date}>{entry.published.date}</span>
      <span className={styles.year}>{entry.published.year}</span>
    </div>
    <h2>{entry.title}</h2>
    {Parser(entry.html, parserOptions)}
  </article>
);

Entry.propTypes = {
  entry: PropTypes.shape({
    published: PropTypes.object,
    title: PropTypes.string,
    html: PropTypes.string,
  }).isRequired,
};

export default Entry;

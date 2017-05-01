import React from 'react';
import PropTypes from 'prop-types';

const Status = (props) => {
  let status;

  if (props.state === 0) {
    status = <div className="status inactive">Inactive</div>;
  } else if (props.state === 1) {
    status = <div className="status complete">Complete</div>;
  } else if (props.state === 2) {
    status = <div className="status in-progress">In Progress</div>;
  }

  return status;
};

Status.propTypes = {
  state: PropTypes.number.isRequired,
};

export default Status;

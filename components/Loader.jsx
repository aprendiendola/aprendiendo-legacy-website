import React from 'react';
import loading from 'assets/images/loading.svg';

const Loader = ({ visible }) => {
  return (
    visible && (
      <div>
        <img src={loading} alt="loading..." />
      </div>
    )
  );
};

Loader.defaultProps = {
  visible: true
};

export default Loader;

import React from 'react';
import loading from 'assets/images/loading.gif';

import './common.scss';

const PageLoader = () => (
  <div className="loading-page">
    <img src={loading} alt="loading..." />
  </div>
);

export default PageLoader;

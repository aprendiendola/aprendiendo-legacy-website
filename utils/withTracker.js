import React from 'react';
import { loadMixpanel, loadFacebook } from './loaders';

loadMixpanel();
loadFacebook(process.env.REACT_APP_FACEBOOK_PIXEL);

const withTracker = WrappedComponent => {
  const HOC = props => {
    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withTracker;

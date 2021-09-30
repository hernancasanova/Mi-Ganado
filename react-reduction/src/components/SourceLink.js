import React from 'react';
import { history } from '../index';

const SourceLink = props => {
  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <a
      onClick={() => {
        history.push('/');
      }}
      {...props}
    />
  );
};

export default SourceLink;

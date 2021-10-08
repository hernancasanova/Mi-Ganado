/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { history } from '..';
import PropTypes from 'prop-types';

const estiloSpan = {
  fontSize: '20px',
  color: 'black',
  fontWeight: '700',
  cursor: 'pointer',
  float: 'right',
  marginRight: '50px',
  marginBottom: '20px',
};
const BtnRegresar = props => {
  return (
    <div>
      <span style={estiloSpan} onClick={() => history.goBack()}>
        ← Regresar
      </span>
    </div>
  );
};
const validateHistory = PropTypes.shape({
  action: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
});
BtnRegresar.propTypes = {
  history: validateHistory.isRequired,
};

export default BtnRegresar;

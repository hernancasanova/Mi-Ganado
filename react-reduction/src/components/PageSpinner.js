import PropTypes from 'prop-types';
import React from 'react';
import { Spinner, Row } from 'reactstrap';

const PageSpinner = ({ color = 'primary', texto }) => {
  console.log("texto: ",texto);
  return ( 
    <>
    <div className="cr-page-spinner" >
      <Spinner color={color} style={{marginRight: 20}}/>{texto}
      {/*<div style={{marginTop: 12}}>
        {texto}
      </div>*/}
    </div>
    </>
  );
};

PageSpinner.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
};

export default PageSpinner;

import React from 'react';
import Slider from '../components/Slider';
import Page from '../components/Page';

const Bienvenida = () => {
  const styles = {
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <Page title="" className="TablePage">
      <div style={styles}>
        <h1 style={{ fontFamily: 'cursive' }}>Mi ganado</h1>
        <Slider />
      </div>
    </Page>
  );
};

export default Bienvenida;

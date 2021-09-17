import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';

class AuthPage extends React.Component {
  componentDidMount() {
    //Si el usuario ya había iniciado sesión
    const { history } = this.props;
    const api_token = localStorage.getItem('api_token');
    if (api_token) {
      //Si el usuario ya ha iniciado sesión
      history.push('/');
    }
    /*if(isRegistered){
      console.log("Usuario registrado correctamente")
      Swal.fire({
        'html': "Usuario agregado correctamente",
        'icon': "success",
        'timer': 4000,
        'confirmButtonText': 'Aceptar'
      });
    }*/
  }
  componentDidUpdate() {
    const { history, isRegistered, userValid, loading } = this.props;
    const api_token = localStorage.getItem('api_token');
    if (api_token) {
      //Si el usuario ya ha iniciado sesión
      history.push('/');
    }
    if (isRegistered && !api_token && !loading) {
      Swal.fire({
        html: 'Usuario agregado correctamente',
        icon: 'success',
        timer: 4000,
        confirmButtonText: 'Inicie sesión',
      }).then(result => {
        if (result.isConfirmed) {
          history.push('login');
        }
      });
    } else if (!userValid && !loading) {
      Swal.fire({
        icon: 'error',
        //'title': 'Oops...',
        text: 'No existe el usuario en la plataforma',
        confirmButtonText: 'Intentelo nuevamente',
        footer:
          '<a href="javascript:location.reload(true)">Por favor recargue la página si el problema persiste</a>',
      });
    }
  }
  render() {
    //const api_token=localStorage.getItem('api_token');
    const { loading, authState } = this.props;
    return (
      <>
        {loading ? (
          <PageSpinner
            texto={
              authState === STATE_LOGIN
                ? 'Iniciando sesión'
                : 'Registrando nuevo usuario'
            }
          />
        ) : (
          <Row
            style={{
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Col md={6} lg={4}>
              <Card body>
                <AuthForm
                  history={this.props.history}
                  authState={this.props.authState}
                />
              </Card>
            </Col>
          </Row>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.auth.api_token,
  loading: state.auth.loading,
  isRegistered: state.auth.isRegistered,
  userLogged: state.auth.userLogged,
  userValid: state.auth.userValid,
});

export default connect(mapStateToProps, {})(AuthPage);

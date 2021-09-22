//import logo200Image from 'assets/img/logo/logo_200.png';
import ganadovacunoImage from 'assets/img/logo/ganado_vacuno.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import { signIn, register, auth } from '../actions/AuthActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmail from 'validator/es/lib/isEmail';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    const { isRegistered } = props;
    this.state = {
      userLogged: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      api_token: '',
      isRegistered,
      validUsername: false,
      validEmail: false,
      validPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
    //this.estadoBoton=this.estadoBoton.bind(this);
  }

  get isSignup() {
    //determina texto del botón de formulario de inicio de sesión/registro
    return this.props.authState === STATE_SIGNUP;
  }

  /*componentDidMount(){//si se accede desde la url, por ejemplo
    console.log("desde did mount")
    const {userLogged, history} =this.props;
    let api_token=localStorage.getItem('api_token');//modificar ya que debe obtenerse desde el store
    if(api_token){//Si el usuario ha iniciado sesión
      history.push("/");
      console.log("El usuario "+userLogged+" ha iniciado sesión desde mount");
    }
  }*/

  /*componentDidUpdate(){//si se actualiza el store al iniciar sesión
    console.log("Desde did update");
    const {userLogged, api_token, history} =this.props;
    if(userLogged){//si el usuario ha iniciado sesion
      //localStorage.setItem('api_token', api_token);//modificar ya que debe obtenerse desde el store
      //CUANDO SE TRABAJE CON EL STORE
      //const {api_token} =this.props;
      //localStorage.setItem('api_token',api_token);PUEDE SER NO NECESARIO
      history.push("/");
      console.log("El usuario "+userLogged+" ha iniciado sesión");
    }
  }*/

  handleSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const { signIn, register } = this.props;
    //this.isSignup?register(username,email,password):signIn(email,password);
    if (this.isSignup) {
      register(username, email, password);
    } else {
      signIn(email, password);
    }
  };

  estadoBoton() {
    const { validUsername, validEmail, validPassword } = this.state;
    if (!this.isSignup) {
      if (validEmail && validPassword) {
        return false;
      } else {
        return true;
      }
    } else if (validUsername && validEmail && validPassword) {
      return false;
    } else {
      return true;
    }
  }

  handleChange(e) {
    const value = e.target.value;
    const input = e.target.name;
    if (input === 'username') {
      //if(username.length>2 && username.length<7){
      if (value.length > 1 && value.length < 7) {
        this.setState({ validUsername: true });
      } else {
        this.setState({ validUsername: false });
      }
    } else if (input === 'email') {
      if (isEmail(value)) {
        this.setState({ validEmail: true });
      } else {
        this.setState({ validEmail: false });
      }
    } else {
      //si es password
      //if(5<password.length && password.length<9 && this.isSignup){
      if (5 < value.length && value.length < 9) {
        this.setState({ validPassword: true });
      } else {
        this.setState({ validPassword: false });
      }
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderButtonText() {
    if (this.isSignup) {
      return 'Crear cuenta';
    } else {
      return 'Iniciar sesión';
    }
  }

  render() {
    const {
      usernameLabel,
      usernameInputProps,
      emailLabel,
      emailInputProps,
      passwordLabel,
      passwordInputProps,
    } = this.props;
    const {
      username,
      email,
      password,
      validEmail,
      validPassword,
      validUsername,
    } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <div className="text-center pb-4">
            <h5>Plataforma de gestión de vacunos</h5>
          </div>
          <div className="text-center pb-4">
            <img
              src={ganadovacunoImage}
              className="rounded"
              style={{ width: 201, height: 60 }}
              alt="logo"
            />
          </div>
          {this.isSignup && (
            <FormGroup>
              <Label for={usernameLabel}>{usernameLabel}</Label>
              <Input
                {...usernameInputProps}
                value={username}
                name="username"
                onChange={this.handleChange}
                invalid={!validUsername && username.length > 0}
                valid={validUsername}
              />
              <FormText>Ingrese entre 2 a 6 caracteres</FormText>
            </FormGroup>
          )}
          <FormGroup>
            <Label for={emailLabel}>{emailLabel}</Label>
            <Input
              {...emailInputProps}
              type="email"
              value={email}
              name="email"
              onChange={this.handleChange}
              valid={validEmail}
              invalid={!validEmail && email.length > 0}
            />
            <FormText>Ej: usuario@correo.com</FormText>
          </FormGroup>
          <FormGroup>
            <Label for={passwordLabel}>{passwordLabel}</Label>
            <Input
              {...passwordInputProps}
              value={password}
              name="password"
              onChange={this.handleChange}
              valid={validPassword}
              invalid={!validPassword && password.length > 0}
            />
            {this.isSignup && (
              <FormText>Ingrese entre 6 a 8 caracteres</FormText>
            )}
          </FormGroup>
          {/*this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} value={confirmPassword} onChange={this.handleChange}/>
            <FormText>Ingrese la misma contraseña</FormText>
          </FormGroup>
        )*/}
          <hr />
          <Button
            disabled={this.estadoBoton()}
            size="lg"
            className="bg-gradient-theme-left border-0"
            block
            onClick={this.handleSubmit}
          >
            {this.renderButtonText()}
          </Button>

          <div className="text-center pt-1">
            <h6>o</h6>
            <h6>
              {this.isSignup ? (
                <Link to="login">Iniciar sesión</Link>
              ) : (
                <Link to="signup">Crear cuenta</Link>
              )}
            </h6>
          </div>
          {}
        </Form>
      </>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  emailLabel: PropTypes.string,
  emailInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Nombre de usuario',
  usernameInputProps: {
    type: 'text',
    placeholder: '',
  },
  emailLabel: 'Correo electrónico',
  emailInputProps: {
    type: 'email',
    placeholder: '',
  },
  passwordLabel: 'Contraseña',
  passwordInputProps: {
    type: 'password',
    placeholder: '',
  },
  confirmPasswordLabel: 'Confirmar Contraseña',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: '',
  },
};

//export default AuthForm;
const mapStateToProps = state => ({
  userLogged: state.auth.userLogged,
  api_token: state.auth.api_token,
  isRegistered: state.auth.isRegistered,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  signIn,
  register,
  auth,
})(AuthForm);

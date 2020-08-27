//import logo200Image from 'assets/img/logo/logo_200.png';
import ganadovacunoImage from 'assets/img/logo/ganado_vacuno.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {signIn, register, auth} from '../actions/AuthActions';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

 
class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    //const { isRegister } = props;
    this.state = {username:'', email:'', password:'', api_token:''};
    this.handleChange=this.handleChange.bind(this);
  }
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  componentDidMount() {
    const { auth } = this.props;
    auth();
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    console.log("CLICKEADO HANDLESUBMIT");
    event.preventDefault();
    const {username,email,password}=this.state;
    const {signIn,register}=this.props;
    this.isLogin?signIn(email,password):register(username,email,password);
    //signIn(email,password);
  };

  handleChange(e){
    const value=e.target.value;
    this.setState({
      [e.target.name]:value
    });
  }

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Iniciar sesión';
    }

    if (!buttonText && this.isSignup) {
      return 'Crear cuenta';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      emailLabel,
      emailInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      signIn,
      isRegistered,
      history
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {isRegistered && <Redirect to="/login" />
         }
        <div className="text-center pb-4">
          <h5>Plataforma de gestión de vacunos</h5>
        </div>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={ganadovacunoImage}
              className="rounded"
              style={{ width: 201, height: 60, cursor: 'pointer' }}
              alt="logo"
            />
          </div>
        )}
        {this.isSignup && (
          <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} value={this.state.username} name="username" onChange={this.handleChange} />
        </FormGroup>
        )}
        <FormGroup>
          <Label for={emailLabel}>{emailLabel}</Label>
          <Input {...emailInputProps} value={this.state.email} name='email' onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} value={this.state.password} name="password" onChange={this.handleChange} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>o</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Entrar
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Crear cuenta
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
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
  email: state.auth.email,
  password: state.auth.password,
  api_token: state.auth.api_token,
  isRegistered: state.auth.isRegistered
});

export default withRouter(connect(
  mapStateToProps,
  {
    signIn,
    register,
    auth,
  }
)(AuthForm));

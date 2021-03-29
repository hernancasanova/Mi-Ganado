//import logo200Image from 'assets/img/logo/logo_200.png';
import ganadovacunoImage from 'assets/img/logo/ganado_vacuno.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {signIn, register, auth} from '../actions/AuthActions';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import Alert from 'reactstrap/lib/Alert';

 
class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    const { isRegistered } = props;
    this.state = {userLogged: '' , username:'', email: '', password: '', api_token: '' , isRegistered};
    this.handleChange=this.handleChange.bind(this);
  }

  get isSignup() {//determina texto del botón de formulario de inicio de sesión/registro
    return this.props.authState === STATE_SIGNUP;
  }


  componentDidUpdate(){
    const {userLogged, api_token, history} =this.props;
    if(userLogged.length>0){
      localStorage.setItem('api_token',api_token);
      history.push("/");
      console.log("El usuario "+userLogged+" ha iniciado sesión");
    }
  }

  handleSubmit = event => {
    console.log("CLICKEADO HANDLESUBMIT");
    event.preventDefault();
    const {username, email, password}=this.state;
    const {signIn,register}=this.props;
    //this.isSignup?register(username,email,password):signIn(email,password);
    if(this.isSignup){
      register(username,email,password);
    }else{
      signIn(email,password);
    }
  };

  handleChange(e){
    const value=e.target.value;
    this.setState({
      [e.target.name]:value
    });
  }

  renderButtonText() {
    if (this.isSignup) {
      return 'Crear cuenta';
    }else{
      return 'Iniciar sesión';
    }

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
      api_token,
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
              <Link to="login">Iniciar sesión</Link>
            ) : (
              <Link to="signup">
                Crear cuenta
              </Link>
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
  userLogged: state.auth.userLogged,
  api_token: state.auth.api_token,
  isRegistered: state.auth.isRegistered
});

export default connect(
  mapStateToProps,
  {
    signIn,
    register,
    auth,
  }
)(AuthForm);

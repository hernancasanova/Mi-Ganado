import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import {connect} from 'react-redux';

class AuthPage extends React.Component {
  componentDidMount(){
    const {history}= this.props;
    const api_token=localStorage.getItem('api_token');
    if(api_token){
      history.push("/");
      console.log("El usuario ya había iniciado sesión");
    }
  }
  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              history={this.props.history}
              authState={this.props.authState}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  userLogged: state.auth.userLogged,
  api_token: state.auth.api_token,
  isRegistered: state.auth.isRegistered
});

export default connect(
  mapStateToProps,
  {
  }
)(AuthPage);

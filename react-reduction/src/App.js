import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
//import NoEncontrado from 'pages/NoEncontrado';
//import Bienvenida from 'pages/Bienvenida';
import React from 'react';
import componentQueries from 'react-component-queries';
import { Route, Switch, Redirect } from 'react-router-dom';
import './styles/reduction.scss';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';

const Bienvenida = React.lazy(() => import('pages/Bienvenida'));
const Listado = React.lazy(() => import('pages/Listado'));
const NoEncontrado = React.lazy(() => import('pages/NoEncontrado'));
const RegistrarVacuno = React.lazy(() => import('pages/RegistrarVacuno'));
//const RegistrarVacuno = React.lazy(() => import('pages/ReactHookForm'));
const RegistrarArete = React.lazy(() => import('pages/RegistrarArete'));

class App extends React.Component {
  componentDidMount() {
    let api_token = localStorage.getItem('api_token');
    if (!api_token) {
      this.props.history.push('login');
    }
  }
  render() {
    const { history, vacunoEditado } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <LayoutRoute
            exact
            path="/login"
            layout={EmptyLayout}
            component={props => (
              <AuthPage {...props} authState={STATE_LOGIN} history={history} />
            )}
          />
          <LayoutRoute
            exact
            path="/signup"
            layout={EmptyLayout}
            component={props => (
              <AuthPage {...props} authState={STATE_SIGNUP} history={history} />
            )}
          />

          <MainLayout breakpoint={this.props.breakpoint} history={history}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route exact path="/" component={Bienvenida} />
              <Route exact path="/listado_vacunos" component={Listado} />
              <Route
                exact
                path="/registrar_vacuno"
                component={RegistrarVacuno}
              />
              {vacunoEditado.id > 0 && (
                <Route
                  exact
                  path="/editar_vacuno"
                  component={RegistrarVacuno}
                />
              )}
              <Route exact path="/registrar_arete" component={RegistrarArete} />
              <Route path="/404" component={NoEncontrado} />
              {/* <Route render={() => <Redirect to="/404" />} /> */}
              {/* <Route render={() => <NoEncontrado />} /> */}
              <Route path="*">
                <Redirect to="/404" />
              </Route>
              {/*<Redirect </Redirect>to={} /> */}
              {/* <Route component={NoEncontrado} /> */}
            </React.Suspense>
          </MainLayout>
        </Switch>
      </ConnectedRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

const mapStateToProps = state => ({
  vacunoEditado: state.vacuno.vacunoEditado,
});

export default connect(mapStateToProps, {})(componentQueries(query)(App));

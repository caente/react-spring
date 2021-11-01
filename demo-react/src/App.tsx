import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import {Api} from './Api';
import './App.css';
import CoffeeShopEdit from './CoffeeShopEdit';
import CoffeeShopsList from './CoffeeShopsList';
import Home from './Home';
import NavBar from './NavBar';
import {Security, SecureRoute, LoginCallback} from '@okta/okta-react';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import {useOktaAuth} from '@okta/okta-react';


const oktaAuth: OktaAuth = new OktaAuth({
  issuer: 'https://dev-63669975.okta.com/oauth2/default',
  clientId: '0oa2gfjz71LnTQhAg5d7',
  redirectUri: window.location.origin + '/callback'
});

const defaultApi = new Api("");

const AuthWrapper: React.FunctionComponent = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: string, originalUri: string) => {
    history?.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Route path='/callback' component={LoginCallback} />
        <Protected />
      </Security>
    </Router>
  );
}

const Protected: React.FunctionComponent = () => {
  const {oktaAuth, authState} = useOktaAuth();
  const [state, setState] = useState({authenticated: null, user: null, api: defaultApi})

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut('/');

  const authenticated = authState?.isAuthenticated || null;
  function checkAuthentication() {
    if (authenticated) {
      const createState = async () => {
        const user = await oktaAuth.getUser();
        let accessToken: string = await oktaAuth.getAccessToken();
        setState(() => ({authenticated, user, api: new Api(accessToken)}));
      }
      createState();
    }
  }

  useEffect(() => {
    checkAuthentication()
  });

  useEffect(() => {
    checkAuthentication()
  }, [authState]);

  const navbar = <NavBar
    isAuthenticated={authenticated}
    login={login.bind(this)}
    logout={logout.bind(this)}
  />;
  return (
    <Switch>
      <Route
        path='/'
        exact={true}
        render={(props) => <Home {...props} user={state.user} authenticated={state.authenticated} api={state.api} navbar={navbar} />}
      />
      <SecureRoute
        path='/coffee-shops'
        exact={true}
        render={(props: any) => <CoffeeShopsList {...props} api={state.api} navbar={navbar} />}
      />
      <SecureRoute
        path='/coffee-shops/:id'
        render={(props: any) => <CoffeeShopEdit {...props} api={state.api} navbar={navbar} />}
      />
    </Switch>
  )
}

export default AuthWrapper;

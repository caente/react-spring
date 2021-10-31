import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Api} from './Api';
import './App.css';
import CoffeeShopEdit from './CoffeeShopEdit';
import CoffeeShopsList from './CoffeeShopsList';
import Home from './Home';
import NavBar from './NavBar';

const api = new Api("");

const App: React.FunctionComponent = () => {
  const navbar = <NavBar />;

  return (
    <Router>
      <Switch>
        <Route
          path='/'
          exact={true}
          render={(props) => <Home {...props} api={api} navbar={navbar} />}
        />
        <Route
          path='/coffee-shops'
          exact={true}
          render={(props) => <CoffeeShopsList {...props} api={api} navbar={navbar} />}
        />
        <Route
          path='/coffee-shops/:id'
          render={(props) => <CoffeeShopEdit {...props} api={api} navbar={navbar} />}
        />
      </Switch>
    </Router>
  )
}


export default App;

import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';
import {Api} from './Api';
import {useOktaAuth} from '@okta/okta-react';


interface HomeProps {
  navbar: React.ReactElement;
  api: Api;
  authenticated: boolean | null;
  user: any;
}

const Home: React.FunctionComponent<HomeProps> = props => {
  if (props.authenticated === null) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="app">
        {props.navbar}
        <Container fluid>
          {props.authenticated ?
            <div>
              <p>Welcome, {props.user.name}</p>
              <Button color="secondary">
                <Link className="app-link" to="/coffee-shops">Manage Coffee Shops</Link>
              </Button>
            </div> :
            <div>
              <p>Please log in to manage coffee shops.</p>
              <Button color="secondary" disabled={true}>
                Manage Coffee Shops
              </Button>
            </div>
          }
        </Container>
      </div>
    );
  }
}

export default Home;

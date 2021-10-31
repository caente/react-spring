import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';
import {Api} from './Api';


interface HomeProps {
  navbar: React.ReactElement;
  api: Api;
}

const Home: React.FunctionComponent<HomeProps> = props => {
  return (
    <div className="app">
      {props.navbar}
      <Container fluid>
        <div>
          <Button color="secondary">
            <Link className="app-link" to="/coffee-shops">Manage Coffee Shops</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Home;

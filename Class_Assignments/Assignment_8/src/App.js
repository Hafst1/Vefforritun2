import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'shards-react';
import TVStation from './components/TVStation';
import SignupForm from './components/SignupForm';
import NavBar from './components/NavBar';
import Main from './components/Main';

const App = () => (
  <>
    <NavBar />
    <Container>
      <Switch>
        <Route exact path="/" component={ Main } />
        <Route path="/tv-station" component={ TVStation } />
        <Route path="/signup-form" component={ SignupForm } />
      </Switch>
    </Container>
  </>
);

export default App;

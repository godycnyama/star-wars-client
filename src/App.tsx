import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Nav from '../src/common/Nav';
import './App.css';
import TransitionedPage from '../src/common/TranstionedPage';
import People from './features/people/People';
import PersonDetail from './features/people/PersonDetail';
import About from './features/people/About';

function App() {
  return (
    <Nav>
      <ToastContainer />
      <Switch>
          <Route exact path="/" component={TransitionedPage(People)} />
          <Route path="/person-detail" component={TransitionedPage(PersonDetail)}/>
          <Route path="/about" component={TransitionedPage(About)}/>
      </Switch>
    </Nav>
  );
}

export default App;

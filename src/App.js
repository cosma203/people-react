import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import People from './components/people';
import PersonForm from './components/personForm';
import NavBar from './components/navBar';
import NotFound from './components/notFound';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/:id" component={PersonForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={People} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

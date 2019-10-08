import React from 'react'
import logo from './logo.svg'
import './App.css';
import CreateRepo from './CreateRepo.js'
import Homepage from './Homepage.js'
import Signup from './Signup.js'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/createRepo" component={CreateRepo} />
      </Switch>
    </div>
  );
}

export default App;

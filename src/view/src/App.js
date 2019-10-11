import React from 'react'
import logo from './logo.svg'
import './App.css';
import CreateRepo from './CreateRepo.js'
import Homepage from './Homepage.js'
import Signup from './Signup.js'
import Login from './Login.js'
import UserDash from './UserDash.js'
import Repo from './Repo.js'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/createRepo" component={CreateRepo} />
        <Route exact path="/:userName" component={UserDash} />
        <Route exact path="/:userName/:repoName" component={Repo} />
      </Switch>
    </div>
  );
}

export default App;

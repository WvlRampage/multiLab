import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import ListUsers from './ListUsers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">      
      <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ListUsers" component={ListUsers} />             
      </Switch>
    </Router>
    </div>
  );
}

export default App;

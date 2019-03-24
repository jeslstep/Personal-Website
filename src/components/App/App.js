import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import AdminPage from '../AdminPage/AdminPage';
import ProjectPage from '../ProjectPage/ProjectPage';


class App extends Component {

  // Renders the entire app on the DOM
  render() {
    return (
       <Router>
        <div>
          <Route exact path="/" component={ProjectPage}/>
          <Route path="/adminpage" component={AdminPage}/>
        </div>
      </Router>
    );
  }
}

export default App;

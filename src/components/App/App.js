import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import AdminPage from '../AdminPage/AdminPage';
import ProjectPage from '../ProjectPage/ProjectPage';
import Contact from '../Contact/Contact';
class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
       <Router>
        <div>
          <Route exact path="/" component={ProjectPage}/>
          <Route path="/adminpage" component={AdminPage}/>
          <Route path="/contact" component={Contact}/>
        </div>
      </Router>
    );
  }
}

export default App;

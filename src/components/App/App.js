import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import AdminPage from '../AdminPage/AdminPage';
import ProjectPage from '../ProjectPage/ProjectPage';
import Contact from '../Contact/Contact';
import axios from 'axios';


class App extends Component {

  componentDidMount() {
    
      this.interval = setInterval(() => {
         this.keepAppAwake();
        console.log('waking app');
      }, 900000); // every 15 minutes (900000)
   
  }

  // GET request to server to keep app from sleeping
  keepAppAwake = () => {
    axios.get('/wakeup')
      .then((response) => {
        console.log('app awake');
      })
      .catch((error) => {
       console.log('wake up call did not succeed');
      })
  }


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

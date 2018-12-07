import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard'


class ProjectPage extends Component {

    // run getProjects when page loads
    componentDidMount() {
         this.getProject();
         this.getTag();
    }

    // getProject dispatches a call to get projects 
     getProject = (event) => {
        this.props.dispatch({type: 'GET_PROJECTS'});
    }

    // getProject dispatches a call to get projects 
    getTag = (event) => {
        this.props.dispatch({type: 'GET_TAGS'});
    }

    // eslint-disable-line no-alert
    handleClick() {
        alert('You clicked the Chip.'); 
    }

  // Renders the entire app on the DOM
    render() {
        return (
            <div className="App">
                <Router>
                    <nav>
                        <p><Link to="/adminpage">Admin Page</Link></p>
                    </nav>
                </Router>
            <header className="App-header">
                <div>
                    <img id="image" alt = "Jessica Stephens"
                     src = "https://media.licdn.com/dms/image/C4D03AQEVewqHZM1MfA/profile-displayphoto-shrink_200_200/0?e=1547683200&v=beta&t=S2R9qtqh6yqX6W9FniBav3smGT4B8yx7--qoqMhTzBU"/>
                </div>
            <h1>Jessica Stephens</h1>
            <h4>Full Stack Software Developer</h4>
            <Router>
                <div>
              <section className="margin-left">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jessica-stephens-784b88166/">LinkedIn</a>
                </section>   
                <section className="margin-left">
                    <a  target="_blank" rel="noopener noreferrer" href="github.com/jeslstep?tab=repositories"> Github</a>
                </section>
                </div>
            </Router>
            </header> 
            <section id="backgroud">
          <ProjectCard />
    </section>
</div>
         );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ProjectPage);
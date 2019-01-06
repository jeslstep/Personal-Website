import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard'


class ProjectPage extends Component {

    // run getProjects when page loads
    componentDidMount() {
         this.getProject();
    }

    // getProject dispatches a call to get projects 
     getProject = (event) => {
        this.props.dispatch({type: 'GET_PROJECTS'});
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
                <div className="padding">
                    <div>
                        <img id="image" alt = "Jessica Stephens"
                        src = "https://media.licdn.com/dms/image/C4D03AQEVewqHZM1MfA/profile-displayphoto-shrink_200_200/0?e=1547683200&v=beta&t=S2R9qtqh6yqX6W9FniBav3smGT4B8yx7--qoqMhTzBU"/>
                    </div>
                    <div className="padding">
                    <h4>Jessica Stephens</h4>
                    <h4>Software Developer</h4>
                        </div>
               
            <Router>
                <div>
              <section className="margin-left">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jessica-stephens-784b88166/">LinkedIn</a>
                </section>   
                <section className="margin-left">
                    <a  target="_blank" rel="noopener noreferrer" href="https://www.github.com/jeslstep"> Github</a>
                </section>
                </div>
            </Router>
                    </div>
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
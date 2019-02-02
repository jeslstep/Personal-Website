import React, { Component } from 'react';
import {connect} from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard';
import Button from '@material-ui/core/Button';
import TechnologiesUsed from '../TechnologiesUsed/TechnologiesUsed';

class ProjectPage extends Component {

    // run these when page loads
    componentDidMount() {
        // run getResume
        this.getResume();
        // run get getProjects
        this.getProject();
    }

    // getResume dispatches a call to getResumeSaga
    getResume = (event) => {
        this.props.dispatch({type: 'GET_RESUME'});
    }

    // getProject dispatches a call to getProjectsSaga
    getProject = (event) => {
       this.props.dispatch({
         type: 'GET_PROJECTS'
       });
     }

    // Renders the entire app on the DOM
    render() {
        return (
            <div className="App">
                <header className="App-header">
                        <section>
                            <img id="image" alt= "Jessica Stephens"
                            src = "https://avatars2.githubusercontent.com/u/40326640?s=460&v=4"/>
                                <div className="padding">
                                <h1><strong>Jessica <br/> Stephens</strong></h1>
                                <h6 className="developerTitle">Software Developer</h6>
                                </div>
                                <Router>
                                    <div>
                                    <section>
                                        <Button 
                                            varient="contained">
                                                <a className="a" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jessica-stephens-784b88166/">
                                                    LinkedIn
                                                </a>
                                         </Button>
                                    </section>
                                    <section> <a className="b">|</a></section> 
                                    <section>
                                        <Button
                                            varient="contained">
                                                <a className="a" target="_blank" rel="noopener noreferrer" href="https://www.github.com/jeslstep">
                                                    Github
                                                </a>
                                        </Button>
                                    </section>
                                    <section> <a className="b">|</a></section> 
                                    <section>
                                        {/* display resume link from reduxstate */}
                                         {this.props.reduxState.resume.map( resume =>(
                                            <div key={resume.firebase_link}>
                                                <Button 
                                                    color= "secondary" 
                                                    varient="contained">
                                                        <a className="a" target="_blank" rel="noopener noreferrer" href={resume.firebase_link}> 
                                                            Resume
                                                        </a>
                                                </Button>
                                            </div>
                                           ))}
                                    </section>
                                    </div>
                                </Router>
                        </section>
                </header> 
                <div align="center">
                    <h1 className="mainPageTitles">Portfolio</h1>
                </div>
          <ProjectCard />
                <div align="center">
                    <h1 className="mainPageTitles">Technology Used</h1>
                </div>
          <TechnologiesUsed/>
        </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ProjectPage);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard';
import Button from '@material-ui/core/Button';



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
                {/* <Router>
                    <nav>
                        <p><Link to="/adminpage">Admin Page</Link></p>
                    </nav>
                </Router> */}
            <header className="App-header">
                    {/* <section>
                    <div className="quotetext">
                     <h4>
                        "I enjoy 
                        contributing to the <br/>
                        development of web and 
                        mobile applications that help <br/>
                        solve a variety of problems."
                    </h4>
                    </div>
                    </section> */}
                    <section>
                        <img id="image" alt = "Jessica Stephens"
                        src = "https://avatars2.githubusercontent.com/u/40326640?s=460&v=4"/>
                            <div className="padding">
                            <h4 >Jessica Stephens</h4>
                            <h4>Software Developer</h4>
                            </div>
                               <Router>
                                <div>
                                <section className="margin-left">
                                    <Button color= "secondary" varient="contained"><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jessica-stephens-784b88166/">LinkedIn</a></Button>
                                </section>   
                                <section className="margin-left">
                                    <Button color= "secondary" varient="contained"><a  target="_blank" rel="noopener noreferrer" href="https://www.github.com/jeslstep"> Github</a></Button>
                                </section>
                                <section className="margin-left">
                                    <Button color= "secondary" varient="contained"><a  target="_blank" rel="noopener noreferrer" href="https://firebasestorage.googleapis.com/v0/b/personal-website-93452.appspot.com/o/jessica_stephens_resume.pdf?alt=media&token=94ed00ef-b479-4eed-8135-edd16335db14"> Resume</a></Button>
                                </section>
                                </div>
                                </Router>
                        </section>
                </header> 
                <hr/>
            <h1 className="whitetext">Portfolio</h1>
          <ProjectCard />
        </div>
         );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ProjectPage);
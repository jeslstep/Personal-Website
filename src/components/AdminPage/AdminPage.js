import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import ResumeUpload from './ResumeUpload';
import Card from '@material-ui/core/Card';
import ProjectsTable from './ProjectsTable';
import ProjectImgUpload from './ProjectImgUpload';

class AdminPage extends Component {
    // Renders the entire app on the DOM
    componentDidMount() {
        this.getProject();
    }

    // getProject dispatches a call to get projects 
    getProject = (event) => {
        this.props.dispatch({type: 'GET_PROJECTS'});
    }

  


    render() { 
        return (
            <div className="App2">
                <header className="App-header">
                    <Router>
                        <nav>
                            <p><Link to="/">Project Page</Link></p>
                        </nav>
                    </Router>
                    <h1>Update Personal Website</h1>
                </header>
                <div>
                    <section>
                  
                    <ResumeUpload/>
           
                    </section>
                    <section>
                 
                    <ProjectImgUpload />
                 
                    </section>
                </div>
                    <ProjectsTable />
                   
            </div>
        );
    }
}



const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AdminPage);
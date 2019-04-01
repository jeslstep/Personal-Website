import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import ResumeUpload from './ResumeUpload';
import ProjectsTable from './ProjectsTable';
import ProjectImgUpload from './ProjectAddImgUpload';
import AddTagCard from './AddTagCard';
import TagsTable from './TagsTable';

const style = {
    marginTop: 25
}

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
                <section className="container">
                 <div className="row">
                    <section className="col-sm">
                        <ProjectImgUpload />
                        </section>
                        <section className="col-sm">
                         <ResumeUpload/>
                        </section>
                        <section className="col-sm">
                        <AddTagCard/>  
                    </section>
                    </div>
                     <div style={style} className="row">
                    <section className="col-sm">
                        <ProjectsTable />
                    </section>
                    <section className="col-sm">
                        <TagsTable/>
                    </section>
                    </div>
                </section>   
            </div>
        );
    }
}



const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AdminPage);
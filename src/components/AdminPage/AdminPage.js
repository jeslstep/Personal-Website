import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Link} from 'react-router-dom';
import ResumeUpload from './ResumeUpload';
import TextField from '@material-ui/core/TextField';
import ProjectsTable from './ProjectsTable';
import ProjectImgUpload from './ProjectImgUpload';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

class AdminPage extends Component {

    state = {
        tag_name: '',
    }
    // Renders the entire app on the DOM
    componentDidMount() {
        this.getProject();
    }

    // getProject dispatches a call to get projects 
    getProject = (event) => {
        this.props.dispatch({type: 'GET_PROJECTS'});
    }

           // sets the user input in state
       handleChangeFor = (propertyName) => {
           return (event) => {
               this.setState({
                   ...this.state,
                    [propertyName]: event.target.value
               });
           }
       }

       // post projectPostObj
        tagPostObjPost = (event) => {
           console.log('adding tag name', this.state.tag_name);
           this.props.dispatch({
               type: 'ADD_TAGS',
               payload: this.state.tag_name
           });
           this.setState({
               tag_name: '',
            
           });
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
                    <section>
                        <Card className="card2">
                        <h1>Add a new Tech Tag</h1>
                        <TextField 
                            id="standard-name" 
                            value={this.state.tag_name} 
                            label="Name" 
                            onChange={this.handleChangeFor('tag_name')}
                        />
                        <br/>
                        <Button onClick={this.tagPostObjPost} color='primary' varient='contained'>Add New Tech Tag</Button>
                        </Card>
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
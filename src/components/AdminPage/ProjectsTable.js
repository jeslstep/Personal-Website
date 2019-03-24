import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';

class ProjectsTable extends Component {
    // Renders the entire app on the DOM
    componentDidMount() {
        this.getProject();
    }

    // getProject dispatches a call to get projects 
    getProject = (event) => {
        this.props.dispatch({type: 'GET_PROJECTS'});
    }


    // delete project
    deleteProject = (id) => { 
    //eslint-disable-next-line
        if (confirm("Are you sure you want to delete this project?")) {
            this.props.dispatch({
                type: 'DELETE_PROJECT',
                payload: id
            });
        }
        
    }

render() { 
    return (
        <div align="center">
                <table className = "table table-md">
                    <thead>
                        <tr className="App-title">
                            <th>Project</th><th>Website</th><th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.projects.map(project  => (  
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td><a href={project.website} target="_blank">{project.website}</a></td>
                                <td><Button varient="contained" color="secondary"
                                onClick={() =>  {this.deleteProject(project.id)}} 
                                >DELETE</Button></td>
                            </tr>  
                        ))}
                    </tbody>
                </table>
        </div>
        );
    }
}



const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ProjectsTable);
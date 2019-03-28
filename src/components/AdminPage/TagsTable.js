import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';

class TagsTable extends Component {
    // Renders the entire app on the DOM
    componentDidMount() {
        this.getTags();
    }

    // getProject dispatches a call to get projects 
    getTags = (event) => {
        this.props.dispatch({type: 'GET_TAGS'});
    }


    // delete project
    deleteProject = (id) => { 
    //eslint-disable-next-line
        if (confirm("Are you sure you want to delete this tag?")) {
            this.props.dispatch({
                type: 'DELETE_TAG',
                payload: id
            });
        }
        
    }

render() { 
    return (
        <div align="center">
        <h1>Tags</h1>
                <table className = "table table-md">
                    <thead>
                        <tr className="App-title">
                            <th>Tag</th><th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.tags.map(tag  => (  
                            <tr key={tag.id}>
                                <td>{tag.name}</td>
                                <td><Button varient="contained" color="secondary"
                                onClick={() =>  {this.deleteProject(tag.id)}} 
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

export default connect(mapReduxStateToProps)(TagsTable);
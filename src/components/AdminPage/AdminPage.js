import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {HashRouter as Router, Link} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';


class AdminPage extends Component {
    // Renders the entire app on the DOM
     componentDidMount() {
        this.getProject();
        this.getTags();
    }

    // getProject dispatches a call to get projects 
     getProject = (event) => {
        this.props.dispatch({type: 'GET_PROJECTS'});
    }
    
    // get tags for menu
    getTags = (event) => {
        this.props.dispatch({type:'GET_TAGS'})
    }

    // stores the state to be sent
    state = {
    // stores the values entered by the user
        projectPostObj: {
            name: '',
            description: '',
            thumbnail: '',
            website: '',
            github: '',
            date_completed: '',
            tag_names:  [],
        },
    // controls menu
        anchorEl: null,
    }

    // sets the user input in state
    handleChangeFor = (propertyName) => {
     return (event) => {
       this.setState({
            projectPostObj: 
                {...this.state.projectPostObj,
                [propertyName]: event.target.value}
            
       });
     }
    }

    // controls menu
    handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    };

    // handles menu selection by dispathing the tag selection to be set
    handleClose = (event) => {
    // menu item text
    console.log(event.target.innerText);
    console.log(event.target.name);
    this.setState({ anchorEl: null });
         this.setState({
             projectPostObj: {
                 tag_names: [...this.state.projectPostObj.tag_names,
                    event.target.innerText]
             }
         });
    };

    // post projectPostObj
    projectPostObjPost = (event) => {
        event.preventDefault();
        console.log('adding project', this.state.projectPostObj);
        this.props.dispatch({type: 'ADD_PROJECT', payload: this.state.projectPostObj}); 
         this.setState({
             projectPostObj: { ...this.state.projectPostObj,
                tag:{ name:[] },
                name: '',
                description: '',
                thumbnail: '',
                website: '',
                github: '',
                
             }
         });
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
    // controls menu
    const { anchorEl } = this.state; 

    return (
        <div className="App">
            <Router>
            <nav>
                <p><Link to="/">Project Page</Link></p>
            </nav>
            </Router>
        <header className="App-header">
            <h1>Add a Project:</h1>
        </header>
            <form onSubmit={this.projectPostObjPost}>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    Select Tags
                </Button>
                 <Menu
                 id="simple-menu"
                 anchorEl={anchorEl}
                 open={Boolean(anchorEl)}
                 onClose={this.handleClose}
                    >
                    {this.props.reduxState.tags.map( tag => (
                    <MenuItem key={tag.id} value={tag.id} name={tag.name} onClick={this.handleClose}>{tag.name}</MenuItem>
                    ))}
                    </Menu>
                    <br/>
                      <div>
                    <section>
                    {
                        this.state.projectPostObj.tag_names.map((name, index) => (
                        <Chip key={index} className="margin-left margin-top" label={name} variant="outlined"/>
                    ))}
                    </section>
                    </div>
                    <section className="margin-right">
                    <TextField id="standard-name" value={this.state.name} label="Name" 
                    onChange={this.handleChangeFor('name')}/>
                        <br/>
                    <TextField id="standard-name" value={this.state.description} label="Description" 
                    onChange={this.handleChangeFor('description')}/>
                        </section>
                        <section className="margin-right">
                    <TextField id="standard-name"  label="Thumbnail" 
                    />
                        <br/>
                    <TextField id="standard-name" value={this.state.website} label="Website" 
                    onChange={this.handleChangeFor('website')}/>
                    </section>
                    <section className="margin-right">
                    <TextField id="standard-name" value={this.state.github} label="Github" 
                    onChange={this.handleChangeFor('github')}/>
                        <br/>
                    <TextField id="date" label="Date Completed" type="date" defaultValue="2017-05-24"
                    onChange={this.handleChangeFor('date_completed')}/>
                    </section>
                    <br/>
                    {JSON.stringify(this.state.projectPostObj)}
                    <br/>
                    <button className="btn btn-outline-success btn-md" type="submit">Add Project</button>
                </form>
            <hr/>
             <section>
                <table className = "table table-md">
                    <thead>
                        <tr className="App-title">
                            <th>Project</th><th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.projects.map(project  => (  
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td><Button varient="contained" color="secondary"
                                onClick={() =>  {this.deleteProject(project.id)}} 
                                >DELETE</Button></td>
                            </tr>  
                        ))}
                    </tbody>
                </table>
            </section>  
    </div>
    );
  }
}



const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AdminPage);
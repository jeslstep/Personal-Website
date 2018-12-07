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
   
    }

    // getProject dispatches a call to get projects 
     getProject = (event) => {
        this.props.dispatch({type: 'GET_PROJECTS'});
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
            tag_id: []
        },
        tag: {
          name:  [],
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
        this.setState({
             tag: {
                 name: [...this.state.tag.name, 
                    event.target.innerText]
             }
        })
    console.log(event.target.value);
         this.setState({
             projectPostObj: {
                 ...this.state.projectPostObj,
                 tag_id: event.target.value
             }
         });
    this.setState({ anchorEl: null });
    };

    // post projectPostObj
    projectPostObjPost = (event) => {
        event.preventDefault();
        console.log('adding project', this.state.projectPostObj);
        this.props.dispatch({type: 'ADD_PROJECT', payload: this.state.projectPostObj}); 
         this.setState({
             projectPostObj: { ...this.state.projectPostObj,
                name: '',
                description: '',
                thumbnail: '',
                website: '',
                github: '',
                tag_id: 0
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
                <section className="margin-right">
                 <TextField id="standard-name" value={this.state.name} label = "Name" 
                 onChange={this.handleChangeFor('name')}/>
                    <br/>
                 <TextField id="standard-name" value={this.state.description} label="Description" 
                 onChange={this.handleChangeFor('description')}/>
                    </section>
                    <section className="margin-right">
                 <TextField id="standard-name" value={this.state.thumbnail} label = "Thumbnail" 
                 onChange={this.handleChangeFor('thumbnail')}/>
                    <br/>
                 <TextField id="standard-name" value={this.state.website} label="Website" 
                 onChange={this.handleChangeFor('website')}/>
                   </section>
                   <section className="margin-right">
                 <TextField id="standard-name" value={this.state.github} label = "Github" 
                 onChange={this.handleChangeFor('github')}/>
                    <br/>
                 <TextField id="date" label="Date Completed" type="date" defaultValue="2017-05-24"
                    onChange={this.handleChangeFor('date_completed')}/>
                    </section>
                    <br/>
                 <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    Select a Tag
                    </Button>
                 <Menu
                 id="simple-menu"
                 anchorEl={anchorEl}
                 open={Boolean(anchorEl)}
                 onClose={this.handleClose}
                    >
                    <MenuItem value="1" name="React" onClick={this.handleClose}>React</MenuItem>
                    <MenuItem value="2" name="jQuery" onClick={this.handleClose}>jQuery</MenuItem>
                    <MenuItem value="3" name="Node" onClick={this.handleClose}>Node</MenuItem>
                    <MenuItem value="4" name="SQL" onClick={this.handleClose}>SQL</MenuItem>
                    <MenuItem value="5" name=">Redux" onClick={this.handleClose}>Redux</MenuItem>
                    <MenuItem value="6" name="HTML" onClick={this.handleClose}>HTML</MenuItem>
                    <MenuItem value="7" name="CSS3" onClick={this.handleClose}>CSS3</MenuItem>
                    <MenuItem value="8" name="Bootstrap" onClick={this.handleClose}>Bootstrap</MenuItem>
                    <MenuItem value="9" name="Material UI" onClick={this.handleClose}>Material UI</MenuItem>
                    </Menu>
                    <br/>
                    <div>
                    <section>
                    {this.state.tag.name.map( (name, index) => (
                        <Chip key={index} className="margin-left margin-top" label={name} variant="outlined"/>
                    ))}
                    </section>
                    </div>
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
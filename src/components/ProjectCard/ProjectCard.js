import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {connect} from 'react-redux';


class ProjectCard extends Component {

    // run these when page loads
    componentDidMount() {
      // run get getProjects
      this.getProject();
    }

     // dispatches a call to getProjectsSaga
    getProject = (event) => {
       this.props.dispatch({
         type: 'GET_PROJECTS'
       });
     }


  render (){
    return (
        <div>
            {this.props.reduxState.projects.map( project =>(
              <section key={project.id}>
              <Card className="card">
                  <CardMedia
                    component= "img"
                    height = "300"
                    width= "550"
                    alt= {project.description}
                    src = {project.thumbnail}
                    title={project.name}
                  />
                  <CardContent>
                    <br/>
                    <center>
                      <h2>{project.name}</h2>
                    </center>
                    <br/>
                    <div className="divforcard">
                    <p>{project.description}</p>
                    </div>
                  </CardContent>
                <div className="divforcard">
                <center>
                  <Button  color="secondary"><a className="a" target="_blank" rel="noopener noreferrer" href={project.website}>Website</a></Button>
                  <a className="b" target="_blank" rel="noopener noreferrer" href={project.website}>|</a>
                  <Button color="secondary"><a className="a" target="_blank" rel="noopener noreferrer" href={project.github}> Github</a></Button>
                </center>
                </div>
              </Card>
              </section>
            ))}
        </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(ProjectCard);
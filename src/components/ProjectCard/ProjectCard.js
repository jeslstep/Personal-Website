import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {connect} from 'react-redux';
import TechnologiesUsed from '../TechnologiesUsed/TechnologiesUsed';


class ProjectCard extends Component {



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
                <h2 id="giveMargin">{project.name}</h2>
                <div >
                <p className="divforcard">{project.description}</p>
                </div>
              </CardContent>
            <CardActions className="divforcard2">
             
              <a target="_blank" rel="noopener noreferrer" href={project.website}>Website</a>
              <a target="_blank" rel="noopener noreferrer" href={project.github}> Github</a>
             
            </CardActions>
          </Card>
          </section>
        ))}
        <TechnologiesUsed/>
    </div>
  );

}
}


const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(ProjectCard);
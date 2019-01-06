import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {connect} from 'react-redux';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';

class ProjectCard extends Component {



  render (){
  return (
    <div>
        {this.props.reduxState.projects.map( project =>(
          <section key={project.id}>
          <Card id="card">
            <CardActionArea>
              <CardMedia
                component="img"
                alt= "https://via.placeholder.com/160x80"
                height="200"
                src = "https://via.placeholder.com/160x80"
                title="Contemplative Reptile"
              />
              <Chip className="float-right" label={project.tag} variant="outlined"/>
              <CardContent>
                <h2 id="giveMargin">{project.name}</h2>
                <p>{moment(project.date_completed).format('MMMM Do YYYY')}</p>
                <p>{project.description}</p>
              </CardContent>
            </CardActionArea>
            <CardActions>
             
              <a target="_blank" rel="noopener noreferrer" href={project.website}>Website</a>
              
              <a target="_blank" rel="noopener noreferrer" href={project.github}> Github</a>
            </CardActions>
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
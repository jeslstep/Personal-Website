import React, { Component } from 'react';
import {connect} from 'react-redux';
import Chip from '@material-ui/core/Chip';

class TechnologiesUsed extends Component {

     // Renders the entire app on the DOM
     componentDidMount() {
        this.getTags();
    }

 // get tags 
 getTags = (event) => {
     this.props.dispatch({
         type: 'GET_TAGS'
     })
 }

  render (){
  return (
    <div className="padding">
       <h1 className="whitetextTech">Technologies Used</h1>
            {this.props.reduxState.tags.map( tag => (
                <Chip key={tag.id} className="margin-right" color="secondary" label={tag.name} variant="outlined"/>
            ))}
       
    </div>
  );

}
}


const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(TechnologiesUsed);
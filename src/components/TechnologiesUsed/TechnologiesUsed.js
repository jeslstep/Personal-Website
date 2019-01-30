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
        <div align="center">
            <h1 className="mainPageTitles">Technologies Used</h1>
        </div>
            {this.props.reduxState.tags.map( tag => (
                <Chip key={tag.id} className="margin-right" color="#AE2F2C" label={tag.name} variant="outlined"/>
            ))}
       
    </div>
  );

}
}


const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(TechnologiesUsed);
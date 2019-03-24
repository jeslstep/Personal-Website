import React, { Component } from 'react';
import {connect} from 'react-redux';
import Chip from '@material-ui/core/Chip';

const style = {
    color:'#AE2F2C',
    borderColor: '#AE2F2C'
};

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
    <div className="App slideDown">
        <div className="padding">
            {this.props.reduxState.tags.map( tag => (
                <Chip style={style} key={tag.id} className="margin-right" label={tag.name} variant="outlined"/>
            ))}
       </div>
    </div>
  );

}
}


const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(TechnologiesUsed);
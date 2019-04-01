import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {connect} from 'react-redux';


class AddTagCard extends Component {

    // state to store tag name
    state = {
        tag_name: '',
    }

    // sets the user input in state
    handleChangeFor = (propertyName) => {
           return (event) => {
               this.setState({
                   ...this.state,
                    [propertyName]: event.target.value
               });
           }
    }

    // post projectPostObj
    tagPostObjPost = (event) => {
           console.log('adding tag name', this.state.tag_name);
           this.props.dispatch({
               type: 'ADD_TAGS',
               payload: this.state.tag_name
           });
           this.setState({
               tag_name: '',
           });
    }
  

  render() {
    return (
        <div className="padding">
            <Card className="card2">
                <CardContent>
                    <h2 className="padding">Add a Tag</h2>
                        <div className="padding">
                            <TextField 
                                id="standard-name" 
                                value={this.state.tag_name} 
                                label="Name" 
                                onChange={this.handleChangeFor('tag_name')}
                            />
                            <br/>
                            <Button onClick={this.tagPostObjPost} color='primary' varient='contained'>Add New Tech Tag</Button>
                        </div>
                </CardContent>
            </Card>
        </div>
    );
  }
}


export default connect()(AddTagCard);

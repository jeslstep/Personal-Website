import React, { Component } from 'react';
import {connect} from 'react-redux';
import {storage} from '../../firebase/config';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';

class ProjectImgUpload extends Component {

    // state to store selected file
    state ={
        selectedFile: '',
        projectPostObj: { 
              name: '',
              description: '',
              thumbnail: '',
              website: '',
              github: '',
          }
    }

    // get file from input
    handleSelectedFile = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    // send file to firebase storage
    handleFileUpload = () => {
       if (this.state.selectedFile === null) {
         swal("Please select a file locally from your computer!", "warning");
         return
      }
      // creates the URL that the file will be stored at on FireBase
      const uploadTask = storage.ref(`img_file/${this.state.selectedFile.name}`).put(this.state.selectedFile);
      uploadTask.on('state_changed',
         (snapshot) => {
             console.log(snapshot);
         },
         (error) => {
            console.log(`The error:, `, error)
         },
            (complete) => {
                console.log('complete:', complete);
                // responds back with the complete URL labeled here as "thisUrl"
                storage.ref(`img_file`).child(this.state.selectedFile.name).getDownloadURL().then(thisUrl => {
                swal("File successfully uploaded!", "success");
                // Sets local state to include the new file URL
                this.setState({
                     projectPostObj: {
                        ...this.state.projectPostObjPost,
                            name: this.state.projectPostObj.name,
                            description: this.state.projectPostObj.description,
                            thumbnail: thisUrl,
                            website: this.state.projectPostObj.website,
                            github: this.state.projectPostObj.github,
                     }
                    });
                })
                .then((result) => {
                    console.log('result', result);
                    this.projectPostObjPost();
                })
                .catch((error) => {
                console.log('Error with uploadFile function after complete', error);
                });
            } 
      ) 
    }

       // sets the user input in state
       handleChangeFor = (propertyName) => {
           return (event) => {
               this.setState({
                   projectPostObj: { 
                       ...this.state.projectPostObj,
                       [propertyName]: event.target.value
                   }
               });
           }
       }

       // post projectPostObj
       projectPostObjPost = (event) => {
           console.log('adding project', this.state.projectPostObj);
           this.props.dispatch({
               type: 'ADD_PROJECT',
               payload: this.state.projectPostObj
           });
           this.setState({
               selectedFile: '',
               projectPostObj: { ...this.state.projectPostObj,
                    thumbnail: '',
                    name: '',
                    description: '',
                    website: '',
                    github: '',
               }
           });
       }

render() {
    return (
        <div>
            <Card>
                <CardContent>
                    <h1 className="padding">Add a Project</h1>
                    <div>
                        <TextField 
                            type="file" 
                            onChange={this.handleSelectedFile}
                        />
                    </div>
                    <br/>
                    <div>
                        <TextField 
                            id="standard-name" 
                            value={this.state.projectPostObj.name} 
                            label="Name" 
                            onChange={this.handleChangeFor('name')}
                        />
                        <br/>
                        <TextField 
                            id="standard-name" 
                            value={this.state.projectPostObj.description} 
                            label="Description" 
                            onChange={this.handleChangeFor('description')}
                        />
                        <br/>
                        <TextField 
                            id="standard-name" 
                            value={this.state.projectPostObj.website} 
                            label="Website" 
                            onChange={this.handleChangeFor('website')}
                        />
                        <br/>
                        <TextField 
                            id="standard-name" 
                            value={this.state.projectPostObj.github} 
                            label="Github" 
                            onChange={this.handleChangeFor('github')}
                        />
                        <br/>
                        <Button varient="contained" color="primary" onClick={this.handleFileUpload} >Add Project</Button>
                    </div>
            </CardContent>
        </Card>
    </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});


export default connect(mapReduxStateToProps)(ProjectImgUpload)

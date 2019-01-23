import React, { Component } from 'react';
import {storage} from '../../firebase/config';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import swal from 'sweetalert';

class FileUpload extends Component {

    // state to store selected file
    state ={
        selectedFile: '',
        selectedFileUrl: ''
    }

    // get resume file from input
    handleSelectedFile = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    // send file to firebase storage and return url for database
    handleFileUpload = () => {
       if (this.state.selectedFile === null) {
         swal("Please select a file locally from your computer!", "warning");
         return
      }
      // creates the URL that the file will be stored at on FireBase
      const uploadTask = storage.ref(`resume_file/${this.state.selectedFile.name}`).put(this.state.selectedFile);
      uploadTask.on('state_changed',
         (snapshot) => {
             console.log(snapshot);
         },
         (error) => {
            console.log(`The error:, `, error)
         },
            (complete) => {
                console.log('complete:', complete);
                // responds back with the complete URL as "thisUrl"
                storage.ref(`resume_file`).child(this.state.selectedFile.name).getDownloadURL().then(thisUrl => {
                swal("File successfully uploaded!", "success");
                // Sets local state to include the new file URL
                this.setState({
                     selectedFileUrl: thisUrl
                    
                });
                })
                .then((result) => {
                console.log('result', result);
                this.addPicture();
                })
                .catch((error) => {
                console.log('Error with uploadFile function after complete', error);
                });
        } 
      ) 
    }

  render() {
    return (
        <div className="padding">
            <Card>
                <CardContent>
                    <h1 className="padding">Upload Resume</h1>
                        <div className="padding">
                            <TextField 
                            type="file" 
                            value={this.state.selectedFile}
                            onChange={this.handleSelectedFile}
                            />
                            <br/>
                            <Button onClick={this.handleFileUpload} color='primary' varient='contained'>Upload</Button>
                        </div>
                </CardContent>
            </Card>
        </div>
    );
  }
}

export default FileUpload;

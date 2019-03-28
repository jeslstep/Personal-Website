import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {connect} from 'react-redux';
import TechnologiesUsed from '../TechnologiesUsed/TechnologiesUsed';

class TagsAddedCard extends Component {

  render() {
    return (
        <div className="padding">
            <Card>
                <CardContent className="divforcard">
                    <h1 className="padding">Tags Added</h1>
                        <div className="padding">
                            <TechnologiesUsed/>
                        </div>
                </CardContent>
            </Card>
        </div>
    );
  }
}


export default connect()(TagsAddedCard);

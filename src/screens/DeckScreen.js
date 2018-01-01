import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        {/* <Swipe
          //data={this.props.jobs}
          renderCard={this.renderCard}
          //renderNoMoreCards={this.renderNoMoreCards.bind(this)}
          // keyProp="jobkey"
        /> */}
      </View>
    );
  }
}

export default connect(null, actions)(DeckScreen);

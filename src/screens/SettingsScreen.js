import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import DialogBox from 'react-native-dialogbox';
import * as actions from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  handleOnPress = () => {
    this.dialogbox.confirm({
			title: 'Are you sure you want to delete all of your liked photos?',
			ok: {
				text: 'Delete',
				style: {
					color: 'red'
				}
			},
			cancel: {
				text: 'Cancel',
				style: {
					color: 'blue'
				}
			},
		}).then((event) => {
			if (event.button.text === 'Delete') {
        this.props.clearLikedJobs();
				this.dialogbox.alert(`Your photos have been removed`);
			}
		});
	}

  render() {
    return (
      <View>
        <Button
          title="Clear Photo History"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.handleOnPress}
        />
        <View style={{bottom: 200}}>
          <DialogBox
            ref={dialogbox => { this.dialogbox = dialogbox }}
          />
        </View>
      </View>
    );
  }

}

export default connect(null, actions)(SettingsScreen);

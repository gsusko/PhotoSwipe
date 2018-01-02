import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Liked Photos',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigate('settings')}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
        />
      ),
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="favorite" size={30} color={tintColor} />;
      },
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    };
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text>Review Screen</Text>
        <Text>Review Screen</Text>
        <Text>Review Screen</Text>
        <Text>Review Screen</Text>
        <Text>Review Screen</Text>
      </View>
    );
  }
}

mapStateToProps = ({ likedPhotos }) => {
  return {
    likedPhotos
  };
};

export default connect(mapStateToProps)(ReviewScreen);

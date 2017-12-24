import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';

class SearchScreen extends Component {

  async onButtonPress() {
    let pics = await axios.get('http://api.flickr.com/services/feeds/photos_public.gne?tags=dog,smart&format=json&nojsoncallback=true');

    console.log(pics)

  }

  render() {
    return (
      <View>
        <Button
          style={{marginTop: 50}}
          title="Search"
          onPress={() => this.onButtonPress()}
        />
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(SearchScreen);

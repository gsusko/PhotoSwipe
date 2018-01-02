import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {

  static navigationOptions = {
    title: 'Photos',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="image" size={30} color={tintColor} />;
    },
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  renderCard(photo) {
    let { farm, id, secret, server, title, datetaken } = photo;

    title = title || 'No Title';

    return (
      <Card
        title={title}
        titleStyle={styles.titleStyle}
        titleNumberOfLines={2}
      >
        <View style={{ height: 300, marginBottom: 10 }}>
          <Image
            style={{height: 300}}
            source={{uri: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>Date Taken: {datetaken}</Text>
        </View>
      </Card>
    );
  }

  renderNoMoreCards () {
    return (
      <Card title="No More Jobs">
        <Button
          title="Return to Map"
          backgroundColor="#03A9F4"
          large
          icon={{ name: 'my-location' }}
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 15 }}>
        <Swipe
          data={this.props.photos}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards.bind(this)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 45
  },
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

mapStateToProps = (state) => {
  return {
    photos: state.photos.photos
  }
}

export default connect(mapStateToProps, actions)(DeckScreen);

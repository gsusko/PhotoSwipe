import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Image, CameraRoll, Alert } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
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

  saveToCameraRoll(photo) {
    CameraRoll.saveToCameraRoll(photo.url_l)
      .then(Alert.alert('Success', 'Photo added to camera roll!'))
  }

  renderJobs() {
    return this.props.likedPhotos.map((photo, index) => {
      const { id, datetaken, farm, server, title, secret } = photo;

      return (
        <Card title={title} key={id}>
          <View style={{ height: 280 }}>
            <Image
              style={{height: 200}}
              source={{uri: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>Date Taken: {datetaken}</Text>
            </View>
            <View style={styles.buttonContainerStyle}>
              <View style={{width: '80%'}}>
                <Button
                  borderRadius={5}
                  title="Add to Your CameraRoll"
                  backgroundColor="#03A9F4"
                  onPress={() => this.saveToCameraRoll(photo)}
                />

              </View>
              <View style={styles.deleteButtonStyle}>
                <Icon
                  name="delete-forever"
                  color="red"
                  size={30}
                  //onPress={() => this.onDeletePress(index)}
                />
              </View>
            </View>
          </View>
        </Card>
      );
    });
  }

  render() {

    return (
      <ScrollView>
        {this.renderJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10
  },
  italics: {
    fontStyle: 'italic'
  },
  buttonContainerStyle: {
    flexDirection: 'row'
  },
  deleteButtonStyle: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

mapStateToProps = ({ likedPhotos }) => {
  return {
    likedPhotos
  };
};

export default connect(mapStateToProps)(ReviewScreen);

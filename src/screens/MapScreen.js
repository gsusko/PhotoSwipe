import React, { Component } from 'react';
import { MapView } from 'expo';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { Button, Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    },
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      region: {
        longitude: -122.4324,
        latitude: 37.78825,
        longitudeDelta: 0.0421,
        latitudeDelta: 0.0922
      },
      mapLoaded: false
    };
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.region.latitudeDelta === 75.79032656095 || nextState.region.latitudeDelta === 86.60682939371945) {
      nextState.region = {
        longitude: -122.4324,
        latitude: 37.78825,
        longitudeDelta: 0.0421,
        latitudeDelta: 0.0922
      };
    }
  }

  onRegionChangeComplete = (region) => {
    this.setState({region});
  }

  onButtonPress = () => {
    let { latitude, longitude } = this.state.region;
    this.props.fetchPhotos(latitude, longitude, this.props.term, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.searchBarStyle}>
          <SearchBar
            lightTheme
            round
            autoCorrect={false}
            containerStyle={styles.searchContainerStyle}
            onChangeText={value => this.props.updateSearch(value)}
            placeholder='Dogs, Warriors, Food, Etc...'
            color="black"
            inputStyle={styles.inputStyle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Search This Area"
            large
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={() => this.onButtonPress()}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  searchBarStyle: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0
  },
  searchContainerStyle: {
    backgroundColor: '#009688'
  },
  inputStyle: {
    color: 'black'
  }
}

mapStateToProps = (state) => {
  return {
    term: state.photos.term
  };
}

export default connect(mapStateToProps, actions)(MapScreen);

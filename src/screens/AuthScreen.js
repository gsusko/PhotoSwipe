import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import InstagramLogin from 'react-native-instagram-login';
import * as actions from '../actions';
import config from '../../config';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  async componentDidMount() {
    await this.props.checkForToken();
    if (this.props.token) {
      this.props.navigation.navigate('search');
    } else {
      this.refs.instagramLogin.show();
    }
  }

  render() {
    return (
      <View>
        <InstagramLogin style={styles.closeStyle}
          ref='instagramLogin'
          redirectUrl="http://127.0.0.1:19000"
          clientId={config.CLIENT_ID}
          scopes={['public_content', 'follower_list']}
          onLoginSuccess={(token) => this.props.instagramLogin(token, () => {
            this.props.navigation.navigate('search');
          })}
        />
      </View>
    );
  }
}

const styles = {
  closeStyle: {
    marginTop: 22
  }
};

mapStateToProps = state => {
  console.log(state.auth.token);
  return {
    token: state.auth.token
  };
}

export default connect(mapStateToProps, actions)(AuthScreen);

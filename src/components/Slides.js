import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

  renderButton(index) {
    const { data, onComplete } = this.props;
    if (index === data.length - 1) {
      return (
        <Button
          containerViewStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          title="Onwards!"
          raised
          onPress={onComplete}
        />
      );

    }
  }

  renderSlides() {
    const { slideTextStyle, slideContainerStyle } = styles;
    return this.props.data.map((slide, i) => {
      return (
        <View
          style={[slideContainerStyle, { backgroundColor: slide.color }]}
          key={slide.text}
        >
          <Text style={slideTextStyle}>{slide.text}</Text>
          {this.renderButton(i)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideTextStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  slideContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  buttonContainerStyle: {
    marginTop: 15
  },
  buttonStyle: {
    backgroundColor: '#0288D1'
  }
}

export default Slides;

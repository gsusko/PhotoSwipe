import React, { Component } from 'react';
import { View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 350;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderNoMoreCards: () => {},
    keyProp: 'id'
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });
    this.state = { panResponder, position, index: 0 };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }


  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  renderDeck() {
    const { data, renderNoMoreCards, renderCard, keyProp } = this.props;

    if (this.state.index >= data.length) {
      return renderNoMoreCards();
    }
    const deck = data.map((card, dataIndex) => {
      if (dataIndex < this.state.index) {
        return null;
      }
      if (dataIndex === this.state.index) {
        return (
          <Animated.View
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
            key={card[keyProp]}
          >
            {renderCard(card)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={card[keyProp]}
          style={[styles.cardStyle, { top: 5 * (dataIndex - this.state.index), zIndex: -dataIndex }]}
        >
          {renderCard(card)}
        </Animated.View>
      );
    });

    return Platform.OS === 'android' ? deck : deck.reverse();
  }

  render() {
    return (
        <View>
          {this.renderDeck()}
        </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    paddingTop: 10
  }
};

export default Swipe;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const propTypes = {
  children: PropTypes.string.isRequired,
  fixed: PropTypes.bool,
  typing: PropTypes.oneOf([-1, 0, 1]),
  maxDelay: PropTypes.number,
  minDelay: PropTypes.number,
  initialDelay: PropTypes.number,
  delayMap: PropTypes.arrayOf(delayShape),
  onTyped: PropTypes.func,
  onTypingEnd: PropTypes.func,
};

const MAX_DELAY = 100;

const defaultProps = {
  initialDelay: MAX_DELAY * 2,
  maxDelay: MAX_DELAY,
  minDelay: MAX_DELAY / 5,
  typing: 0,
  fixed: false,
  style: {},
};

class AnimatedText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      index: 0,
      finished: false,
    };

    this.timer = -1;
  }

  componentDidMount() {
    this.startAnimatedTyping();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.index !== prevState.index && this.state.index === this.props.text.length) {
      this.props.onTypingEnd();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = -1;
  }

  startAnimatedTyping = () => {
    clearTimeout(this.timer);
    this.timer = -1;
    if (this.state.index < this.props.text.length) {
      this.setState(
        {
          text: this.state.text + this.props.text.charAt(this.state.index),
          index: this.state.index + 1,
        },
        () => {
          this.timer = setTimeout(this.startAnimatedTyping, this.props.animatedTypingDuration);
        }
      );
    }
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    padding: 5,
  },
});

AnimatedText.defaultProps = {
  text: 'You are one hot mama.',
  textColor: '#FFA613',
  animatedTextSize: 26,
  animatedTypingDuration: 50,
  startCursorDuration: 500,
};

AnimatedText.propTypes = {
  text: PropTypes.string,
  AnimatedTextSize: PropTypes.number,
  TextColor: PropTypes.string,
  AnimatedTypingDuration: PropTypes.number,
  startCursorDuration: PropTypes.number,
};

export default AnimatedText;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

class AnimatedTypewriter extends React.Component {
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
    if (this.state.index !== prevState.index) {
      this.props.onTyped(this.state.index, this.props.text.substring(0, this.state.text));
    }
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
          this.timer = setTimeout(this.startAnimatedTyping, this.props.timeBetweenLetters);
        }
      );
    }
  };

  render() {
    const { containerStyle, textStyle, ...props } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]} {...props}>
          {this.state.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    padding: 5,
  },
});

AnimatedTypewriter.defaultProps = {
  textColor: '#FFA613',
  timeBetweenLetters: 50,
  containerStyle: {},
  textStyle: {},
  textProps: {},
  onTypingEnd: () => {},
  onTyped: () => {},
};

AnimatedTypewriter.propTypes = {
  text: PropTypes.string.isRequired,
  timeBetweenLetters: PropTypes.number,
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  onTypingEnd: PropTypes.func,
  onTyped: PropTypes.func,
};

export default AnimatedTypewriter;

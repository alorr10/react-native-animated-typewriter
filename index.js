import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

function AnimatedTypewriter({
  text,
  timeBetweenLetters,
  onTyped,
  onTypingEnd,
  containerStyle,
  textStyle,
  ...rest
}) {
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(timeBetweenLetters);

  const startAnimatedTyping = () => {
    if (index < text.length) {
      setCurrentText((t) => t + text.charAt(index));
      setIndex((i) => i + 1);
    }
  };
  useInterval(startAnimatedTyping, delay);

  useEffect(() => {
    if (index > 0) onTyped(index, text.substring(0, text));
    if (index === text.length) {
      setDelay(null);
      onTypingEnd();
    }
  }, [index]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]} {...rest}>
        {currentText}
      </Text>
    </View>
  );
}

//Taken from https://overreacted.io/ Thank you!!
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
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

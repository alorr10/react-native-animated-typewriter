# react-native-typewriter

A [React Native] component for spelling out words, letter by letter.

## Installation

```
$ yarn add react-native-animated-typewriter
```

OR

```
$ npm install --save react-native-animated-typewriter
```

## Usage

All you need is a text prop to make it work.

```javascript

import React, { Component } from 'react'
import AnimatedTypeWriter from 'react-native-animated-typewriter'

class YourLitComponent extends Component {
  render() {
    return <AnimatedTypewriter text="I'm living my best life in 2019"/>
  }
}
```

## Documentation

Any props accepted by React Native's `Text` component are accepted by `TypeWriter`. These additional props are also accepted:

### timeBetweenLetters

type: `Number` default: `50`

The number of milliseconds between letters typed on the screen

### containerStyle

type: `Boolean` default: `false`

This flag will ensure the enclosing container's size and shape is fixed.
Prevents the text from shifting around as it grows into its container.

### maxDelay

type: `Number` default: `100`

The maximum delay between each typed token in milliseconds.


### onTyped

type: `Function` default: `none`

A callback called when each token is typed during the animation. The
function is called with two arguments:
`(Number index, Number previousVisibleCharacters)`.

### onTypingEnd

type: `Function` default: `none`

Called once the typing animation has completed.

## License

Released under the MIT license. See [LICENSE](LICENSE) for details.

[React Native]: https://facebook.github.io/react-native/

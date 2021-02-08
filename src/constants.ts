import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

enum GESTURE {
  UNDETERMINED = 0,
  CONTENT,
  HANDLE,
}

enum ANIMATION_STATE {
  UNDETERMINED = 0,
  RUNNING,
  STOPPED,
}

enum KEYBOARD_STATE {
  UNDETERMINED = 0,
  SHOWN,
  HIDDEN,
}

const KEYBOARD_EASING_MAPPER = {
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInEaseOut: Easing.inOut(Easing.ease),
  keyboard: Easing.bezier(0.17, 0.59, 0.4, 0.77),
  linear: Easing.linear,
};

export {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  GESTURE,
  ANIMATION_STATE,
  KEYBOARD_STATE,
  KEYBOARD_EASING_MAPPER,
};

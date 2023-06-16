import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { GesturePassword } from 'react-native-gesture-password';

export default function App() {
  let circleStyle, centerStyle, lineStyle;

  // const [isWrong, setIsWrong] = React.useState<boolean>(false);

  // if (isWrong) {
  //   textStyle = styles.text;
  //   circleStyle = styles.circle;
  //   centerStyle = styles.center;
  //   lineStyle = styles.line;
  // }

  const handleRelease = (sequence: string) => {
    console.log('handleRelease:', sequence);
  };

  const handleClear = (password: string) => {
    console.log('handleClear:', password);
  };

  return (
    <View style={styles.container}>
      <GesturePassword
        clearTime={1000}
        linedCircleStyle={circleStyle}
        linedCenterStyle={centerStyle}
        lineStyle={lineStyle}
        onRelease={handleRelease}
        onClear={handleClear}
      />
    </View>
  );
}

const COLOR_RED = 'rgba(252, 13, 27, 1)';
const COLOR_RED_02 = 'rgba(252, 13, 27, 0.2)';
const COLOR_RED_04 = 'rgba(252, 13, 27, 0.4)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  view: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: COLOR_RED_02,
    borderColor: COLOR_RED_04,
  },
  center: {
    backgroundColor: COLOR_RED,
  },
  line: {
    backgroundColor: COLOR_RED,
  },
  text: {
    color: COLOR_RED,
  },
});

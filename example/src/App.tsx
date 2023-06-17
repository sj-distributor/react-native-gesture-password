import React, { useMemo, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { GesturePassword } from '@sj-distributor/react-native-gesture-password';

const SIMULATE_PASSWORD = '1234';

export default function App() {
  const [title, setTitle] = useState<string>('Please enter your password.');

  const [isError, setIsError] = useState<boolean>(false);

  const { circleStyle, centerStyle, lineStyle } = useMemo(() => {
    let circleStyle,
      centerStyle,
      lineStyle = {};

    if (isError) {
      lineStyle = styles.line;
      circleStyle = styles.circle;
      centerStyle = styles.center;
    }
    return { circleStyle, centerStyle, lineStyle };
  }, [isError]);

  const handleTouch = () => {
    setIsError(false);

    console.log('Touch');
  };

  const handleRelease = (password: string) => {
    if (password.length < 4) {
      setTitle('Password length should not be less than 4.');

      return setIsError(true);
    }

    if (password === SIMULATE_PASSWORD) {
      setTitle(`Your password is: ${password}.`);
    } else {
      setTitle('The password you entered is incorrect');

      return setIsError(true);
    }

    console.log('handleRelease:', password);
  };

  const handleClear = (password: string) => {
    setIsError(false);

    setTitle('Please enter your password.');

    console.log('handleClear:', password);
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <GesturePassword
        clearTime={1000}
        linedDotCircleStyle={circleStyle}
        linedDotCenterStyle={centerStyle}
        lineStyle={lineStyle}
        onTouch={handleTouch}
        onClear={handleClear}
        onRelease={handleRelease}
      />
    </View>
  );
}

const COLOR_RED = 'rgba(243, 101, 92, 1)';
const COLOR_RED_02 = 'rgba(243, 101, 92, 0.2)';
const COLOR_RED_04 = 'rgba(243, 101, 92, 0.4)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: COLOR_RED,
  },
  circle: {
    backgroundColor: COLOR_RED_02,
    borderColor: COLOR_RED_04,
  },
  center: {
    backgroundColor: COLOR_RED,
  },
});

import React, { memo } from 'react';
import style from './styles';
import { View } from 'react-native';
import { angleOfPoint, distanceOfPoint, vectorOfPoint } from './utils';

export const Line = memo(({ styles, start, end }: any) => {
  const len = distanceOfPoint(start, end);
  const angle = angleOfPoint(start, end);
  const vector = vectorOfPoint(start, end);

  const lineStyle = {
    width: len,
    left: start.x,
    top: start.y,
    transform: [
      { translateX: vector.x },
      { translateY: vector.y },
      { rotate: `${angle}deg` },
    ],
  };

  return <View style={[style.lineView, lineStyle, styles]}></View>;
});

import React, { memo, useMemo } from 'react';
import style from './styles';
import { View } from 'react-native';
import {
  calculateAngle,
  calculateDistanceBetweenPoints,
  calculateVectorBetweenPoints,
} from './utils';
import type { ILineProps } from './types';

export const Line = memo(
  ({ startPoint, endPoint, customStyles }: ILineProps) => {
    const { len, angle, vector } = useMemo(
      () => ({
        len: calculateDistanceBetweenPoints(startPoint, endPoint),
        angle: calculateAngle(startPoint, endPoint),
        vector: calculateVectorBetweenPoints(startPoint, endPoint),
      }),
      [startPoint, endPoint]
    );

    const lineStyle = useMemo(
      () => ({
        width: len,
        left: startPoint.x,
        top: startPoint.y,
        transform: [
          { translateX: vector.x },
          { translateY: vector.y },
          { rotate: `${angle}deg` },
        ],
      }),
      [angle, len, startPoint.x, startPoint.y, vector.x, vector.y]
    );

    return <View style={[lineStyle, style.lineView, customStyles]} />;
  }
);

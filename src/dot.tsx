import React, { memo } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import style from './styles';
import type { IDotProps } from './types';

export const Dot = memo(
  ({
    id,
    lined,
    dotCircleStyle,
    dotCenterStyle,
    onChange,
    linedDotCircleStyle,
    linedDotCenterStyle,
  }: IDotProps) => {
    const circleLinedStyle = lined
      ? [style.dotCircleLined, linedDotCircleStyle]
      : [];

    const centerLinedStyle = lined
      ? [style.dotCenterLined, linedDotCenterStyle]
      : [];

    const layout = (event: LayoutChangeEvent) => {
      if (onChange) {
        const { x, y, width } = event.nativeEvent.layout;
        const radius = 0.5 * width;
        const center = { x: x + radius, y: y + radius };

        onChange(id, center, radius);
      }
    };

    return (
      <View
        style={[style.dotCircle, dotCircleStyle, ...circleLinedStyle]}
        onLayout={layout}
      >
        <View style={[style.dotCenter, dotCenterStyle, ...centerLinedStyle]} />
      </View>
    );
  }
);

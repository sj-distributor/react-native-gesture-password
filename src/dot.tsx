import React, { memo } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import style from './styles';

export const Dot = memo(
  ({
    id,
    lined,
    circleStyle,
    centerStyle,
    reportCenter,
    linedCircleStyle,
    linedCenterStyle,
  }: any) => {
    const circleLinedStyle = lined ? [style.circleLined, linedCircleStyle] : [];
    const centerLinedStyle = lined ? [style.centerLined, linedCenterStyle] : [];

    const layout = (event: LayoutChangeEvent) => {
      if (reportCenter) {
        const { x, y, width } = event.nativeEvent.layout;
        const radius = 0.5 * width;
        const center = { x: x + radius, y: y + radius };

        reportCenter(id, center, radius);
      }
    };

    return (
      <View
        style={[style.circle, circleStyle, ...circleLinedStyle]}
        onLayout={layout}
      >
        <View style={[style.center, centerStyle, ...centerLinedStyle]}></View>
      </View>
    );
  }
);

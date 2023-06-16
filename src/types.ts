import type { StyleProp, ViewStyle } from 'react-native';

export interface IGesturePasswordProps {
  width?: number;
  height?: number;
  clearTime?: number;
  lineStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>;
  centerStyle?: StyleProp<ViewStyle>;
  linedCircleStyle?: StyleProp<ViewStyle>;
  linedCenterStyle?: StyleProp<ViewStyle>;
  onTouch?: () => void;
  onClear?: (sequence: string) => void;
  onRelease?: (sequence: string) => void;
}

export interface IPoint {
  x: number;
  y: number;
  lined?: boolean;
  center?: IPoint;
  radius?: number;
}

export interface IPoints {
  [key: string]: IPoint;
}

export interface ILines {
  id: string;
  start: IPoint;
  end?: IPoint;
}

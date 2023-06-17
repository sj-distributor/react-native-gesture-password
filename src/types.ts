import type { StyleProp, ViewStyle } from 'react-native';

export interface IGesturePasswordProps {
  /**
   * The width of the container.
   */
  width?: number;

  /**
   * The height of the container.
   */
  height?: number;

  /**
   * The default clear time in milliseconds.
   *
   * After this time elapses since the gesture is released, the password will be cleared.
   *
   * Defaults to 1000 milliseconds.
   */
  clearTime?: number;

  /**
   * The style for the lines connecting the dots.
   */
  lineStyle?: StyleProp<ViewStyle>;

  /**
   * The style for the dots' outer circle.
   */
  dotCircleStyle?: StyleProp<ViewStyle>;

  /**
   * The style for the dots' center.
   */
  dotCenterStyle?: StyleProp<ViewStyle>;

  /**
   * The style for the dots' outer circle when activated.
   */
  linedDotCircleStyle?: StyleProp<ViewStyle>;

  /**
   * The style for the dots' center when activated.
   */
  linedDotCenterStyle?: StyleProp<ViewStyle>;

  /**
   * Callback triggered after the initial touch.
   */
  onTouch?: () => void;

  /**
   * Callback triggered when the gesture is released and the clearTime has ended.
   *
   * @param password - The entered password as a string.
   */
  onClear?: (password: string) => void;

  /**
   * Callback triggered when the gesture is released.
   *
   * @param password - The entered password as a string.
   */
  onRelease?: (password: string) => void;
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
  end?: IPoint;
  start: IPoint;
}

export interface ILineProps {
  endPoint: IPoint;
  startPoint: IPoint;
  customStyles?: StyleProp<ViewStyle>;
}

export interface IDotProps {
  id: string;
  lined?: boolean;
  onChange?: (id: string, center: IPoint, radius: number) => void;
  dotCircleStyle?: StyleProp<ViewStyle>;
  dotCenterStyle?: StyleProp<ViewStyle>;
  linedDotCircleStyle?: StyleProp<ViewStyle>;
  linedDotCenterStyle?: StyleProp<ViewStyle>;
}

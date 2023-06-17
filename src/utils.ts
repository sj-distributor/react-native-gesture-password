import { Dimensions } from 'react-native';
import type { IPoint } from './types';

/**
 * Default clear time in milliseconds.
 */
export const DEFAULT_CLEAR_TIME = 1000;

const { width, height } = Dimensions.get('window');

/**
 * Default width based on the smaller dimension of the device screen.
 */
export const DEFAULT_WIDTH = Math.min(width, height);

/**
 * Default height based on the smaller dimension of the device screen.
 */
export const DEFAULT_HEIGHT = Math.min(width, height);

/**
 * Calculates the distance between two points.
 *
 * @param start The starting point.
 * @param end The ending point.
 * @returns The distance between the two points.
 */
export const calculateDistanceBetweenPoints = (
  startPoint: IPoint,
  endPoint: IPoint
): number => {
  return Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
};

/**
 * Calculates the angle between two points.
 *
 * @param start The starting point.
 * @param end The ending point.
 * @returns The angle between the two points in degrees.
 */
export const calculateAngle = (
  startPoint: IPoint,
  endPoint: IPoint
): number => {
  let numerator = endPoint.y - startPoint.y;
  let denominator =
    endPoint.x - startPoint.x === 0
      ? Number.MIN_VALUE
      : endPoint.x - startPoint.x;
  return (Math.atan(numerator / denominator) * 180) / Math.PI;
};

/**
 * Calculates the vector between two points.
 *
 * @param start The starting point.
 * @param end The ending point.
 * @returns The vector between the two points.
 */
export const calculateVectorBetweenPoints = (
  startPoint: IPoint,
  endPoint: IPoint
): IPoint => {
  let len = calculateDistanceBetweenPoints(startPoint, endPoint);
  let x = (endPoint.x - startPoint.x - len) * 0.5;
  let y = (endPoint.y - startPoint.y) * 0.5;
  return { x: x, y: y };
};

import { Dimensions } from 'react-native';
import type { IPoint } from './types';

const { width, height } = Dimensions.get('window');

// dimension
export const DIMENSION_WIDTH = Math.min(width, height) - 40;
export const DIMENSION_HEIGHT = Math.min(width, height) - 40;

export const DIMENSION_PAD_WIDTH = 80;
export const DIMENSION_PAD_HEIGHT = 80;

// reset duration
export const CLEAR_TIME = 200;

/** distance of two point */
export const distanceOfPoint = (start: IPoint, end: IPoint): number => {
  return Math.hypot(end.x - start.x, end.y - start.y);
};

/** angle of two point */
export const angleOfPoint = (start: IPoint, end: IPoint): number => {
  let numerator = end.y - start.y;
  let denominator = end.x - start.x === 0 ? Number.MIN_VALUE : end.x - start.x;
  return (Math.atan(numerator / denominator) * 180) / Math.PI;
};

/** vector of two point */
export const vectorOfPoint = (start: IPoint, end: IPoint): IPoint => {
  let len = distanceOfPoint(start, end);
  let x = (end.x - start.x - len) * 0.5;
  let y = (end.y - start.y) * 0.5;
  return { x: x, y: y };
};

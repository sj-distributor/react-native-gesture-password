import { StyleSheet } from 'react-native';

// color
export const COLOR_GRAY = '#D9DFE7';

export const COLOR_BLUE_SYS = '#157EFB';
export const COLOR_BLUE_SYS_02 = 'rgba(21, 126, 251, 0.2)';
export const COLOR_BLUE_SYS_04 = 'rgba(21, 126, 251, 0.4)';

export const COLOR_RED = 'rgba(252, 13, 27, 1)';
export const COLOR_RED_02 = 'rgba(252, 13, 27, 0.2)';
export const COLOR_RED_04 = 'rgba(252, 13, 27, 0.4)';

export default StyleSheet.create({
  lineView: {
    height: 4,
    backgroundColor: COLOR_BLUE_SYS,
    position: 'absolute',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: COLOR_BLUE_SYS_04,
  },
  circleLined: {
    backgroundColor: COLOR_BLUE_SYS_02,
  },
  center: {
    width: 24,
    height: 24,
    backgroundColor: COLOR_GRAY,
    borderRadius: 12,
  },
  centerLined: {
    backgroundColor: COLOR_BLUE_SYS,
  },
});

import { StyleSheet } from 'react-native';

export const COLOR_GRAY = '#EEEEEE';

export const COLOR_BLUE_SYS = '#255CFF';
export const COLOR_BLUE_SYS_02 = 'rgba(37, 92, 255, 0.2)';
export const COLOR_BLUE_SYS_04 = 'rgba(37, 92, 255, 0.4)';

export default StyleSheet.create({
  lineView: {
    height: 4,
    position: 'absolute',
    backgroundColor: COLOR_BLUE_SYS,
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dotCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderWidth: 1,
    borderRadius: 32,
    borderColor: COLOR_BLUE_SYS_04,
  },
  dotCircleLined: {
    backgroundColor: COLOR_BLUE_SYS_02,
  },
  dotCenter: {
    width: 24,
    height: 24,
    backgroundColor: COLOR_GRAY,
    borderRadius: 12,
  },
  dotCenterLined: {
    backgroundColor: COLOR_BLUE_SYS,
  },
});

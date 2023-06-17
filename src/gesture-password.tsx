import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { GestureResponderEvent, PanResponder, View } from 'react-native';
import { Line } from './line';
import { Dot } from './dot';
import {
  DEFAULT_CLEAR_TIME,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  calculateDistanceBetweenPoints,
} from './utils';
import style from './styles';
import type { IGesturePasswordProps, ILines, IPoint, IPoints } from './types';

const DEFAULT_POINTS: IPoints = {
  A: { x: 0, y: 0 },
  B: { x: 0, y: 0 },
  C: { x: 0, y: 0 },
  D: { x: 0, y: 0 },
  E: { x: 0, y: 0 },
  F: { x: 0, y: 0 },
  G: { x: 0, y: 0 },
  H: { x: 0, y: 0 },
  I: { x: 0, y: 0 },
};

const GesturePassword: React.FC<IGesturePasswordProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  clearTime = DEFAULT_CLEAR_TIME,
  lineStyle,
  dotCircleStyle,
  dotCenterStyle,
  linedDotCircleStyle,
  linedDotCenterStyle,
  onTouch,
  onClear,
  onRelease,
}) => {
  const pageXRef = useRef<number>(0);

  const pageYRef = useRef<number>(0);

  const passwordRef = useRef<string>('');

  const containerRef = useRef<View>(null);

  const [lines, setLines] = useState<ILines[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [points, setPoints] = useState<IPoints>(DEFAULT_POINTS);

  const handleMove = useCallback(
    ({ nativeEvent }: GestureResponderEvent) => {
      const current = {
        x: nativeEvent.pageX - pageXRef.current,
        y: nativeEvent.pageY - pageYRef.current,
      };

      if (
        current.x < 0 ||
        current.x > width ||
        current.y < 0 ||
        current.y > height
      ) {
        return;
      }

      setLines((prevLines) => {
        let updatedLines = [...prevLines];

        Object.entries(points).forEach(([id, point]) => {
          if (!point.lined && point.radius && point.center) {
            const lined =
              calculateDistanceBetweenPoints(current, point.center) <=
              point.radius;

            if (lined && point.center) {
              point.lined = true;
              passwordRef.current += id.charCodeAt(0) - 64;

              if (updatedLines.length > 0) {
                const lastLineIndex = updatedLines.length - 1;
                updatedLines[lastLineIndex] = {
                  ...updatedLines[lastLineIndex],
                  end: point.center,
                };
              }

              const line = { id, start: point.center };
              updatedLines = [...updatedLines, line];
            }
          }
        });

        return updatedLines;
      });
    },
    [width, height, points]
  );

  const handleClear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    onClear && onClear(passwordRef.current);

    const newPoints = Object.fromEntries(
      Object.entries(points).map(([id, point]) => [
        id,
        { ...point, lined: false },
      ])
    );

    setLines([]);
    setPoints(newPoints);
    passwordRef.current = '';
  }, [onClear, points]);

  const handleGrant = useCallback(() => {
    handleClear();
    onTouch && onTouch();
  }, [handleClear, onTouch]);

  const handleRelease = useCallback(() => {
    onRelease && onRelease(passwordRef.current);

    timerRef.current = setTimeout(handleClear, clearTime);
  }, [clearTime, handleClear, onRelease]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onPanResponderMove: handleMove,
        onPanResponderGrant: handleGrant,
        onPanResponderRelease: handleRelease,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => false,
        onStartShouldSetPanResponderCapture: () => false,
      }),
    [handleGrant, handleMove, handleRelease]
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      containerRef.current?.measure((_x, _y, _width, _height, pageX, pageY) => {
        if (pageXRef.current === pageX && pageYRef.current === pageY) {
          clearInterval(timerRef.current!);
        } else {
          pageXRef.current = pageX;
          pageYRef.current = pageY;
        }
      });
    }, 100);

    return () => {
      clearTimeout(timerRef.current!);
    };
  }, []);

  const onChange = useCallback(
    (id: string, center: IPoint, radius: number) => {
      if (['D', 'E', 'F'].includes(id)) {
        center.y += height / 3;
      } else if (['G', 'H', 'I'].includes(id)) {
        center.y += (height * 2) / 3;
      }

      setPoints((prevPoints) => ({
        ...prevPoints,
        [id]: {
          ...prevPoints[id],
          lined: false,
          center: center,
          radius: radius,
        },
      }));
    },
    [height]
  );

  const renderLine = () => {
    return (
      <>
        {lines.map((item: ILines) => {
          if (item.end) {
            return (
              <Line
                key={item.id}
                endPoint={item.end}
                startPoint={item.start}
                customStyles={lineStyle}
              />
            );
          }

          return null;
        })}
      </>
    );
  };

  const renderDot = (id: string) => {
    const point = points[id];

    return (
      <Dot
        id={id}
        key={id}
        lined={point.lined}
        onChange={onChange}
        dotCircleStyle={dotCircleStyle}
        dotCenterStyle={dotCenterStyle}
        linedDotCircleStyle={linedDotCircleStyle}
        linedDotCenterStyle={linedDotCenterStyle}
      />
    );
  };

  return (
    <View
      ref={containerRef}
      style={{ width, height }}
      collapsable={false}
      {...panResponder.panHandlers}
    >
      {renderLine()}

      <View style={style.row}>
        {['A', 'B', 'C'].map((id) => renderDot(id))}
      </View>

      <View style={style.row}>
        {['D', 'E', 'F'].map((id) => renderDot(id))}
      </View>

      <View style={style.row}>
        {['G', 'H', 'I'].map((id) => renderDot(id))}
      </View>
    </View>
  );
};

export default GesturePassword;

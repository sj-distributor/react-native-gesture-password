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
  CLEAR_TIME,
  DIMENSION_HEIGHT,
  DIMENSION_WIDTH,
  distanceOfPoint,
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
  width = DIMENSION_WIDTH,
  height = DIMENSION_HEIGHT,
  clearTime = CLEAR_TIME,
  lineStyle,
  circleStyle,
  centerStyle,
  linedCircleStyle,
  linedCenterStyle,
  onTouch,
  onClear,
  onRelease,
}) => {
  const password = useRef<string>('');

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

        for (const id in points) {
          const point = points[id];
          if (!point.lined && point.radius && point.center) {
            const lined =
              distanceOfPoint(current, point.center) <= point.radius;

            if (lined && point.center) {
              point.lined = true;
              password.current += id.charCodeAt(0) - 64;

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
        }

        return updatedLines;
      });
    },
    [width, height, points]
  );

  const handleClear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    onClear && onClear(password.current);

    const newPoints = { ...points };
    for (const id in newPoints) {
      newPoints[id].lined = false;
    }

    setLines([]);
    setPoints(newPoints);
    password.current = '';
  };

  const handleGrant = () => {
    handleClear();
    onTouch && onTouch();
  };

  const handleRelease = () => {
    onRelease && onRelease(password.current);

    timerRef.current = setTimeout(handleClear, clearTime);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const ref = useRef<View>(null);
  const pageXRef = useRef<number>(0);
  const pageYRef = useRef<number>(0);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      ref.current?.measure((_x, _y, _width, _height, pageX, pageY) => {
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

  const reportCenter = (id: string, center: IPoint, radius: number) => {
    if (['D', 'E', 'F'].includes(id)) {
      center.y += height / 3;
    }
    if (['G', 'H', 'I'].includes(id)) {
      center.y += (height * 2) / 3;
    }

    points[id] = {
      ...points[id],
      center: center,
      radius: radius,
      lined: false,
    };
  };

  return (
    <View
      ref={ref}
      style={{ width, height }}
      collapsable={false}
      {...panResponder.panHandlers}
    >
      {lines.length > 0 &&
        lines.map((item: any) => {
          if (item.end) {
            return (
              <Line
                tail
                key={item.id}
                start={item.start}
                end={item.end}
                style={lineStyle}
              />
            );
          }
          return null;
        })}

      <View style={style.row}>
        <Dot
          id="A"
          lined={points.A.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
        <Dot
          id="B"
          lined={points.B.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
        <Dot
          id="C"
          lined={points.C.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
      </View>

      <View style={style.row}>
        <Dot
          id="D"
          lined={points.D.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
        <Dot
          id="E"
          lined={points.E.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
        <Dot
          id="F"
          lined={points.F.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
      </View>

      <View style={style.row}>
        <Dot
          id="G"
          lined={points.G.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
        <Dot
          id="H"
          lined={points.H.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
        <Dot
          id="I"
          lined={points.I.lined}
          reportCenter={reportCenter}
          circleStyle={circleStyle}
          centerStyle={centerStyle}
          linedCircleStyle={linedCircleStyle}
          linedCenterStyle={linedCenterStyle}
        />
      </View>
    </View>
  );
};

export default GesturePassword;

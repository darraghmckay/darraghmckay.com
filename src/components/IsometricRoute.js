import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Point } from 'isomer';
import IsomerRoute from 'isomer-route';
import { useAnimationFrame } from '../utils/hooks';
const IsometricRoute = ({
  children,
  drawRoute,
  height,
  scale,
  width,
  ...rest
}) => {
  const canv = useRef(null);
  const route = useRef(null);
  const [time, setTime] = useState(0);

  const clearCanvas = () => {
    const context = canv.current.getContext('2d');
    context.clearRect(0, 0, canv.current.width, canv.current.height);
  };

  useAnimationFrame(timeDelta => {
    setTime(time + timeDelta * 0.1);
  });

  useEffect(() => {
    if (canv.current) {
      clearCanvas();
      route.current = new IsomerRoute(canv.current, Point(0, 0, 0));
      drawRoute(route.current);
    }
  }, [canv, drawRoute]);

  return (
    <div className="isometric-route" {...rest}>
      {children}
      <canvas
        className="isometric-canvas mx-auto"
        ref={canv}
        width={width * scale}
        height={height * scale}
        style={{
          height,
          width,
          maxWidth: '100%',
        }}
      />
    </div>
  );
};

IsometricRoute.propTypes = {
  drawRoute: PropTypes.func.isRequired,
  height: PropTypes.number,
  scale: PropTypes.number,
  width: PropTypes.number,
};

IsometricRoute.defaultProps = {
  height: 3200,
  scale: 4,
  width: 2688,
};

export default IsometricRoute;

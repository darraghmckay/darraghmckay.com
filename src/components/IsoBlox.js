import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Color, Point } from 'isomer';
import { red } from 'isomer-route/src/colors';
import DIR from 'isomer-route/src/directions';
import IsometricRoute from './IsometricRoute';
import { useEventListener } from '../utils/hooks';

const IsoBlox = ({ bloxOrigin, drawRoute, ...rest }) => {
  let bloxRoute = useRef(null);
  const [origin, setOrigin] = useState(bloxOrigin);

  const handleKeyPress = event => {
    if (event.keyCode === 39) {
      // ArrowRight
      event.preventDefault();
      if (!event.metaKey && !event.ctrl) {
        const maybeNextOrigin = bloxRoute.current.getEquivalentPoint(
          Point(origin.x, origin.y - 1, origin.z),
        );
        if (maybeNextOrigin) {
          setOrigin(maybeNextOrigin);
        }
      }
    } else if (event.keyCode === 37) {
      // ArrowLeft
      event.preventDefault();
      if (!event.metaKey && !event.ctrl) {
        const maybeNextOrigin = bloxRoute.current.getEquivalentPoint(
          Point(origin.x, origin.y + 1, origin.z),
        );
        if (maybeNextOrigin) {
          setOrigin(maybeNextOrigin);
        }
      }
    } else if (event.keyCode === 40) {
      // ArrowDown
      event.preventDefault();
      const maybeNextOrigin = bloxRoute.current.getEquivalentPoint(
        Point(origin.x - 1, origin.y, origin.z),
      );
      if (maybeNextOrigin) {
        setOrigin(maybeNextOrigin);
      }
    } else if (event.keyCode === 38) {
      // ArrowUp
      event.preventDefault();
      const maybeNextOrigin = bloxRoute.current.getEquivalentPoint(
        Point(origin.x + 1, origin.y, origin.z),
      );
      if (maybeNextOrigin) {
        setOrigin(maybeNextOrigin);
      }
    }
  };

  useEventListener('keydown', handleKeyPress);

  return (
    <div className="iso-blox" {...rest}>
      <IsometricRoute
        {...rest}
        drawRoute={route => {
          drawRoute(route);

          route
            .addBlocks(
              route
                .split()
                .setOrigin(origin)
                .addTrack(1, DIR.X, block => block.setColor(red)).blockGroups,
            )
            .draw();

          bloxRoute.current = route;
        }}
      />
    </div>
  );
};

IsoBlox.propTypes = {
  bloxOrigin: PropTypes.instanceOf(Point),
  ...IsometricRoute.propTypes,
};

IsoBlox.defaultProps = {
  bloxOrigin: Point(0, 0, 1),
  color: red,
  ...IsometricRoute.defaultProps,
};

export default IsoBlox;

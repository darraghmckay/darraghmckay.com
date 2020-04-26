import React, { useEffect, useRef, useState } from 'react';
import { Color, Point } from 'isomer';
import IsomerRoute from 'isomer-route';
import DIR from 'isomer-route/src/directions';
import { blue, darkGreen, red } from 'isomer-route/src/colors';
import IsometricRoute from '../../components/IsometricRoute';
import { useEventListener } from '../../utils/hooks';

const green = new Color(60, 160, 50);
const GRID_SIZE = 16;

const randomInt = (max = 6, min = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRoute = (route, lengths = 30) => {
  let lengthsX = lengths;
  let direction = route.direction;
  while (lengthsX > 0) {
    const rand = Math.random();
    direction = direction === DIR.X ? DIR.Y : DIR.X;
    let length = 0;

    if (rand < 0.8) {
      if (rand < 0.001) {
        generateRoute(
          new IsomerRoute(route.canvas, route.origin),
          randomInt(15),
        );
      }

      length = randomInt(9, 3);
      length = length * (route.origin[direction] > length ? -1 : 1);
      route = route.addPath(length, direction);
      if (rand > 0.7) {
        const stairLength = randomInt(4, 2);
        const stairDir = direction === DIR.X ? DIR.Y : DIR.X;

        route.addShapes(
          generateRoute(
            new IsomerRoute(route.canvas, route.origin)
              .addStairs(stairLength, stairDir)
              .updateOrigin(
                stairDir === DIR.Y ? -2 : 0,
                stairDir === DIR.X ? -2 : 0,
                0,
              )
              .addPath(5, direction),
            randomInt(15),
          ).connectedBlocks,
        );
      }
    } else {
      length = randomInt(9, 3);
      route = route.addColumn(
        length,
        route.origin.z < length ||
          Math.max(route.origin.x, route.origin.y) < length
          ? DIR.UP
          : DIR.DOWN,
      );
    }
    lengthsX = lengthsX - Math.abs(length);
  }

  return route;
};

const IsometricIllusions = () => {
  let gameRoute = useRef(null);
  let generatedRoute = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [nextRotation, setNextRotation] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [blox, setBlox] = useState({
    origin: Point(0, 0, 1),
    direction: DIR.X,
    standing: false,
  });

  const setBloxOrigin = origin =>
    setBlox({
      ...blox,
      origin,
    });

  const generateNewPath = () => {
    setGenerated(true);
    setBloxOrigin(Point(0, 0, 1));
    generatedRoute.current = null;
  };

  const handleKeyPress = event => {
    if (event.keyCode === 39) {
      // ArrowRight
      event.preventDefault();
      if (event.metaKey) {
        setNextRotation(nextRotation - Math.PI / 2);
      } else {
        const maybeNextOrigin = gameRoute.current.getEquivalentPoint(
          Point(blox.origin.x, blox.origin.y - 1, blox.origin.z),
        );
        if (maybeNextOrigin) {
          setBloxOrigin(maybeNextOrigin);
        }
      }
    } else if (event.keyCode === 37) {
      // ArrowLeft
      event.preventDefault();
      if (event.metaKey) {
        setNextRotation(nextRotation + Math.PI / 2);
      } else {
        const maybeNextOrigin = gameRoute.current.getEquivalentPoint(
          Point(blox.origin.x, blox.origin.y + 1, blox.origin.z),
        );
        if (maybeNextOrigin) {
          setBloxOrigin(maybeNextOrigin);
        }
      }
    } else if (event.keyCode === 40) {
      // ArrowDown
      event.preventDefault();
      const maybeNextOrigin = gameRoute.current.getEquivalentPoint(
        Point(blox.origin.x - 1, blox.origin.y, blox.origin.z),
      );
      if (maybeNextOrigin) {
        // moveAndRotateBlox(-1, 0);
        setBloxOrigin(maybeNextOrigin);
      }
    } else if (event.keyCode === 38) {
      // ArrowUp
      event.preventDefault();
      const maybeNextOrigin = gameRoute.current.getEquivalentPoint(
        Point(blox.origin.x + 1, blox.origin.y, blox.origin.z),
      );
      if (maybeNextOrigin) {
        // moveAndRotateBlox(1, 0);
        setBloxOrigin(maybeNextOrigin);
      }
    }
  };

  useEffect(() => {
    const rotationDelta = nextRotation - rotation;
    if (Math.abs(rotationDelta) > 0.015) {
      setRotation(
        currentRotation => currentRotation + Math.PI * 0.05 * rotationDelta,
      );
    } else if (rotationDelta !== 0) {
      setRotation(nextRotation);
    }
  }, [nextRotation, rotation]);

  const drawGameRoute = route => {
    route
      .rotate(rotation)
      .setDelay(0)
      .addPath(6, DIR.X)
      .addPath(3, DIR.Y)
      .addPath(3, DIR.X)
      .addPath(3, DIR.Y);

    const route2 = route.split().addStairs(3, DIR.X);

    route.addBlocks(route2.split().addStairs(3, DIR.X).connectedBlocks);

    route.addBlocks(
      route2
        .addPath(8, DIR.Y)
        .addPath(7, DIR.X)
        .addPath(-10, DIR.Y)
        .addPath(-3, DIR.X).connectedBlocks,
    );

    const route3 = route2
      .split()
      .addPath(-5, DIR.Y)
      .addPath(-5, DIR.X)
      .addPath(-3, DIR.Y)
      .addPath(-5, DIR.X);

    route.addBlocks(route3.split().addStairs(3, DIR.Y).connectedBlocks);

    route.addBlocks(
      route3
        .addPath(-2, DIR.X)
        .addPath(-3, DIR.Y)
        .addPath(-6, DIR.X).connectedBlocks,
    );

    route
      .addPath(4, DIR.Y)
      .addColumn(10, DIR.DOWN)
      .drawGrid(GRID_SIZE);

    route.addBlocks(
      route
        .split()
        .setOrigin(blox.origin)
        .addPath(1, blox.direction, red).connectedBlocks,
    );

    route.draw();
    gameRoute.current = route;
  };

  const drawGeneratedRoute = route => {
    if (!generatedRoute.current) {
      generatedRoute.current = generateRoute(route);
    }

    route
      .setRotation(rotation)
      .addShapes(generatedRoute.current.connectedBlocks)
      .drawGrid(GRID_SIZE)
      .draw();
  };

  useEventListener('keydown', handleKeyPress);

  return (
    <div className="mx-auto  text-center flex flex-col">
      <div id="isometric-triangle">
        <IsometricRoute
          height={300}
          width={672}
          drawRoute={route => {
            route
              .setGridSize(6)
              .setRotation(rotation)
              .addPath(6, DIR.X)
              .addPath(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .draw();
          }}
        />
      </div>
      <div id="isometric-floating-blocks">
        <IsometricRoute
          height={300}
          width={672}
          scale={2}
          drawRoute={route => {
            route
              .setGridSize(2)
              .setRotation(rotation)
              .addPath(2, DIR.X)
              .setOrigin(Point(0, 1, 0))
              .addPath(2, DIR.X)
              .setOrigin(Point(0, 0, 2))
              .addPath(2, DIR.X)
              .setOrigin(Point(0, 1, 2))
              .addPath(2, DIR.X)
              .draw();
          }}
        />
      </div>
      <div id="isometric-conundrum">
        <IsometricRoute
          height={300}
          width={672}
          scale={2}
          drawRoute={route => {
            route
              .setDelay(0)
              .setGridSize(2)
              .setRotation(rotation)
              .addPath(2, DIR.X, block => block.setColor(red))
              .setOrigin(Point(1, 0, 1))
              .addPath(2, DIR.Y, block => block.setColor(green))
              .setOrigin(Point(0, 1, 0))
              .addColumn(2, DIR.UP)
              .draw();
          }}
        />
      </div>

      <div id="isometric-extrusions">
        <IsometricRoute
          height={300}
          width={672}
          scale={3}
          drawRoute={route => {
            route
              .setGridSize(5)
              .setRotation(rotation)
              .addPath(2, DIR.X, block => block.setColor(red).addEndExtrusion())
              .setOrigin(Point(2, -1, 1))
              .addPath(2, DIR.X, block =>
                block.setColor(red).addStartExtrusion(),
              )
              .setOrigin(Point(0, 1, 0))
              .addPath(2, DIR.Y, block =>
                block.setColor(blue).addEndExtrusion(),
              )
              .setOrigin(Point(-1, 2, 1))
              .addPath(2, DIR.Y, block =>
                block.setColor(blue).addStartExtrusion(),
              )
              .draw();
          }}
        />
      </div>
      <div id="isometric-triangle-improved">
        <IsometricRoute
          height={300}
          width={672}
          drawRoute={route => {
            route
              .setGridSize(6)
              .setRotation(rotation)
              .addColumn(3, DIR.UP, block => block.addEndExtrusion())
              .setOrigin(Point(1, 0, 0))
              .addPath(5, DIR.X)
              .addPath(6, DIR.Y)
              .addColumn(3, DIR.DOWN, block => block.addStartExtrusion())
              .draw();
          }}
        />
      </div>

      {/* <div id="isometric-game">
        <IsometricRoute
          scale={4}
          height={600}
          width={672}
          drawRoute={drawGameRoute}
        />
      </div> */}
      <div id="isometric-monument-valley">
        <IsometricRoute
          scale={4}
          height={600}
          width={672}
          drawRoute={route => {
            route
              .setGridSize(12)
              .setOrigin(Point(3, -1, 3))
              .addColumn(2, DIR.UP, block => block.addStartExtrusion())
              .addColumn(5, DIR.UP, block =>
                block.setColor(darkGreen).rotateYEnd(rotation),
              )
              .updateOrigin(0, 1, -1)
              .addPath(4, DIR.Y, block =>
                block.setColor(darkGreen).rotateAlongAxis(rotation),
              )
              .addPath(5, DIR.Y)
              .updateOrigin(0, -1, 0)
              .addStairs(3, DIR.X)
              .updateOrigin(0, -1, 0)
              .addPath(3, DIR.Y)
              .updateOrigin(1, -1, 0)
              .addPath(-3, DIR.Y)
              .setOrigin(Point(-3, -2, 10))
              .addPath(-5, DIR.X)
              .addPath(-10, DIR.Y)
              .addColumn(2, DIR.UP, block => block.addEndExtrusion())
              .draw();
          }}
        />
      </div>
      <div id="isometric-monument-valley-lvl-2">
        <IsometricRoute
          scale={4}
          height={600}
          width={672}
          drawRoute={route => {
            route
              .setGridSize(8)
              .updateOrigin(-5, -5, 5)
              .addPath(7, DIR.Y)
              .addPath(3, DIR.X)
              .addPath(9, DIR.X, block =>
                block.setColor(darkGreen).rotateZCenter(rotation),
              )
              .addPath(2, DIR.X)
              .addColumn(3, DIR.DOWN, block => block.addStartExtrusion())
              .addPath(7, DIR.Y)
              .addPath(-8, DIR.X)
              .addPath(-3, DIR.Y)
              .setOrigin(Point(0, 0, 0))
              .addPath(7, DIR.X)
              .addColumn(4, DIR.UP, block => block.addEndExtrusion())
              .setOrigin(Point(0, -5, 7))
              .addPath(2, DIR.X)
              .setOrigin(Point(3, 3, 0))
              .addColumn(4, DIR.UP, block =>
                block.setColor(darkGreen).rotateAlongAxis(rotation),
              )
              .drawGrid()
              .draw();
          }}
        />
      </div>
      <button className="mx-auto flex" onClick={generateNewPath}>
        Generate
      </button>
      {/* <div id="isometric-generated-game">
        <IsometricRoute
          scale={4}
          height={600}
          width={672}
          drawRoute={drawGeneratedRoute}
        />
      </div> */}
    </div>
  );
};

export default IsometricIllusions;

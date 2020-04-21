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
          ).shapes,
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

    route.addShapes(route2.split().addStairs(3, DIR.X).shapes);

    route.addShapes(
      route2
        .addPath(6, DIR.Y)
        .addPath(8, DIR.X)
        .addPath(-7, DIR.Y)
        .addPath(-3, DIR.X).shapes,
    );

    const route3 = route2
      .split()
      .addPath(-3, DIR.Y)
      .addPath(-4, DIR.X)
      .addPath(-3, DIR.Y)
      .addPath(-4, DIR.X);

    route.addShapes(route3.split().addStairs(3, DIR.Y).shapes);

    route.addShapes(
      route3
        .addPath(-1, DIR.X)
        .addPath(-2, DIR.Y)
        .addPath(-5, DIR.X).shapes,
    );

    route
      .addPath(4, DIR.Y)
      .addColumn(10, DIR.DOWN)
      .drawGrid(GRID_SIZE);

    route.addShapes(
      route
        .split()
        .setOrigin(blox.origin)
        .addPath(1, blox.direction, red).shapes,
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
      .addShapes(generatedRoute.current.shapes)
      .drawGrid(GRID_SIZE)
      .draw();
  };

  useEventListener('keydown', handleKeyPress);

  return (
    <div className="mx-auto  text-center flex flex-col">
      <div id="isometric-triangle">
        <IsometricRoute
          height={600}
          width={672}
          drawRoute={route => {
            route
              .setGridSize(6)
              .setRotation(rotation)
              .updateOrigin(5, 5, 0)
              .addColumn(6, DIR.UP)
              .addPath(-6, DIR.Y)
              .addPath(-6, DIR.X)
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
              .addPath(2, DIR.X, red)
              .setOrigin(Point(1, 0, 1))
              .addPath(2, DIR.Y, green)
              .setOrigin(Point(0, 1, 0))
              .addColumn(2, DIR.UP)
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
              .setOrigin(Point(3, -1, 1))
              .addExtrusion(
                [
                  { x: 0, y: 0, z: 0 },
                  { x: 1, y: 0, z: 0 },
                  { x: 1, y: 1, z: 0 },
                ],
                0.2,
                blue,
                shape =>
                  shape
                    .rotateY(Point(3.5, -0.5, 1.5), (Math.PI * 1) / 2)
                    .rotateX(Point(3.5, -0.5, 1.5), (-Math.PI * 3) / 2),
              )
              .updateOrigin(0, 0, 1)
              .addColumn(2, DIR.UP)
              .addColumn(5, DIR.UP, darkGreen, shape =>
                shape.rotateY(Point(3.5, 4, 8.5), rotation),
              )
              .updateOrigin(0, 1, -1)
              .addPath(4, DIR.Y, darkGreen, shape =>
                shape.rotateY(Point(3.5, 4, 8.5), rotation),
              )
              .addPath(5, DIR.Y)
              .updateOrigin(0, -1, 0)
              .addStairs(3, DIR.X)
              .updateOrigin(0, -1, 0)
              .addPath(3, DIR.Y)
              .updateOrigin(1, -1, 0)
              .addPath(-2, DIR.Y)
              .setOrigin(Point(-3, -2, 9))
              .addPath(-4, DIR.X)
              .addPath(-9, DIR.Y)
              .addColumn(2, DIR.UP)
              .addExtrusion(
                [
                  { x: 0, y: 0, z: 0 },
                  { x: 1, y: 0, z: 0 },
                  { x: 1, y: 1, z: 0 },
                ],
                1,
                blue,
                shape =>
                  shape
                    .rotateY(Point(-6.5, -11, 11.5), Math.PI / 2)
                    .rotateX(Point(-6.5, -10.5, 11.5), -Math.PI / 2),
              )
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

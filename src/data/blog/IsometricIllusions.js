import React, { useEffect, useRef, useState } from 'react';
import { Color, Point } from 'isomer';
import IsomerRoute from 'isomer-route';
import DIR from 'isomer-route/src/directions';
import { blue, red } from 'isomer-route/src/colors';
import { useEventListener, useAnimationFrame } from './utils/hooks';

const green = new Color(60, 160, 50);
const GRID_SIZE = 16;

const randomInt = (max = 6, min = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRoute = (route, lengths = 60) => {
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
              // .addPath(1, stairDir)
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
  const canv = useRef(null);
  let gameRoute = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [nextRotation, setNextRotation] = useState(0);
  const [bloxRotation, setBloxRotation] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [time, setTime] = useState(0);
  const [blox, setBlox] = useState({
    origin: Point(0, 0, 1),
    direction: DIR.X,
    standing: false,
  });

  const moveAndRotateBlox = (x, y, z = 0) =>
    setBlox({
      ...blox,
      origin: Point(blox.origin.x + x, blox.origin.y + y, blox.origin.z + z),
    });

  const setBloxOrigin = origin =>
    setBlox({
      ...blox,
      origin,
    });

  const clearCanvas = () => {
    const context = canv.current.getContext('2d');
    context.clearRect(0, 0, canv.current.width, canv.current.height);
  };

  const generateNewPath = () => {
    setGenerated(true);
    clearCanvas();
    setBloxOrigin(Point(0, 0, 1));
    const route = new IsomerRoute(canv.current).drawGrid(GRID_SIZE);
    const randomRoute = generateRoute(route);
    gameRoute.current = randomRoute;
    randomRoute.draw();
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

  useAnimationFrame(timeDelta => {
    setTime(time + timeDelta * 0.1);
  });

  useEffect(() => {
    const rotationDelta = nextRotation - rotation;
    if (Math.abs(rotationDelta) > 0.015) {
      setRotation(
        currentRotation => currentRotation + Math.PI * 0.01 * rotationDelta,
      );
    } else if (rotationDelta !== 0) {
      setRotation(nextRotation);
    }
  }, [nextRotation, rotation, time]);

  useEffect(() => {
    if (canv.current && !generated) {
      clearCanvas();
      const route = new IsomerRoute(canv.current, Point(0, 0, 0));
      gameRoute.current = route;

      // route
      //   .setRotation(rotation)
      //   .addPath(2, DIR.X)
      //   .setOrigin(Point(0, 1, 0))
      //   .addPath(2, DIR.X)
      //   .setOrigin(Point(0, 0, 1))
      //   .addPath(2, DIR.X)
      //   .setOrigin(Point(0, 1, 1))
      //   .addPath(2, DIR.X);

      // route
      //   .setRotation(rotation)
      //   .addPath(2, DIR.X)
      //   .setOrigin(Point(0, -2, 2))
      //   .addPath(2, DIR.X);

      // route
      //   .setRotation(rotation)
      //   .setDelay(0)
      //   .addPath(2, DIR.X, red)
      //   .setOrigin(Point(1, 0, 1))
      //   .addPath(2, DIR.Y, green)
      //   .setOrigin(Point(0, 1, 0))
      //   .addColumn(2, DIR.UP);

      // route
      //   .setRotation(rotation)
      //   .setOrigin(Point(0, 4, 0))
      //   .addPath(-2, DIR.Y, red)
      //   .setOrigin(Point(0, 2, 1))
      //   .addPath(2, DIR.X, green)
      //   .setOrigin(Point(1, 3, 0))
      //   .addColumn(2, DIR.UP);

      // route
      //   .setOrigin(Point(2, 1, 2))
      //   .addPath(-2, DIR.X, red)
      //   .setOrigin(Point(0, 2, 3))
      //   .addPath(-2, DIR.Y, green)
      //   .setOrigin(Point(1, 0, 2))
      //   .addColumn(2, DIR.UP);

      // route
      //   .setOrigin(Point(3, 0, 0))
      //   .addPath(2, DIR.Y, red)
      //   .setOrigin(Point(4, 1, 1))
      //   .addPath(-2, DIR.X, green)
      //   .setOrigin(Point(2, 0, 0))
      //   .addColumn(2, DIR.UP);

      // route.drawGrid(GRID_SIZE).draw();

      // new IsomerRoute(canv.current, Point(0, 0, 0))
      //   .setRotation(rotation)
      //   .setOrigin(Point(1, 3, 0))
      //   .addPath(2, DIR.X, green)
      //   .draw();

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

      route
        .addShapes(
          route
            .split()
            .setOrigin(blox.origin)
            .addPath(1, blox.direction, red).shapes,
        )
        .draw();
    } else if (generated) {
      clearCanvas();
      new IsomerRoute(canv.current)
        .rotate(rotation)
        .addShapes(gameRoute.current.shapes)
        .addShapes(
          gameRoute.current
            .split()
            .setOrigin(blox.origin)
            .addPath(1, blox.direction, red).shapes,
        )
        .drawGrid(GRID_SIZE)
        .draw();
    }
  }, [canv, blox, bloxRotation, gameRoute, generated, rotation]);
  useEventListener('keydown', handleKeyPress);

  return (
    <div className="mx-auto  text-center flex flex-col">
      <button className="mx-auto flex" onClick={generateNewPath}>
        Generate
      </button>
      <canvas ref={canv} id="isometric-illusion" width="2688" height="3200" />
    </div>
  );
};

export default IsometricIllusions;

import React, { useEffect, useRef, useState } from 'react';
import Isomer, { Color, Shape, Path, Point } from 'isomer';
import { useEventListener, useAnimationFrame } from './utils/hooks';

const DIR = {
  X: 'x',
  Y: 'y',
  UP: 'UP',
  DOWN: 'DOWN',
};

const red = new Color(160, 60, 50);
const blue = new Color(59, 188, 188);
const GRID_SIZE = 16;
const DRAW_NEGATIVE_GRID = false;

const isEquivalent = (p1, p2, rotationQuadrant = 0) => {
  const xDif = Math.round(p1.x) - Math.round(p2.x);
  const yDif = Math.round(p1.y) - Math.round(p2.y);
  const zDif = Math.round(p1.z) - Math.round(p2.z);
  switch (rotationQuadrant) {
    case 0.25:
      return xDif === zDif && yDif === -zDif;
    case 0.5:
      return xDif === zDif && yDif === zDif;
    case 0.75:
      return xDif === -zDif && yDif === zDif;
    case 0:
    default:
      return xDif === -zDif && yDif === -zDif;
  }
};

class Route {
  constructor(iso, origin = Point(0, 0, 0), color = blue) {
    this.iso = iso;
    this.iso.colorDifference = 0.35;
    this.origin = origin;
    this.shapes = [];
    this.direction = null;
    this.polarity = 1;
    this.color = color;
    this.rotation = 0;
    this.depth = 1;
    this.rotationQuadrant = 0;
    return this;
  }

  getEquivalentPoint = point => {
    const equivalentPoints = [];
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      const { origin, height, direction } = shape;
      if (direction === DIR.X) {
        for (let dx = 0; dx < shape.dx; dx++) {
          const p = Point(origin.x + dx, origin.y, origin.z + height);
          if (isEquivalent(point, p, this.rotationQuadrant)) {
            equivalentPoints.push(p);
          }
        }
      }

      if (direction === DIR.Y) {
        for (let dy = 0; dy < shape.dy; dy++) {
          const p = Point(origin.x, origin.y + dy, origin.z + height);
          if (isEquivalent(point, p, this.rotationQuadrant)) {
            equivalentPoints.push(p);
          }
        }
      }

      if (direction === DIR.DOWN) {
        const p = Point(origin.x, origin.y, origin.z + height);
        if (isEquivalent(point, p, this.rotationQuadrant)) {
          equivalentPoints.push(p);
        }
      }

      if (direction === DIR.UP) {
        const p = Point(origin.x, origin.y, origin.z + height);
        if (isEquivalent(point, p, this.rotationQuadrant)) {
          equivalentPoints.push(p);
        }
      }
    }

    if (equivalentPoints.length === 0) {
      return undefined;
    }

    return equivalentPoints.sort((p1, p2) => p2.z - p1.z)[0];
  };

  clearCanvas = () => {
    this.iso.canvas.ctx.clearRect(
      0,
      0,
      this.iso.canvas.elem.width,
      this.iso.canvas.elem.height,
    );
  };

  updateOrigin = (dx = 0, dy = 0, dz = 0) => {
    this.origin = Point(
      this.origin.x + dx,
      this.origin.y + dy,
      this.origin.z + dz,
    );
    return this;
  };

  addColumn = (height, dir = DIR.UP, rotation = 0) => {
    const dx = 1;
    const dy = 1;

    if (dir === DIR.DOWN) {
      this.updateOrigin(0, 0, -1 * height + 1);
      const shape = {
        origin: this.origin,
        dx,
        dy,
        height: height - 1 + this.depth,
        direction: dir,
        rotation,
      };
      this.shapes.push(shape);
      this.updateOrigin(0, 0, -1);
      return this;
    }

    const shape = {
      origin: Point(this.origin.x, this.origin.y, this.origin.z),
      dx,
      dy,
      height,
      length: -height,
      direction: dir,
      rotation,
    };
    this.shapes.push(shape);

    return this.updateOrigin(0, 0, height);
  };

  addPath = (length, dir = DIR.X) => {
    const dx = dir === DIR.X ? Math.abs(length) : 1;
    const dy = dir === DIR.Y ? Math.abs(length) : 1;
    const height = 1 * this.depth;

    if (length < 0) {
      this.updateOrigin(
        dir === DIR.X ? -1 * dx : 0,
        dir === DIR.Y ? -1 * dy : 0,
        0,
      );

      const shape = {
        origin: Point(
          this.origin.x +
            (this.polarity < 1 && this.direction === DIR.X ? 0 : 0),
          this.origin.y +
            (this.polarity < 1 && this.direction === DIR.Y ? 0 : 0),
          this.origin.z,
        ),
        dx: dx + (dir === DIR.X ? 1 : 0),
        dy: dy + (dir === DIR.Y ? 1 : 0),
        height,
        length,
        direction: dir,
      };
      this.shapes.push(shape);
      this.polarity = -1;
      this.direction = dir;

      return this;
    }

    this.polarity = 1;
    this.direction = dir;

    this.updateOrigin(
      dir === DIR.X && this.direction !== DIR.X ? 1 : 0,
      dir === DIR.Y && this.direction !== DIR.Y ? 1 : 0,
    );
    const shape = {
      origin: this.origin,
      dx,
      dy,
      height,
      direction: dir,
    };
    this.shapes.push(shape);

    return this.updateOrigin(dir === DIR.X ? dx : 0, dir === DIR.Y ? dy : 0, 0);
  };

  addStairs = (height, dir = DIR.X, incrementPerStair = 5) => {
    this.updateOrigin(
      dir === DIR.X ? 1 : 0,
      dir === DIR.Y ? 1 : 0,
      1 * this.depth,
    );

    [...Array(height).keys()].forEach((__, stairIndex) => {
      [...Array(incrementPerStair).keys()].forEach((__, increment) => {
        if (stairIndex !== 0 || increment !== 0) {
          this.origin = Point(
            this.origin.x + (dir === DIR.X ? 1 / incrementPerStair : 0),
            this.origin.y + (dir === DIR.Y ? 1 / incrementPerStair : 0),
            this.origin.z + 1 / incrementPerStair,
          );
        }

        this.shapes.push({
          origin: this.origin,
          dx: dir === DIR.X ? 1 / incrementPerStair : 1,
          dy: dir === DIR.Y ? 1 / incrementPerStair : 1,
          height: 1 / incrementPerStair,
          direction: dir,
        });
      });
    });

    this.updateOrigin(
      dir === DIR.X ? 1 / incrementPerStair : 0,
      dir === DIR.Y ? 1 / incrementPerStair : 0,
      -1 * this.depth + 1 / incrementPerStair,
    );

    this.direction = dir;
    return this;
  };

  split() {
    return new Route(this.iso, this.origin)
      .setRotation(this.rotation)
      .setDepth(this.depth);
  }

  rotate(rotation = Math.PI / 8) {
    return this.setRotation(this.rotation + rotation);
  }

  setRotation(rotation = Math.PI / 8) {
    this.rotation = rotation;
    this.rotationQuadrant =
      Math.abs(
        Math.round(
          ((Math.abs(2 * Math.PI - this.rotation) / Math.PI / 2) % 1) / 0.25,
        ) * 0.25,
      ) % 1;
    return this;
  }

  setDepth(depth = 1) {
    this.depth = depth;
    return this;
  }

  addShapes = shapes => {
    this.shapes = this.shapes.concat(shapes);
    return this;
  };

  getShapeObj = ({ origin, dx, dy, height }) => {
    let shape = Shape.Prism(origin, dx, dy, height || this.depth);

    shape = shape.rotateZ(
      Point(GRID_SIZE / 2, GRID_SIZE / 2, 0),
      this.rotation,
    );
    return shape;
  };

  draw = () => {
    const orderedPaths = this.shapes
      .map(this.getShapeObj)
      .reduce((pathsAc, shape) => [...pathsAc, ...shape.paths], [])
      .sort((pathA, pathB) => pathB.depth() - pathA.depth());

    orderedPaths.forEach(path => {
      this.iso.add(path, this.color);
    });

    return this;
  };

  flush = () => {
    this.shapes = [];
    return this;
  };
}

const drawGrid = (
  iso,
  rotation = (2 * Math.PI) / 4,
  gridSize = GRID_SIZE,
  drawNegative = DRAW_NEGATIVE_GRID,
) => {
  for (let x = drawNegative ? -gridSize : 0; x <= gridSize; x++) {
    iso.add(
      new Path([
        new Point(x, (drawNegative ? -1 : 0) * gridSize, 0),
        new Point(x, gridSize, 0),
        new Point(x, (drawNegative ? -1 : 0) * gridSize, 0),
      ]).rotateZ(Point(GRID_SIZE / 2, GRID_SIZE / 2, 0), rotation),
      blue,
    );
    iso.add(
      new Path([
        new Point((drawNegative ? -1 : 0) * gridSize, x, 0),
        new Point(gridSize, x, 0),
        new Point((drawNegative ? -1 : 0) * gridSize, x, 0),
      ]).rotateZ(Point(GRID_SIZE / 2, GRID_SIZE / 2, 0), rotation),
      red,
    );
  }
};

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
        generateRoute(new Route(route.iso, route.origin), randomInt(15));
      }

      length = randomInt(9, 3);
      length = length * (route.origin[direction] > length ? -1 : 1);
      route = route.addPath(length, direction);
      if (rand > 0.7) {
        const stairLength = randomInt(4, 2);
        const stairDir = direction === DIR.X ? DIR.Y : DIR.X;

        route.addShapes(
          generateRoute(
            new Route(route.iso, route.origin)
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

  // const moveAndRotateBlox = (x, y, z = 0) => {
  //   setBlox({
  //     ...blox,
  //     direction: x > 0 ? DIR.X : DIR.Y,
  //   });
  //   setBloxRotation(Math.PI / 4);
  // };

  const clearCanvas = () => {
    const context = canv.current.getContext('2d');
    context.clearRect(0, 0, canv.current.width, canv.current.height);
  };

  const generateNewPath = () => {
    setGenerated(true);
    clearCanvas();
    setBloxOrigin(Point(0, 0, 1));
    const iso = new Isomer(canv.current);
    const route = new Route(iso);
    drawGrid(iso, rotation);
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
          // moveAndRotateBlox(0, -1);
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
          // moveAndRotateBlox(0, 1);
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
      const iso = new Isomer(canv.current);

      clearCanvas();
      const route = new Route(iso, Point(0, 0, 0));
      gameRoute.current = route;
      drawGrid(iso, rotation);

      route
        .rotate(rotation)
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
        .draw();

      iso.add(
        Shape.Prism(blox.origin)
          .rotateX(
            Point(blox.origin.x, blox.origin.y + 1, blox.origin.z),
            blox.direction === DIR.Y ? bloxRotation : 0,
          )
          .rotateY(
            Point(blox.origin.x + 1, blox.origin.y, blox.origin.z),
            blox.direction === DIR.X ? bloxRotation : 0,
          )
          .rotateZ(Point(GRID_SIZE / 2, GRID_SIZE / 2, 0), rotation),
        red,
      );
    } else if (generated) {
      clearCanvas();
      drawGrid(gameRoute.current.iso, rotation);
      gameRoute.current.setRotation(rotation).draw();

      gameRoute.current.iso.add(
        Shape.Prism(blox.origin)
          .rotateX(
            Point(blox.origin.x, blox.origin.y + 1, blox.origin.z),
            blox.direction === DIR.Y ? bloxRotation : 0,
          )
          .rotateY(
            Point(blox.origin.x + 1, blox.origin.y, blox.origin.z),
            blox.direction === DIR.X ? bloxRotation : 0,
          )
          .rotateZ(Point(GRID_SIZE / 2, GRID_SIZE / 2, 0), rotation),
        red,
      );
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

import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import Isomer, { Color, Point, Shape } from 'isomer';
import IsomerRoute from 'isomer-route';
import DIR from 'isomer-route/src/directions';
import { blue, darkGreen, red } from 'isomer-route/src/colors';
import IsometricRoute from '../../components/IsometricRoute';
import IsoBlox from '../../components/IsoBlox';
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
      route = route.addTrack(length, direction);
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
              .addTrack(5, direction),
            randomInt(15),
          ).blockGroups,
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
  const [rotation, setRotation] = useState(0);
  const [nextRotation, setNextRotation] = useState(0);
  const [rotateRoutes, setRotateRoutes] = useState(false);

  const toggleRotateRoutes = ({ target: { checked } }) =>
    setRotateRoutes(checked);

  const handleKeyPress = event => {
    if (event.keyCode === 39) {
      // ArrowRight
      if (event.metaKey || event.ctrl) {
        event.preventDefault();
        setNextRotation(nextRotation - Math.PI / 2);
      }
    } else if (event.keyCode === 37) {
      // ArrowLeft
      if (event.metaKey || event.ctrl) {
        event.preventDefault();
        setNextRotation(nextRotation + Math.PI / 2);
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

  useEventListener('keydown', handleKeyPress);

  return (
    <div className="mx-auto flex flex-col">
      <p>
        After I finshed my last blog post,
        <HashLink to={'/blog//permutohedron#top'}>Permutohedron</HashLink>, in
        which I answer a math challenege posed by
        <a href="https://twitter.com/anniek_p" target="_blank">
          @anniek_p
        </a>
        , I began browsing more of her tweets, in particular her tweets about
        the
        <a
          href="https://twitter.com/hashtag/mathartchallenge?src=hashtag_click"
          target="_blank"
        >
          #mathartchallenge
        </a>
        . I came acros
        <a
          href="https://twitter.com/anniek_p/status/1244610239019835393"
          target="_blank"
        >
          Day 15's challenge: Isometric illusions
        </a>
        , in which she challenged people to take advantage of isometric
        qualities to create illusions, on paper. From that moment on I, and my
        two roommates, Conor and Oisín became obsessed with programatically
        creating and hopefully generating isometric illusions.
      </p>
      <h3>What are isometric illusions</h3>
      <p>
        Isometric projection is a method for visually representing
        three-dimensional objects in two dimensions in technical and engineering
        drawings. The three coordinate axes appear equally foreshortened and the
        angle between any two of them is 120 degrees. As in the example below.
      </p>
      <div id="isometric-example" className="my-2">
        <IsometricRoute
          height={200}
          width={672}
          scale={2}
          drawRoute={route => {
            route
              .setGridSize(4)
              .addTrack(3, DIR.X)
              .setOrigin(Point(0, 1, 0))
              .addTrack(2, DIR.Y)
              .draw();
          }}
        />
      </div>
      <p>
        Isometric illusions are types of optical illusions in which allows you
        to draw <em>impossible shapes</em> because the lines in the shapes do
        not indicate relative direction between its components. This can clearly
        be seen in the example below where the path looks like it is flat until
        there is a column bringing the path back down to the begining. This
        shape can only exist in the isometric world, and if it were to be built,
        it would only look like this from one very specific angle.
      </p>
      <div id="isometric-triangle">
        <IsometricRoute
          height={200}
          width={672}
          drawRoute={route => {
            route
              .setGridSize(6)
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .draw();
          }}
        />
      </div>
      <h3>Programatically creating isometric illusions</h3>
      <p>
        We discovered
        <a href="https://github.com/jdan/isomer" target="_blank">
          Isomer.js
        </a>
        , a JavaScript library for drawing isometric shapes on the HTML canvas.
        Immediatelly this made our challenge much much easier as it had done all
        of the heavy lifting of drawing, shading, positioning, translating,
        rotating and everything else we could want. Through this we could draw{' '}
        <em>prisms</em> and paths, and through mastery of the isometric grid we
        could quickly create some very basic isometric illusions.
      </p>
      <p>
        However, keeping track of the where you needed to draw blocks became
        cumbersome for difficult illusions, and we very quickly realised that
        for true illusions, the drawing order of the blocks was super important.
        In fact the order in which blocks were draw could completely redefine
        how you understand the image, one of the reasons why isometric
        projection allows you to draw interesting illusions.
      </p>
      <p>
        Consider the simple example below, the blocks on the left are drawn in
        the order they were created while the blocks on the right are drawn in
        the correct order, respecting their true depth and positions.
      </p>
      <div className="flex flex-wrap space-between items-center my-4">
        <IsometricRoute
          height={200}
          width={300}
          scale={2}
          drawRoute={route => {
            const isomer = new Isomer(route.canvas);
            isomer.colorDifference = 0.35;
            isomer.add(Shape.Prism(Point(0, 1, 1), 1, 3, 1), darkGreen);
            isomer.add(Shape.Prism(Point.ORIGIN, 1, 3, 1), blue);
            isomer.add(Shape.Prism(Point(1, 0, 1), 1, 3, 1), red);
            isomer.add(Shape.Prism(Point(1, -1, 0), 1, 3, 1), darkGreen);
          }}
        />
        <IsometricRoute
          height={200}
          width={300}
          scale={2}
          drawRoute={route => {
            route
              .setGridSize(3)
              .setOrigin(Point(0, 1, 1))
              .addTrack(3, DIR.Y, block => block.setColor(darkGreen))
              .setOrigin(Point.ORIGIN)
              .addTrack(3, DIR.Y, block => block.setColor(blue))
              .setOrigin(Point(1, 0, 1))
              .addTrack(3, DIR.Y, block => block.setColor(red))
              .setOrigin(Point(1, -1, 0))
              .addTrack(3, DIR.Y, block => block.setColor(darkGreen))
              .draw();
          }}
        />
      </div>
      <h3>
        Introducing <em>isomer-route</em>
      </h3>
      <p>
        To solve both of the above problems; keeping track of positional state,
        and drawing blocks in the right order, I created
        <a href="https://github.com/darraghmckay/isomer-route" target="_blank">
          <em>isomer-route</em>
        </a>
        , an extension of <em>isomer</em> which provides an easy API to build
        isometric <em>routes</em>. For more information and the full API
        reference checkout the
        <HashLink to="projects/isomer-route#top">
          <em>isomer-route</em> project page
        </HashLink>
      </p>
      <p>
        Heavily inspired by the solution provided by @shaunlebron in
        <a
          href="https://shaunlebron.github.io/IsometricBlocks/"
          target="_blank"
        >
          Drawing isometric boxes in the correct order
        </a>
        , <em>isomer-route</em> splits each block component into invididual
        blocks, then sorts them topolically. In brief; if a given block overlaps
        with another block, the block which is in behind must be drawn before
        the block which is in front. And to determine whether blocks overlap,
        and then which is in front, their isometric coordinates needed to be
        mapped to screen coordinates. I won't go into too much detail here
        because of how well its articulated in the above article.
      </p>
      <p>
        The real test for whether or not I had figured out the ordering problem
        was the <em>conundrum</em> defined in the above article. Where groups of
        blocks, if left as groups, would create a cyclic-dependency, where part
        of block A is behind block B, and part of block B is behind block C and
        part of block C is behind block A. As mentioned in the artlce, the
        solution is to simply draw blocks of groups as independant invividual
        blocks. The final product is below
      </p>
      <div id="isometric-conundrum" className="my-4">
        <IsometricRoute
          height={200}
          width={672}
          scale={2}
          drawRoute={route => {
            route
              .setGridSize(2)
              .setRotation(rotation)
              .addTrack(2, DIR.X, block => block.setColor(red))
              .setOrigin(Point(1, 0, 1))
              .addTrack(2, DIR.Y, block => block.setColor(green))
              .setOrigin(Point(0, 1, 0))
              .addColumn(2, DIR.UP)
              .draw();
          }}
        />
      </div>
      <h3>Getting my head around it</h3>
      <p>
        As I figured out how to correctly draw the shapes, and how to build the
        API to properly support it I began to experiment with more advanced
        examples, getting back to the original task at hand; drawing isometric
        illusions. Myself and my roomates had also since downloaded both
        versions of
        <a href="https://www.monumentvalleygame.com/" target="_blank">
          Monument Valley
        </a>
        , a beautiful mobile game in which
        <em>
          the player leads the princess Ida through mazes of optical illusions
          and impossible objects while manipulating the world around her to
          reach various platforms.
        </em>
        The game uses incredible isometric illusions to do this, and as such,
        inspired me to create some of my own, and helped me figure out how the
        best are done.
      </p>
      <p>
        Below is the simple illusion you saw in the begining, it looks quite
        like a rotated version of the
        <a
          href="https://en.wikipedia.org/wiki/Penrose_triangle"
          target="_blank"
        >
          Penrose Triangle
        </a>
        , but it's not as good because the vertical column doesn't line up as
        nicely with the front path, although the illusion is still effective,
        it's not as good, at least compared to the example on the right, where
        the veritcal column connects perfectly to the front path.
      </p>
      <div className="flex flex-wrap my-4 items-center space-between">
        <IsometricRoute
          height={200}
          width={300}
          drawRoute={route => {
            route
              .setRotation(rotation)
              .setGridSize(6)
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .draw();
          }}
        />
        <IsometricRoute
          height={200}
          width={300}
          drawRoute={route => {
            route
              .setGridSize(6)
              .setRotation(rotation)
              .addColumn(3, DIR.UP, block => block.addEndExtrusion())
              .setOrigin(Point(1, 0, 0))
              .addTrack(5, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(3, DIR.DOWN, block => block.addStartExtrusion())
              .draw();
          }}
        />
      </div>
      <div className="flex items-center space-between">
        <p>
          If you press the button on the right, the shapes above will rotate to
          show you how this effect is achieved, and how you would need to
          position them to build them in real life.
        </p>
        <button
          className="ml-4"
          onClick={() => setNextRotation(nextRotation - Math.PI / 2)}
        >
          Rotate
        </button>
      </div>
      <br />
      <br />
      <h3>More examples</h3>
      <p>
        From now on you can press the above button or use <sub>Cmd</sub>/
        <sub>Ctrl</sub>+<sub>Right</sub> to rotate the various shapes
      </p>

      <div id="isometric-floating-blocks" className="my-4">
        <IsometricRoute
          height={200}
          width={672}
          scale={2}
          drawRoute={route => {
            route
              .setGridSize(2)
              .setRotation(rotation)
              .addTrack(2, DIR.X)
              .setOrigin(Point(0, 1, 0))
              .addTrack(2, DIR.X)
              .setOrigin(Point(0, 0, 2))
              .addTrack(2, DIR.X)
              .setOrigin(Point(0, 1, 2))
              .addTrack(2, DIR.X)
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
              .addTrack(2, DIR.X, block =>
                block.setColor(red).addEndExtrusion(),
              )
              .setOrigin(Point(2, -1, 1))
              .addTrack(2, DIR.X, block =>
                block.setColor(red).addStartExtrusion(),
              )
              .setOrigin(Point(0, 1, 0))
              .addTrack(2, DIR.Y, block =>
                block.setColor(blue).addEndExtrusion(),
              )
              .setOrigin(Point(-1, 2, 1))
              .addTrack(2, DIR.Y, block =>
                block.setColor(blue).addStartExtrusion(),
              )
              .draw();
          }}
        />
      </div>
      <p>
        Inspired by Monument Valley, I quickly decided to make a game of it.
        Albeit a game with no real objective. Using your arrow keys on your
        keyboard you can move the red block throughout the route. Rotating the
        world will open up more paths as shapes which previously didn't touch,
        now do.
      </p>
      <div id="isometric-game" className="my-4">
        <IsoBlox
          scale={4}
          height={500}
          width={672}
          drawRoute={route => {
            route
              .rotate(rotation)
              .setDelay(0)
              .addTrack(7, DIR.X, block => block.addEndExtrusion())
              .updateOrigin(-1, 1, 0)
              .addTrack(2, DIR.Y)
              .addTrack(3, DIR.X)
              .addTrack(3, DIR.Y);

            const route2 = route.split().addStairs(3, DIR.X);

            route.addBlocks(route2.split().addStairs(3, DIR.X).blockGroups);

            route.addBlocks(
              route2
                .addTrack(8, DIR.Y)
                .addTrack(7, DIR.X)
                .addTrack(-10, DIR.Y)
                .addTrack(-3, DIR.X).blockGroups,
            );

            const route3 = route2
              .split()
              .addTrack(-5, DIR.Y)
              .addTrack(-5, DIR.X)
              .addTrack(-3, DIR.Y)
              .addTrack(-5, DIR.X);

            route.addBlocks(route3.split().addStairs(3, DIR.Y).blockGroups);

            route.addBlocks(
              route3
                .addTrack(-2, DIR.X)
                .addTrack(-3, DIR.Y)
                .addTrack(-5, DIR.X, block => block.addStartExtrusion())
                .blockGroups,
            );

            route
              .addTrack(4, DIR.Y)
              .addColumn(10, DIR.DOWN)
              .setGridSize(GRID_SIZE);
          }}
        />
      </div>
      <p>
        The below is a route that's very similar to the first level in Monument
        Valley. Which demonstrates that it's not always the world that needs to
        rotate in order to create paths which previously don't look possible,
        but instead various elements can rotate, such as the dark green blocks.{' '}
        <em>
          Note: there are still some bugs in figuring out where the red block
          can and can't move to
        </em>
      </p>
      <div id="isometric-monument-valley">
        <IsoBlox
          bloxOrigin={Point(-7, -8, 11)}
          scale={4}
          height={500}
          width={672}
          drawRoute={route => {
            route
              .setRotation(rotateRoutes ? rotation : 0)
              .setGridSize(12)
              .setOrigin(Point(3, -1, 3))
              .addColumn(2, DIR.UP, block => block.addStartExtrusion())
              .addColumn(5, DIR.UP, block =>
                block.setColor(darkGreen).rotateYEnd(rotation),
              )
              .updateOrigin(0, 1, -1)
              .addTrack(4, DIR.Y, block =>
                block.setColor(darkGreen).rotateAlongAxis(rotation),
              )
              .addTrack(5, DIR.Y)
              .updateOrigin(0, -1, 0)
              .addStairs(3, DIR.X)
              .updateOrigin(0, -1, 0)
              .addTrack(3, DIR.Y)
              .updateOrigin(1, -1, 0)
              .addTrack(-3, DIR.Y)
              .setOrigin(Point(-3, -2, 10))
              .addTrack(-5, DIR.X)
              .addTrack(-10, DIR.Y)
              .addColumn(2, DIR.UP, block => block.addEndExtrusion());
          }}
        />
      </div>
      <p>
        Another example inspired by Monument Valley, showing rotation in the
        other direction allowing you to get to various different heights
      </p>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rotate-all-checkbox"
          name="rotate-all-checkbox"
          value={rotateRoutes}
          onChange={toggleRotateRoutes}
        />
        <label htmlFor="rotate-all-checkbox" className="ml-2">
          Click this checkbox if you want to also rotate the routes in the last
          few examples when rotating to see what they actually look like
        </label>
      </div>
      <div id="isometric-monument-valley-lvl-2">
        <IsoBlox
          bloxOrigin={Point(-5, -5, 6)}
          scale={4}
          height={500}
          width={672}
          drawRoute={route => {
            route
              .setRotation(rotateRoutes ? rotation : 0)
              .setGridSize(8)
              .updateOrigin(-5, -5, 5)
              .addTrack(7, DIR.Y)
              .addTrack(3, DIR.X)
              .addTrack(9, DIR.X, block =>
                block.setColor(darkGreen).rotateZCenter(rotation),
              )
              .addTrack(2, DIR.X)
              .addColumn(3, DIR.DOWN, block => block.addStartExtrusion())
              .addTrack(7, DIR.Y)
              .addTrack(-8, DIR.X)
              .addTrack(-3, DIR.Y)
              .setOrigin(Point(0, 0, 0))
              .addTrack(7, DIR.X)
              .addColumn(4, DIR.UP, block => block.addEndExtrusion())
              .setOrigin(Point(0, -5, 7))
              .addTrack(2, DIR.X)
              .setOrigin(Point(3, 3, 0))
              .addColumn(4, DIR.UP, block =>
                block.setColor(darkGreen).rotateAlongAxis(rotation),
              );
          }}
        />
      </div>
      <div id="isometric-monument-valley-lvl-3">
        <IsometricRoute
          scale={4}
          height={600}
          width={672}
          drawRoute={route => {
            route
              .setRotation(rotateRoutes ? rotation : 0)
              .setGridSize(16)
              .updateOrigin(0, 0, 0)
              .addColumn(3, DIR.UP, block => block.addEndExtrusion())
              .updateOrigin(1, 0, -3)
              .addTrack(2, DIR.X)
              .updateOrigin(9, 9, -9)
              .addColumn(15, DIR.UP, block => block.addEndExtrusion())
              .setOrigin(Point(6, 3, 13))
              .addColumn(2, DIR.DOWN, block => block.addStartExtrusion())
              .addTrack(3, DIR.Y)
              .addColumn(16, DIR.DOWN, block => block.addStartExtrusion())

              .setOrigin(Point(4, 7, 2))
              .addTrack(-10, DIR.Y, block => block.setColor(darkGreen))
              .addTrack(2, DIR.X, block => block.setColor(darkGreen))
              .setOrigin(Point(13, 5, -5))
              .addTrack(10, DIR.Y, block => block.setColor(darkGreen))
              .addTrack(-3, DIR.X, block => block.setColor(darkGreen))

              .setOrigin(Point(7, 3 - Math.abs(Math.sin(rotation)) * 6, 4))
              .addTrack(12, DIR.Y, block => block.setColor(darkGreen))
              .addTrack(4, DIR.X, block => block.setColor(darkGreen))
              .addTrack(-14, DIR.Y, block => block.setColor(darkGreen))
              .addTrack(-5, DIR.X, block => block.setColor(darkGreen))
              .draw();
          }}
        />
      </div>
    </div>
  );
};

export default IsometricIllusions;

import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Point } from 'isomer';
import DIR from 'isomer-route/src/directions';
import { darkGreen } from 'isomer-route/src/colors';
import CodeBlock from '../../../components/CodeBlock';
import IsometricRoute from '../../../components/IsometricRoute';

const IsomerRoutePage = () => {
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);

  return (
    <div className="isomer-router">
      <h2>About</h2>
      <p>
        <em>isomer-route</em> allows you to draw complex isometric shapes and
        illusions with ease on the HTML5 canvas, extending on the great work of
        <a href="http://jdan.github.io/isomer/" target="_blank">
          isomer
        </a>
        . Inspired by isometric illusions such as the
        <a
          href="https://en.wikipedia.org/wiki/Penrose_triangle"
          target="_blank"
        >
          Penrose triangle
        </a>
        and the beautiful game
        <a href="https://www.monumentvalleygame.com/" target="_blank">
          Monument Valley
        </a>
      </p>
      <h2>Usage</h2>
      <CodeBlock code="yarn install isomer-route" />

      <CodeBlock
        code={`
          import IsomerRoute from 'isomer-route'

          const canvas = document.querySelector('#isomer-canvas');

          const route = new IsomerRoute(canvas);
        `}
      />

      <p>To start, we can draw a simple path in just a few lines of code</p>
      <div className="mt-2 flex flex-row flex-wrap">
        <CodeBlock
          className="inline"
          code={`
            route
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .draw();
          `}
        />
        <IsometricRoute
          width={300}
          height={200}
          drawRoute={route => {
            route
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .draw();
          }}
        />
      </div>
      <h4>Grid</h4>
      <p>
        Here is the same route overlayed with a 3D grid. This is how objects
        look under an isometric projection. The red lines show the X direction
        and the blue lines show the Y direction
      </p>
      <div className="mt-2 flex flex-row flex-wrap">
        <CodeBlock
          className="inline"
          code={`
            route
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .drawGrid(6)
              .draw();
          `}
        />
        <IsometricRoute
          width={300}
          height={200}
          drawRoute={route => {
            route
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .drawGrid(6)
              .draw();
          }}
        />
      </div>
      <h4>Block Groups</h4>
      <p>
        isomer-route is divided into 3 basic components: <sub>Track</sub>,
        <sub>Column</sub>, and <sub>Stairs</sub>. A block group consists of many
        blocks, which is a wrapper around an <em>isomer</em> <sub>Prism</sub>
        which contains many <sub>Path</sub>s which contain many
        <sub>Point</sub>s
      </p>
      <p>
        A route consists of many of these block groups, where the origin of the
        next block group is at the end of the previous. Block groups also allow
        for complex rotations around any point, or a reference point such as the
        <sub>center</sub>,<sub>start</sub>or<sub>end</sub>
        of the shape.
      </p>

      <h4>Track</h4>
      <p>
        Tracks are block groups with the same <sub>z</sub> value which go in
        either the <sub>X</sub> or
        <sub>Y</sub> direction, by any positive or negative amount.
      </p>
      <div className="mt-2 flex flex-row flex-wrap">
        <CodeBlock
          className="inline"
          code={`
            route
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addTrack(-7, DIR.X)
              .addTrack(-6, DIR.Y)
              .draw();
          `}
        />
        <IsometricRoute
          width={300}
          height={200}
          drawRoute={route => {
            route
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addTrack(-7, DIR.X)
              .addTrack(-6, DIR.Y)
              .draw();
          }}
        />
      </div>
      <h4>Column</h4>
      <p>
        Columns are block groups which increase in <sub>z</sub> value which go
        in either the <sub>UP</sub> or
        <sub>DOWN</sub> direction, by any positive amount.
      </p>
      <div className="mt-2 flex flex-row flex-wrap">
        <CodeBlock
          className="inline"
          code={`
            route
              .addColumn(4, DIR.UP)
              .addTrack(3, DIR.X)
              .addColumn(4, DIR.DOWN)
              .draw();
          `}
        />
        <IsometricRoute
          width={300}
          height={200}
          drawRoute={route => {
            route
              .addColumn(4, DIR.UP)
              .addTrack(3, DIR.X)
              .addColumn(4, DIR.DOWN)
              .draw();
          }}
        />
      </div>
      <h4>Stairs</h4>
      <p>
        Stairs are block groups which increase in <sub>z</sub> and <sub>X</sub>{' '}
        or
        <sub>Y</sub> direction, by any positive amount.
      </p>
      <div className="mt-2 flex flex-row flex-wrap">
        <CodeBlock
          className="inline"
          code={`
            route
              .addStairs(2, DIR.X)
              .addTrack(1, DIR.X)
              .updateOrigin(-1, 0, 0)
              .addStairs(2, DIR.Y)
              .draw();
          `}
        />
        <IsometricRoute
          width={300}
          height={200}
          drawRoute={route => {
            route
              .addStairs(2, DIR.X)
              .addTrack(1, DIR.X)
              .updateOrigin(-1, 0, 0)
              .addStairs(2, DIR.Y)
              .draw();
          }}
        />
      </div>
      <h3>Transformations and rotations</h3>
      <p>
        Combining those 3 fundamental building blocks allows you to build
        complex routes. Remember to call <sub>.draw()</sub> at the end to draw
        your route in the right order
      </p>
      <h4>Route rotations</h4>
      <p>
        You can rotate the entire "route" around the z axis by calling
        <sub>.setRotation()</sub> with some multiple of <sub>Math.PI</sub>. The
        rotation origin is defined by the the center of the grid. You can change
        the grid size by either calling <sub>.setGridSize(size)</sub> or by
        explicitely drawing the grid with <sub>.drawGrid(size)</sub>
      </p>
      <p>
        In the examaple below, clicking the "Rotate" button will rotate the
        shape 90deg
      </p>
      <CodeBlock
        code={`
          route
            .setRotation(rotation)
            .setGridSize(6)
            .addTrack(6, DIR.X)
            .addTrack(6, DIR.Y)
            .addColumn(6, DIR.DOWN)
            .draw();
        `}
      />
      <div className="flex items-center justify-center flex-wrap">
        <button
          className="mr-6"
          onClick={() => setRotation1(r => r + Math.PI / 2)}
        >
          Rotate
        </button>
        <IsometricRoute
          width={300}
          height={400}
          drawRoute={route => {
            route
              .setRotation(rotation1)
              .setGridSize(6)
              .updateOrigin(0, 0, 6)
              .addTrack(6, DIR.X)
              .addTrack(6, DIR.Y)
              .addColumn(6, DIR.DOWN)
              .draw();
          }}
        />
      </div>

      <h4>Block group rotations</h4>
      <p className="mb-4">
        An individual block group may be rotated about a point or a reference
        point by providing a transformation callback to the <sub>addTrack</sub>
        or
        <sub>addColumn</sub> methods.
      </p>
      <CodeBlock
        className="inline"
        code={`
          route
            .setGridSize(12)
            .updateOrigin(8, 8, 0)
            .addTrack(-4, DIR.X)
            .addTrack(-8, DIR.Y)
            .addColumn(4, DIR.UP)
            .addColumn(4, DIR.UP, block =>
              block.setColor(darkGreen).rotateYEnd(-rotation),
            )
            .updateOrigin(0, 1, -1)
            .addTrack(4, DIR.Y, block =>
              block.setColor(darkGreen).rotateAlongAxis(-rotation),
            )
            .addTrack(4, DIR.Y)
            .draw();
        `}
      />
      <div className="flex items-center justify-center flex-wrap">
        <button
          onClick={() => setRotation2(r => r + Math.PI / 2)}
          className="mr-6"
        >
          Rotate
        </button>
        <IsometricRoute
          width={300}
          height={400}
          drawRoute={route => {
            route
              .setGridSize(12)
              .updateOrigin(8, 8, 0)
              .addTrack(-5, DIR.X)
              .addTrack(-10, DIR.Y)
              .addColumn(5, DIR.UP)
              .addColumn(5, DIR.UP, block =>
                block.setColor(darkGreen).rotateYEnd(-rotation2),
              )
              .updateOrigin(0, 1, -1)
              .addTrack(4, DIR.Y, block =>
                block.setColor(darkGreen).rotateAlongAxis(-rotation2),
              )
              .addTrack(5, DIR.Y)
              .draw();
          }}
        />
      </div>

      <h4>Joints</h4>
      <p>
        You may notice that the problem with the above example is that when the
        dark green track is eventually rotated to be in line with the light
        track, the dark green one appears on top of the other, which is in fact
        the case and the drawing order respects that. To improve the illusion
        you can draw them at the same <sub>z</sub> level and join the columns
        using <sub>.addStartExtrusion</sub> and <sub>.addEndExtrusion</sub>.
        While this is more complicated it allows you to produce much nicer
        illusions.
      </p>

      <p className="mb-4">
        The example below looks identical to the one above at first glance, but
        in fact the surfaces that eventually connect are drawn at the same z
        level, and the columns which create the illusion of depth are joint
        using start and end joints to occlude the joining faces. After rotating
        the block you'll notice that the illusion is much more effective because
        none of the faces are above the other, they line up perfectly
      </p>
      <CodeBlock
        code={`
          route
            .setGridSize(12)
            .setOrigin(Point(3, -1, 3))
            .addColumn(2, DIR.UP, block => block.addStartExtrusion())
            .addColumn(5, DIR.UP, block =>
              block.setColor(darkGreen).rotateYEnd(-rotation),
            )
            .updateOrigin(0, 1, -1)
            .addTrack(4, DIR.Y, block =>
              block.setColor(darkGreen).rotateAlongAxis(-rotation),
            )
            .addTrack(5, DIR.Y)
            .setOrigin(Point(-3, -2, 10))
            .addTrack(-5, DIR.X)
            .addTrack(-10, DIR.Y)
            .addColumn(2, DIR.UP, block => block.addEndExtrusion())
            .draw();
        `}
      />
      <div className="flex items-center justify-center flex-wrap">
        <button
          onClick={() => setRotation3(r => r + Math.PI / 2)}
          className="mr-4"
        >
          Rotate
        </button>
        <IsometricRoute
          width={300}
          height={400}
          drawRoute={route => {
            route
              .setGridSize(12)
              .setOrigin(Point(3, -1, 3))
              .addColumn(2, DIR.UP, block => block.addStartExtrusion())
              .addColumn(5, DIR.UP, block =>
                block.setColor(darkGreen).rotateYEnd(-rotation3),
              )
              .updateOrigin(0, 1, -1)
              .addTrack(4, DIR.Y, block =>
                block.setColor(darkGreen).rotateAlongAxis(-rotation3),
              )
              .addTrack(5, DIR.Y)
              .setOrigin(Point(-3, -2, 10))
              .addTrack(-5, DIR.X)
              .addTrack(-10, DIR.Y)
              .addColumn(2, DIR.UP, block => block.addEndExtrusion())
              .draw();
          }}
        />
      </div>

      <h3>Reference</h3>
      <h4>IsomerRoute</h4>
      <p>
        Most of the methods below return the instance, in a builder like fashion
      </p>
      <br />
      <h5>
        <strong>constructor(canvas, origin, color)</strong>
      </h5>
      <ul>
        <li>
          <em>canvas</em> - reference to the HTML canvas element
        </li>
        <li>
          <em>origin = Point(0, 0, 0)</em> - the starting isomer
          <sub>Point</sub>
        </li>
        <li>
          <em>color = Color(59, 188, 188)</em> - the default block
          <sub>Color</sub>
        </li>
      </ul>

      <h5>
        <strong>clearCanvas()</strong>
      </h5>
      <p>Clears the canvas. Helpful when animating the route</p>

      <h5>
        <strong>setColor(color)</strong>
      </h5>
      <p>Changes the default color</p>

      <h5>
        <strong>updateOrigin(dx, dy, dz)</strong>
      </h5>
      <p>
        Updates the current origin by the provided values, each default to zero
      </p>

      <h5>
        <strong>setOrigin(origin)</strong>
      </h5>
      <p>Sets the current origin</p>
      <ul>
        <li>
          <em>origin</em> - an isomer <sub>Point</sub>
        </li>
      </ul>

      <h5>
        <strong>setGridSize(size)</strong>
      </h5>
      <p>
        Sets the grid size, used when drawing the grid, or used to calculate the
        center of the grid when rotating
      </p>
      <ul>
        <li>
          <em>size</em> - an integer
        </li>
      </ul>

      <h5>
        <strong>drawGrid(size, drawNegative)</strong>
      </h5>
      <p>
        Sets the grid size and draws it on the canvas. It is better to call this
        at the end, right before <sub>.draw()</sub> because it doesn't respect
        drawing order
      </p>
      <ul>
        <li>
          <em>size</em> - an integer
        </li>
        <li>
          <em>drawNegative = false</em> - when true it doubles the size of the
          grid, effectively drawing it to the canvas edge
        </li>
      </ul>

      <h5>
        <strong>rotate(rotation)</strong>
      </h5>
      <p>
        Updates the current rotation by the provided amount which rotates the
        route around the center of the grid by the z axis.
      </p>
      <ul>
        <li>
          <em>
            rotation = <sub>Math.PI/8</sub>
          </em>
          - an integer, preferably a multiple of pi
        </li>
      </ul>

      <h5>
        <strong>setRotation(rotation)</strong>
      </h5>
      <p>Sets the current rotation around z around the center of the grid.</p>

      <h5>
        <strong>addColumn(height, direction, transformation)</strong>
      </h5>
      <ul>
        <li>
          <em>height</em> - a positive integer
        </li>
        <li>
          <em>direction</em> - one of <sub>UP</sub> or <sub>DOWN</sub>
        </li>
        <li>
          <em>transformation</em> - a function which transforms the current
          block group, using any of the methods defined on the
          <sub>BlockGroup</sub> below.
        </li>
      </ul>

      <h5>
        <strong>addTrack(length, direction, transformation)</strong>
      </h5>
      <ul>
        <li>
          <em>length</em> - a positive or negative integer
        </li>
        <li>
          <em>direction</em> - one of <sub>X</sub> or <sub>Y</sub>
        </li>
        <li>
          <em>transformation</em> - a function which transforms the current
          block group, using any of the methods defined on the
          <sub>BlockGroup</sub> below.
        </li>
      </ul>

      <h5>
        <strong>
          addStairs(length, direction, incrementPerStair, transformation)
        </strong>
      </h5>
      <ul>
        <li>
          <em>length</em> - a positive integer
        </li>
        <li>
          <em>direction</em> - one of <sub>X</sub> or <sub>Y</sub>
        </li>
        <li>
          <em>incrementPerStair = 5</em> the approx number of small steps in a
          block
        </li>
        <li>
          <em>transformation</em> - a function which transforms the current
          block group, using any of the methods defined on the
          <sub>BlockGroup</sub> below.
        </li>
      </ul>

      <h5>
        <strong>draw()</strong>
      </h5>
      <p>
        The last thing you need to call, it sorts the provided blocks using
        topological sort and then draws them in the right order (if it can)
      </p>

      <br />

      <h4>BlockGroup</h4>
      <p>
        Most of the methods below work on <sub>Track</sub>, <sub>Column</sub>{' '}
        and <sub>Stairs</sub> and return the instance, as above
      </p>
      <br />
      <h5>
        <strong>setColor(color)</strong>
      </h5>
      <p>
        Changes the color of the block group, useful when you want different
        coloured blocks
      </p>

      <h5>
        <strong>rotateXStart(rotation)</strong>
      </h5>
      <p>
        Also, <em>rotateYStart</em> and <em>rotateZStart</em>.
        <br />
        Rotates the block group around the specified axis about the start point
        of the block group by the specified rotation
      </p>
      <h5>
        <strong>rotateXCenter(rotation)</strong>
      </h5>
      <p>
        Also, <em>rotateYCenter</em> and <em>rotateZCenter</em>.
        <br />
        Rotates the block group around the specified axis about the center point
        of the block group by the specified rotation
      </p>
      <h5>
        <strong>rotateXEnd(rotation)</strong>
      </h5>
      <p>
        Also, <em>rotateYEnd</em> and <em>rotateZEnd</em>.
        <br />
        Rotates the block group around the specified axis about the end point of
        the block group by the specified rotation
      </p>
      <h5>
        <strong>rotateAlongAxis(rotation)</strong>
      </h5>
      <p>
        Rotates the block group around its direction by the specified rotation.
        Similar to a barrel roll
      </p>
      <h5>
        <strong>rotateX(point, rotation)</strong>
      </h5>
      <p>
        Also, <em>rotateY</em> and <em>rotateZ</em>.
        <br />
        Rotates the block group around the specified axis about the provided
        point by the specified rotation
      </p>
      <ul>
        <li>
          <em>point</em> - an isomer <sub>Point</sub> specifying the origin of
          the rotation
        </li>
        <li>
          <em>rotation</em> - an integer specifying the rotation amount
        </li>
      </ul>
      <br />
      <br />

      <h2>Credits</h2>
      <p>
        This project wouldn't have been possible without the underlying work
        done by
        <a href="https://github.com/jdan" target="_blank">
          @jdan
        </a>
        on
        <a href="https://github.com/jdan/isomer" target="_blank">
          isomer
        </a>
        . I also received a lot of help in getting my head around the isometric
        grid, drawing order and transformations from my two roommates
        <a href="https://oisinmoran.com/" target="_blank">
          Oisin Moran
        </a>
        and
        <a href="https://twitter.com/conorp854" target="_blank">
          Conor Power
        </a>
        . They were also excellent rubber ducks. Go check out their cool stuff.
      </p>
      <p>
        Another really helpful resource, and interesting read is
        <a
          href="https://shaunlebron.github.io/IsometricBlocks/"
          target="_blank"
        >
          Drawing isometric boxes in the correct order
        </a>
        , which helped me calculate which box is in front when comparing two
        boxes, how to draw them in the right order and how to solve
        <em>impossible cases</em>.
      </p>
      <p>
        For more fun examples check out my
        <HashLink to="/blog/isometric-illusions#top">blog post</HashLink>
      </p>
    </div>
  );
};

export default IsomerRoutePage;

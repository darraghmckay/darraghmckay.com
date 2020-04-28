import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Point } from 'isomer';
import DIR from 'isomer-route/src/directions';
import { darkGreen } from 'isomer-route/src/colors';
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
      </p>
      <h2>Usage</h2>
      <code className="p-2"> yarn install isomer-route</code>

      <code className="p-2">
        {`
  import IsomerRoute from 'isomer-route'

  const canvas = document.querySelector('#isomer-canvas');

  const route = new IsomerRoute(canvas);
        `}
      </code>

      <p>Draw a simple path</p>
      <div className="mt-2 flex flex-row">
        <code className="inline">
          {`
  route
    .addTrack(6, DIR.X)
    .addTrack(6, DIR.Y)
    .addColumn(6, DIR.DOWN)
    .draw();
        `}
        </code>
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
      <div className="mt-2 flex flex-row">
        <code className="inline">
          {`
  route
    .addTrack(6, DIR.X)
    .addTrack(6, DIR.Y)
    .addColumn(6, DIR.DOWN)
    .drawGrid(6)
    .draw();
        `}
        </code>
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
        which contains many <sub>Path</sub>s which contains many
        <sub>Point</sub>s
      </p>
      <p>
        A route consists of manye of these block groups, combined, where the
        origin of the next block group is at the end of the previous. Block
        groups also allow for complex rotations around any point, or a reference
        point such as the <sub>center</sub>, <sub>start</sub> or <sub>end</sub>
        of the shape.
      </p>

      <h4>Track</h4>
      <p>
        Tracks are block groups with the same <sub>z</sub> value which go in
        either the <sub>X</sub> or
        <sub>Y</sub> direction, by any positive or negative amount.
      </p>
      <div className="mt-2 flex flex-row">
        <code className="inline">
          {`
  route
    .addTrack(6, DIR.X)
    .addTrack(6, DIR.Y)
    .addTrack(-7, DIR.X)
    .addTrack(-6, DIR.Y)
    .draw();
        `}
        </code>
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
      <div className="mt-2 flex flex-row">
        <code className="inline">
          {`
  route
    .addColumn(4, DIR.UP)
    .addTrack(3, DIR.X)
    .addColumn(4, DIR.DOWN)
    .draw();
        `}
        </code>
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
      <div className="mt-2 flex flex-row">
        <code className="inline">
          {`
  route
    .addStairs(2, DIR.X)
    .addTrack(1, DIR.X)
    .updateOrigin(-1, 0, 0)
    .addStairs(2, DIR.Y)
    .draw();
        `}
        </code>
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
        You can rotate the entire "route" around the z axis by calling{' '}
        <sub>.setRotation()</sub> with some multiple of <sub>Math.PI</sub>. The
        rotation origin is defined by the the center of the grid. The grid size.
        You can change this by either calling <sub>.setGridSize(size)</sub> or
        by explicitely drawing the grid with <sub>.drawGrid(size)</sub>
      </p>
      <p>
        In the examaple below, clicking the "Rotate" button will rotate the
        shape 90deg
      </p>
      <div className="mt-4 flex items-center justify-between">
        <code className="inline">
          {`
  route
    .setRotation(rotation1)
    .setGridSize(6)
    .addTrack(6, DIR.X)
    .addTrack(6, DIR.Y)
    .addColumn(6, DIR.DOWN)
    .draw();
        `}
        </code>
        <div className="flex items-center justify-center">
          <button onClick={() => setRotation1(r => r + Math.PI / 2)}>
            Rotate
          </button>
        </div>
      </div>
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
      <h4>Block group rotations</h4>
      <p>
        An individual block group may be rotated about a point or a reference
        point by providing a callback to the <sub>addTrack</sub> or
        <sub>addColumn</sub> methods.
      </p>
      <div className="mt-4 flex items-center justify-between">
        <code className="inline">
          {`
  route
    .setGridSize(12)
    .updateOrigin(8, 8, 0)
    .addTrack(-4, DIR.X)
    .addTrack(-8, DIR.Y)
    .addColumn(4, DIR.UP)
    .addColumn(4, DIR.UP, block =>
      block
        .setColor(darkGreen)
        .rotateYEnd(-rotation2),
    )
    .updateOrigin(0, 1, -1)
    .addTrack(4, DIR.Y, block =>
      block
        .setColor(darkGreen)
        .rotateAlongAxis(-rotation2),
    )
    .addTrack(4, DIR.Y)
    .draw();
        `}
        </code>
        <div className="flex items-center justify-center">
          <button onClick={() => setRotation2(r => r + Math.PI / 2)}>
            Rotate
          </button>
        </div>
      </div>
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

      <p>
        The example below looks identical to the one above at first glance, but
        in fact the surfaces that eventually connect are drawn at the same z
        level, and the columns which create the illusion of depth are joint
        using start and end joints to occlude the joining faces. After rotating
        the block you'll notice that the illusion is much more effective because
        none of the faces are above the other, they line up perfectly
      </p>
      <div className="mt-4 flex items-center justify-between">
        <code className="inline">
          {`
  route
    .setGridSize(12)
    .setOrigin(Point(3, -1, 3))
    .addColumn(2, DIR.UP, block => 
      block.addStartExtrusion()
    )
    .addColumn(5, DIR.UP, block =>
      block
        .setColor(darkGreen)
        .rotateYEnd(-rotation3),
    )
    .updateOrigin(0, 1, -1)
    .addTrack(4, DIR.Y, block =>
      block
        .setColor(darkGreen)
        .rotateAlongAxis(-rotation3),
    )
    .addTrack(5, DIR.Y)
    .setOrigin(Point(-3, -2, 10))
    .addTrack(-5, DIR.X)
    .addTrack(-10, DIR.Y)
    .addColumn(2, DIR.UP, block => 
      block.addEndExtrusion()
    )
    .draw();
        `}
        </code>
        <div className="flex items-center justify-center">
          <button onClick={() => setRotation3(r => r + Math.PI / 2)}>
            Rotate
          </button>
        </div>
      </div>
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
      <p>
        For more examples check out my
        <HashLink to="/blog/isometric-illusions#top">blog post</HashLink>
      </p>
    </div>
  );
};

export default IsomerRoutePage;

import React, { useState, useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';
import { perm, isFlip } from './utils/permutations';
import colors from './utils/colors';

const Permutohedron = () => {
  const d3Graph = useRef(null);
  const [number, setNumber] = useState(3);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    if (d3Graph.current && number && number < 7 && number > 0) {
      const Graph = ForceGraph3D()(d3Graph.current);

      const numbers = [...Array(number + 1).keys()].slice(1);

      const permutations = perm(numbers);

      const nodes = permutations.map(p => ({
        id: p.join(''),
        name: p.join(''),
      }));

      const links = [];
      permutations.forEach((perm1, index) => {
        permutations.slice(index + 1).forEach(perm2 => {
          if (isFlip(perm1, perm2)) {
            links.push({
              source: perm1.join(''),
              target: perm2.join(''),
              color: perm1[0] === perm2[0] ? colors[perm1[0]] : colors[0],
            });
          }
        });
      });

      console.log(nodes, links);

      Graph.backgroundColor('#fff')
        .enableNodeDrag(false)
        .nodeColor(() => '#33475b')
        .nodeOpacity(0.95)
        .forceEngine('d3')
        .linkColor(link => (showColors && link.color) || '#cbd6e2')
        .linkWidth(2)
        .linkOpacity(0.7)
        .d3AlphaDecay(0.0001)
        .graphData({ nodes: nodes, links: links });
    }
  }, [d3Graph, number, showColors]);

  return (
    <div>
      <div className="max-w-2xl px-4 md:px-0 mx-auto">
        <p>
          This was yet another challenge brought to me by my lovely roommates.
          They had their own
          <a
            href="https://twitter.com/TheOisinMoran/status/1245845293918289920"
            target="_blank"
          >
            solutions
          </a>
          , but I wanted to visualise it in 3D.
        </p>
        <p>
          The question, originally asked by
          <a
            href="https://twitter.com/anniek_p/status/1245351315213074432?s=09"
            target="_blank"
          >
            @anniek_p on twitter
          </a>
          , sounds simple in nature,{' '}
          <strong>what does an order 4 permutohedron look like?</strong>
        </p>
        <p>
          According to
          <a href="https://en.wikipedia.org/wiki/Permutohedron" target="_blank">
            wikipedia
          </a>
          ,
          <em>
            the permutohedron of order n is an (n − 1)-dimensional polytope
            embedded in an n-dimensional space. Its vertex coordinates are the
            permutations of the first n natural numbers. The edges are the
            shortest possible connections between these points. Two permutations
            connected by an edge differ in two places, and the numbers on these
            places are neighbors.
          </em>
        </p>
        <br />
        <p>
          For example
          <br />
          The permutations of <sub>123</sub> are <sub>123</sub>, <sub>132</sub>,
          <sub>213</sub>, <sub>231</sub>, <sub>312</sub> and <sub>321</sub>
          <br />
          And <sub>123</sub> is a neighbor of <sub>132</sub>
        </p>
        <br />
        <p>
          See the solution below for values of n between 1 and 6. You can change
          the value for n with the input below Technically the code works for
          all <sub>n >= 1</sub> but it will max our your browser's CPU pretty
          fast.
        </p>

        <p>
          You can also toggle link colors, whereby links between nodes which
          have the same first number eg. <sub>123</sub> and <sub>132</sub> get
          the same color. This should help you identify the solutions for
          <sub>n-1</sub> in the solution for <sub>n</sub>
        </p>
        <div className="flex items-center justify-center my-4">
          <button onClick={() => setNumber(number - 1)} disabled={number <= 1}>
            Decrease
          </button>
          <label htmlFor="perm-number-input" className="inline-block mx-4">
            n = {number}
          </label>
          <button onClick={() => setNumber(number + 1)} disabled={number >= 6}>
            Increase
          </button>
          <label className="ml-2" htmlFor="show-colors">
            Show color groups
          </label>
          <input
            id="show-colors"
            className="ml-2"
            type="checkbox"
            onChange={() => setShowColors(!showColors)}
            value={showColors}
          />
        </div>
      </div>
      <div id="3d-graph" ref={d3Graph} />
    </div>
  );
};

export default Permutohedron;

import React, { useState, useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';

const perm = a =>
  a.length
    ? a.reduce(
        (r, v, i) => [
          ...r,
          ...perm([...a.slice(0, i), ...a.slice(i + 1)]).map(x => [v, ...x]),
        ],
        [],
      )
    : [[]];

const isFlip = (numArr1, numArr2) =>
  numArr1
    .map(
      (el, index) =>
        el === numArr2[index + 1] &&
        numArr1[index + 1] === numArr2[index] &&
        numArr1
          .slice(index + 2)
          .every((endEl, endInd) => endEl === numArr2[index + 2 + endInd]) &&
        numArr1
          .slice(0, Math.max(index - 1, 0))
          .every((startEl, startInd) => startEl === numArr2[startInd]),
    )
    .filter(Boolean).length === 1;

const Permutohedron = () => {
  const d3Graph = useRef(null);
  const [number, setNumber] = useState(3);

  useEffect(() => {
    if (d3Graph.current && number && number < 7 && number > 1) {
      const Graph = ForceGraph3D()(d3Graph.current);

      const numbers = [];
      for (let i = 1; i <= number; i++) {
        numbers.push(i);
      }

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
        .linkColor(() => '#cbd6e2')
        .linkWidth(2)
        .linkOpacity(0.7)
        .d3AlphaDecay(0.0001)
        .graphData({ nodes: nodes, links: links });
    }
  }, [d3Graph, number]);

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
          See the solution below for values of n between 2 and 6. You can change
          the value for n with the input below Technically the code works for
          all <sub>n >= 2</sub> but it will max our your browser's CPU pretty
          fast.
        </p>
        <div className="flex items-center justify-center my-3">
          <label htmlFor="perm-number-input" className="inline-block">
            n =
          </label>
          <input
            id="perm-number-input"
            className="inline-block ml-3"
            type="number"
            max="6"
            min="2"
            placeholder="4"
            value={number}
            onChange={({ target: { value } }) => setNumber(value)}
          />
        </div>
      </div>
      <div id="3d-graph" ref={d3Graph} />
    </div>
  );
};

export default Permutohedron;

import React from 'react';
import { Node, Line } from '../../util';

function GraphNodes({ graphNodes, graphLines }: any): JSX.Element {
  const nodes = graphNodes.map((node: Node) => (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50px',
        border: '2px solid black',
        height: '50px',
        width: '50px',
        backgroundColor: node.color,
        transform: `translate(${400 + 100 * Math.floor(node.key / 2)}px, ${200 + ((-1) ** Math.ceil(node.key / 2)) * 50 + ((-1) ** Math.ceil(node.key / 2)) * (Math.sqrt(40000 - ((100 * Math.floor(node.key / 2) - 200) ** 2)) / 1.5)}px)`,
        zIndex: 100,
      }}
      key={node.key}
    >
      <p
        style={{
          color: 'black',
          textAlign: 'center',
        }}
      >
        {node.key}
      </p>
    </div>
  ));
  const lines = graphLines.map((line: Line) => (
    <line
      x1={`${425 + 100 * Math.floor(line.from / 2)}`}
      y1={`${225 + ((-1) ** Math.ceil(line.from / 2)) * 50 + ((-1) ** Math.ceil(line.from / 2)) * (Math.sqrt(40000 - ((100 * Math.floor(line.from / 2) - 200) ** 2)) / 1.5)}`}
      x2={`${425 + 100 * Math.floor(line.to / 2)}`}
      y2={`${225 + ((-1) ** Math.ceil(line.to / 2)) * 50 + ((-1) ** Math.ceil(line.to / 2)) * (Math.sqrt(40000 - ((100 * Math.floor(line.to / 2) - 200) ** 2)) / 1.5)}`}
      style={{
        stroke: line.color,
        strokeWidth: 2,
        zIndex: 1,
      }}
    />
  ));
  return (
    <div>
      {nodes}
      <svg height="1000" width="2000" style={{ zIndex: 1 }}>
        {lines}
      </svg>
    </div>
  );
}
export default GraphNodes;

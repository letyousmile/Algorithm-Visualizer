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
        transform: `translate(${400 + 100 * Math.floor(node.key / 2)}px, ${200 + ((-1) ** Math.ceil(node.key / 2)) * (Math.sqrt(40000 - ((100 * Math.floor(node.key / 2) - 200) ** 2)) / 1.5)}px)`,
        zIndex: 1,
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
    <div
      style={{
        position: 'absolute',
        display: 'block',
        height: '0px',
        padding: '3px 0',
        width: '100px',
        backgroundColor: line.color,
        transform: `translate(${400 + 100 * Math.floor(line.from / 2) + 25}px, ${200 + ((-1) ** Math.ceil(line.from / 2)) * (Math.sqrt(40000 - ((100 * Math.floor(line.from / 2) - 200) ** 2)) / 1.5) + 25}px)`,
      }}
      key={line.key}
    />
  ));
  return (
    <div>
      {nodes}
      {lines}
    </div>
  );
}
export default GraphNodes;

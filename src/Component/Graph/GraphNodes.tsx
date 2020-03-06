import React from 'react';
import { Node, Line } from '../../util';

function positionX(key: number): number {
  return (400 + 100 * Math.floor(key / 2));
}
function positionY(key: number): number {
  return (200 + ((-1) ** Math.ceil(key / 2)) * 50 + ((-1) ** Math.ceil(key / 2))
  * (Math.sqrt(40000 - ((100 * Math.floor(key / 2) - 200) ** 2)) / 1.5));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GraphNodes({ graphNodes, graphLines, list }: any): JSX.Element {
  const nodes = graphNodes.map((node: Node) => (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50px',
        border: '2px solid black',
        height: '50px',
        width: '50px',
        backgroundColor: node.color,
        transform: `translate(${positionX(node.key)}px, ${positionY(node.key)}px)`,
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
      x1={`${positionX(line.from) + 25}`}
      y1={`${positionY(line.from) + 25}`}
      x2={`${positionX(line.to) + 25}`}
      y2={`${positionY(line.to) + 25}`}
      style={{
        stroke: line.color,
        strokeWidth: 2,
        zIndex: 1,
      }}
      key={line.key}
    />
  ));
  const stackOrQueue = list.map((node: number) => (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        fontSize: '40px',
        color: 'black',
        border: '2px solid black',
        borderStyle: 'dashed',
        textAlign: 'center',
        lineHeight: '40px',
        marginBottom: '5px',
        WebkitTransition: ' -webkit-transform 0.2s opacity 0.2s',
        transition: 'transform 0.2s opacity 0.2s',
      }}
      key={node}
    >
      {node}
    </div>
  ));
  return (
    <div>
      {nodes}
      <div style={{
        display: 'flex',
        height: '400px',
        width: '70px',
        borderLeft: '2px solid black',
        borderRight: '2px solid black',
        borderBottom: '2px solid black',
        position: 'absolute',
        transform: 'translate(1000px, 30px)',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      >
        {stackOrQueue}
      </div>
      <svg height="900" width="1600">
        {lines}
      </svg>
    </div>
  );
}
export default GraphNodes;

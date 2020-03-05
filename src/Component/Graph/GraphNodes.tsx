import React from 'react';
import { Node, Line } from '../../util';

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
        position: 'absolute',
        transform: 'translate(1000px, 100px)',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
      }}
      >
        {stackOrQueue}
      </div>
      <svg height="1000" width="2000">
        {lines}
      </svg>
    </div>
  );
}
export default GraphNodes;

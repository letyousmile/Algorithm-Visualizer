import React from 'react';
import GraphNodes from './GraphNodes';
import { Node, Line } from '../../util';

function graphView(): JSX.Element {
  const graphNodes: Node[] = [
    {
      key: 0,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 1,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 2,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 3,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 4,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 5,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 6,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 7,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 8,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 9,
      connected: [0],
      color: 'grey',
      isVisited: false,
    },
  ];
  const graphLines: Line[] = [
    {
      key: 0,
      color: 'black',
      from: 1,
      to: 2,
    },
  ];
  return (
    <div
      style={{
        height: '700px',
      }}
    >
      <GraphNodes graphNodes={graphNodes} graphLines={graphLines} />
    </div>
  );
}
export default graphView;

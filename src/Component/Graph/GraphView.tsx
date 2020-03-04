import React from 'react';
import GraphNodes from './GraphNodes';
import { Node, Line } from '../../util';

function graphView(): JSX.Element {
  const graphNodes: Node[] = [
    {
      key: 0,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 1,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 2,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 3,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 4,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 5,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 6,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 7,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 8,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
    {
      key: 9,
      connted: [0],
      color: 'grey',
      isVisited: false,
    },
  ];
  const graphLines: Line[] = [
    {
      key: 0,
      existed: true,
      color: 'black',
      from: 6,
      to: 9,
    },
    {
      key: 1,
      existed: true,
      color: 'black',
      from: 1,
      to: 2,
    },
    {
      key: 2,
      existed: true,
      color: 'black',
      from: 0,
      to: 6,
    },
    {
      key: 3,
      existed: true,
      color: 'black',
      from: 3,
      to: 4,
    },
    {
      key: 4,
      existed: true,
      color: 'black',
      from: 7,
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

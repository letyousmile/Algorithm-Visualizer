import React from 'react';
import PropTypes from 'prop-types';
import { GraphNode } from '../../util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NodeTree({ graphNodes }: any): JSX.Element {
  const graphLength = graphNodes.length;
  const maxDepth = Math.floor(Math.log2(graphLength));
  const maxChildCnt = maxDepth ** 2;
  const NodeTrees = graphNodes.map((graphNode: GraphNode) => {
    const currentDepth = (Math.ceil(Math.log2(graphNode.index + 2)) - 1);
    const subDepth = maxDepth - currentDepth;
    const widthInterval = 2 ** subDepth * (window.innerWidth / (maxChildCnt + 10));
    const nodeCntInCurDepth = 2 ** currentDepth;
    const positionInCurDepth = (graphNode.index + 1) - nodeCntInCurDepth;
    const getXPosition = positionInCurDepth * widthInterval - (widthInterval / 2) * (nodeCntInCurDepth - 1) - 25;
    const getYPosition = currentDepth * 100 + 100;

    return (
      <div
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          backgroundColor: graphNode.color,
          textAlign: 'center',
          color: 'black',
          border: '1px solid black',
          borderRadius: '25px',
          transform: `translate(${getXPosition}px, ${getYPosition}px)`,
          WebkitTransition: ' -webkit-transform 0.1s',
          transition: 'transform 0.1s',
          visibility: graphNode.display === 'visible' || graphNode.display === undefined ? 'visible' : 'hidden',
        }}
        key={graphNode.key.toString()}
      >
        <h1
          style={{
            marginBlockStart: '0',
            marginBlockEnd: '0',
          }}
        >
          {graphNode.value}
        </h1>
      </div>
    );
  });
  const flex = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  };
  return (
    <div style={flex}>
      {NodeTrees}
    </div>
  );
}

NodeTree.propTypes = {
  graphNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default NodeTree;

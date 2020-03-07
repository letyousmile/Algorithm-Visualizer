import React from 'react';
import PropTypes from 'prop-types';
import { GraphBar, Line } from '../../util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NodeTree({ graphNodes, sortedNodes, lines }: any): JSX.Element {
  const graphLength = graphNodes.length;
  const maxDepth = Math.floor(Math.log2(graphLength));
  const maxChildCnt = maxDepth ** 2;
  const NodeTrees = graphNodes.map((graphNode: GraphBar) => {
    const currentDepth = (Math.ceil(Math.log2(graphNode.index + 2)) - 1);
    const subDepth = maxDepth - currentDepth;
    const widthInterval = 2 ** subDepth * (window.innerWidth / (maxChildCnt + 10));
    const nodeCntInCurDepth = 2 ** currentDepth;
    const positionInCurDepth = (graphNode.index + 1) - nodeCntInCurDepth;
    const getXPosition = positionInCurDepth * widthInterval
      - (widthInterval / 2) * (nodeCntInCurDepth - 1) - 25 + window.innerWidth / 2;
    const getYPosition = currentDepth * (window.innerHeight / 10) + (window.innerHeight / 10);

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
          zIndex: 2,
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
  const sortedNode = sortedNodes.map((graphNode: GraphBar) => (
    <div
      style={{
        bottom: `${window.innerHeight / 4}PX`,
        position: 'absolute',
        width: '50px',
        height: '50px',
        backgroundColor: graphNode.color,
        textAlign: 'center',
        color: 'black',
        borderRadius: '25px',
        border: '1px solid black',
        transform: `translate(${graphNode.index * 50 - sortedNodes.length * 25 + window.innerWidth / 2}px, 0px)`,
        WebkitTransition: ' -webkit-transform 0.2s',
        transition: 'transform 0.2s',
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
  ));
  const paintLines = lines.map((line: Line) => {
    const currentDepthTo = (Math.ceil(Math.log2(line.to + 2)) - 1);
    const currentDepthFrom = (Math.ceil(Math.log2(line.from + 2)) - 1);
    const subDepthTo = maxDepth - currentDepthTo;
    const subDepthFrom = maxDepth - currentDepthFrom;
    const widthIntervalTo = 2 ** subDepthTo * (window.innerWidth / (maxChildCnt + 10));
    const widthIntervalFrom = 2 ** subDepthFrom * (window.innerWidth / (maxChildCnt + 10));
    const nodeCntInCurDepthTo = 2 ** currentDepthTo;
    const nodeCntInCurDepthFrom = 2 ** currentDepthFrom;
    const positionInCurDepthTo = (line.to + 1) - nodeCntInCurDepthTo;
    const positionInCurDepthFrom = (line.from + 1) - nodeCntInCurDepthFrom;
    const getXPositionTo = positionInCurDepthTo * widthIntervalTo
      - (widthIntervalTo / 2) * (nodeCntInCurDepthTo - 1) + window.innerWidth / 2;
    const getYPositionTo = currentDepthTo * (window.innerHeight / 10)
      + (window.innerHeight / 10) + 25;
    const getXPositionFrom = positionInCurDepthFrom * widthIntervalFrom
      - (widthIntervalFrom / 2) * (nodeCntInCurDepthFrom - 1) + window.innerWidth / 2;
    const getYPositionFrom = currentDepthFrom * (window.innerHeight / 10)
      + (window.innerHeight / 10) + 25;
    return (
      <line
        x1={`${getXPositionTo}px`}
        y1={`${getYPositionTo}px`}
        x2={`${getXPositionFrom}px`}
        y2={`${getYPositionFrom}px`}
        style={{
          stroke: line.color,
          strokeWidth: 2,
          zIndex: 1,
          visibility: line.display === 'visible' ? 'visible' : 'hidden',
        }}
        key={line.key.toString()}
      />
    );
  });
  return (
    <div>
      {NodeTrees}
      {sortedNode}
      <svg
        height="700px"
        width={window.innerWidth}
      >
        {paintLines}
      </svg>
    </div>
  );
}

NodeTree.propTypes = {
  graphNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortedNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  lines: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default NodeTree;

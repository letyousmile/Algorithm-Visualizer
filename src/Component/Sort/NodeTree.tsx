import React from 'react';
import PropTypes from 'prop-types';
import { GraphNode } from '../../util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NodeTree({ graphNodes }: any): JSX.Element {
  const NodeTrees = graphNodes.map((graphNode: GraphNode) => (
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
        transform: `translate(${graphNode.index * 50 - graphNodes.length * 25}px, ${(window.innerHeight / 2) * 1.3 + 50}px)`,
        WebkitTransition: ' -webkit-transform 0.2s',
        transition: 'transform 0.2s',
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
  ));
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

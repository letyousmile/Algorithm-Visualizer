import React from 'react';
import PropTypes from 'prop-types';
import { GraphBar } from '../../util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SortBar({ graphBars }: any): JSX.Element {
  const SortBars = graphBars.map((graphBar: GraphBar) => (
    <g style={{
      transform: `translate(${window.innerWidth * 0.5 + graphBar.index * 50 - graphBars.length * 25}px, ${window.innerHeight * 0.6 - graphBar.height! - (graphBar.value * 20)}px)`,
      WebkitTransition: ' -webkit-transform 0.2s',
      transition: 'transform 0.2s',
    }}
    >
      <rect
        width="50px"
        height={`${(graphBar.value * 20) + 50}px`}
        style={{
          fill: graphBar.color,
          stroke: 'black',
        }}
        key={graphBar.key.toString()}
      />
      <text
        x={25}
        y={20}
        textAnchor="middle"
        stroke="white"
        strokeWidth="1"
        fill="white"
        dy=".1em"
        key={graphBar.key}
      >
        {graphBar.value}
      </text>
    </g>
  ));
  return (
    <div>
      <svg width={window.innerWidth} height="700">
        {SortBars}
      </svg>
    </div>
  );
}

SortBar.propTypes = {
  graphBars: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SortBar;

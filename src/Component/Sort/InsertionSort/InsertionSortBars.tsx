import React from 'react';
import PropTypes from 'prop-types';
import { InsertionSortGraphBar } from '../../../util';
// import { bar } from './util';


function InsertionSortBar({ graphBars }: any): JSX.Element {
  const inserttionSortBars = graphBars.map((graphBar: InsertionSortGraphBar) => (
    <div
      style={{
        position: 'absolute',
        width: '50px',
        height: `${(graphBar.value * 50) + 50}px`,
        backgroundColor: graphBar.color,
        textAlign: 'center',
        color: 'black',
        border: '1px solid black',
        transform: `translate(${graphBar.index * 50 - graphBars.length * 25}px, 650px)`,
        WebkitTransition: ' -webkit-transform 1s',
        transition: 'transform 1s',
      }}
      key={graphBar.key.toString()}
    >
      <h1>{graphBar.value}</h1>
    </div>
  ));
  const flex = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  };
  return (
    <div style={flex}>
      {inserttionSortBars}
    </div>
  );
}

InsertionSortBar.propTypes = {
  graphBars: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default InsertionSortBar;

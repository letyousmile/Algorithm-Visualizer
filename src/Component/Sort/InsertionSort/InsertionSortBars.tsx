import React from 'react';
import PropTypes from 'prop-types';
import bar from '../../../util';
// import { bar } from './util';


function InsertionSortBar({ graphBars }: any): JSX.Element {
  const inserttionSortBars = graphBars.map((graphBar: bar) => (
    <div
      style={{
        width: '100px',
        height: `${(graphBar.value * 50).toString()}px`,
        backgroundColor: 'white',
        textAlign: 'center',
        color: 'black',
        border: '1px solid black',
      }}
      key={graphBar.key.toString()}
    >
      <p>{graphBar.value}</p>
    </div>
  ));
  const flex = {
    display: 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
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

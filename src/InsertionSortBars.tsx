import React from 'react';
import PropTypes from 'prop-types';
import { bar } from './util';
// import { bar } from './util';

const boxStyle = {
  width: '100px',
  height: '100px',
  'background-color': 'white',
  'align-text': 'center',
  'color': 'black',
};

function InsertionSortBar({ graphBars }: any): JSX.Element {
  const inserttionSortBars = graphBars.map((graphBar: bar) => <div style={boxStyle} key={graphBar.key.toString()}><p>{graphBar.value}</p></div>);
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

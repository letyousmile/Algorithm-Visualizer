import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../Main';
import BSort from '../Component/Sort/BubbleSort2';
import ISort from '../Component/Sort/InsertionSort/InsertionSort';
import SSort from '../Component/Sort/SelectionSort';

function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/BSort" component={BSort} />
        <Route path="/ISort" component={ISort} />
        <Route path="/SSort" component={SSort} />
      </Switch>
    </Router>
  );
}
export default Routes;

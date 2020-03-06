import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../Main';
import SortView from '../Component/Sort/SortView';
import HSort from '../Component/Sort/HeapSort';
import GraphView from '../Component/Graph/GraphView';
import FixedGraphView from '../Component/Graph/FixedGraphView';

function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/BSort" component={SortView} />
        <Route path="/ISort" component={SortView} />
        <Route path="/SSort" component={SortView} />
        <Route path="/MSort" component={SortView} />
        <Route path="/QSort" component={SortView} />
        <Route path="/HSort" component={HSort} />
        <Route path="/bfs" component={GraphView} />
        <Route path="/dfs" component={GraphView} />
        <Route path="/prim" component={FixedGraphView} />
        <Route path="/kruskal" component={FixedGraphView} />
        <Route path="/dijkstra" component={FixedGraphView} />
        <Route path="/bellmanFord" component={FixedGraphView} />
      </Switch>
    </Router>
  );
}
export default Routes;


export type GraphBar = {
  key: number;
  value: number;
  color: string;
  index: number;
  sorted: boolean;
  height: number;
};
export type Process = {
  arr: number[];
  targets: number[];
  phase: string;
};
export type GraphNode = {
  key: number;
  value: number;
  color: string;
  index: number;
  sorted: boolean;
  display: string;
};

export type Node = {
  key: number;
  connected: number[];
  color: string;
};
export type Line = {
  key: number;
  from: number;
  to: number;
  color: string;
};
export type GProcess = {
  visitedNode: number[];
  visitedLine: string[];
  targetNodes: number[];
  targetLine: string;
  phase: string;
  list: number[];
};

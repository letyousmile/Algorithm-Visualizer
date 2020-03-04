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

export type Node = {
  key: number;
  connted: number[];
  color: string;
  isVisited: boolean;
};
export type Line = {
  key: number;
  existed: boolean;
  color: string;
  from: number;
  to: number;
};
export type GProcess = {
  visitedNode: number[];
  visitedLine: number[];
  targetNodes: number[];
  targetLine: number;
  phase: string;
};

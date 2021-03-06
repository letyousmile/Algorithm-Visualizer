
export type GraphBar = {
  key: number;
  value: number;
  color: string;
  index: number;
  sorted: boolean;
  height?: number;
  display?: string;
};
export type Process = {
  arr: number[];
  targets: number[];
  phase: string;
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
  display?: string;
};
export type GProcess = {
  visitedNode: number[];
  visitedLine: string[];
  targetNodes: number[];
  targetLine: string;
  phase: string;
  list: number[];
};

export type FixedNode = {
  key: number;
  connected: number[];
  color: string;
  x: number;
  y: number;
};

export type WeightedLine = {
  key: string;
  from: number;
  to: number;
  color: string;
  weight: number;
};

export type GraphBar = {
  key: number;
  value: number;
  color: string;
  index: number;
  sorted: boolean;
  height: number;
};
export type Node = {
  key: number;
  connted: number[];
  color: string;
  isVisited: boolean;
};
export type Process = {
  arr: number[];
  targets: number[];
  phase: string;
};
export type GProcess = {
  visited: boolean[];
  targets: number[];
  phase: string;
};

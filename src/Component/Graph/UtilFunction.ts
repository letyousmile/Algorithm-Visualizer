import {
  Node, Line, GProcess, FixedNode, WeightedLine,
} from '../../util';
import {
  bfs, dfs, prim, kruskal, dijkstra, bellmanFord,
} from './GraphAlgorithm';

export function makeGraph(density = 'normal'): [Node[], Map<string, Line>] {
  const len = 10;
  let lineKey = 0;
  const nodeList: Node[] = [];
  for (let i = 0; i < len; i += 1) {
    const node: Node = {
      key: i, connected: [], color: 'grey',
    };
    nodeList.push(node);
  }
  const lineMap = new Map<string, Line>();
  let d = len / 3;
  if (density === 'low') {
    d = len / 5;
  } else if (density === 'high') {
    d = len / 2;
  }
  for (let i = 0; i < len - 1; i += 1) {
    if (nodeList[i].connected.length >= d) break;
    const randomSet = new Set<number>();
    for (let j = 0; j < d - nodeList[i].connected.length; j += 1) {
      randomSet.add(Math.floor(Math.random() * (len - i - 1) + i + 1));
    }
    const tempList = Array.from(randomSet).sort();
    for (let j = 0; j < tempList.length; j += 1) {
      nodeList[i].connected.push(tempList[j]);
      nodeList[tempList[j]].connected.push(i);
    }
    for (let j = 0; j < tempList.length; j += 1) {
      const line: Line = {
        key: lineKey, from: i, to: tempList[j], color: 'black',
      };
      lineMap.set(i.toString().concat('to').concat(tempList[j].toString()), line);
      lineKey += 1;
    }
  }
  return [nodeList, lineMap];
}

export function makeFixedGraph(type: number): [FixedNode[], Map<string, WeightedLine>] {
  const nodeList: FixedNode[] = [];
  const lineMap = new Map<string, WeightedLine>();
  const howlong: number[] = [6];
  const location: number[][][] = [
    [[0, 0], [400, 0], [170, 150], [230, 250], [0, 400], [400, 400]],
  ];
  const connetion: number[][][] = [
    [[1, 2, 4], [0, 3, 5], [0, 4, 3], [1, 4, 5], [0, 2, 3, 5], [1, 3, 4]],
  ];
  for (let i = 0; i < howlong[type]; i += 1) {
    nodeList.push({
      key: i, connected: connetion[type][i], color: 'grey', x: location[type][i][0], y: location[type][i][1],
    });
    const from = i;
    for (let j = 0; j < connetion[type][i].length; j += 1) {
      const to = connetion[type][i][j];
      const key = from < to ? `${from}to${to}` : `${to}to${from}`;
      const line: WeightedLine = {
        key, from, to, color: 'black', weight: Math.floor(Math.random() * 30),
      };
      lineMap.set(key, line);
    }
  }
  return [nodeList, lineMap];
}

export const search = (nodeList: Node[], searchName: string): GProcess[] => {
  let process: GProcess[] = [];
  switch (searchName) {
    case 'bfs':
      process = bfs(nodeList);
      break;
    case 'dfs':
      process = dfs(nodeList);
      break;
    default:
      break;
  }
  return process;
};

export function find(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  from: number, findName: string): GProcess[] {
  let process: GProcess[] = [];
  switch (findName) {
    case 'prim':
      process = prim(nodeList, lineMap, from);
      break;
    case 'kruskal':
      process = kruskal(nodeList, lineMap);
      break;
    case 'dijkstra':
      process = dijkstra(nodeList, lineMap, from);
      break;
    case 'bellmanFord':
      process = bellmanFord(nodeList, lineMap, from);
      break;
    default:
      break;
  }
  return process;
}

export function rendering(nodeList: Node[], lineMap: Map<string, Line>,
  process: GProcess): [Node[], Map<string, Line>] {
  const NList = nodeList.slice();
  const LMap = lineMap;
  const NVisited = process.visitedNode;
  const LVisited = process.visitedLine;
  const NTargets = process.targetNodes;
  // 단계를 위한 초기화
  for (let i = 0; i < NList.length; i += 1) {
    NList[i].color = 'grey';
  }
  LMap.forEach((value, key) => {
    const line = LMap.get(key);
    if (line !== undefined) {
      line.color = 'black';
      LMap.set(key, line);
    }
  });
  // 이미 방문된 것들 색 바꿔주기
  for (let i = 0; i < NVisited.length; i += 1) {
    NList[NVisited[i]].color = '#2ee22e';
  }
  for (let i = 0; i < LVisited.length; i += 1) {
    const line = LMap.get(LVisited[i]);
    if (line !== undefined) {
      line.color = '#2ee22e';
      LMap.set(LVisited[i], line);
    }
  }
  // 지금 방문한 거 색 바꾸기
  if (process.phase === 'visit') {
    if (NTargets.length > 0) {
      NList[NTargets[0]].color = 'orange';
      NList[NTargets[1]].color = 'yellow';
    }
  }
  if (process.phase === 'pop') {
    if (NTargets.length > 0) {
      NList[NTargets[0]].color = 'orange';
    }
  }
  if (process.phase === 'afterVisit') {
    if (NTargets.length > 0) {
      NList[NTargets[0]].color = 'orange';
    }
  }
  const line = LMap.get(process.targetLine);
  if (line !== undefined) {
    line.color = '#ff9400';
    LMap.set(process.targetLine, line);
  }
  return [NList.slice(), LMap];
}

export function fixedRendering(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  process: GProcess): [FixedNode[], Map<string, WeightedLine>] {
  const NList = nodeList.slice();
  const LMap = lineMap;
  const NVisited = process.visitedNode;
  const LVisited = process.visitedLine;
  const NTargets = process.targetNodes;
  // 단계를 위한 초기화
  for (let i = 0; i < NList.length; i += 1) {
    NList[i].color = 'grey';
  }
  LMap.forEach((value, key) => {
    const line = LMap.get(key);
    if (line !== undefined) {
      line.color = 'black';
      LMap.set(key, line);
    }
  });
  // 이미 방문된 것들 색 바꿔주기
  for (let i = 0; i < NVisited.length; i += 1) {
    NList[NVisited[i]].color = '#2ee22e';
  }
  for (let i = 0; i < LVisited.length; i += 1) {
    const line = LMap.get(LVisited[i]);
    if (line !== undefined) {
      line.color = '#2ee22e';
      LMap.set(LVisited[i], line);
    }
  }
  const line = LMap.get(process.targetLine);
  if (process.phase === 'check') {
    if (line !== undefined) {
      line.color = 'orange';
      LMap.set(process.targetLine, line);
    }
    if (NTargets.length > 0) {
      NList[NTargets[0]].color = 'orange';
      NList[NTargets[1]].color = 'yellow';
    }
  } else if (process.phase === 'connect') {
    if (line !== undefined) {
      line.color = '#2ee22e';
      LMap.set(process.targetLine, line);
    }
    if (NTargets.length > 0) {
      NList[NTargets[0]].color = '#2ee22e';
      NList[NTargets[1]].color = '#2ee22e';
    }
  }
  return [NList.slice(), LMap];
}

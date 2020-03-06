import { Node, Line, GProcess } from '../../util';
import { bfs, dfs } from './GraphAlgorithm';

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
export function rendering(nodeList: Node[], lineMap: Map<string, Line>, process: GProcess):
[Node[], Map<string, Line>] {
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

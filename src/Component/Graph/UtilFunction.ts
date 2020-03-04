import { Node, Line, GProcess } from '../../util';
import { bfs, dfs } from './GraphAlgorithm';

export function makeGraph(density = 'normal'): [ Node[], Map<string, Line>] {
  const len = 10;
  let lineKey = 0;
  const nodeList: Node[] = [];
  const lineMap = new Map<string, Line>();
  let d = len / 2;
  if (density === 'low') {
    d = len / 5;
  } else {
    d = len;
  }
  for (let i = 0; i < len; i += 1) {
    const randomSet = new Set<number>();
    for (let j = 0; j < d; j += 1) {
      if (i === len - 1) break;
      randomSet.add(Math.floor(Math.random() * (len - i - 1) + i + 1));
    }
    const randomList: number[] = Array.from(randomSet).sort();
    const node: Node = {
      key: i, connected: randomList, color: '#grey', isVisited: false,
    };
    nodeList.push(node);
    for (let j = 0; j < randomList.length; j += 1) {
      const line: Line = {
        key: lineKey, from: i, to: randomList[j], color: 'black',
      };
      lineMap.set(i.toString().concat('to').concat(randomList[j].toString()), line);
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
  for (let i = 0; i < NTargets.length; i += 1) {
    NList[NTargets[i]].color = 'ff9400';
  }
  const line = LMap.get(process.targetLine);
  if (line !== undefined) {
    line.color = '#ff9400';
    LMap.set(process.targetLine, line);
  }
  return [NList.slice(), LMap];
}

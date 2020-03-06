import {
  Node, GProcess, FixedNode, WeightedLine,
} from '../../util';

export function bfs(nodeList: Node[]): GProcess[] {
  const visited: boolean[] = new Array<false>(10);
  const process: GProcess[] = [];
  const visitedNode: number[] = [0];
  const visitedLine: string[] = [];
  const q: number[] = new Array<number>(10);
  let targetLine = '';
  const start = 0;
  let front = -1;
  let rear = -1;
  rear += 1;
  q[rear] = start;
  visited[0] = true;
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'start',
    list: q.slice(),
  });
  while (front !== rear) {
    front += 1;
    const here = q[front];
    const hereNode = nodeList[here];
    for (let i = 0; i < hereNode.connected.length; i += 1) {
      const there = hereNode.connected[i];
      if (!visited[there]) {
        visited[there] = true;
        rear += 1;
        q[rear] = there;
        visitedNode.push(there);
        const from = here < there ? here.toString() : there.toString();
        const to = here > there ? here.toString() : there.toString();
        targetLine = from.concat('to').concat(to);
        visitedLine.push(targetLine);
        process.push({
          visitedNode: visitedNode.slice(),
          visitedLine: visitedLine.slice(),
          targetNodes: [here, there],
          targetLine,
          phase: 'visit',
          list: q.slice(),
        });
      }
    }
  }
  process.push({
    visitedNode,
    visitedLine,
    targetNodes: [],
    targetLine: '',
    phase: 'done',
    list: q.slice(),
  });
  return process;
}

export function dfs(nodeList: Node[]): GProcess[] {
  const process: GProcess[] = [];
  const visitedNode: number[] = [0];
  const visitedLine: string[] = [];
  let targetLine = '';
  const stack: number[][] = [];
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'start',
    list: stack.map((el) => el[1]),
  });
  stack.push([0, 0]);
  visitedNode.push(0);
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'visit',
    list: stack.map((el) => el[1]),
  });
  let now = 0;
  while (stack.length > 0) {
    let flag = true;
    const hereNode = nodeList[now];
    for (let i = 0; i < hereNode.connected.length; i += 1) {
      if (!visitedNode.includes(hereNode.connected[i])) {
        targetLine = now < hereNode.connected[i] ? `${now}to${hereNode.connected[i]}` : `${hereNode.connected[i]}to${now}`;
        process.push({
          visitedNode: visitedNode.slice(),
          visitedLine: visitedLine.slice(),
          targetNodes: [now, hereNode.connected[i]],
          targetLine,
          phase: 'visit',
          list: stack.map((el) => el[1]),
        });
        targetLine = '';
        stack.push([now, hereNode.connected[i]]);
        visitedNode.push(hereNode.connected[i]);
        visitedLine.push(targetLine);
        now = hereNode.connected[i];
        process.push({
          visitedNode: visitedNode.slice(),
          visitedLine: visitedLine.slice(),
          targetNodes: [now, now],
          targetLine,
          phase: 'afterVisit',
          list: stack.map((el) => el[1]),
        });
        flag = false;
        break;
      }
    }
    if (flag) {
      const p = stack.pop();
      if (p !== undefined) {
        const temp = p[0];
        now = temp;
        process.push({
          visitedNode: visitedNode.slice(),
          visitedLine: visitedLine.slice(),
          targetNodes: [now, now],
          targetLine,
          phase: 'pop',
          list: stack.map((el) => el[1]),
        });
      }
    }
  }
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [now, now],
    targetLine,
    phase: 'done',
    list: stack.map((el) => el[1]),
  });
  return process;
}

export function dfsR(nodeList: Node[]): GProcess[] {
  const process: GProcess[] = [];
  const visitedNode: number[] = [0];
  const visitedLine: string[] = [];
  let targetLine = '';
  const stack: number[][] = [];
  stack.push([0, 0]);
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'start',
    list: stack.map((el) => el[1]),
  });
  let nowFromTo = stack.pop();
  if (nowFromTo !== undefined) {
    const now = nowFromTo[0];
    visitedNode.push(now);
    for (let i = 0; i < nodeList[now].connected.length; i += 1) {
      stack.push([now, nodeList[now].connected[i]]);
      process.push({
        visitedNode: visitedNode.slice(),
        visitedLine: visitedLine.slice(),
        targetNodes: [0, nodeList[now].connected[i]],
        targetLine,
        phase: 'push',
        list: stack.map((el) => el[1]),
      });
    }
  }
  while (stack.length > 0) {
    nowFromTo = stack.pop();
    process.push({
      visitedNode: visitedNode.slice(),
      visitedLine: visitedLine.slice(),
      targetNodes: [],
      targetLine,
      phase: 'pop',
      list: stack.map((el) => el[1]),
    });
    if (nowFromTo !== undefined) {
      const nowFrom = nowFromTo[0];
      const nowTo = nowFromTo[1];
      visitedNode.push(nowTo);
      targetLine = nowFrom < nowTo ? `${nowFrom}to${nowTo}` : `${nowTo}to${nowFrom}`;
      visitedLine.push(targetLine);
      process.push({
        visitedNode: visitedNode.slice(),
        visitedLine: visitedLine.slice(),
        targetNodes: [nowFrom, nowTo],
        targetLine,
        phase: 'visit',
        list: stack.map((el) => el[1]),
      });
      const hereNode = nodeList[nowTo];
      for (let j = 0; j < hereNode.connected.length; j += 1) {
        if (!visitedNode.includes(hereNode.connected[j])) {
          stack.push([nowTo, hereNode.connected[j]]);
          process.push({
            visitedNode: visitedNode.slice(),
            visitedLine: visitedLine.slice(),
            targetNodes: [nowFrom, nowTo],
            targetLine,
            phase: 'push',
            list: stack.map((el) => el[1]),
          });
        }
      }
    }
  }
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'done',
    list: stack.map((el) => el[1]),
  });
  return process;
}

export function prim(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  from: number): GProcess[] {
  const process: GProcess[] = [];
  return process;
}

export function kruskal(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  from: number): GProcess[] {
  const process: GProcess[] = [];
  const list: any[] = [];
  const parentArr: number[] = [];
  const visitedNode: Set<number> = new Set<number>();
  const visitedLine: string[] = [];

  function findParent(child: number): number {
    if (child === parentArr[child]) return child;
    parentArr[child] = findParent(parentArr[child]);
    return parentArr[child];
  }

  function isAllSameParent(parentList: number[]): boolean {
    const parent: number = findParent(parentList[0]);
    let result = true;
    for (let i = 1; i < parentList.length; i += 1) {
      if (parent !== findParent(parentList[i])) {
        result = false;
        break;
      }
    }
    return result;
  }

  function isSameGroup(child1: number, child2: number): boolean {
    return findParent(child1) === findParent(child2);
  }

  function unionGroup(child1: number, child2: number): void {
    const parent1 = findParent(child1);
    const parent2 = findParent(child2);

    parentArr[parent1] = parent2;
  }


  lineMap.forEach((value, key, map) => {
    list.push({
      key,
      weightedLine: value,
    });
  });

  list.sort((item1: any, item2: any) => {
    if (item1.weightedLine.weight > item2.weightedLine.weight) return 1;
    if (item1.weightedLine.weight === item2.weightedLine.weight) return 0;
    return -1;
  });
  console.log('list', list);
  for (let i = 0; i < nodeList.length; i += 1) {
    parentArr.push(i);
  }
  for (let i = 0; i < list.length; i += 1) {
    if (isAllSameParent(parentArr)) {
      // 종료
      break;
    }
    // 현재 간선 표시 (current)
    process.push({
      visitedNode: Array.from(visitedNode), visitedLine: visitedLine.slice(), targetNodes: [list[i].weightedLine.to, list[i].weightedLine.from], targetLine: list[i].key, phase: 'check', list: [],
    });
    if (!isSameGroup(list[i].weightedLine.to, list[i].weightedLine.from)) {
      unionGroup(list[i].weightedLine.to, list[i].weightedLine.from);
      // 간선 색 표시 (enable)
      visitedNode.add(list[i].weightedLine.to);
      visitedNode.add(list[i].weightedLine.from);
      visitedLine.push(list[i].key);
      process.push({
        visitedNode: Array.from(visitedNode), visitedLine: visitedLine.slice(), targetNodes: [list[i].weightedLine.to, list[i].weightedLine.from], targetLine: list[i].key, phase: 'connect', list: [],
      });
    }
  }
  console.log(parentArr);
  console.log(process);
  return process;
}

export function dijkstra(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  from: number, to: number): GProcess[] {
  const process: GProcess[] = [];
  return process;
}

export function bellmanFord(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  from: number, to: number): GProcess[] {
  const process: GProcess[] = [];
  return process;
}

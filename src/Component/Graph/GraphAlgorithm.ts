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
  return process;
}

export function dijkstra(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  from: number): GProcess[] {
  const process: GProcess[] = [];
  const table: number[][] = [];
  const visited: boolean[] = new Array<boolean>(nodeList.length);
  const nowMinTo: number[] = new Array<number>(nodeList.length);
  const visitedNode: number[] = [];
  const visitedLine: string[] = [];
  let targetLine = '';
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'start',
    list: [],
  });
  for (let i = 0; i < nodeList.length; i += 1) {
    nowMinTo[i] = 999999;
    visited[i] = false;
  }
  nowMinTo[from] = 0;
  let now = from;
  visited[now] = true;

  visitedNode.push(now);
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [now, now],
    targetLine,
    phase: 'visit',
    list: [],
  });

  table.push(nowMinTo.slice());
  const flag = true;
  while (flag) {
    const connection = nodeList[now].connected;
    for (let i = 0; i < connection.length; i += 1) {
      const lineKey = now < connection[i] ? `${now}to${connection[i]}` : `${connection[i]}to${now}`;
      visitedNode.push(now);
      nowMinTo[connection[i]] = Math.min(nowMinTo[connection[i]]
        , (nowMinTo[now] + lineMap.get(lineKey)!.weight));

      targetLine = lineKey;
      process.push({
        visitedNode: visitedNode.slice(),
        visitedLine: visitedLine.slice(),
        targetNodes: [now, connection[i]],
        targetLine,
        phase: 'compare',
        list: nowMinTo.slice(),
      });
    }
    let nowMin = 999999;
    let finish = true;
    for (let i = 0; i < nodeList.length; i += 1) {
      if (!visited[i]) {
        if (nowMinTo[i] < nowMin) {
          finish = false;
          nowMin = nowMinTo[i];
        }
      }
    }
    table.push(nowMinTo.slice());
    if (finish) {
      break;
    } else {
      now = nowMinTo.indexOf(nowMin);
      visited[now] = true;

      visitedNode.push(now);
      process.push({
        visitedNode: visitedNode.slice(),
        visitedLine: visitedLine.slice(),
        targetNodes: [now, now],
        targetLine,
        phase: 'visit',
        list: nowMinTo.slice(),
      });
    }
  }
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'done',
    list: nowMinTo.slice(),
  });
  console.log('table', table);
  return process;
}

export function bellmanFord(nodeList: FixedNode[], lineMap: Map<string, WeightedLine>,
  from: number, to: number): GProcess[] {
  const process: GProcess[] = [];
  return process;
}

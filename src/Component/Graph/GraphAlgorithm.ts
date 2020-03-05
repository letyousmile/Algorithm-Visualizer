import { Node, GProcess } from '../../util';

export function bfs(nodeList: Node[]): GProcess[] {
  const visited: boolean[] = new Array<false>(10);
  const process: GProcess[] = [];
  const visitedNode: number[] = [0];
  const visitedLine: string[] = [];
  let targetLine = '';
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'start',
  });
  const start = 0;
  let front = -1;
  let rear = -1;

  const q: number[] = new Array<number>(10);
  rear += 1;
  q[rear] = start;
  visited[0] = true;
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
  });
  return process;
}

export function dfs(nodeList: Node[]): GProcess[] {
  const process: GProcess[] = [];
  const visitedNode: number[] = [0];
  const visitedLine: string[] = [];
  let targetLine = '';
  process.push({
    visitedNode: visitedNode.slice(),
    visitedLine: visitedLine.slice(),
    targetNodes: [],
    targetLine,
    phase: 'start',
  });
  const stack: number[][] = [];
  stack.push([0, 0]);
  let nowFromTo = stack.pop();
  if (nowFromTo !== undefined) {
    const now = nowFromTo[0];
    visitedNode.push(now);
    process.push({
      visitedNode: visitedNode.slice(),
      visitedLine: visitedLine.slice(),
      targetNodes: [],
      targetLine,
      phase: 'visit',
    });
    for (let i = 0; i < nodeList[now].connected.length; i += 1) {
      stack.push([now, nodeList[now].connected[i]]);
    }
  }
  while (stack.length > 0) {
    nowFromTo = stack.pop();
    if (nowFromTo !== undefined) {
      const nowFrom = nowFromTo[0];
      const nowTo = nowFromTo[1];
      visitedNode.push(nowTo);
      targetLine = nowFrom < nowTo ? `${nowFrom}to${nowTo}` : `${nowTo}to${nowFrom}`;
      process.push({
        visitedNode: visitedNode.slice(),
        visitedLine: visitedLine.slice(),
        targetNodes: [nowFrom, nowTo],
        targetLine,
        phase: 'visit',
      });
      const hereNode = nodeList[nowTo];
      for (let j = 0; j < hereNode.connected.length; j += 1) {
        if (!visitedNode.includes(hereNode.connected[j])) {
          stack.push([nowTo, hereNode.connected[j]]);
        }
      }
    }
    process.push({
      visitedNode: visitedNode.slice(),
      visitedLine: visitedLine.slice(),
      targetNodes: [],
      targetLine,
      phase: 'done',
    });
  }
  return process;
}

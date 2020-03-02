/* eslint-disable no-param-reassign */
import { GraphBar, Process } from '../../util';
import { bubbleSort, selectionSort, insertionSort } from './SortAlgorithm';

export function makeRandomList(): GraphBar[] {
  const list: GraphBar[] = [];
  for (let j = 0; j < 15; j += 1) {
    const tempBar = {
      key: j, value: Math.floor(Math.random() * 21), color: '#f54141', index: j, sorted: false, height: 0,
    };
    list.push(tempBar);
  }
  return list;
}
export function rendering(list: GraphBar[], process: Process[], depth: number): GraphBar[] {
  const SORT_HEIGHT = 0;
  // 소팅이 끝났으면 모든 그래프를 초록색으로 변환.
  if (process[depth].phase === 'done') {
    for (let i = 0; i < list.length; i += 1) {
      list[process[depth].arr[i]].color = '#2ee22e';
    }
  } else {
    for (let i = 0; i < list.length; i += 1) {
      // 먼저 막대 빨간색으로 초기화
      list[process[depth].arr[i]].color = '#f54141';
      // 그래프의 위치 인덱스 변경.
      list[process[depth].arr[i]].index = i;
      // 소팅 알고리즘 진행 상황에따라 그래프의 색과 높이 변경.
      if (process[depth].phase === 'change') {
        if (list[process[depth].arr[i]].index
                  === process[depth].targets[0]
                  || list[process[depth].arr[i]].index
                  === process[depth].targets[1]) {
          list[process[depth].arr[i]].color = '#2ee22e';
          if (process[depth].targets[1] === 1) {
            list[process[depth].arr[i]].height = 0;
          }
        }
      } else if (process[depth].phase === 'compare') {
        if (list[process[depth].arr[i]].index
                  === process[depth].targets[1]) {
          list[process[depth].arr[i]].height = SORT_HEIGHT;
          list[process[depth].arr[i]].color = '#ff9400';
        } else if (list[process[depth].arr[i]].index
                  === process[depth].targets[0]) {
          list[process[depth].arr[i]].color = '#ff9400';
        }
      } else if (process[depth].phase === 'insert') {
        if (list[process[depth].arr[i]].index
                  === process[depth].targets[1]) {
          list[process[depth].arr[i]].height = 0;
        }
      } else if (process[depth].phase === 'start') {
        for (let j = 0; j < list.length; j += 1) {
          list[process[depth].arr[j]].height = 0;
        }
      }
    }
  }
  return list.slice();
}
export const sort = (list: GraphBar[], sortName: string): Process[] => {
  const keyList = list.map((el) => el.key);
  let process: Process[] = [];
  switch (sortName) {
    case 'ISort':
      insertionSort(list, keyList);
      break;
    case 'SSort':
      selectionSort(list, keyList);
      break;
    case 'BSort':
      process = bubbleSort(list, keyList);
      break;
    case 'QSort':

      break;
    default:
      break;
  }
  process.push({
    arr: keyList.slice(), targets: [], phase: 'done',
  });
  return process;
};

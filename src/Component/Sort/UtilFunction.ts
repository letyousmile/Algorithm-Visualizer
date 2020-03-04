/* eslint-disable no-param-reassign */
import { GraphBar, Process } from '../../util';
import {
  bubbleSort, selectionSort, insertionSort, quickSort, mergeSort,
} from './SortAlgorithm';

export function makeRandomList(): GraphBar[] {
  const list: GraphBar[] = [];
  for (let j = 0; j < 10; j += 1) {
    const tempBar = {
      key: j, value: Math.floor(Math.random() * 21), color: '#f54141', index: j, sorted: false, height: 0,
    };
    list.push(tempBar);
  }
  return list;
}
export function rendering(list: GraphBar[], process: Process[], depth: number): GraphBar[] {
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
        for (let j = 0; j < process[depth].targets.length; j += 1) {
          if (list[process[depth].arr[i]].index === process[depth].targets[j]) {
            list[process[depth].arr[i]].height = 0;
            list[process[depth].arr[i]].color = '#ff9400';
          }
        }
      } else if (process[depth].phase === 'merge') {
        if (list[process[depth].arr[i]].index
          === process[depth].targets[1]) {
          list[process[depth].arr[i]].height = 0;
          list[process[depth].arr[i]].color = '#ff9400';
        } else if (list[process[depth].arr[i]].index
          === process[depth].targets[0]) {
          list[process[depth].arr[i]].color = '#ff9400';
        }
      } else if (process[depth].phase === 'insrt-compare') {
        if (list[process[depth].arr[i]].index
          === process[depth].targets[1]) {
          list[process[depth].arr[i]].height = 50;
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
      } else if (process[depth].phase === 'up') {
        for (let j = process[depth].targets[0]; j <= process[depth].targets[1]; j += 1) {
          if (list[process[depth].arr[i]].index === j) {
            list[process[depth].arr[i]].height = 0;
            list[process[depth].arr[i]].color = '#2ee22e';
          }
        }
      } else if (process[depth].phase === 'down') {
        for (let j = process[depth].targets[0]; j <= process[depth].targets[1]; j += 1) {
          if (list[process[depth].arr[i]].index === j) {
            list[process[depth].arr[i]].height = 50;
          }
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
      process = insertionSort(list, keyList);
      break;
    case 'SSort':
      process = selectionSort(list, keyList);
      break;
    case 'BSort':
      process = bubbleSort(list, keyList);
      break;
    case 'QSort':
      process = quickSort(list, keyList, 0, list.length - 1, process);
      break;
    case 'MSort':
      process = mergeSort(list, keyList);
      break;
    default:
      break;
  }
  process.push({
    arr: keyList.slice(), targets: [], phase: 'done',
  });
  return process;
};

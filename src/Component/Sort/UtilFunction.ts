/* eslint-disable no-param-reassign */
import { GraphBar, Process } from '../../util';
import {
  bubbleSort, selectionSort, insertionSort, quickSort, mergeSort, heapSort,
} from './SortAlgorithm';

export function makeRandomList(howSorted = 'random'): GraphBar[] {
  let list: GraphBar[] = [];
  const size = 10;
  const max = 20;
  function random(): GraphBar[] {
    const tempList: GraphBar[] = [];
    for (let j = 0; j < size; j += 1) {
      const tempBar = {
        key: j, value: Math.floor(Math.random() * (max + 1)), color: '#f54141', index: j, sorted: false, height: 0,
      };
      tempList.push(tempBar);
    }
    return tempList;
  }
  function increasing(): GraphBar[] {
    let k = 0;
    const tempList: GraphBar[] = [];
    for (let j = 0; j < size; j += 1) {
      if (j <= Math.floor(size / 4)) {
        k = Math.floor(Math.random() * (Math.floor(max / 4 + 1) - k)) + k;
      } else if (j <= Math.floor(size / 2)) {
        k = Math.floor(Math.random() * (Math.floor(max / 2 + 1) - k)) + k;
      } else if (j <= Math.floor(size * 0.75)) {
        k = Math.floor(Math.random() * (Math.floor(max * 0.75 + 1) - k)) + k;
      } else {
        k = Math.floor(Math.random() * (max + 1 - k)) + k;
      }
      const tempBar = {
        key: j, value: k, color: '#f54141', index: j, sorted: false, height: 0,
      };
      tempList.push(tempBar);
    }
    return tempList;
  }
  function nearlyIncreasing(): GraphBar[] {
    let k = 0;
    const tempList: GraphBar[] = [];
    for (let j = 0; j < size; j += 1) {
      if (j <= Math.floor(size / 4)) {
        k = Math.floor(Math.random() * (Math.floor(max / 5) - k)) + k;
      } else if (j <= Math.floor(size / 2)) {
        k = Math.floor(Math.random() * (Math.floor(max * 0.4) - k)) + k;
      } else if (j <= Math.floor(size * 0.75)) {
        k = Math.floor(Math.random() * (Math.floor(max * 0.6) - k)) + k;
      } else {
        k = Math.floor(Math.random() * (Math.floor(max * 0.8) - k)) + k;
      }
      const tempBar = {
        key: j, value: k + Math.floor(Math.random() * 4), color: '#f54141', index: j, sorted: false, height: 0,
      };
      tempList.push(tempBar);
    }
    return tempList;
  }
  function decreasing(): GraphBar[] {
    const tempList: GraphBar[] = [];
    let k = max;
    for (let j = 0; j < size; j += 1) {
      if (j <= Math.floor(size / 4)) {
        k = Math.floor(Math.random() * (k - Math.floor(max * 0.75 + 1)))
        + Math.floor(max * 0.75 + 1);
      } else if (j <= Math.floor(size / 2)) {
        k = Math.floor(Math.random() * (k - Math.floor(max * 0.5 + 1))) + Math.floor(max * 0.5 + 1);
      } else if (j <= Math.floor(size * 0.75)) {
        k = Math.floor(Math.random() * (k - Math.floor(max * 0.25 + 1)))
        + Math.floor(max * 0.25 + 1);
      } else {
        k = Math.floor(Math.random() * (k)) + 0;
      }
      const tempBar = {
        key: j, value: k, color: '#f54141', index: j, sorted: false, height: 0,
      };
      tempList.push(tempBar);
    }
    return tempList;
  }
  function nearlyDecreasing(): GraphBar[] {
    const tempList: GraphBar[] = [];
    let k = Math.floor(max * 0.9);
    for (let j = 0; j < size; j += 1) {
      if (j <= Math.floor(size / 4)) {
        k = Math.floor(Math.random() * (k - Math.floor(max * 0.75))) + Math.floor(max * 0.75);
      } else if (j <= Math.floor(size / 2)) {
        k = Math.floor(Math.random() * (k - Math.floor(max * 0.5))) + Math.floor(max * 0.5);
      } else if (j <= Math.floor(size * 0.75)) {
        k = Math.floor(Math.random() * (k - Math.floor(max * 0.25))) + Math.floor(max * 0.25);
      } else {
        k = Math.floor(Math.random() * (k)) + 0;
      }
      const tempBar = {
        key: j, value: k + Math.floor(Math.random() * 4), color: '#f54141', index: j, sorted: false, height: 0,
      };
      tempList.push(tempBar);
    }
    return tempList;
  }
  switch (howSorted) {
    case 'random':
      list = random();
      break;
    case 'increasing':
      list = increasing();
      break;
    case 'decreasing':
      list = decreasing();
      break;
    case 'nearlyIncreasing':
      list = nearlyIncreasing();
      break;
    case 'nearlyDecreasing':
      list = nearlyDecreasing();
      break;
    default:
      break;
  }
  return list;
}

export function rendering(list: GraphBar[], process: Process): GraphBar[] {
  // 소팅이 끝났으면 모든 그래프를 초록색으로 변환.
  if (process.phase === 'done') {
    for (let i = 0; i < list.length; i += 1) {
      list[process.arr[i]].color = '#2ee22e';
    }
  } else {
    for (let i = 0; i < list.length; i += 1) {
      if (process.phase !== 'merge-down') {
        // 그래프의 위치 인덱스 변경.
        list[process.arr[i]].index = i;
        // 먼저 막대 빨간색으로 초기화
        list[process.arr[i]].color = '#f54141';
      }
      // 소팅 알고리즘 진행 상황에따라 그래프의 색과 높이 변경.
      if (process.phase === 'change') {
        if (list[process.arr[i]].index
          === process.targets[0]
          || list[process.arr[i]].index
          === process.targets[1]) {
          list[process.arr[i]].color = '#2ee22e';
          if (process.targets[1] === 1) {
            list[process.arr[i]].height = 0;
          }
        }
      } else if (process.phase === 'compare') {
        for (let j = 0; j < process.targets.length; j += 1) {
          if (list[process.arr[i]].index === process.targets[j]) {
            list[process.arr[i]].height = 0;
            list[process.arr[i]].color = '#ff9400';
          }
        }
      } else if (process.phase === 'merge-compare') {
        if (list[process.arr[i]].index
          === process.targets[1]) {
          list[process.arr[i]].color = '#ff9400';
        } else if (list[process.arr[i]].index
          === process.targets[0]) {
          list[process.arr[i]].color = '#ff9400';
        }
      } else if (process.phase === 'insrt-compare') {
        if (list[process.arr[i]].index
          === process.targets[1]) {
          list[process.arr[i]].height = -50;
          list[process.arr[i]].color = '#ff9400';
        } else if (list[process.arr[i]].index
          === process.targets[0]) {
          list[process.arr[i]].color = '#ff9400';
        }
      } else if (process.phase === 'insert') {
        if (list[process.arr[i]].index
          === process.targets[1]) {
          list[process.arr[i]].height = 0;
        }
      } else if (process.phase === 'merge-up') {
        for (let j = process.targets[0]; j <= process.targets[1]; j += 1) {
          if (list[process.arr[i]].index === j) {
            list[process.arr[i]].height = 0;
            list[process.arr[i]].color = '#2ee22e';
          }
        }
      } else if (process.phase === 'merge-down') {
        if (list[process.arr[i]].index === process.targets[1]
          && list[process.arr[i]].height === 0) {
          const changeTo = process.targets[0];
          list[process.arr[i]].index = changeTo;
          list[process.arr[i]].height = -50;
          list[process.arr[i]].color = '#ff9400';
        }
      } else if (process.phase === 'start') {
        for (let j = 0; j < list.length; j += 1) {
          list[process.arr[j]].height = 0;
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
    case 'HSort':
      process = heapSort(list);
      break;
    default:
      break;
  }
  process.push({
    arr: keyList.slice(), targets: [], phase: 'done',
  });
  return process;
};

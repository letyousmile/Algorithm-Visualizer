/* eslint-disable no-param-reassign */
import { GraphBar, Process } from '../../util';

// 소팅 알고리즘 진행 정도 마다 상태 기억을 위해 [배열, targets, phase]를 저장한다.
// 1. 배열에는 렌더링할 div의 key값을 소팅된 순서대로 저장하고
// 2. targets에는 현재 비교연산중인 index,
// 3. phase에는 소팅 알고리즘이 뭘 하고있는지 저장한다.
// 배열, phase, targets를 토대로 div의 색과 위치를 결정한다.
// phase를 만든 것은 나중에 소팅에 대한 단계별 설명을 쓸 때 확장성있게 사용할 수 있기 때문.
export function bubbleSort(list: GraphBar[], keyList: number[]): Process[] {
  const arrayLength = keyList.length;
  const process: Process[] = [];
  process.push({
    arr: keyList.slice(), targets: [arrayLength, arrayLength], phase: 'start',
  });
  for (let i = 0; i < arrayLength - 1; i += 1) {
    for (let j = 0; j < arrayLength - i - 1; j += 1) {
      process.push({
        arr: keyList.slice(), targets: [j, j + 1], phase: 'compare',
      });
      if (list[keyList[j + 1]].value < list[keyList[j]].value) {
        const temp = keyList[j + 1];
        keyList[j + 1] = keyList[j];
        keyList[j] = temp;
        process.push({
          arr: keyList.slice(), targets: [j, j + 1], phase: 'change',
        });
      }
    }
  }
  return process;
}
export function selectionSort(list: GraphBar[], keyList: number[]): Process[] {
  const arrayLength = keyList.length;
  const process: Process[] = [];
  process.push({
    arr: keyList.slice(), targets: [arrayLength, arrayLength], phase: 'start',
  });
  for (let i = 0; i < arrayLength; i += 1) {
    let min = i;
    process.push({
      arr: keyList.slice(), targets: [min, min], phase: 'compare',
    });
    for (let j = i + 1; j < arrayLength; j += 1) {
      process.push({
        arr: keyList.slice(), targets: [j, min], phase: 'compare',
      });
      if (list[keyList[min]].value > list[keyList[j]].value) {
        process.push({
          arr: keyList.slice(), targets: [min, j], phase: 'compare',
        });
        min = j;
      }
    }
    process.push({
      arr: keyList.slice(), targets: [i, min], phase: 'change',
    });
    [keyList[min], keyList[i]] = [keyList[i], keyList[min]]; // swap
  }
  process.push({
    arr: keyList.slice(), targets: [], phase: 'done',
  });
  return process;
}
export function insertionSort(list: GraphBar[], keyList: number[]): Process[] {
  const arrayLength = keyList.length;
  const process: Process[] = [];
  process.push({
    arr: keyList.slice(), targets: [arrayLength, arrayLength], phase: 'start',
  });
  for (let i = 1; i < arrayLength; i += 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      process.push({
        arr: keyList.slice(), targets: [j, j + 1], phase: 'insrt-compare',
      });
      if (list[keyList[j + 1]].value < list[keyList[j]].value) {
        const temp = keyList[j + 1];
        keyList[j + 1] = keyList[j];
        keyList[j] = temp;
        process.push({
          arr: keyList.slice(), targets: [j, j + 1], phase: 'change',
        });
      } else {
        process.push({
          arr: keyList.slice(), targets: [j, j + 1], phase: 'insert',
        });
        break;
      }
    }
  }
  return process;
}
export function quickSort(list: GraphBar[], keyList: number[],
  left: number, right: number, process: Process[]): Process[] {
  function partition(partitionLeft: number, partitionRight: number): number {
    let low = partitionLeft;
    let high = partitionRight + 1;
    const pivot = partitionLeft;
    const pivotValue = list[keyList[pivot]].value;
    do {
      do {
        low += 1;
        process.push({
          arr: keyList.slice(), targets: [pivot, low, high], phase: 'compare',
        });
      } while (low <= right && list[keyList[low]].value < pivotValue);
      do {
        high -= 1;
        process.push({
          arr: keyList.slice(), targets: [pivot, low, high], phase: 'compare',
        });
      } while (high >= left && list[keyList[high]].value > pivotValue);
      if (low < high) {
        const temp = keyList[low];
        keyList[low] = keyList[high];
        keyList[high] = temp;
        process.push({
          arr: keyList.slice(), targets: [low, high], phase: 'change',
        });
      }
    } while (low < high);
    const temp = keyList[left];
    keyList[left] = keyList[high];
    keyList[high] = temp;
    process.push({
      arr: keyList.slice(), targets: [left, high], phase: 'change',
    });
    return high;
  }
  if (left < right) {
    const q = partition(left, right);
    quickSort(list, keyList, left, q - 1, process);
    quickSort(list, keyList, q + 1, right, process);
  }
  return process;
}

export function mergeSort(list: GraphBar[], keyList: number[]): Process[] {
  const arrayLength = keyList.length;
  const process: Process[] = [];
  process.push({
    arr: keyList.slice(), targets: [arrayLength, arrayLength], phase: 'start',
  });
  const sorted = keyList.slice();

  const merge = (listt: number[], left: number, mid: number, right: number): void => {
    let i = left;
    let j = mid + 1;
    let k = left;
    const temp = keyList.slice();
    while (i <= mid && j <= right) {
      if (list[listt[i]].value <= list[listt[j]].value) {
        sorted[k] = listt[i];
        k += 1;
        i += 1;
      } else {
        sorted[k] = listt[j];
        k += 1;
        j += 1;
      }
    }
    if (i > mid) {
      for (let l = j; l <= right; l += 1) {
        sorted[k] = listt[l];
        k += 1;
      }
    } else {
      for (let l = i; l <= mid; l += 1) {
        sorted[k] = listt[l];
        k += 1;
      }
    }
    for (let m = left; m <= right; m += 1) {
      let temp2 = -1;
      for (let n = left; n <= right; n += 1) {
        if (temp[n] === sorted[m]) {
          temp2 = n;
        }
      }
      process.push({
        arr: temp.slice(), targets: [m, temp2], phase: 'merge-down',
      });
    }
    keyList = sorted.slice();

    process.push({
      arr: keyList.slice(), targets: [left, right], phase: 'merge-up',
    });
  };

  const divide = (left: number, right: number): void => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      divide(left, mid);
      divide(mid + 1, right);
      merge(keyList, left, mid, right);
    }
  };
  divide(0, arrayLength - 1);
  process.push({
    arr: keyList.slice(), targets: [arrayLength, arrayLength], phase: 'done',
  });
  return process;
}

export function heapSort(nodes: GraphBar[]): Process[] {
  // 부모노드와 비교 해서 자신이 크면 바꿈
  // 자신의 자식노드 중 큰 노드가 자신보다 크면 변경
  // 변경후 다시 자식노드들과 비교해서 큰 노드가 있다면 다시 변경
  // 최상단까지 진행
  let keyList: number[] = [];
  const arrayLength = nodes.length;
  const process: Process[] = [];

  function heapify(idx: number): number[] {
    let parent = Math.floor((idx - 1) / 2);
    let tIdx = idx;
    const tKey = keyList.slice();
    while (tIdx > 0 && parent > -1) {
      process.push({
        arr: tKey.slice(), targets: [tIdx, parent], phase: 'compare',
      });
      if (nodes[tKey[parent]].value < nodes[tKey[tIdx]].value) {
        process.push({
          arr: tKey.slice(), targets: [parent, tIdx], phase: 'change',
        });
        [tKey[parent], tKey[tIdx]] = [tKey[tIdx], tKey[parent]];
        tIdx = parent;
        parent = Math.floor((tIdx - 1) / 2);
      } else {
        break;
      }
    }
    return tKey;
  }
  function heapify2(): number[] {
    const tKey = keyList.slice();
    let idx = 0;
    let left = idx * 2 + 1;
    let right = idx * 2 + 2;

    while (left < tKey.length) {
      if (right < tKey.length) { // 자식이 둘다 존재
        const max = nodes[tKey[left]].value > nodes[tKey[right]].value ? left : right;
        process.push({
          arr: tKey.slice(), targets: [idx, max], phase: 'compare',
        });
        if (nodes[tKey[idx]].value >= nodes[tKey[max]].value) {
          break;
        }
        process.push({
          arr: tKey.slice(), targets: [idx, max], phase: 'change',
        });
        [tKey[idx], tKey[max]] = [tKey[max], tKey[idx]];
        idx = max;
        left = idx * 2 + 1;
        right = idx * 2 + 2;
      } else { // 자식이 좌측만 존재
        process.push({
          arr: tKey.slice(), targets: [idx, left], phase: 'compare',
        });
        if (nodes[tKey[idx]].value < nodes[tKey[left]].value) {
          process.push({
            arr: tKey.slice(), targets: [idx, left], phase: 'compare',
          });
          [tKey[idx], tKey[left]] = [tKey[left], tKey[idx]];
        }
        break;
      }
    }

    return tKey;
  }

  process.push({
    arr: keyList.slice(), targets: [0, 0], phase: 'insert',
  });

  for (let i = 0; i < arrayLength; i += 1) {
    keyList.push(nodes[i].key);
    process.push({
      arr: keyList.slice(), targets: [i, i], phase: 'insert',
    });
    keyList = heapify(i).slice();
  }

  while (keyList.length > 0) {
    process.push({
      arr: keyList.slice(), targets: [0, keyList.length - 1], phase: 'change',
    });
    [keyList[0], keyList[keyList.length - 1]] = [keyList[keyList.length - 1], keyList[0]];
    process.push({
      arr: keyList.slice(), targets: [keyList.length - 1, keyList.length - 1], phase: 'remove',
    });
    keyList.pop();
    keyList = heapify2().slice();
  }

  return process;
}

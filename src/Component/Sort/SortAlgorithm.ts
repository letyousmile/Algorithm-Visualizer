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
        arr: keyList.slice(), targets: [j, j + 1], phase: 'compare',
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

function heapify(graphBars: GraphBar[], keyList: number[], idx: number, process: Process[]): number[] {
  let parent = Math.floor((idx - 1) / 2);
  let tIdx = idx;
  const tKey = keyList.slice();
  while (tIdx > 0 && parent > -1) {
    process.push({
      arr: tKey.slice(), targets: [tIdx, parent], phase: 'compare',
    });
    if (graphBars[tKey[parent]].value < graphBars[tKey[tIdx]].value) {
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
function heapify2(graphBars: GraphBar[], keyList: number[], process: Process[]): number[] {
  const tKey = keyList.slice();
  let idx = 0;
  let left = idx * 2 + 1;
  let right = idx * 2 + 2;

  while (left < tKey.length) {
    if (right < tKey.length) { // 자식이 둘다 존재
      const max = graphBars[tKey[left]].value > graphBars[tKey[right]].value ? left : right;
      process.push({
        arr: tKey.slice(), targets: [idx, max], phase: 'compare',
      });
      if (graphBars[tKey[idx]].value >= graphBars[tKey[max]].value) {
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
      if (graphBars[tKey[idx]].value < graphBars[tKey[left]].value) {
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

export function heapSort(graphBars: GraphBar[]): Process[] {
  // 부모노드와 비교 해서 자신이 크면 바꿈
  // 자신의 자식노드 중 큰 노드가 자신보다 크면 변경
  // 변경후 다시 자식노드들과 비교해서 큰 노드가 있다면 다시 변경
  // 최상단까지 진행
  let keyList: number[] = [];
  const arrayLength = graphBars.length;
  const process: Process[] = [];
  process.push({
    arr: keyList.slice(), targets: [0, 0], phase: 'insert',
  });

  for (let i = 0; i < arrayLength; i += 1) {
    keyList.push(graphBars[i].key);
    process.push({
      arr: keyList.slice(), targets: [i, i], phase: 'insert',
    });
    keyList = heapify(graphBars, keyList, i, process).slice();
  }

  while (keyList.length > 0) {
    process.push({
      arr: keyList.slice(), targets: [keyList[0], keyList[keyList.length - 1]], phase: 'change',
    });
    [keyList[0], keyList[keyList.length - 1]] = [keyList[keyList.length - 1], keyList[0]];
    process.push({
      arr: keyList.slice(), targets: [keyList[keyList.length - 1], keyList[keyList.length - 1]], phase: 'remove',
    });
    keyList.pop();
    keyList = heapify2(graphBars, keyList, process).slice();
  }

  return process;
}

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

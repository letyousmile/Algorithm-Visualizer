/* eslint-disable no-param-reassign */
import { GraphBar, Process } from '../../util';

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
  const arrayLength = keyList.length;
  const process: Process[] = [];
  function bubbleSort(): void{
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
  }
  function selectionSort(): void{
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
      // process.push({
      //   arr: keyList.slice(), targets: [i, min], phase: 'compare',
      // });

      process.push({
        arr: keyList.slice(), targets: [i, min], phase: 'change',
      });

      [keyList[min], keyList[i]] = [keyList[i], keyList[min]]; // swap


    }
    process.push({
      arr: keyList.slice(), targets: [], phase: 'done',
    });
  }
  // 소팅 알고리즘 진행 정도 마다 상태 기억을 위해 [배열, targets, phase]를 저장한다.
  // 1. 배열에는 렌더링할 div의 key값을 소팅된 순서대로 저장하고
  // 2. targets에는 현재 비교연산중인 index,
  // 3. phase에는 소팅 알고리즘이 뭘 하고있는지 저장한다.
  // 배열, phase, targets를 토대로 div의 색과 위치를 결정한다.
  // phase를 만든 것은 나중에 소팅에 대한 단계별 설명을 쓸 때 확장성있게 사용할 수 있기 때문.
  process.push({
    arr: keyList.slice(), targets: [arrayLength, arrayLength], phase: 'start',
  });
  switch (sortName) {
    case 'ISort':
      // insertionSort(process);
      break;
    case 'SSort':
      selectionSort();
      break;
    case 'BSort':
      bubbleSort();
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

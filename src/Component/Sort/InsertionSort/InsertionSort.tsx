import React, { useState } from 'react';
import InsertionSortBar from './InsertionSortBars';
import { InsertionSortGraphBar } from '../../../util';

function ISort(): JSX.Element {
  const [graphBars, setBar] = useState<InsertionSortGraphBar[]>(
    [{
      key: 0, value: 1, color: 'red', index: 0, sorted: false,
    },
    {
      key: 1, value: 3, color: 'red', index: 1, sorted: false,
    },
    {
      key: 2, value: 7, color: 'red', index: 2, sorted: false,
    },
    {
      key: 3, value: 11, color: 'red', index: 3, sorted: false,
    },
    {
      key: 4, value: 4, color: 'red', index: 4, sorted: false,
    },
    {
      key: 5, value: 2, color: 'red', index: 5, sorted: false,
    },
    {
      key: 6, value: 9, color: 'red', index: 6, sorted: false,
    },
    {
      key: 7, value: 5, color: 'red', index: 7, sorted: false,
    },
    ],
  );

  const arrayForSort = graphBars.map((el) => el.key);
  const arrayLength = arrayForSort.length;
  const wholeSortProcess: any[] = [];

  const insertionSort = (): void => {
    // 배열의 길이가 2 이상이라고 가정
    for (let i = 1; i < graphBars.length; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        if (graphBars[arrayForSort[j + 1]].value < graphBars[arrayForSort[j]].value) {
          const temp = arrayForSort[j + 1];
          arrayForSort[j + 1] = arrayForSort[j];
          arrayForSort[j] = temp;
          wholeSortProcess.push({ arr: arrayForSort.slice(), targets: [j, j + 1] });
        } else {
          wholeSortProcess.push({ arr: arrayForSort.slice(), targets: [j, j + 1] });
          break;
        }
      }
    }
  };

  insertionSort();
  console.log(arrayForSort);
  // const nextt = (): void => {
  //   let flag = true;
  //   if (result === undefined) {
  //     result = sorting.next();
  //     setBar(result.value);
  //     flag = false;
  //   }
  //   if (!result.done && flag) {
  //     result = sorting.next();
  //     setBar(result.value);
  //   }
  // };
  // const backToStart = (): void => {
  //   result = sorting.next();
  //   setBar(result.value);
  // };

  function flow(depth: number): void {
    console.log('start flow');
    console.log(wholeSortProcess[depth].arr);
    if (wholeSortProcess === []) {
      insertionSort();
    }
    if (depth <= arrayLength - 1) {
      const temp = graphBars.slice();
      for (let i = 0; i < graphBars.length; i += 1) {
        temp[wholeSortProcess[depth].arr[i]].index = i;
      }
      setBar(temp);
      setTimeout(() => {
        flow(depth + 1);
      }, 1000);
    }
  }
  return (
    <div>
      <InsertionSortBar graphBars={graphBars} />
      <button type="submit">처음으로</button>
      <button type="submit">삽입정렬 프로세스+1</button>
      <button type="submit" onClick={(): void => flow(0)}>삽입정렬 전체</button>
    </div>
  );
}

export default ISort;

import React, { useState } from 'react';
import InsertionSortBar from './InsertionSortBars';
import { bar } from './util';
// import { bar } from './util';

function InsertionSort(): JSX.Element {
  const [graphBars, setBar] = useState([
    { key: 1, value: 1 },
    { key: 2, value: 3 },
    { key: 3, value: 7 },
    { key: 4, value: 11 },
    { key: 5, value: 4 },
    { key: 6, value: 2 },
    { key: 7, value: 9 },
    { key: 8, value: 5 },
  ]);
  const click = (): void => {
    const newGraphBars = graphBars.slice();
    newGraphBars[0].value += 1;
    setBar(newGraphBars);
  };

  const insertionSort = function* () {
    // 배열 복사
    let newGraphBars = graphBars.slice();
    // 배열의 길이가 2 이상이라고 가정
    for (let i = 1; i < newGraphBars.length; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        newGraphBars = newGraphBars.slice();
        if (newGraphBars[j + 1].value < newGraphBars[j].value) {
          const temp = newGraphBars[j + 1];
          newGraphBars[j + 1] = newGraphBars[j];
          newGraphBars[j] = temp;
          yield newGraphBars;
        } else {
          break;
        }
      }
    }
    return newGraphBars;
  };


  // const delay = (): Promise<any> => new Promise((resolve) => setTimeout(resolve, 1000));

  // const tempDelay = async (): Promise<void> => {
  //   await delay();
  // };

  // const insertionSort = async (): Promise<void> => {
  //   // 배열 복사
  //   let newGraphBars = graphBars.slice();
  //   // 배열의 길이가 2 이상이라고 가정
  //   for (let i = 1; i < newGraphBars.length; i += 1) {
  //     for (let j = i - 1; j >= 0; j -= 1) {
  //       newGraphBars = newGraphBars.slice();
  //       if (newGraphBars[j + 1].value < newGraphBars[j].value) {
  //         const temp = newGraphBars[j + 1];
  //         newGraphBars[j + 1] = newGraphBars[j];
  //         newGraphBars[j] = temp;
  //         setBar(newGraphBars);
  //         // eslint-disable-next-line no-await-in-loop
  //         await tempDelay();
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  // };

  const sorting = insertionSort();

  let result: any;

  const nextt = (): void => {
    let flag = true;
    if (result === undefined) {
      result = sorting.next();
      setBar(result.value);
      flag = false;
    }
    if (!result.done && flag) {
      result = sorting.next();
      setBar(result.value);
      console.log(graphBars);
    }
  };
  const backToStart = (): void => {
    result = sorting.return;
    setBar(result.value);
  };

  function flow(): void {
    if (result === undefined) {
      result = sorting.next();
      setBar(result.value);
    }
    if (!result.done) {
      console.log(graphBars);
      result = sorting.next();
      setBar(result.value);
      setTimeout(flow, 1000);
    }
  }
  // const flow = async (): Promise<void> => {
  //   for (let i = 0; i < 10; i += 1) {
  //     await tempDelay();
  //     const temp = sorting.next();
  //     if (temp.done === true) {
  //       setBar(temp.value);
  //       break;
  //     } else {
  //       setBar(temp.value);
  //     }
  //   }
  // };
  return (
    <div>
      <InsertionSortBar graphBars={graphBars} />
      <button type="submit" onClick={(): void => backToStart()}>처음으로</button>
      <button type="submit" onClick={(): void => nextt()}>삽입정렬 프로세스+1</button>
      <button type="submit" onClick={(): void => flow()}>삽입정렬 전체</button>
    </div>
  );
}

export default InsertionSort;

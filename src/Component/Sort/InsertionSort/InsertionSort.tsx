import React, { useState } from 'react';
import InsertionSortBar from './InsertionSortBars';
import { InsertionSortGraphBar } from '../../../util';

// speed와 playing을 전역변수로 만든 이유는 함수안에서 선언하면 클로져 때문에 값을 도중에 바꿀 수가 없기 때문
let playing = false;
let speed = 1000;

function ISort(): JSX.Element {
  const [graphBars, setBar] = useState<InsertionSortGraphBar[]>(
    [{
      key: 0, value: 1, color: '#f54141', index: 0, sorted: false, height: 0,
    },
    {
      key: 1, value: 3, color: '#f54141', index: 1, sorted: false, height: 0,
    },
    {
      key: 2, value: 7, color: '#f54141', index: 2, sorted: false, height: 0,
    },
    {
      key: 3, value: 11, color: '#f54141', index: 3, sorted: false, height: 0,
    },
    {
      key: 4, value: 4, color: '#f54141', index: 4, sorted: false, height: 0,
    },
    {
      key: 5, value: 2, color: '#f54141', index: 5, sorted: false, height: 0,
    },
    {
      key: 6, value: 9, color: '#f54141', index: 6, sorted: false, height: 0,
    },
    {
      key: 7, value: 5, color: '#f54141', index: 7, sorted: false, height: 0,
    },
    ],
  );
  const [nowDepth, setNowDepth] = useState<number>(0);


  let arrayForSort = graphBars.map((el) => el.key);
  let arrayLength = arrayForSort.length;
  let wholeSortProcess: any[] = [];

  const insertionSort = (): void => {
    // 배열의 길이가 2 이상이라고 가정
    for (let i = 1; i < arrayLength; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        wholeSortProcess.push({
          arr: arrayForSort.slice(), targets: [j, j + 1], change: false, done: false, insert: false,
        });
        if (graphBars[arrayForSort[j + 1]].value < graphBars[arrayForSort[j]].value) {
          const temp = arrayForSort[j + 1];
          arrayForSort[j + 1] = arrayForSort[j];
          arrayForSort[j] = temp;
          wholeSortProcess.push({
            arr: arrayForSort.slice(), targets: [j, j + 1], change: true, done: false, insert: false,
          });
        } else {
          wholeSortProcess.push({
            arr: arrayForSort.slice(), targets: [j, j + 1], change: false, done: false, insert: true,
          });
          break;
        }
      }
    }
    wholeSortProcess.push({
      arr: arrayForSort.slice(), targets: [], change: true, done: true,
    });
  };

  insertionSort();
  let processLength = wholeSortProcess.length;
  function setDepth(depth: number): void {
    if (depth <= processLength - 1) {
      setNowDepth(depth);
    }
  }

  function goTo(depth: number): void {
    if (playing) {
      if (depth < processLength && depth > -1) {
        setDepth(depth);
        const temp = graphBars.slice();
        if (wholeSortProcess[depth].done) {
          for (let i = 0; i < graphBars.length; i += 1) {
            temp[wholeSortProcess[depth].arr[i]].color = '#2ee22e';
          }
          setBar(temp);
        } else {
          for (let i = 0; i < arrayLength; i += 1) {
            temp[wholeSortProcess[depth].arr[i]].color = '#f54141';
          }
          for (let i = 0; i < arrayLength; i += 1) {
            temp[wholeSortProcess[depth].arr[i]].index = i;
            if (wholeSortProcess[depth].change) {
              if (temp[wholeSortProcess[depth].arr[i]].index
                === wholeSortProcess[depth].targets[0]
                || temp[wholeSortProcess[depth].arr[i]].index
                === wholeSortProcess[depth].targets[1]) {
                temp[wholeSortProcess[depth].arr[i]].color = '#2ee22e';
              }
            } else if (temp[wholeSortProcess[depth].arr[i]].index
              === wholeSortProcess[depth].targets[0]
              || temp[wholeSortProcess[depth].arr[i]].index
              === wholeSortProcess[depth].targets[1]) {
              temp[wholeSortProcess[depth].arr[i]].color = '#ff9400';
            }
          }
          setBar(temp);
        }
      }
    }
  }

  const flow = (depth: number): void => {
    if (depth < processLength) {
      if (playing) {
        goTo(depth);
        if (depth < processLength - 1) {
          setTimeout(() => {
            flow(depth + 1);
          }, speed);
        }
      }
    }
  };

  function makeRandomNumber(): void {
    const temp: InsertionSortGraphBar[] = [];
    for (let j = 0; j < 15; j += 1) {
      const tempBar = {
        key: j, value: Math.floor(Math.random() * 21), color: '#f54141', index: j, sorted: false, height: 0,
      };
      temp.push(tempBar);
    }
    setBar(temp);
    setDepth(0);
    arrayForSort = graphBars.map((el) => el.key);
    arrayLength = arrayForSort.length;
    wholeSortProcess = [];
    insertionSort();
    processLength = wholeSortProcess.length;
  }

  function stop(): void {
    playing = false;
  }

  function play(): void {
    playing = true;
  }

  const button: any = {
    height: '50px',
    margin: '5px 5px',
  };
  return (
    <div style={{
      height: '700px',
    }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      >
        <button type="submit" style={button} onClick={(): void => { play(); goTo(0); stop(); }}>go to start</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { play(); goTo(nowDepth - 1); } stop(); }}>back</button>
        <button type="submit" style={button} onClick={(): void => { stop(); }}>stop</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { play(); goTo(nowDepth + 1); } stop(); }}>next</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { play(); flow(nowDepth); } }}>play</button>
        <button type="submit" style={button} onClick={(): void => { makeRandomNumber(); stop(); }}>make random number</button>
        <button type="submit" style={button} onClick={(): void => { if (speed < 2000) { speed += 100; } }}>slower</button>
        <button type="submit" style={button} onClick={(): void => { if (speed > 100) { speed -= 100; } }}>faster</button>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <InsertionSortBar graphBars={graphBars} />
      </div>
    </div>
  );
}

export default ISort;

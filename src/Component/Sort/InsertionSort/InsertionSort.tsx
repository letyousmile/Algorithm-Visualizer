import React, { useState } from 'react';
import InsertionSortBar from './InsertionSortBars';
import { InsertionSortGraphBar } from '../../../util';

function ISort(): JSX.Element {
  const [graphBars, setBar] = useState<InsertionSortGraphBar[]>(
    [{
      key: 0, value: 1, color: '#f54141', index: 0, sorted: false,
    },
    {
      key: 1, value: 3, color: '#f54141', index: 1, sorted: false,
    },
    {
      key: 2, value: 7, color: '#f54141', index: 2, sorted: false,
    },
    {
      key: 3, value: 11, color: '#f54141', index: 3, sorted: false,
    },
    {
      key: 4, value: 4, color: '#f54141', index: 4, sorted: false,
    },
    {
      key: 5, value: 2, color: '#f54141', index: 5, sorted: false,
    },
    {
      key: 6, value: 9, color: '#f54141', index: 6, sorted: false,
    },
    {
      key: 7, value: 5, color: '#f54141', index: 7, sorted: false,
    },
    ],
  );
  const [nowDepth, setNowDepth] = useState<number>(0);
  let playing = false;
  const arrayForSort = graphBars.map((el) => el.key);
  const arrayLength = arrayForSort.length;
  const wholeSortProcess: any[] = [];


  const insertionSort = (): void => {
    // 배열의 길이가 2 이상이라고 가정
    for (let i = 1; i < arrayLength; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        if (graphBars[arrayForSort[j + 1]].value < graphBars[arrayForSort[j]].value) {
          const temp = arrayForSort[j + 1];
          arrayForSort[j + 1] = arrayForSort[j];
          arrayForSort[j] = temp;
          wholeSortProcess.push({ arr: arrayForSort.slice(), targets: [j, j + 1], change: true });
        } else {
          wholeSortProcess.push({ arr: arrayForSort.slice(), targets: [j, j + 1], change: false });
          break;
        }
      }
    }
  };

  insertionSort();
  console.log(wholeSortProcess);
  const processLength = wholeSortProcess.length;

  function setDepth(depth: number): void {
    if (depth <= processLength - 1) {
      setNowDepth(depth);
    }
  }

  function goTo(depth: number): void {
    if (depth <= processLength - 1) {
      const temp = graphBars.slice();
      for (let i = 0; i < graphBars.length; i += 1) {
        temp[wholeSortProcess[depth].arr[i]].color = '#f54141';
      }
      for (let i = 0; i < graphBars.length; i += 1) {
        temp[wholeSortProcess[depth].arr[i]].index = i;
        if (depth > 0) {
          if (wholeSortProcess[depth].change) {
            if (temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[0]
              || temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[1]) {
              temp[wholeSortProcess[depth].arr[i]].color = '#2ee22e';
            }
          } else {
            if (temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[0]
              || temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[1]) {
              temp[wholeSortProcess[depth].arr[i]].color = '#ff9400';
            }
          }
        }
      }
      setDepth(depth);
      setBar(temp);
    }
  }

  function flow(depth: number): void {
    if (playing) {
      if (depth <= processLength - 1) {
        const temp = graphBars.slice();
        for (let i = 0; i < graphBars.length; i += 1) {
          temp[wholeSortProcess[depth].arr[i]].color = '#f54141';
        }
        for (let i = 0; i < graphBars.length; i += 1) {
          temp[wholeSortProcess[depth].arr[i]].index = i;
          if (depth > 0) {
            if (wholeSortProcess[depth].change) {
              if (temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[0]
                || temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[1]) {
                temp[wholeSortProcess[depth].arr[i]].color = '#2ee22e';
              }
            } else {
              if (temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[0]
                || temp[wholeSortProcess[depth].arr[i]].index === wholeSortProcess[depth].targets[1]) {
                temp[wholeSortProcess[depth].arr[i]].color = '#ff9400';
              }
            }
          }
        }
        setDepth(depth);
        setBar(temp);
        setTimeout(() => {
          flow(depth + 1);
        }, 500);
      } else {
        const temp = graphBars.slice();
        for (let i = 0; i < graphBars.length; i += 1) {
          temp[wholeSortProcess[depth - 1].arr[i]].color = '#2ee22e';
        }
        setBar(temp);
      }
    }
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
        <button type="submit" style={button} onClick={(): void => { setDepth(0); goTo(0); }}>go to start</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { setDepth(nowDepth - 1); goTo(nowDepth); } }}>back</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { setDepth(nowDepth + 1); goTo(nowDepth); } }}>next</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { playing = true; flow(nowDepth); } }}>play</button>
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

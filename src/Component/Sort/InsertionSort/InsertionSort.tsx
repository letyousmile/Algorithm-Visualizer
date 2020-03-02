import React, { useState } from 'react';
import InsertionSortBar from './InsertionSortBars';
import { InsertionSortGraphBar } from '../../../util';

// speed와 playing을 전역변수로 만든 이유는 함수안에서 선언하면 클로져 때문에 값을 도중에 바꿀 수가 없기 때문.
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
  // 소팅 알고리즘의 현재 진행 정도를 저장해 놓는 변수.
  const [nowDepth, setNowDepth] = useState<number>(0);

  let arrayForSort = graphBars.map((el) => el.key); // 실제 정렬을 하는 배열.
  let arrayLength = arrayForSort.length; // 배열의 길이를 몇번 참조해야 되서 변수로 놓고 씀.
  let wholeSortProcess: any[] = []; // 소팅 알고리즘의 모든 상태를 순서대로 기억하는 배열 [앞으로, 뒤로, 멈춤, 재생]을 가능하게 해주는 놈.

  // 소팅 알고리즘
  const insertionSort = (): void => {
    // 소팅 알고리즘 진행 정도 마다 상태 기억을 위해 [배열, targets, phase]를 저장한다.
    // 1. 배열에는 렌더링할 div의 key값을 소팅된 순서대로 저장하고
    // 2. targets에는 현재 비교연산중인 index,
    // 3. phase에는 소팅 알고리즘이 뭘 하고있는지 저장한다.
    // 배열, phase, targets를 토대로 div의 색과 위치를 결정한다.
    // phase를 만든 것은 나중에 소팅에 대한 단계별 설명을 쓸 때 확장성있게 사용할 수 있기 때문.
    wholeSortProcess.push({
      arr: arrayForSort.slice(), targets: [arrayLength, arrayLength], phase: 'start',
    });
    for (let i = 1; i < arrayLength; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        wholeSortProcess.push({
          arr: arrayForSort.slice(), targets: [j, j + 1], phase: 'compare',
        });
        if (graphBars[arrayForSort[j + 1]].value < graphBars[arrayForSort[j]].value) {
          const temp = arrayForSort[j + 1];
          arrayForSort[j + 1] = arrayForSort[j];
          arrayForSort[j] = temp;
          wholeSortProcess.push({
            arr: arrayForSort.slice(), targets: [j, j + 1], phase: 'change',
          });
        } else {
          wholeSortProcess.push({
            arr: arrayForSort.slice(), targets: [j, j + 1], phase: 'insert',
          });
          break;
        }
      }
    }
    wholeSortProcess.push({
      arr: arrayForSort.slice(), targets: [], phase: 'done',
    });
  };

  // 소팅알고리즘 실행.
  insertionSort();

  // 소팅 알고리즘 상태를 기억하는 배열의 길이 변수화.
  let processLength = wholeSortProcess.length;

  // 소팅 알고리즘의 현재 진행 정도를 저장하는 함수.
  function setDepth(depth: number): void {
    if (depth <= processLength - 1) {
      setNowDepth(depth);
    }
  }

  // 소팅 알고리즘의 특정 부분으로 이동해주는 함수.
  function goTo(depth: number): void {
    // stop이 눌러졌는지 확인.
    if (playing) {
      // 상태기억 배열의 길이를 벗어하는 depth가 들어왔는지 확인.
      if (depth < processLength && depth > -1) {
        // 현재 depth 저장.
        setDepth(depth);
        const temp = graphBars.slice();
        // 소팅이 끝났으면 모든 그래프를 초록색으로 변환.
        if (wholeSortProcess[depth].phase === 'done') {
          for (let i = 0; i < graphBars.length; i += 1) {
            temp[wholeSortProcess[depth].arr[i]].color = '#2ee22e';
          }
          setBar(temp);
        } else {
          // 그렇지 않으면 모든 막대 빨간색으로 초기화
          for (let i = 0; i < arrayLength; i += 1) {
            temp[wholeSortProcess[depth].arr[i]].color = '#f54141';
          }

          // 그래프의 위치 인덱스 변경.
          for (let i = 0; i < arrayLength; i += 1) {
            temp[wholeSortProcess[depth].arr[i]].index = i;
          }
          // 소팅 알고리즘 진행 상황에따라 그래프의 색과 높이 변경.
          for (let i = 0; i < arrayLength; i += 1) {
            if (wholeSortProcess[depth].phase === 'change') {
              if (temp[wholeSortProcess[depth].arr[i]].index
                === wholeSortProcess[depth].targets[0]
                || temp[wholeSortProcess[depth].arr[i]].index
                === wholeSortProcess[depth].targets[1]) {
                temp[wholeSortProcess[depth].arr[i]].color = '#2ee22e';
                if (wholeSortProcess[depth].targets[1] === 1) {
                  temp[wholeSortProcess[depth].arr[i]].height = 0;
                }
              }
            } else if (wholeSortProcess[depth].phase === 'compare') {
              if (temp[wholeSortProcess[depth].arr[i]].index
                === wholeSortProcess[depth].targets[1]) {
                temp[wholeSortProcess[depth].arr[i]].height = 50;
                temp[wholeSortProcess[depth].arr[i]].color = '#ff9400';
              } else if (temp[wholeSortProcess[depth].arr[i]].index
                === wholeSortProcess[depth].targets[0]) {
                temp[wholeSortProcess[depth].arr[i]].color = '#ff9400';
              }
            } else if (wholeSortProcess[depth].phase === 'insert') {
              if (temp[wholeSortProcess[depth].arr[i]].index
                === wholeSortProcess[depth].targets[1]) {
                temp[wholeSortProcess[depth].arr[i]].height = 0;
              }
            }
          }
          setBar(temp);
        }
      }
    }
  }

  // 재귀를 이용해 goTo()함수를 연속적으로 호출하는 함수.
  const flow = (depth: number): void => {
    // stop 버튼이 눌러지면 정지.
    if (playing) {
      goTo(depth);
      // 끝났는지 체크.
      if (depth < processLength - 1) {
        // setTimeout()을 전역변수 speed 만큼 걸고 재귀적으로 flow함수를 호출.
        setTimeout(() => {
          flow(depth + 1);
        }, speed);
      } else {
        // 끝났으면 멈춤 플래그 설정.
        stop();
      }
    }
  };

  // 랜덤 번호 생성 함수. 처음 렌더링 할때 과정을 함수에 저장함.
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

  // 멈추는 함수.
  function stop(): void {
    playing = false;
  }

  // 멈춤 flag를 해제하는 함수.(진행하는 함수 아니고 멈춤을 해제하는거임)
  function play(): void {
    playing = true;
  }

  // 버튼 css
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
        {/* 이동에 관한 함수는 stop상태에서만 조작할 수 있음 == (if (!playing)) */}
        <button type="submit" style={button} onClick={(): void => { if (!playing) { play(); goTo(0); stop(); } }}>go to start</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { play(); goTo(nowDepth - 1); stop(); } }}>back</button>
        <button type="submit" style={button} onClick={(): void => { stop(); }}>stop</button>
        <button type="submit" style={button} onClick={(): void => { if (!playing) { play(); goTo(nowDepth + 1); stop(); } }}>next</button>
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

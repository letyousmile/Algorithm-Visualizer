import React, { useState } from 'react';
import SortBars from './SortBars';
import { GraphBar, Process } from '../../util';
import { makeRandomList, sort, rendering } from './UtilFunction';

// speed와 playing을 전역변수로 만든 이유는 함수안에서 선언하면 클로져 때문에 값을 도중에 바꿀 수가 없기 때문.
let playing = false;
let speed = 1000;

function ISort(): JSX.Element {
  // 리스트 초기 변수
  const [graphBars, setBar] = useState<GraphBar[]>(makeRandomList);
  // 소팅 알고리즘의 현재 진행 정도를 저장해 놓는 변수.
  const [nowDepth, setNowDepth] = useState<number>(0);

  let wholeSortProcess: Process[] = sort(graphBars, 'BSort'); // 소팅 알고리즘의 모든 상태를 순서대로 기억하는 배열 [앞으로, 뒤로, 멈춤, 재생]을 가능하게 해주는 놈.

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
        setBar(rendering(graphBars, wholeSortProcess, depth));
      }
    }
  }

  // 랜덤 번호 생성 함수. 처음 렌더링 할때 과정을 함수에 저장함.
  function makeRandomNumber(): void {
    const temp: GraphBar[] = makeRandomList();
    setBar(temp);
    setDepth(0);
    wholeSortProcess = sort(graphBars, 'BSort');
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
        <SortBars graphBars={graphBars} />
      </div>
    </div>
  );
}

export default ISort;

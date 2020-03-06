/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { Process, GraphBar, Line } from '../../util';
import NodeTree from './NodeTree';
import { sort } from './UtilFunction';

let playing = false;
let speed = 1000;

function HSort(): JSX.Element {
  function makeRandomList(): [GraphBar[], Line[]] {
    const list: GraphBar[] = [];
    const line: Line[] = [];
    for (let j = 0; j < 15; j += 1) {
      const tempNode = {
        key: j, value: Math.floor(Math.random() * 21), color: '#f54141', index: j, sorted: false, display: 'hidden',
      };
      if (j > 0) {
        const tempLine = {
          key: j - 1, from: j, to: Math.floor((j - 1) / 2), color: 'black', display: 'hidden',
        };
        line.push(tempLine);
      }
      list.push(tempNode);
    }
    return [list, line];
  }
  // 리스트 초기 변수
  const listAndLine = makeRandomList();
  const [graphNodes, setNode] = useState<GraphBar[]>(listAndLine[0]);
  const [graphLines, setLines] = useState<Line[]>(listAndLine[1]);

  // heapSort();

  function rendering(
    list: GraphBar[],
    lines: Line[],
    process: Process[],
    depth: number,
  ): [GraphBar[], Line[]] {
    for (let i = 0; i < list.length; i += 1) {
      list[i].display = 'hidden';
      list[i].color = '#f54141';
      if (i !== 0) {
        lines[i - 1].display = 'hidden';
      }
      if (depth === 0) {
        list[i].index = i;
      }
      if (process[depth].phase === 'done') {
        list[i].color = '#2ee22e';
      }
    }
    if (process[depth].phase === 'done') {
      return [list.slice(), lines.slice()];
    }
    for (let i = 0; i < process[depth].arr.length; i += 1) {
      list[process[depth].arr[i]].display = 'visible';
      // 먼저 막대 빨간색으로 초기화
      list[process[depth].arr[i]].color = '#f54141';
      // 그래프의 위치 인덱스 변경.
      list[process[depth].arr[i]].index = i;
      if (i > 0) {
        lines[i - 1].display = 'visible';
      }
      // 소팅 알고리즘 진행 상황에따라 그래프의 색과 높이 변경.
      if (process[depth].phase === 'change') {
        if (list[process[depth].arr[i]].index
                    === process[depth].targets[0]
                    || list[process[depth].arr[i]].index
                    === process[depth].targets[1]) {
          list[process[depth].arr[i]].color = '#2ee22e';
        }
      } else if (process[depth].phase === 'compare') {
        if (list[process[depth].arr[i]].index
                    === process[depth].targets[1]) {
          list[process[depth].arr[i]].color = '#ff9400';
        } else if (list[process[depth].arr[i]].index
                    === process[depth].targets[0]) {
          list[process[depth].arr[i]].color = '#ff9400';
        }
      } else if (process[depth].phase === 'insert') {
        if (list[process[depth].arr[i]].index
          === process[depth].targets[0]) {
          list[process[depth].arr[i]].display = 'visible';
          if (process[depth].arr[i] > 0) {
            lines[process[depth].arr[i] - 1].display = 'visible';
          }
        }
      } else if (process[depth].phase === 'remove') {
        if (list[process[depth].arr[i]].index
          === process[depth].targets[0]) {
          list[process[depth].arr[i]].display = 'hidden';
          if (process[depth].arr.length > 1) {
            lines[process[depth].arr.length - 2].display = 'hidden';
          }
        }
      }
    }

    return [list.slice(), lines.slice()];
  }

  // 소팅 알고리즘의 현재 진행 정도를 저장해 놓는 변수.
  const [nowDepth, setNowDepth] = useState<number>(0);
  const [nowPlaying, setNowPlaying] = useState<boolean>(playing);
  // 소팅 알고리즘의 모든 상태를 순서대로 기억하는 배열 [앞으로, 뒤로, 멈춤, 재생]을 가능하게 해주는 놈.
  let wholeSortProcess: Process[] = sort(graphNodes, 'HSort');
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
        const renderResult = rendering(graphNodes, graphLines, wholeSortProcess, depth);
        setNode(renderResult[0]);
        setLines(renderResult[1]);
      }
    }
  }

  // 랜덤 번호 생성 함수. 처음 렌더링 할때 과정을 함수에 저장함.
  function makeRandomNumber(): void {
    const temp: [GraphBar[], Line[]] = makeRandomList();
    setNode(temp[0]);
    setLines(temp[1]);
    setDepth(0);
    wholeSortProcess = sort(temp[0], 'HSort');
    processLength = wholeSortProcess.length;
  }

  // 멈추는 함수.
  function stop(): void {
    playing = false;
    setNowPlaying(playing);
  }

  // 멈춤 flag를 해제하는 함수.(진행하는 함수 아니고 멈춤을 해제하는거임)
  function play(): void {
    playing = true;
    setNowPlaying(playing);
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
        <Button className="hSortButton" size="medium" onClick={(): void => { if (!playing) { play(); goTo(0); stop(); } }}>시작으로 가기</Button>
        <IconButton aria-label="skipPrevious" onClick={(): void => { if (!playing) { play(); goTo(nowDepth - 1); stop(); } }}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton aria-label="playAndPause" onClick={(): void => { if (!playing) { play(); flow(nowDepth); } else { stop(); } }}>
          {!nowPlaying
           && <PlayArrowIcon />}
          {nowPlaying
           && <PauseIcon />}
        </IconButton>
        <IconButton aria-label="skipNext" onClick={(): void => { if (!playing) { play(); goTo(nowDepth + 1); stop(); } }}>
          <SkipNextIcon />
        </IconButton>
        <Button className="hSortButton" size="medium" onClick={(): void => { makeRandomNumber(); stop(); }}>초기화 하기</Button>
        <Button className="hSortButton" size="medium" onClick={(): void => { if (speed < 2000) { speed += 100; } }}>느리게</Button>
        <Button className="hSortButton" size="medium" onClick={(): void => { if (speed > 100) { speed -= 100; } }}>빠르게</Button>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
      >
        <NodeTree graphNodes={graphNodes} sortedNodes={graphNodes} lines={graphLines} />
      </div>
    </div>
  );
}

export default HSort;

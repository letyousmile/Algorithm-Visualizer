/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { Process, GraphNode } from '../../util';
import NodeTree from './NodeTree';

let playing = false;
let speed = 1000;

function HSort(): JSX.Element {
  function makeRandomList2(): GraphNode[] {
    const list: GraphNode[] = [];
    for (let j = 0; j < 31; j += 1) {
      const tempBar = {
        key: j, value: Math.floor(Math.random() * 21), color: '#f54141', index: j, sorted: false, display: 'hidden',
      };
      list.push(tempBar);
    }
    return list;
  }
  // 리스트 초기 변수
  const [graphNodes, setNode] = useState<GraphNode[]>(makeRandomList2);

  // heapSort();
  function heapify(nodes: GraphNode[], keyList: number[], idx: number, process: Process[]): number[] {
    let parent = Math.floor((idx - 1) / 2);
    let tIdx = idx;
    const tKey = keyList.slice();
    while (tIdx > 0 && parent > -1) {
      process.push({
        arr: tKey.slice(), targets: [tIdx, parent], phase: 'compare',
      });
      if (nodes[tKey[parent]].value < nodes[tKey[tIdx]].value) {
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
  function heapify2(nodes: GraphNode[], keyList: number[], process: Process[]): number[] {
    const tKey = keyList.slice();
    let idx = 0;
    let left = idx * 2 + 1;
    let right = idx * 2 + 2;

    while (left < tKey.length) {
      if (right < tKey.length) { // 자식이 둘다 존재
        const max = nodes[tKey[left]].value > nodes[tKey[right]].value ? left : right;
        process.push({
          arr: tKey.slice(), targets: [idx, max], phase: 'compare',
        });
        if (nodes[tKey[idx]].value >= nodes[tKey[max]].value) {
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
        if (nodes[tKey[idx]].value < nodes[tKey[left]].value) {
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

  function heapSort(nodes: GraphNode[]): Process[] {
    // 부모노드와 비교 해서 자신이 크면 바꿈
    // 자신의 자식노드 중 큰 노드가 자신보다 크면 변경
    // 변경후 다시 자식노드들과 비교해서 큰 노드가 있다면 다시 변경
    // 최상단까지 진행
    let keyList: number[] = [];
    const arrayLength = nodes.length;
    const process: Process[] = [];
    process.push({
      arr: keyList.slice(), targets: [0, 0], phase: 'insert',
    });

    for (let i = 0; i < arrayLength; i += 1) {
      keyList.push(nodes[i].key);
      process.push({
        arr: keyList.slice(), targets: [i, i], phase: 'insert',
      });
      keyList = heapify(nodes, keyList, i, process).slice();
    }

    while (keyList.length > 0) {
      process.push({
        arr: keyList.slice(), targets: [0, keyList.length - 1], phase: 'change',
      });
      [keyList[0], keyList[keyList.length - 1]] = [keyList[keyList.length - 1], keyList[0]];
      process.push({
        arr: keyList.slice(), targets: [keyList.length - 1, keyList.length - 1], phase: 'remove',
      });
      keyList.pop();
      keyList = heapify2(nodes, keyList, process).slice();
    }

    return process;
  }

  function rendering(list: GraphNode[], process: Process[], depth: number): GraphNode[] {
    // const tList = [...list];
    // console.log('tList', list);
    // console.log('process', process);
    // 소팅이 끝났으면 모든 그래프를 초록색으로 변환.
    console.log(process[depth]);
    for (let i = 0; i < list.length; i += 1) {
      list[i].display = 'hidden';
    }
    for (let i = 0; i < process[depth].arr.length; i += 1) {
      list[process[depth].arr[i]].display = 'visible';
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
        }
      } else if (process[depth].phase === 'remove') {
        if (list[process[depth].arr[i]].index
          === process[depth].targets[0]) {
          list[process[depth].arr[i]].display = 'hidden';
        }
      }
    }

    return list.slice();
  }

  // 소팅 알고리즘의 현재 진행 정도를 저장해 놓는 변수.
  const [nowDepth, setNowDepth] = useState<number>(0);
  const [nowPlaying, setNowPlaying] = useState<boolean>(playing);
  // 소팅 알고리즘의 모든 상태를 순서대로 기억하는 배열 [앞으로, 뒤로, 멈춤, 재생]을 가능하게 해주는 놈.
  let wholeSortProcess: Process[] = heapSort(graphNodes);
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
        setNode(rendering(graphNodes, wholeSortProcess, depth));
      }
    }
  }

  // 랜덤 번호 생성 함수. 처음 렌더링 할때 과정을 함수에 저장함.
  function makeRandomNumber(): void {
    const temp: GraphNode[] = makeRandomList2();
    setNode(temp);
    setDepth(0);
    wholeSortProcess = heapSort(temp);
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
        justifyContent: 'center',
      }}
      >
        <NodeTree graphNodes={graphNodes} />
      </div>
    </div>
  );
}

export default HSort;

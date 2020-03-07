import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SortBars from './SortBars';
import { GraphBar, Process } from '../../util';
import { makeRandomList, sort, rendering } from './UtilFunction';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
// speed와 playing을 전역변수로 만든 이유는 함수안에서 선언하면 클로져 때문에 값을 도중에 바꿀 수가 없기 때문.
let playing = false;
let speed = 1000;

// 소팅 알고리즘의 현재 진행 정도를 저장해 놓는 변수.
let wholeSortProcess: Process[];
// 소팅 알고리즘 상태를 기억하는 배열의 길이 변수화.
let processLength: number;
let initialization = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SortView(info: any): JSX.Element {
  const pathName = info.location.pathname.substr(1);
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  // 리스트 초기 변수
  const [graphBars, setBar] = useState<GraphBar[]>(makeRandomList());

  if (graphBars !== undefined) {
    if (initialization) {
      wholeSortProcess = sort(graphBars, pathName);
      processLength = wholeSortProcess.length;
    }
  }

  const [nowDepth, setNowDepth] = useState<number>(0);
  const [nowPlaying, setNowPlaying] = useState<boolean>(playing);
  // 소팅 알고리즘의 모든 상태를 순서대로 기억하는 배열 [앞으로, 뒤로, 멈춤, 재생]을 가능하게 해주는 놈.
  function setDepth(depth: number): void {
    if (depth <= processLength - 1) {
      setNowDepth(depth);
    }
  }
  // 소팅 알고리즘의 특정 부분으로 이동해주는 함수.
  function goTo(depth: number): void {
    initialization = false;
    // stop이 눌러졌는지 확인.
    if (playing) {
      // 상태기억 배열의 길이를 벗어하는 depth가 들어왔는지 확인.
      if (depth < processLength && depth > -1) {
        // 현재 depth 저장.
        setDepth(depth);
        setBar(rendering(graphBars, wholeSortProcess[depth]));
      }
    }
  }

  // 랜덤 번호 생성 함수. 처음 렌더링 할때 과정을 함수에 저장함.
  function makeRandomNumber(howSorted = 'random'): void {
    const temp: GraphBar[] = makeRandomList(howSorted);
    setBar(temp);
    setDepth(0);
    initialization = true;
  }

  // 멈추는 함수.
  function stop(): void {
    playing = false;
    setNowPlaying(playing);
    initialization = false;
  }

  // 멈춤 flag를 해제하는 함수.(진행하는 함수 아니고 멈춤을 해제하는거임)
  function play(): void {
    if (processLength === undefined) {
      wholeSortProcess = sort(graphBars, pathName);
      processLength = wholeSortProcess.length;
    }
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
  // 다른 화면으로 넘어갈 때는 초기화
  if (!playing) {
    initialization = true;
  }

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
        <Button className={classes.button} size="medium" onClick={(): void => { if (!playing) { play(); goTo(0); stop(); initialization = true; } }}>시작으로 가기</Button>
        <IconButton aria-label="skipPrevious" onClick={(): void => { if (!playing) { play(); goTo(nowDepth - 1); stop(); } }}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton aria-label="playAndPause" onClick={(): void => { if (!playing) { play(); flow(nowDepth); initialization = true; } else { stop(); initialization = true; } }}>
          {(!nowPlaying || initialization)
            && <PlayArrowIcon />}
          {(nowPlaying && !initialization)
            && <PauseIcon />}
        </IconButton>
        <IconButton aria-label="skipNext" onClick={(): void => { if (!playing) { play(); goTo(nowDepth + 1); stop(); } }}>
          <SkipNextIcon />
        </IconButton>
        {!toggle && <Button className={classes.button} size="medium" onClick={(): void => { if (!toggle) { setToggle(true); } else { setToggle(false); } }}>배열생성</Button>}
        {toggle
          && (
            <div>
              <Button className={classes.button} color="primary" size="medium" onClick={(): void => { makeRandomNumber(); stop(); }}>난수배열</Button>
              <Button className={classes.button} color="primary" size="medium" onClick={(): void => { makeRandomNumber('increasing'); stop(); }}>증가배열</Button>
              <Button className={classes.button} color="primary" size="medium" onClick={(): void => { makeRandomNumber('decreasing'); stop(); }}>감소배열</Button>
              <Button className={classes.button} color="primary" size="medium" onClick={(): void => { makeRandomNumber('nearlyIncreasing'); stop(); }}>상승세배열</Button>
              <Button className={classes.button} color="primary" size="medium" onClick={(): void => { makeRandomNumber('nearlyDecreasing'); stop(); }}>하강세배열</Button>
            </div>
          )}
        <Button className={classes.button} size="medium" onClick={(): void => { if (speed < 2000) { speed += 100; } }}>느리게</Button>
        <Button className={classes.button} size="medium" onClick={(): void => { if (speed > 100) { speed -= 100; } }}>빠르게</Button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
      >
        <SortBars graphBars={graphBars} />
      </div>
    </div>
  );
}

export default SortView;

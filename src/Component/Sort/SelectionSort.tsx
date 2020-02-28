/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';

function SSort(): JSX.Element {
  const [randomArr, setRandomArr] = useState([
    {
      id: 1, value: 5, color: 'white', transition: '0',
    },
    {
      id: 2, value: 4, color: 'white', transition: '0',
    },
    {
      id: 3, value: 2, color: 'white', transition: '0',
    },
    {
      id: 4, value: 6, color: 'white', transition: '0',
    },
    {
      id: 5, value: 1, color: 'white', transition: '0',
    },
    {
      id: 6, value: 7, color: 'white', transition: '0',
    },
    {
      id: 7, value: 8, color: 'white', transition: '0',
    },
    {
      id: 8, value: 9, color: 'white', transition: '0',
    },
    {
      id: 9, value: 10, color: 'white', transition: '0',
    },
    {
      id: 10, value: 3, color: 'white', transition: '0',
    }]);

  const delay = (time: number): Promise<void> => new Promise(
    (resolve) => setTimeout(resolve, time),
  );

  const tempDelay = async (time: number): Promise<void> => {
    await delay(time);
  };

  const selectionSort = async (): Promise<void> => {
    // 최솟값을 찾고 앞자리 부터 채워 넣는 방식
    let saveStateArr = randomArr.slice();
    for (let i = 0; i < randomArr.length; i += 1) { // 자리
      const tempArr = saveStateArr.slice();
      let min = i;
      for (let j = i; j < randomArr.length; j += 1) { // 최솟값 탐색
        if (tempArr[min].value > tempArr[j].value) {
          min = j;
        }
      }
      tempArr[min].color = 'green';
      tempArr[i].color = 'green';

      const minX = document.getElementById(tempArr[min].id.toString())?.getBoundingClientRect().x;
      const iX = document.getElementById(tempArr[i].id.toString())?.getBoundingClientRect().x;
      const dist = (minX! - iX!);
      console.log(dist);
      tempArr[min].transition = `${(dist * -1)}px`;
      tempArr[i].transition = `${dist}px`;
      setRandomArr(tempArr.slice());

      await tempDelay(2000);

      tempArr[i].transition = '0';
      tempArr[min].transition = '0';
      // setRandomArr(tempArr.slice());
      await tempDelay(500);

      [tempArr[min], tempArr[i]] = [tempArr[i], tempArr[min]]; // swap
      setRandomArr(tempArr.slice());
      await tempDelay(2000);

      tempArr[min].color = 'white';
      tempArr[i].color = 'yellow';
      setRandomArr(tempArr.slice());
      saveStateArr = tempArr.slice();
      await tempDelay(1000);
    }
  };


  const printArr = randomArr.map((item) => (
    <div
      key={item.id}
      id={item.id.toString()}
      style={{
        width: '100px',
        height: `${item.value * 50}px`,
        border: '1px solid black',
        backgroundColor: `${item.color}`,
        textAlign: 'center',
        transform: `translateX(${item.transition})`,
        transitionDuration: '1s',

      }}
    >
      {item.value}
    </div>
  ));

  return (
    <div>
      <h2>
        선택정렬
      </h2>
      <button type="submit" onClick={selectionSort}> 선택정렬 </button>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        {printArr}
      </div>
    </div>
  );
}

export default SSort;

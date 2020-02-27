/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';

function SSort(): JSX.Element {
  const [randomArr, setRandomArr] = useState([
    { id: 1, value: 5 },
    { id: 2, value: 4 },
    { id: 3, value: 2 },
    { id: 4, value: 6 },
    { id: 5, value: 1 },
    { id: 6, value: 7 },
    { id: 7, value: 8 },
    { id: 8, value: 9 },
    { id: 9, value: 10 },
    { id: 10, value: 3 }]);

  const delay = (): Promise<any> => new Promise((resolve) => setTimeout(resolve, 500));

  const tempDelay = async (): Promise<void> => {
    await delay();
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
      [tempArr[min], tempArr[i]] = [tempArr[i], tempArr[min]]; // swap
      setRandomArr(tempArr);
      saveStateArr = tempArr.slice();
      await tempDelay();
    }
  };

  const printArr = randomArr.map((item) => (
    <div
      key={item.id}
      style={{
        marginRight: '3px',
        width: '20px',
        height: `${item.value * 50}px`,
        border: ' 1px solid black',
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
      <div className="arrClass" style={{ display: 'flex' }}>
        {printArr}
      </div>
    </div>
  );
}

export default SSort;

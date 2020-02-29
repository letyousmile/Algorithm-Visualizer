/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Bar } from '../../util';

function BSort(): JSX.Element {
  const [items, setItems] = useState<Bar[]>([
    {
      key: 0,
      value: 5,
    },
    {
      key: 1,
      value: 4,
    },
    {
      key: 2,
      value: 3,
    },
    {
      key: 3,
      value: 2,
    },
    {
      key: 4,
      value: 1,
    },
  ]);
  async function delay(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  async function startSort(): Promise<void> {
    console.log(JSON.stringify(items));
    for (let i = 0; i < items.length - 1; i += 1) {
      for (let j = 0; j < items.length - i - 1; j += 1) {
        if (items[j].value > items[j + 1].value) {
          const temp = items[j];
          items.splice(j, 1, items[j + 1]);
          items.splice(j + 1, 1, temp);
          setItems(items.slice());
          await delay();
        }
      }
    }
    console.log(JSON.stringify(items));
  }
  return (
    <div>
      <h2>
        버블정렬
      </h2>
      <button type="button" onClick={startSort}>
        정렬시작
      </button>
      {items.map((item: Bar) => (
        <div
          key={item.key}
          style={{
            display: 'inline-block',
            width: '20px',
            height: `${item.value * 100}px`,
            backgroundColor: 'black',
          }}
        >
          {item.key}
          {item.value}
        </div>
      ))}
    </div>
  );
}

export default BSort;

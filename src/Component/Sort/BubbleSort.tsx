/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import { Transition, animated } from 'react-spring/renderprops';

import Bar from '../../util';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  outer: {
    justifyContent: 'center',
  },
  inner: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'baseline',
    width: '20px',
    margin: '10px',
  },
  temp: {
    position: 'absolute',
    bottom: '-20px',
  },
}));

function BSort(): JSX.Element {
  const [items, setItems] = useState<Bar[]>([]);
  const len = 15;
  function makeItems(): void {
    for (let i = 0; i < len; i += 1) {
      const item: Bar = {
        key: i,
        value: Math.floor(Math.random() * 100),
        color: 'black',
      };
      items.push(item);
    }
    setItems(items.slice());
  }
  async function delaySet(tempItems: Bar[]): Promise<void> {
    await new Promise((resolve) => {
      resolve(setItems(tempItems));
    });
  }
  async function delay(time: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, time));
  }

  async function startSort(): Promise<void> {
    let num = 0;
    for (let i = 0; i < items.length - 1; i += 1) {
      for (let j = 0; j < items.length - i - 1; j += 1) {
        if (items[j].value > items[j + 1].value) {
          items[j].color = 'red';
          items[j + 1].color = 'red';
          const v1 = items[j].value;
          const v2 = items[j + 1].value;
          setItems(items.slice());
          items.splice(j, 2);
          await delaySet(items.slice());
          const temp1: Bar = {
            key: len + num,
            value: v2,
            color: 'black',
          };
          num += 1;
          const temp2: Bar = {
            key: len + num,
            value: v1,
            color: 'black',
          };
          num += 1;
          items.splice(j, 0, temp1, temp2);
          await delay(720);
          setItems(items.slice());
          await delay(300);
        }
      }
    }
    console.log(items);
  }

  const classes = useStyles();

  return (
    <div className={classes.mainContent}>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          버블정렬
        </Typography>
        <button type="button" onClick={startSort}>
          정렬시작
        </button>
        <button type="button" onClick={makeItems}>
          리스트 만들기
        </button>
        <div className={classes.outer}>
          <Transition
            items={items}
            keys={(item): number => item.key}
            from={{ transform: 'translate3d(0,-40px,0)' }}
            // update={{ transform: 'translate3d(0,-40px,0)' }}
            enter={{ opacity: 1, transform: 'translate3d(0, 0 ,0)' }}
            leave={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
          >
            {(item) => (props): JSX.Element => (
              <animated.div
                key={item.key}
                className={classes.inner}
                style={{
                  ...props,
                  ...{
                    height: `${item.value}px`,
                    backgroundColor: `${item.color}`,
                  },
                }}
              >
                <span className={classes.temp}>{item.value}</span>
              </animated.div>
            )}
          </Transition>
        </div>
      </Container>
    </div>
  );
}

export default BSort;

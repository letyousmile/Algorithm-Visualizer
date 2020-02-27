import React from 'react';
import {
  Card, CardContent, CardMedia, Container, Grid, Typography, makeStyles,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const items = [
  {
    index: 0,
    name: '삽입정렬',
    path: '/insertionSort',
    img: '',
    desc: '자료 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교하여,'
    + '자신의 위치를 찾아 삽입함으로써 정렬을 완성하는 알고리즘입니다.',
  },
  {
    index: 1,
    name: '선택정렬',
    path: '/selectionSort',
    img: '',
    desc: '주어진 리스트 중에 최소값을 찾습니다. 그 값을 맨 앞에 위치한 값과 교체합니다.'
    + '맨 처음 위치를 뺀 나머지 리스트를 같은 방법으로 교체합니다.',
  },
];

function Main(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.mainContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Alogirhtm Visualizer
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          어려운 알고리즘들을 눈으로 확인해보세요.
        </Typography>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item key={item.index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Main;

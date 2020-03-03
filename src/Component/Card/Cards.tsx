import React from 'react';
import {
  Card, CardContent, CardMedia, Container, Grid, Typography, makeStyles,
} from '@material-ui/core/';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
}));

const items = [
  {
    index: 0,
    name: '삽입정렬',
    path: '/ISort',
    img: '',
    desc: '자료 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교하여,'
    + '자신의 위치를 찾아 삽입함으로써 정렬을 완성하는 알고리즘입니다.',
  },
  {
    index: 1,
    name: '선택정렬',
    path: '/SSort',
    img: '',
    desc: '주어진 리스트 중에 최소값을 찾습니다. 그 값을 맨 앞에 위치한 값과 교체합니다.'
    + '맨 처음 위치를 뺀 나머지 리스트를 같은 방법으로 교체합니다.',
  },
  {
    index: 2,
    name: '버블정렬',
    path: '/BSort',
    img: '',
    desc: '두 인접한 원소를 검사하여 정렬하는 방법입니다.'
    + '원소의 이동이 거품이 수면으로 올라오는 듯한 모습을 보이기 때문에 지어진 이름입니다.',
  },
  {
    index: 3,
    name: '합병정렬',
    path: '/MSort',
    img: '',
    desc: '분할정복을 이용하여 정렬하는 방법입니다.'
    + '자료 배열을 작은 단위로 쪼개어 정렬하고 합치는 방식으로 작동합니다.',
  },
  {
    index: 4,
    name: '퀵정렬',
    path: '/QSort',
    img: '',
    desc: '퀵이라는 이름에서 알 수 있듯이 평균적인 상황에서 최고의 성능을 나타닙니다.'
    + '피벗을 지정하여 피벗보다 큰 원소는 오른쪽으로, 작은 원소는 왼쪽으로 나누며 정렬해나갑니다.',
  },
];

function Cards(): JSX.Element {
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item key={item.index} xs={12} sm={6} md={4}>
            <Link to={item.path} style={{ textDecoration: 'none' }}>
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Cards;

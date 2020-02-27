import React from 'react';
import {
  Container, Typography, makeStyles,
} from '@material-ui/core/';
import Cards from './Component/Card/Cards';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

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
      <Cards />
    </div>
  );
}

export default Main;

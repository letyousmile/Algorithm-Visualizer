import React from 'react';
import {
  Link, Typography, makeStyles,
} from '@material-ui/core/';


const contributers = [
  {
    index: 0,
    id: 'bcking92',
    url: 'https://github.com/bcking92',
  },
  {
    index: 1,
    id: 'sunghyun6',
    url: 'https://github.com/letyousmile',
  },
  {
    index: 2,
    id: 'porori',
    url: 'https://github.com/ckskal3',
  },
];
function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright '}
      {new Date().getFullYear()}
      .
      {contributers.map((contributer) => (
        <Link color="inherit" key={contributer.index} href={contributer.url}>
          {`${contributer.id} `}
        </Link>
      ))}
      All rights reserved.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Algoview
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
      </Typography>
      <Copyright />
    </div>
  );
}

export default Footer;

import React from 'react';
import {
  Link, Typography, makeStyles,
} from '@material-ui/core/';

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
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
        Algorithm Visualizer
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
      </Typography>
      <Copyright />
    </div>
  );
}

export default Footer;

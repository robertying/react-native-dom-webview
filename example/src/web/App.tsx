import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
      'justifyContent': 'center',
      'minHeight': '80vh',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

export default function App() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header />
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

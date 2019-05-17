import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default () => {
  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Landing page</Typography>
          </Toolbar>
        </AppBar>
      <Toolbar />
      <Container>
        <p>Hello world</p>
      </Container>
    </React.Fragment>
  );
};
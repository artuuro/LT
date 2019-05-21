import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Header from '../components/Header';
import TodoList from '../components/TodoList';

class Todos extends React.Component {
  render () {
    return (
      <div>
        <Header title="Todos" />
        <TodoList />
      </div>
    )
  }
}



export default withRouter(connect(state => state)(Todos));

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { loadUsers, loadTodos } from '../actions';
import Header from '../components/Header';
import Users from '../components/Users';

class Index extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx;

    if (!store.getState().users || !store.getState().todos) {
      await store.dispatch(loadUsers());
      await store.dispatch(loadTodos());
    }

    return { isServer };
  }

  render () {
    return (
      <div>
        <Header title="Users" />
        <Users />
      </div>
    )
  }
}

export default withRouter(connect()(Index));

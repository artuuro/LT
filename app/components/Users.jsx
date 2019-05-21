import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

class Users extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1>Users:</h1>
        <ul>
          {
            users && users.map(user => (
              <li key={user.id}>
                <Link prefetch as={ `/todos/${user.id}` } href={{ pathname: '/todos', query: { user: user.id } }}>
                  <a>{user.name} ({ user.email })</a>
                </Link>
              </li>
            ))
          }
        </ul>

      </div>
    );
  }
}

export default connect(state => state)(Users);

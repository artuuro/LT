import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

class TodoList extends React.Component {

  render() {
    const { user } = this.props.router.query;
    const userInfo = this.props.users.find(i => i.id == user);
    const userInfoKeys = Object.keys(userInfo);
    const todos = this.props.todos.filter(i => i.userId == user);

    return (
      <div>
        <div>
          <table>
            {
              userInfoKeys.map(key => (
                <tr>
                  <td><b>{key.toLocaleUpperCase()}</b></td>
                  <td>{JSON.stringify(userInfo[key])}</td>
                </tr>
              ))
            }
          </table>
        </div>
        <hr />
        <h3>Associated Todo's:</h3>
        <ul>
          {
            todos.map(entry => (
              <li key={entry.id}>{entry.title} [{entry.completed ? "completed" : "to do"}]</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(TodoList));
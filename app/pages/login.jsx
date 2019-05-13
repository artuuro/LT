import React from 'react'
import { withRouter } from 'next/router';

class Login extends React.Component {

    async componentDidMount() {
        console.log('Mounted');
    }

    render() {
        return (
            <div>YO</div>
        );
    }
}

export default withRouter(Login);
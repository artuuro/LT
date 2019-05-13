import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';

class Index extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Landing page</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <p>Hello world!</p>
                <Link href="/docs">
                    <a>API DOCUMENTATION</a>
                </Link>
                <hr />
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </div>
        );
    }
}

export default withRouter(Index);

import React from 'react';
import Head from 'next/head';

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" 
                />
                <title>
                    { this.props.title ? this.props.title : 'MISSING_TITLE' }
                </title>
            </Head>
        );
    }
}

export default Header;
import React from 'react';
import Head from 'next/head';

class Header extends React.Component {

    constructor(properties) {
        super();
        this.attr = properties;
    }

    render() {
        return (
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" 
                />
                <title>
                    { this.attr.title ? this.attr.title : 'MISSING_TITLE' }
                </title>
            </Head>
        );
    }
}

export default Header;
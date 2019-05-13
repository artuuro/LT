import Head from 'next/head';
import Link from 'next/link';

export default () =>
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
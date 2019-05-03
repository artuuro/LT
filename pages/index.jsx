import Link from 'next/link';

export default () => 
<div>
    <h1>HOME</h1>
    <Link href='/ping' as='/ping'>
        <a>Ping</a>
    </Link>
</div>

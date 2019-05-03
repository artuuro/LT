import Link from 'next/link';
import fetch from 'isomorphic-unfetch'

const index = (props) => (
    <div>
        <h1>PINGED AT { props.time }</h1>
        <Link 
            href='/' 
            as='/'
        >
            <a>Home</a>
        </Link>
    </div>
);

index.getInitialProps = async () => {
    const res = await fetch('/api/ping');
    const data = await res.json();
    return data;
};

export default index;
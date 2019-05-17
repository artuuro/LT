import dynamic from 'next/dynamic';
import HomeButton from '../components/LinkButton';

const Header = dynamic(() => import('../components/Header'));

export default () => {
  return (
    <div>
        <Header title="Authentication page" />
        <HomeButton />
    </div>
  );
};
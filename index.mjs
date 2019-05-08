import Loader from './server/Loader';

const instance = new Loader({
    'MODE': ['STATIC'],
});

instance.run();


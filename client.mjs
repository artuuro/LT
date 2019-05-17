import Loader from './server/Loader';

const instance = new Loader({
    'features': [
        'STATIC', 
        'PWA'
    ]
});

instance.run();


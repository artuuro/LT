import Loader from './server/Loader';

const instance = new Loader({
    'features': [
        'STATIC', 
        'PWA'
    ],
    'PORT': 3000
});

instance.run();


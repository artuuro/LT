import Loader from './server/Loader';

const instance = new Loader({
    'features': [
        'API', 
        'DATABASE',
        'STATIC'
    ],
    'PORT': 8080
});

instance.run();

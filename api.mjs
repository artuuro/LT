import Loader from './server/Loader';

const instance = new Loader({
    'features': [
        'API', 
        'DATABASE'
    ],
    'PORT': 8080
});

instance.run();

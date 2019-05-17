import Loader from './server/Loader';

const instance = new Loader({
    'features': [
        'API', 
        'STATIC', 
        'DATABASE',
        'PWA'
    ]
});

instance.run();


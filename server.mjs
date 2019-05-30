import Loader from './server/Loader';

const instance = new Loader({
    'features': [
        'API',
        'DATABASE',
        'STATIC',
        'WEBPUSH'
    ]
});

instance.run();
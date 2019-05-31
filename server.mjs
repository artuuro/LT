import Loader from './services/Loader';

const instance = new Loader({
    'features': [
        'API',
        'DATABASE',
        'STATIC',
        'TEMPLATING'
        //'WEBPUSH', // webpush.ctrl for more
    ]
});

instance.run();
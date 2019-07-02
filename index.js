import { Server } from './core';

const instance = new Server({
    'services': [
        'PWA',
        'API',
        'DATABASE',
        'STATIC',
        //'WEBPUSH', // webpush.ctrl for more
    ]
});

instance.run();
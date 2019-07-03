import defaults from './defaults';
import routes from './routes';
import development from './env.development';
import production from './env.production';
import test from './env.test';

const env = process.env.NODE_ENV.trim();

export default (params) => {
    let configuration = {
        ...defaults,
        routes: routes
    };

    switch (env) {
    case 'development':
        configuration = Object.assign(configuration, development);
        configuration.development = true;
        break;
    case 'production':
        configuration = Object.assign(configuration, production);
        configuration.development = false;
        break;
    case 'test':
        configuration = Object.assign(configuration, test);
        configuration.development = true;
        configuration.test = true;
        break;
    default:
        break;
    }

    configuration = Object.assign(configuration, params);

    return configuration;
};
import defaults from './defaults';
import routes from './routes';
import development from './env.development';
import production from './env.production';

const dev = process.env.NODE_ENV.trim() == 'development';

export default (params) => {
    let configuration = {
        ...defaults,
        development: dev,
        routes: routes
    };

    if (configuration.development) {
        configuration = Object.assign(configuration, development);
    } else {
        configuration = Object.assign(configuration, production);
    }

    configuration = Object.assign(configuration, params);

    return configuration;
}
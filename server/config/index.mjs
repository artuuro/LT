import defaults from './defaults';
import routes from './routes';
import development from './env.development';
import production from './env.production';

export default inject => {
    const dev = process.env.NODE_ENV == 'development';

    const configuration = {
        ...defaults,
        development: dev,
        routes: routes
    };

    switch (true) {
        case !dev: Object.assign(configuration, production);
        case dev: Object.assign(configuration, development);
        case inject: Object.assign(configuration, inject);
    }
    
    return configuration;
}
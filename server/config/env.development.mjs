export default {
    'MONGODB': {
        'uri': 'mongodb://localhost:27017/little-town'
    },
    'SWAGGER': {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: '[LT] HTTP2 Backend API',
                description: 'API documentation',
                version: '1.0.6'
            },
            externalDocs: {
                url: 'https://localhost/',
                description: 'homepage'
            },
            securitySchemes: {},
            host: 'localhost',
            schemes: ['https', 'http', 'ws'],
            consumes: ['application/json'],
            produces: ['application/json', 'text/html']
        }
    }
}
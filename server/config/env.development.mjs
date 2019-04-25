export default {
    'MONGODB': {
        'uri': 'mongodb://localhost:27017/little-town'
    },
    'SWAGGER': {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'little.town API',
                description: 'API documentation for litle.town',
                version: '1.0.3'
            },
            externalDocs: {
                url: 'https://localhost',
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
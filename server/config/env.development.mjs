export default {
    'MONGODB': {
        'uri': 'mongodb://localhost:27017/little-town'
    },
    'SSL': false,
    'SWAGGER': {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'API Specifications',
                description: 'API documentation',
                version: '0.0.8'
            },
            securitySchemes: {
                BasicAuth: {
                    type: 'https',
                    scheme: 'basic'
                },
                BearerAuth: {
                    type: 'https',
                    scheme: 'bearer'
                }
            },
            host: 'localhost',
            schemes: ['https', 'http', 'ws'],
            consumes: ['application/json'],
            produces: ['application/json', 'text/html']
        }
    }
}
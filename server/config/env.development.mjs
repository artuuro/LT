export default {
    'MONGODB': {
        'uri': 'mongodb://localhost:27017/LT'
    },
    'HTTP2': false,
    'SSL': false,
    'PORT': 80,
    'SWAGGER': {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'API',
                description: 'Documentation',
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
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json', 'text/html']
        }
    }
}
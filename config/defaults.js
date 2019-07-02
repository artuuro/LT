import { join } from 'path';
import { readFileSync } from 'fs';

export default {
    'PORT': 443,
    'SSL': {
        'key': readFileSync(join(process.cwd(), 'certification', 'localhost-privkey.pem')),
        'cert': readFileSync(join(process.cwd(), 'certification', 'localhost-cert.pem'))
    },
    'PUSH': {
        'PUBLIC': 'BEHYXoqKY3swXI3BAOWVKjydgkqTbPetkURiKDx571rriEkWEpRTKR4CgdVVCmk7bXF3Q94umHG0J4DeW-B1IY0',
        'PRIVATE': 'RdqmUHWWL4LEtQOGy8oURSrRPRsz1pfrui75CYM-VWU'
    },
    'STATIC': {
        'root': join(process.cwd(), 'static'),
        'prefix': '/static/'
    },
    'HELMET': {
        hidePoweredBy: { 
            setTo: 'API 0.0.8'
        }
    },
    'HTTP2': true,
    'JWT_SIGN': 'SIGN_KEY_HERE',
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
};
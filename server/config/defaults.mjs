import { join } from 'path';
import { readFileSync } from 'fs';

export default {
    'PORT': 443,
    'SSL': {
        'key': readFileSync(join(process.cwd(), 'certification', 'localhost-privkey.pem')),
        'cert': readFileSync(join(process.cwd(), 'certification', 'localhost-cert.pem'))
    },
    'STATIC': {
        'root': join(process.cwd(), 'public'),
        'prefix': '/assets/'
    },
    'HELMET': {
        hidePoweredBy: { 
            setTo: '0.0.7'
        }
    },
    'HTTP2': false,
    'JWT_SIGN': 'SIGN_KEY_HERE'
};
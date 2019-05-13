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
            setTo: 'LT_1.0.6'
        }
    },
    'JWT_SIGN': 'SIGN_KEY_HERE'
};
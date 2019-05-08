import { join } from 'path';
import { readFileSync } from 'fs';

export default {
    'PORT': 443,
    'SSL': {
        'key': readFileSync(join(process.cwd(), 'certification', 'localhost-privkey.pem')),
        'cert': readFileSync(join(process.cwd(), 'certification', 'localhost-cert.pem'))
    },
    'STATIC': {
        'root': join(process.cwd(), 'public')
    },
    'HELMET': {
        hidePoweredBy: { 
            setTo: 'LT_1.0.3'
        }
    },
    'JWT_SIGN': '_aiicaqw2c0!#[]009k0c9s11cqscjoaisjc2231f'
};
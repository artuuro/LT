import { join } from 'path';
import { readFileSync } from 'fs';
/**
 * DO NOT DELETE DEFAULT VARIABLES
 */
export default {
    'MODE': ['API', 'STATIC'],
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
            setTo: 'LT_1.0.6'
        }
    },
    'JWT_SIGN': 'SIGN_KEY_HERE'
};
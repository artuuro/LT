export default [{
    path: 'user',
    method: 'POST',
    controller: 'user',
    schema: {
        description: 'Creates new user instance',
        summary: 'Register user',
        body: {
            type: 'object',
            properties: {
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            }
        },
        response: {
            200: {
                description: 'Successful response',
                type: 'object'
            }
        }
    }
}, {
    path: 'user/auth',
    method: 'POST',
    controller: 'authentication',
    schema: {
        description: 'Validates credentials and creates user session',
        summary: 'Sign-in user',
        body: {
            type: 'object',
            properties: {
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            }
        },
        response: {
            200: {
                description: 'Successful response',
                type: 'object'
            }
        }
    }
}, {
    path: 'push',
    method: 'POST',
    controller: 'webpush',
    schema: {
        description: 'Push notifications service',
        summary: 'WEB push',
        response: {
            200: {
                description: 'Successful response',
                type: 'object'
            }
        }
    }
}, {
    path: 'push',
    method: 'GET',
    controller: 'webpush',
    schema: {
        description: 'WEB PUSH Auth key',
        summary: 'GET public web-push key',
        response: {
            200: {
                description: 'Successful response',
                type: 'object'
            }
        }
    }
}, {
    path: 'ping',
    method: 'GET',
    controller: 'ping',
    middlewares: ['Authentication'],
    schema: {
        description: 'ping-pong',
        summary: 'Returns pong',
        response: {
            200: {
                description: 'Successful response',
                type: 'object'
            }
        }
    }
}, {
    unique: true,
    path: '',
    method: 'GET',
    controller: 'pwa'
}];
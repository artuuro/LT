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
    path: 'ping',
    method: 'GET',
    controller: 'ping',
    schema: {
        description: 'Simple ping endpoint',
        summary: 'ping-pong'
    }
}];
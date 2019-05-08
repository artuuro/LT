export default class pingController {
    async get(req, res) {
        
        await res.type('application/json').code(200);

        return { 
            message: 'PONG',
            time: new Date() 
        };
    }
}
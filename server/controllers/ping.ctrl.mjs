export default class pingController {
    async get(req, res) {
        return res.send({
            'message': 'PONG',
            'time': new Date()
        });
    }
}
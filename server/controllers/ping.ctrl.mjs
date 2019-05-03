export default class pingController {
    async get(_req, res) {
        return { time: new Date() };
    }
}
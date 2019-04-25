export default class landingController {
    get(_req, res) {
        res.sendFile('index.html');
    }
}
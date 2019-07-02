export default class {
    /**
     * TODO:
     * - Implement templating
     * - Think about SSR
     */
    get(req, res) {
        res.sendFile('index.html');
    }
}
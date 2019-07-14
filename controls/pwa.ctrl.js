export default class {
    /**
     * TODO:
     * - Implement templating
     * - Think about SSR
     */
    get(_req, res) {
        res.view('index', {
            message: `Hello world!`
        });
    }
}
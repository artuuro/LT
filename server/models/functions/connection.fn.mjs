export default class connectionFn {
    // Should work on Connection instance only
    connect() {
        this.isAlive = true;
    }

    // Same here
    disconnect() {
        this.isAlive = false;
    }
}
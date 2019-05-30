export default class {
    /**
     * TODO:
     * - save subscriptions to db
     * - fetch & reckognise subscription
     */
    
    post(req, res) {
        console.log(req.body);
        // req.body is the data we can use as `target` specified on `get` action
        return JSON.stringify({
            message: 'success'
        });
    }

    async get(req, res) {
        // PUSH SENDING EXAMPLE
        /*
          const target = {
            endpoint: 'https://fcm.googleapis.com/fcm/send/dAqum4neT34:APA91bE_Wb3liDlgzCbDDoywvyS65sIj8nSaScxg7FFYTfLUOYqWWuuHZBgINVXWTPGoo0DWGzzl5e0dNw1sE6ptcoWMgwTHp-vg4uWDha5pAL5VHXAZDZSynDOHRvBlDmEH9QcOJUXm',
            expirationTime: null,
            keys: {
                p256dh: 'BAdgKBa1zBUVpLVcMln-Eu-LNEbwIZiB8ty27ocfa6VeUDi6926wzwFyteJiEza_0rMwIrfhGHHCwxmpaloza6U',
                auth: 'pvpRk7V5y7OQPs0COecvRw'
            }
            };

            await this.push(target, JSON.stringify({
                title: 'Message title',
                message: 'Message body'
            }));
        */

       

        return JSON.stringify({
            key: this.config.PUSH.PUBLIC
        });
    }
}
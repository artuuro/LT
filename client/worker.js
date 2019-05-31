const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const notification = (title, body, registration) => {
    const options = { body };
    registration.showNotification(title, options);
};

const saveSubscription = async subscription => {
    const response = await fetch('/api/push', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
    });
    return response.json();
};

const getPublicKey = async () => {
    const response = await fetch('/api/push', {
        method: 'GET'
    });
    return response.json();
}

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(caches.open('LT')
        .then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json'
            ].map(
                url => new Request(url, {
                    credentials: 'same-origin'
                })
            ));
        }));
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', async () => {
    try {
        const { key } = await getPublicKey();
        const applicationServerKey = urlB64ToUint8Array(key);
        
        const subscription = await self.registration.pushManager.subscribe({ 
            applicationServerKey, 
            userVisibleOnly: true 
        });

        await saveSubscription(subscription);

    } catch (err) {
        console.log('Error', err)
    }
});

self.addEventListener('push',  event => {
    if (event.data) {
        const data = event.data.json();
       
        if (data.title && data.message)
            notification(data.title, data.message, self.registration);
    }
});

self.addEventListener('message', event => {
    self.clients.matchAll().then(all => all.forEach(client => {
        client.postMessage(event.data);
    }));
});
const registerServiceWorker = async () => {
    await navigator.serviceWorker.register('worker.js');
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
    }
}

const subscribe = async () => {
    await requestNotificationPermission();
};

(async () => {
    await registerServiceWorker();
    navigator.serviceWorker.onmessage = e => console.log(e);
}); 
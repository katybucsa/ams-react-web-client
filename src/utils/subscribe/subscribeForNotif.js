import axios from "axios";

export const subscribeUser = () => {

    if ("serviceWorker" in navigator) {
        try {
             navigator.serviceWorker.ready.then(function (registration) {
                if (!registration.pushManager) {
                    console.log('Push manager unavailable.');
                    return
                }
                registration.pushManager.getSubscription().then(function (existedSubscription) {
                    if (existedSubscription) {
                        const data = JSON.stringify({endpoint: existedSubscription.endpoint});
                        const config = {
                            headers: {
                                "content-type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("access_token")}`
                            }
                        };
                        const response = axios.post("/notification/subscribed", data, config);
                        console.log(response);
                    }
                });
            });
             init();
        } catch (e) {
            console.error('error init(): ' + e);
        }
         subscribe();
    }
};

async function init() {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    };
    axios.get('notification/signing-key', config)
        .then(key => {
            console.log(key.data);
            localStorage.setItem("publicSigningKey", key.data)
        })
        .finally(() => console.info('Application Server Public Key fetched from the server '));

    await navigator.serviceWorker.ready;
}

async function subscribe() {

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: localStorage.getItem("publicSigningKey")
    });

    console.info(`Subscribed to Push Service: ${subscription.endpoint}`);
    const data = JSON.stringify(subscription);
    const config = {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    };

    await axios.post("notification/subscription", data, config);

    console.info('Subscription info sent to the server');
}

export async function unsubscribe(token) {

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
        const successful = await subscription.unsubscribe();
        if (successful) {
            console.info('Unsubscription successful');
            const data = JSON.stringify({endpoint: subscription.endpoint});
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.post("/notification/unsubscription", data, config);
            console.info('Unsubscription info sent to the server');
        } else {
            console.error('Unsubscription failed');
        }
    }
}
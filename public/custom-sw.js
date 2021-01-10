self.addEventListener('activate', event => event.waitUntil(clients.claim()));

self.addEventListener('push', event => event.waitUntil(handlePushEvent(event)));

self.addEventListener('notificationclick', event => event.waitUntil(handleNotificationClick(event)));

self.addEventListener('notificationclose', event => console.info('notificationclose event fired'));

let courseUrl;
const adminUrl = new URL("/admin-panel", self.location.origin).href;

async function handlePushEvent(event) {
    console.info('push event emitted');

    const needToShow = await needToShowNotification();
    const dataCache = await caches.open('data');

    // if (!event.data) {
    //     console.info('number fact received');
    //
    //     if (needToShow) {
    //         self.registration.showNotification('Numbers API', {
    //             body: 'A new fact has arrived',
    //             tag: 'numberfact',
    //             icon: 'numbers.png'
    //         });
    //     }
    //
    //     const response = await fetch('lastNumbersAPIFact');
    //     const fact = await response.text();
    //
    //     await dataCache.put('fact', new Response(fact));
    // }
    // else {
    console.info('notification received');

    const msg = event.data.json();

    if (needToShow) {
        await self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: './images/notif-icon.png'
        });
    }
    courseUrl = new URL(`/course/${msg.courseId}/posts`, self.location.origin).href;
    await dataCache.put('joke', new Response(msg.body));
    // }

    const allClients = await clients.matchAll({includeUncontrolled: true});
    for (const client of allClients) {
        if (msg.to === 'admin') {
            client.postMessage({
                service: msg.service,
                state: msg.state
            });
        } else
            client.postMessage('data-updated');
    }
}

async function handleNotificationClick(event) {

    let openClient = null;
    const allClients = await clients.matchAll({includeUncontrolled: true, type: 'window'});
    for (const client of allClients) {
        console.log(client.url);
        if (client.url === courseUrl || client.url === adminUrl) {
            openClient = client;
            break;
        }
    }

    if (openClient) {
        await openClient.focus();
    } else {
        await clients.openWindow(courseUrl);
    }

    event.notification.close();
}

async function needToShowNotification() {
    const allClients = await clients.matchAll({includeUncontrolled: true});
    for (const client of allClients) {
        if (client.visibilityState === 'visible') {
            return false;
        }
    }
    return true;
}

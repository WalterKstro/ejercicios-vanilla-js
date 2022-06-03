const cached = [
    '/',
    '/index.html',
    '/app.js',
    '/css/bootstrap.min.css',
    '/css/custom.css',
];

self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches.open('static')
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cached);
            })
    )
});

self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                return res;
            })
    )
});
const CACHE_NAME = 'flashcards-v1.0';
const BASE_PATH = '/flashcards-dezor/'

const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json',
  BASE_PATH + 'service-worker.js',
  BASE_PATH + 'icon-192.png',
  BASE_PATH + 'icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


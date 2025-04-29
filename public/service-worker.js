// Cache version and resources to cache
const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/offline.html',
  '/images/empty-data.svg',
  '/images/logo.png',
  '/styles/offline.css',
];

// Sự kiện cài đặt Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  // Chỉ xử lý yêu cầu mạng cho trang offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Nếu không có kết nối mạng, trả về trang offline
          return caches.match('/offline.html');
        })
    );
  }
});
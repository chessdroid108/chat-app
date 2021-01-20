importScripts('lib/cache-polyfill.js');

cacheReady = false;
CACHE_NAME = 'ChatApp'
self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '../Theme/theme_loader.js',
        '../Theme/inverted_theme.js',
        '../Theme/inverted_theme.css',
        '../Theme/dark_theme.js',
        '../Theme/dark_theme.css',
        './script.js',
        './home.js',
        'lib/cache-polyfill.js',
        '../CSS/userdata.css',
        '../CSS/tablestyle.css',
        '../CSS/signinstyle.css',
        '../CSS/sidebar.css',
        '../CSS/settings.css',
        '../CSS/profilemenu.css',
        '../CSS/privacy.css',
        '../CSS/home.css',
        '../CSS/chatstyle.css',
        '../Images/mountains.jpg',
        '../Images/favicon.ico',
        '../Images/exiticon.png',
      ]);
    })
  );
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });

            return response;
          }
        );
      })
    );
});
const CACHE="edith-mobile-v1";const ASSETS=["./","./index.html","./app.css","./app.js","./manifest.webmanifest","./icons/edith-180.png","./icons/edith-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("fetch",e=>{if(e.request.method==="GET")e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});

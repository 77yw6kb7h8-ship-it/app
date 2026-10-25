// Service worker : l'appli s'ouvre hors ligne, les photos et la carte sont mises en cache au passage.
const VERSION = 'chantier-v1';
const SHELL = [
  './',
  './index.html',
  './support.js',
  './image-slot.js',
  './.image-slots.state.json',
  './manifest.webmanifest',
  './vendor/react.production.min.js',
  './vendor/react-dom.production.min.js',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // géocodage : toujours en direct
  if (url.hostname === 'nominatim.openstreetmap.org') return;

  if (url.origin === location.origin) {
    // fichiers de l'appli : réseau d'abord pour avoir les mises à jour, cache si hors ligne
    e.respondWith(fetch(req)
      .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
    return;
  }

  // photos, polices, tuiles de carte : cache d'abord, rafraîchi en arrière-plan
  e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  })));
});

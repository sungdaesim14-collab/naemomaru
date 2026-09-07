/* 내모마루 — 오프라인 우선 서비스 워커
   웹폰트도 CDN도 쓰지 않으므로 캐시할 것은 이 다섯 개뿐입니다.
   앱을 고칠 때마다 CACHE 이름의 숫자를 올리면 사용자에게 새 버전이 갑니다. */
const CACHE = 'naemomaru-v4';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 네트워크를 먼저 시도하고 실패하면 캐시로 — 지하철에서도 열립니다. */
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});

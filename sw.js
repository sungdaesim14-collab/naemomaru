/* 내모마루 서비스워커 v3 — 화면은 항상 최신(network-first), 오프라인 대비만 캐시 */
const CACHE = 'naemomaru-v3';

self.addEventListener('install', function (e) { self.skipWaiting(); });

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  // 데이터 API는 서비스워커가 관여하지 않음
  if (req.method !== 'GET'
      || req.url.indexOf('script.google.com') !== -1
      || req.url.indexOf('googleusercontent.com') !== -1) {
    return;
  }
  // network-first: 항상 최신을 먼저 시도, 실패(오프라인)하면 캐시
  e.respondWith(
    fetch(req).then(function (resp) {
      const copy = resp.clone();
      caches.open(CACHE).then(function (c) { try { c.put(req, copy); } catch (err) {} });
      return resp;
    }).catch(function () {
      return caches.match(req).then(function (cached) {
        return cached || caches.match('./index.html');
      });
    })
  );
});

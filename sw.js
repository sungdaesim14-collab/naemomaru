/* 내모마루 서비스워커 — 앱 껍데기 캐시 + 오프라인 대비 */
const CACHE = 'naemomaru-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).catch(function () {}));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  // 데이터 API 요청은 캐시하지 않고 항상 네트워크
  if (req.method !== 'GET' || req.url.indexOf('script.google.com') !== -1 || req.url.indexOf('googleusercontent.com') !== -1) {
    return;
  }
  // 그 외(화면·폰트·아이콘): 캐시 우선, 없으면 네트워크 후 저장
  e.respondWith(
    caches.match(req).then(function (cached) {
      return cached || fetch(req).then(function (resp) {
        return caches.open(CACHE).then(function (c) {
          try { c.put(req, resp.clone()); } catch (err) {}
          return resp;
        });
      }).catch(function () { return cached; });
    })
  );
});

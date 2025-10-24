const files2cache = ['./page-home/','./static/main.js','./static/style.css','./lib/idb/+esm.js', './assets/favicon-32.png', './assets/favicon-144.png', './assets/favicon-192.png', './assets/screenshot-720p.png', './assets/screenshot-narrow.png'];
const CACHE_NAME = "website-test";
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                cache.addAll(files2cache);
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches
            .match(e.request)
            .then((res) => {
                if(res) return res; // Se houver resposta do cache, responder
                return fetch(e.request) // Se não, buscar essa resposta atráves da internet
                    .then((netRes) => {
                        if(!netRes || netRes.status !== 200 || netRes.type !== 'basic') {
                            return netRes;
                        }
                        
                        const net2cache = netRes.clone();
                        caches
                            .open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(e.request, net2cache);
                            });
                        
                        return netRes;
                    })
                    .catch(() => { // Se der erro, ou seja, não há internet, rodar os arquivos offline
                        return caches.match(files2cache);
                    })
            })


    )
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if(key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                }))
            })
    );
    return self.clients.claim();
});
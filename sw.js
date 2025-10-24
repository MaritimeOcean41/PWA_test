const files2cache = ['../page-home/','../static/script.js','../static/style.css','../lib/idb/+esm.js'];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open("website-test")
            .then(cache => {
                cache.addAll(files2cache);
        })
    )
});
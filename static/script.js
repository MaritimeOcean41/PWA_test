// PWA installation
let installButton = document.querySelector("button#install");
let installPrompt = null;

installButton.addEventListener("click", async () => {
    if(!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    sw(); // Trigger Service Worker
});
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event; 
});

// IndexedDB
import { openDB } from '../lib/idb/+esm.js';
var testData = [
    { id: 1, name: "test_01", ver: 2, desc: "SEC" },
    { id: 2, name: "test_02", ver: 3, desc: "THI" },
    { id: 3, name: "test_03", ver: 4, desc: "FOR" },
    { id: 4, name: "test_04", ver: 5, desc: "FIV" },
];
async function testDB() {
    const db = await openDB("databasetest", 1, {
        upgrade(db) {
            db.createObjectStore("testes", { keyPath: "id" });
        },
    });

    testData.forEach(async (testD) => {
        await db.add("testes", testD);
        console.log(testD);
    });
}
testDB();
/*
var testData = [
    { id: 1, name: "test_01", ver: 2, desc: "SEC" },
    { id: 2, name: "test_02", ver: 3, desc: "THI" },
    { id: 3, name: "test_03", ver: 4, desc: "FOR" },
    { id: 4, name: "test_04", ver: 5, desc: "FIV" },
];

const request = window.indexedDB.open("databasetest", 3);
request.onerror = (e) => {
    console.error(e.target.error?.message);
};
request.onupgradeneeded = (e) => {
    const db = e.target.result;
    const objStore = db.createObjectStore("testes", { keyPath: "id" });

    objStore.createIndex("name", "name", { unique: false });
    objStore.createIndex("desc", "desc", { unique: true });

    objStore.transaction.oncomplete = (e) => {
        const testesObjStore = db
            .transaction("testes", "readwrite")
            .objStore("testes");
        testData.forEach((teste) => {
            testesObjStore.add(teste);
        });
    };
};*/

// Offline Website (ServiceWorker)
const swPath = '../sw.js';
function sw() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register(swPath);
    } else {
        alert('Aplicação incompatível em seu navegador');
    }
}
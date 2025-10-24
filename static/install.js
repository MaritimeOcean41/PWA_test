// PWA installation
let installButton = document.querySelector("button#install");
let installPrompt = null;

installButton.addEventListener("click", async () => {
    if(!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    //sw(); // Trigger Service Worker
});
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event; 
});

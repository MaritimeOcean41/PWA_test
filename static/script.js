let installButton = document.querySelector("button#install");
let installPrompt = null;

installButton.addEventListener("click", async () => {
    if(!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(result.outcome);
});
window.addEventListener("beforeinstallprompt", (event) => {
    alert('saddsadsa')
    event.preventDefault();
    installPrompt = event; 
});
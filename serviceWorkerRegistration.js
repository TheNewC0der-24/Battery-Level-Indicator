if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then((registration) => {
        console.log("Service Worker Registered!!");
        console.log(registration);
    }).catch((err) => {
        console.log("Service Worker Failed to Register");
        console.log(err);
    });
}
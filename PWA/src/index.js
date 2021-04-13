if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("SW registerd");
        console.log(registration);
    }).catch(error =>{
        console.log("sw registration failed");
        console.log(error);
    });
}

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
});


import { gameManager } from "./store.js";


export function startLogger() {
    setInterval(()=> {
        console.log(gameManager.logState());
    }, 5000);
}
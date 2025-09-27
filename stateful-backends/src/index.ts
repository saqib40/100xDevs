// let's simulate a game in here
// cause we aren't creating a new one any way

import { gameManager } from "./store.js";
import { startLogger } from "./logger.js";

startLogger();

setInterval(() => {
    const game = {
        id: Math.random().toString(),
        whitePlayerName: "harkirat",
        blackPlayerName: "jaskirat",
        moves: []
    };
    gameManager.addGame(game);
}, 5000);

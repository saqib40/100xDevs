interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves: string[];
}

// easiest way to store a state
// just create a variable and store 
// everything in it
// export const games: Game[] = [];

// another way is
// using a class
// helps you create easy to use functions
// that let you change the state

class GameManager {
    games: Game[];
    constructor() {
        this.games = [];
    }
    public addGame(game: Game) {
        this.games.push(game);
    }
    public getGames() {
        return this.games;
    }
    public addMove(gameId: string, move: string) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(move);
        }
    }
    public logState() {
        console.log(this.games);
    }
}
export const gameManager = new GameManager();


// singleton pattern
// a single instance is created
// no scope for mistakes of initialising the class

class GameManager2 {
    private static instance: GameManager2;
    private games: Game[] = [];
    private constructor() {
        // Private constructor ensures that a new instance cannot be created from outside
    }
    static getInstance() : GameManager2 {
        // create a single instance and return it
        if(GameManager2.instance) {
            const gameManager2 = new GameManager2();
        }
        return GameManager2.instance;
    }
}
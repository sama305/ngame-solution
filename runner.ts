import {Player} from "./player";
import {Game, GameOver, Result, Success, TryAgain} from "./game";

export class Runner {
    private readonly game = new Game()
    constructor(readonly player: Player) {}

    run() {
        let result: Result | undefined = undefined;
        do {
            const number = this.player.next(result);
            result = this.game.guess(number);
            if(result instanceof Success){
                console.log(`[${result.currentTry}]: ${number} is Bingo! You did it!`);
            }
            else if(result instanceof TryAgain){
                console.log(`[${result.currentTry}]: ${number} is too ${result.hint}!`);
            }
            else if (result instanceof GameOver){
                console.log(`[${result.currentTry}]: ${number} is NOT it. Number was ${result.number}, Game over!`);
            }
            else {
                throw new Error("Unhandled game result");
            }
        } while (result instanceof TryAgain);
    }
}

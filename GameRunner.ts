import {Game, GameOver, Result, Success, TryAgain} from "./game";
import {Input} from "./input";

export class GameRunner {
    private result: Result;
    private readonly game = new Game();

    constructor(readonly input: Input) {}

    run() {
        do {
            const number = this.input.next(this.game.currentTry());
            this.result = this.game.guess(number);
            if(this.result instanceof Success){
                console.log("You did it!");
            }
            else if(this.result instanceof TryAgain){
                console.log(`Your guess is too ${this.result.hint}!`);
            }
            else if (this.result instanceof GameOver){
                console.log(`Number was ${this.result.number}, Game over!`);
            }
            else {
                throw new Error("Unhandled game result");
            }
        } while (this.result instanceof TryAgain);
    }
}

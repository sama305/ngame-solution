import {Player} from "./player";

export class Game {
    private readonly MIN: number = 1
    private readonly MAX: number = 1025
    private readonly MAX_TRIES: number = 10

    private readonly number: number
    private tries: number = 0

    constructor(readonly player: Player) {
        this.number = Math.floor(Math.random() * (this.MAX - this.MIN)) + this.MIN;
    }

    run() {
        let result: Result;
        do {
            const number = this.player.next();
            result = this.guess(number);
            if(result instanceof Success){
                console.log(`[${this.currentTry()}]: You did it!`);
            }
            else if(result instanceof TryAgain){
                console.log(`[${this.currentTry()}]: Your guess is too ${result.hint}!`);
                this.tries++
            }
            else if (result instanceof GameOver){
                console.log(`[${this.currentTry()}]: Number was ${result.number}, Game over!`);
            }
            else {
                throw new Error("Unhandled game result");
            }
        } while (result instanceof TryAgain);
    }

    private guess(number: number): Result {
        if(number === this.number){
            return new Success()
        }
        if(this.tries >= this.MAX_TRIES - 1) {
            return new GameOver(this.number)
        }
        else {
            const hint = number < this.number ? 'low' : 'high'
            return new TryAgain(hint)
        }
    }

    private currentTry(): number {
        return this.tries + 1
    }
}

interface Result {
    readonly success: boolean
}

class Success implements Result {
    readonly success = true
}

class TryAgain implements Result {
    readonly success = false
    constructor(readonly hint: string) {}
}

class GameOver implements Result {
    readonly success = false
    constructor(readonly number: number) {}
}

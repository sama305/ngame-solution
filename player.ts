import Prompt from "prompt-sync";
import {Result} from "./game";

export interface Player {
    next(prevResult: Result): number
}

export class PromptPlayer implements Player {
    private readonly prompt = Prompt();
    next(prevResult: Result): number {
        const input = this.prompt(`Your Guess: `);
        const number: number | undefined = parseInt(input);
        if(!number){
            throw new Error(`Input must be a number!`);
        }
        return number
    }

}

export class BotPlayer implements Player {
    next(prevResult: Result): number {
        return 0;
    }

}

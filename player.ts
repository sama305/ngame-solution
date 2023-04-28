import Prompt from "prompt-sync";
import {Result, TryAgain} from "./game";

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
    // These numbers are -/+ 1 than the actual min and max values so that the
    // actual end points are accessible. If this small leeway wasn't given,
    // then the bot would never guess 1 or 1024, but would get extremely close
    // every time. Theoretically these could be set to any arbitrary number
    // close to the end points, but I chose to make them as close as possible.
    private minThreshold: number = 1;
    private maxThreshold: number = 1024;

    // This is the initial guess (Result == undefined).
    // Since there is nothing to base this guess off of, the best option is
    // to simply pick the value in the middle. Since the randomizer can
    // choose from between 1 and 1025 (not including 1025), the middle
    // would be 1024 / 2 = 512.
    private guess: number = Math.floor((this.maxThreshold + this.minThreshold) / 2);

    next(prevResult: Result): number {
        // Previous guess failed, so try to determine the next guess base on
        // whether it was too low or too high.
        if (prevResult instanceof TryAgain)
        {
            switch(prevResult.hint)
            {
                case 'high':
                    this.maxThreshold = this.guess - 1;
                    break;
                case 'low':
                    this.minThreshold = this.guess + 1;
                    break;
            }
        }

        this.guess = Math.floor((this.maxThreshold + this.minThreshold) / 2);

        return this.guess;
    }
}
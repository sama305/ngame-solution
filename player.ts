import Prompt from "prompt-sync";

export interface Player {
    next(): number
}

export class PromptPlayer implements Player {
    private readonly prompt = Prompt();
    next(): number {
        const input = this.prompt(`Your Guess: `);
        const number: number | undefined = parseInt(input);
        if(!number){
            throw new Error(`Input must be a number!`);
        }
        return number
    }

}

export class BotPlayer implements Player {
    next(): number {
        return 0;
    }

}

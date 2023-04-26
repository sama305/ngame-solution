import Prompt from "prompt-sync";

export interface Input {
    next(currentTry: number): number
}

export class PromptInput implements Input {
    private readonly prompt = Prompt();
    next(currentTry: number): number {
        const input = this.prompt(`[${currentTry}] Your Guess: `);
        const number: number | undefined = parseInt(input);
        if(!number){
            throw new Error(`Input must be a number!`);
        }
        return number
    }

}

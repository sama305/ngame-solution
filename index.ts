import Prompt from 'prompt-sync'

const prompt = Prompt()

var tries: number = 0
const number = random(0,1024)

while(tries < 10){
    const input = prompt(`[${tries + 1}] Your Guess: `)
    let guess: number;
    try {
        guess = parseInt(input)
    } catch (error: any){
        console.log(`Input must be a number!`)
        break
    }
    if(guess === number){
        console.log("You did it!")
        break
    }
    else {
        const hint = guess < number ? 'low' : 'high'
        console.log(`Your guess is too ${hint}!`)
    }
    tries++
}
if(10 <= tries){
    console.log(`Number was ${number}!`)
}
function random (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

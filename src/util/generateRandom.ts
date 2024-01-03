export function generateRandom(maxLimit = 1000){
    let rand = Math.random() * maxLimit;

    rand = Math.floor(rand);

    return rand;
}

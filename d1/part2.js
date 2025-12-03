const fs = require('fs').promises;

const parseLines = async () => {
    const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
    return data.split('\n');
};

// cast number to range 0-99
const castTo100 = (num, step) => { return ((num + step) % 100 + 100) % 100 };

// get all steps between start and end
const fullSteps = (start, steps) => Array.from({ length: Math.abs(steps)}, 
    (_,i) => ((Math.sign(steps)*(i + 1) + start) % 100 + 100) % 100
);


// sum of all positions that pass through 0
const solve = async () => {
    const rotations = await parseLines();

    // define left as negative, right as positive
    const steps = rotations.map( r => r.startsWith('L') ? -1 * r.match(/\d+/g) : 1 * r.match(/\d+/g) );

    let password = 0;
    let start = 50;
    
    // console.log(fullSteps(50,100))
    steps.forEach(step => {
        const stop = castTo100(start, step);
        // console.log(start, step, stop);
        // Brute force all steps and check for 0
        const range = fullSteps(start, step);
        range.filter(e => e === 0).forEach(() => password += 1);
        // console.log(range.filter(e => e === 0));
        start = stop;
        // if (stop === 0) { password += 1 }    
    });
    
    return password;
};

solve().then(console.log);
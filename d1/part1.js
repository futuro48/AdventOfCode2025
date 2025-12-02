const fs = require('fs').promises;

const parseLines = async () => {
    const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
    return data.split('\n');
};

const castTo100 = (num, step) => { return ((num + step) % 100 + 100) % 100 };

const solve = async () => {
    const rotations = await parseLines();

    const steps = rotations.map( r => r.startsWith('L') ? -1 * r.match(/\d+/g) : 1 * r.match(/\d+/g) );

    let password = 0;
    let start = 50;
    steps.forEach(step => {
        const stop = castTo100(start, step);
        start = stop;
        if (stop === 0) { password += 1 }    
    });
    
    return password;
};

solve().then(console.log);
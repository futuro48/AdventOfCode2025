const fs = require('fs').promises;

const parseLines = async () => {
    const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
    return data.split(',').map(line => line.trim());
};

//each line is a range of IDs
//find all the IDs that have repeated digits, invalid IDs
//part 2 extends invalid IDs to digits repeated at least twice
//return the sum of all invalid IDs

//helper to find number of repeats
const doesRepeat = (num) => { 
    const numToStr = String(num);
    const strLen = numToStr.length;
    for (let n=1; n <= strLen / 2; n++){ 
        const subStr = numToStr.slice(0, n);
        const subStrRepeated = subStr.repeat(strLen / n);
        if (subStrRepeated === numToStr){ return true; }
    }
    return false;
};

const solve = async () => {
    const ranges = await parseLines();
    let invalidIDSum = 0;

    ranges.forEach(line => {
        const [start, end] = line.split('-').map(Number);
        for (let n = start; n <= end; n++) {
            if (doesRepeat(n)) { invalidIDSum += n }
        }
    });

    return invalidIDSum;
};

solve().then(console.log);
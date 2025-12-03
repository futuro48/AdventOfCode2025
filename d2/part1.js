const fs = require('fs').promises;

const parseLines = async () => {
    const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
    return data.split(',').map(line => line.trim());
};

//each line is a range of IDs
//find all the IDs that have repeated digits, invalid IDs
//return the sum of all invalid IDs
const solve = async () => {
    const ranges = await parseLines();
    // console.log(ranges);
    let invalidIDSum = 0;

    ranges.forEach(line => {
        const [start, end] = line.split('-').map(Number);
        // console.log(start, end);
        for (let n = start; n <= end; n++) {
            const nStr = String(n);
            if (nStr.length % 2 === 0) {
                const mid = nStr.length / 2;
                const left = nStr.slice(0, mid);
                const right = nStr.slice(mid);
                if (left === right){
                    // console.log(left, right, n); 
                    invalidIDSum += n }
            }
        }
    });

    // return safeReports;
    return invalidIDSum;
};

solve().then(console.log);
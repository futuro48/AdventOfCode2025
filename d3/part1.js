const fs = require('fs').promises;

const parseLines = async () => {
    const data = await fs.readFile('./input.txt', {encoding: 'utf-8'});
    return data.split('\n').map(line => line.trim());
};
// Get the maximum joltage from a bank
const getMaxJoltage = (bank) => {
    let max = 0;
    // Find the max joltage by trying all starting points and adding the largest remaining 
    // to the right. 
    [...bank].forEach(
        (b,i,a) => { 
            max = Math.max(max, b * 10 + Math.max(...a.slice(i + 1))) })
    return max;
};

// Get the total joltage of all battery banks
const solve = async () => {
    const batteryBanks = await parseLines();
    let totalJoltage = 0;

    batteryBanks.forEach( battery => {
        const largestJoltage = getMaxJoltage(battery);
        totalJoltage += largestJoltage;
    })

    return totalJoltage;
};

solve().then(console.log);
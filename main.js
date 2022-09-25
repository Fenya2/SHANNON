let fileName = process.argv[2]; //fileName

let fs = require('fs');
let inputSequence;

function showHelp() {
    console.log(fs.readFileSync('HELP.txt').toString());
}

function makeSeries(sequence) {
    let series = {};
    for(let i = 0; i < sequence.length; i++) {
        if(!series[sequence.charAt(i)]) series[sequence.charAt(i)] = 1;
        else series[sequence.charAt(i)]++;
    }
    return Object.entries(series);
}

try {
    if(fileName === '/?' || !fileName) {
        throw new Error();
    }
    let inputSequence = fs.readFileSync(fileName).toString(); // get sequence
    console.log(inputSequence);
    let series = makeSeries(inputSequence);
    if(series.length === 0 || series.length === 1) {
        console.log(`entropy is: 0`);
        throw Error('sum is 0 or 1');
    }
    let sum = 0;
    let p = 0;
    for(let i = 0; i < series.length; i++) {
        p = series[i][1] / inputSequence.length;
        sum += -p*Math.log(p);
    }
    sum /= Math.log(2);
    console.log(`entropy is: ${sum}`);
} catch (e) {
    if(!(e.message === 'sum is 0 or 1')) {
        showHelp();
        console.error(e.message);
    }
}

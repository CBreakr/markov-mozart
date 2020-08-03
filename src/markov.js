
export default function(length, matrix){
    const chain = [];

    // pick starting point
    let current = Math.floor(Math.random()*7);
    chain.push(current+1);

    for(let i = 1; i < length; i++){
        current = returnNext(matrix, current);
        chain.push(current+1);
    }

    return chain;
}

const returnNext = function(matrix, start){
    // pick out a index, weighted by probability
    const row = matrix[start];
    // actually, this is pretty straightforward since it's already normalized as probability

    let val = Math.floor(Math.random()*100)/100;

    for(let i = 0; i < row.length; i++){
        if(row[i] >= val){
            return i;
        }
        else{
            val -= row[i];
        }
    }
}


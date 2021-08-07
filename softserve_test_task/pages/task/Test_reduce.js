// TASK: `reduce(promise1, 3, 5, promise2, (memo, next) => { memo + next })`

const reducerReplacement = async (...data) => {
    let sum = 0
    await Promise.all(await [...data]).then(value => {
        sum += value
    })
        .catch(err => console.log(`Error in resolving sum with input data: ${data} - - ${err}`));
    return sum
}

const p1 = Promise.resolve(143134);
const p2 = 1337.49;
const p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 0, "sample");
});

reducerReplacement(p1, p2, p3).then(value => console.log(value))

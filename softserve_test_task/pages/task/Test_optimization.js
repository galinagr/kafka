const input = [1, 'a', true, null, {1: true}, [1, 2, 3], undefined]

const makeARandomNumber = function () {
    return Math.floor(Math.random() * 9);
}
const inputRandomized = (iter) => Array(iter).fill(0).map(makeARandomNumber)

const outputOptimized = async (iterCount, inputValues) => {
    if ((iterCount && inputValues) !== undefined && Number.isInteger(iterCount))
        try {
            let i = 0
            let p = []
            while (i < iterCount) {
                p[i] = await Promise.resolve(inputValues[i]);
                i++
            }
            await Promise.all([...p]).then(values => {
                console.log(values);
            })
                .catch(err => console.log(`Error in handling promise with counter: ${iterCount} - ${err}`));
        }
        catch (error) {
            throw new Error(`Please provide proper input values: ` +
                (iterCount === undefined && ' iterations count should be provided ') +
                (iterCount !== undefined && !Number.isInteger(iterCount) && 'iterations count should be integer ') +
                (inputValues === undefined && ' inputValues '))

        }
    return values
}


const timerMeasurements = async (timerName, count, inputData) => {
    console.time(timerName)
    await outputOptimized(count, inputData)
    console.timeEnd(timerName)
}

timerMeasurements('timerName-promise__all_random', 10, inputRandomized(10))
timerMeasurements('timerName-promise__all_array', 10, input)




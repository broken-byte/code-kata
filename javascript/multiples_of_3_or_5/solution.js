
function solution(number) {
    let sum = 0
    const mySet = new Set();
    for (let i = 1; i < number; i++) {
        if (mySet.has(i)) {
            continue
        } else if (i % 3 === 0 && i % 5 === 0) {
            mySet.add(i)
            sum += i
        } else if (i % 3 === 0 || i % 5 === 0) {
            sum += i
        }
    }
    return sum
}

module.exports = { solution };

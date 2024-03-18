export default function two_crystal_balls(breaks: boolean[]): number {
    const arrLen = breaks.length;
    const jump = Math.floor(Math.sqrt(arrLen));

    let i = jump;

    for (; i < arrLen; i += jump) {
        if (breaks[i]) {
            i -= jump;
            for (let stop = i * jump; i < stop; i++) {
                if (breaks[i]) {
                    return i;
                }
            }
        }
    }

    return -1;
}

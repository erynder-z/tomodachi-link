/**
 * Shuffles the elements of an array in-place using the Fisher-Yates (Knuth) shuffle algorithm.
 *
 * @param {any[]} array - The array to be shuffled.
 * @returns {any[]} - The same array after shuffling its elements.
 */
export const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};


export function unSortArray(answerArray: string[]): string[] {
    const unSortedArray = answerArray.sort(
        (a, b) => {
            return (Math.random() - 0.5);
        }
    );
    return [...unSortedArray];
}

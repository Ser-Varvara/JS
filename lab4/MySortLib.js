const SortLibrary = {
    prepareArray(arr) {
        const numbers = [];
        let undefinedCount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefinedCount++;
            } else if (typeof arr[i] === "number") {
                numbers.push(arr[i]);
            }
        }

        return {
            numbers,
            undefinedCount
        };
    },

    finalizeResult(sortedNumbers, undefinedCount, comparisons, swaps) {
        const resultArray = [...sortedNumbers];

        for (let i = 0; i < undefinedCount; i++) {
            resultArray.push(undefined);
        }

        return {
            sortedArray: resultArray,
            comparisons,
            swaps,
            hadUndefined: undefinedCount > 0
        };
    },

    compare(a, b, ascending = true) {
        return ascending ? a > b : a < b;
    },

    bubbleSort(arr, ascending = true) {
        const prepared = this.prepareArray(arr);
        const a = [...prepared.numbers];
        let comparisons = 0;
        let swaps = 0;

        for (let i = 0; i < a.length - 1; i++) {
            for (let j = 0; j < a.length - 1 - i; j++) {
                comparisons++;
                if (this.compare(a[j], a[j + 1], ascending)) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    swaps++;
                }
            }
        }

        return this.finalizeResult(a, prepared.undefinedCount, comparisons, swaps);
    },

    selectionSort(arr, ascending = true) {
        const prepared = this.prepareArray(arr);
        const a = [...prepared.numbers];
        let comparisons = 0;
        let swaps = 0;

        for (let i = 0; i < a.length - 1; i++) {
            let targetIndex = i;

            for (let j = i + 1; j < a.length; j++) {
                comparisons++;
                if (ascending ? a[j] < a[targetIndex] : a[j] > a[targetIndex]) {
                    targetIndex = j;
                }
            }

            if (targetIndex !== i) {
                [a[i], a[targetIndex]] = [a[targetIndex], a[i]];
                swaps++;
            }
        }

        return this.finalizeResult(a, prepared.undefinedCount, comparisons, swaps);
    },

    insertionSort(arr, ascending = true) {
        const prepared = this.prepareArray(arr);
        const a = [...prepared.numbers];
        let comparisons = 0;
        let swaps = 0;

        for (let i = 1; i < a.length; i++) {
            let key = a[i];
            let j = i - 1;

            while (j >= 0) {
                comparisons++;
                if (ascending ? a[j] > key : a[j] < key) {
                    a[j + 1] = a[j];
                    swaps++;
                    j--;
                } else {
                    break;
                }
            }

            a[j + 1] = key;
        }

        return this.finalizeResult(a, prepared.undefinedCount, comparisons, swaps);
    },

    shellSort(arr, ascending = true) {
        const prepared = this.prepareArray(arr);
        const a = [...prepared.numbers];
        let comparisons = 0;
        let swaps = 0;

        let gap = Math.floor(a.length / 2);

        while (gap > 0) {
            for (let i = gap; i < a.length; i++) {
                let temp = a[i];
                let j = i;

                while (j >= gap) {
                    comparisons++;
                    if (ascending ? a[j - gap] > temp : a[j - gap] < temp) {
                        a[j] = a[j - gap];
                        swaps++;
                        j -= gap;
                    } else {
                        break;
                    }
                }

                a[j] = temp;
            }

            gap = Math.floor(gap / 2);
        }

        return this.finalizeResult(a, prepared.undefinedCount, comparisons, swaps);
    },

    quickSort(arr, ascending = true) {
        const prepared = this.prepareArray(arr);
        const a = [...prepared.numbers];
        let comparisons = 0;
        let swaps = 0;

        const partition = (items, left, right) => {
            const pivot = items[Math.floor((left + right) / 2)];
            let i = left;
            let j = right;

            while (i <= j) {
                while (true) {
                    comparisons++;
                    if (ascending ? items[i] < pivot : items[i] > pivot) {
                        i++;
                    } else {
                        break;
                    }
                }

                while (true) {
                    comparisons++;
                    if (ascending ? items[j] > pivot : items[j] < pivot) {
                        j--;
                    } else {
                        break;
                    }
                }

                if (i <= j) {
                    [items[i], items[j]] = [items[j], items[i]];
                    swaps++;
                    i++;
                    j--;
                }
            }

            return i;
        };

        const quickSortRecursive = (items, left, right) => {
            if (left < right) {
                const index = partition(items, left, right);

                if (left < index - 1) {
                    quickSortRecursive(items, left, index - 1);
                }

                if (index < right) {
                    quickSortRecursive(items, index, right);
                }
            }
        };

        quickSortRecursive(a, 0, a.length - 1);

        return this.finalizeResult(a, prepared.undefinedCount, comparisons, swaps);
    }
};

function generateNormalArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
}

function generateSparseArray(size) {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        if (i % 10 !== 0) {
            arr[i] = Math.floor(Math.random() * 1000);
        }
    }
    return arr;
}

function addResult(title, result, originalArray) {
    const output = document.getElementById("output");

    const section = document.createElement("div");
    section.className = "section";

    const undefinedMessage = result.hadUndefined
        ? "Так, масив містив undefined-елементи."
        : "Ні, масив не містив undefined-елементів.";

    section.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Початковий масив:</strong></p>
        <pre>${JSON.stringify(originalArray)}</pre>
        <p><strong>Відсортований масив:</strong></p>
        <pre>${JSON.stringify(result.sortedArray)}</pre>
        <p><strong>Кількість порівнянь:</strong> ${result.comparisons}</p>
        <p><strong>Кількість обмінів / переміщень:</strong> ${result.swaps}</p>
        <p><strong>Наявність undefined:</strong> ${undefinedMessage}</p>
    `;

    output.appendChild(section);

    console.log(title, result);
}

function testAllSorts(array, arrayName) {
    addResult(
        `${arrayName} — Сортування обміну`,
        SortLibrary.bubbleSort(array, true),
        array
    );

    addResult(
        `${arrayName} — Сортування мінімальних елементів`,
        SortLibrary.selectionSort(array, true),
        array
    );

    addResult(
        `${arrayName} — Сортування вставок`,
        SortLibrary.insertionSort(array, true),
        array
    );

    addResult(
        `${arrayName} — Сортування Шелла`,
        SortLibrary.shellSort(array, true),
        array
    );

    addResult(
        `${arrayName} — Швидке сортування Хоара`,
        SortLibrary.quickSort(array, true),
        array
    );
}

const normalArray = generateNormalArray(100);
const sparseArray = generateSparseArray(100);

testAllSorts(normalArray, "Нерозріджений масив");
testAllSorts(sparseArray, "Розріджений масив");

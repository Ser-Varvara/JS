const MySortLib = {
    _prepareArray: function(arr) {
        let hasUndefined = false;
        const cleanArray = [];
        const undefinedIndices = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                hasUndefined = true;
                undefinedIndices.push(i);
            } else {
                cleanArray.push(arr[i]);
            }
        }

        if (hasUndefined) {
            console.warn(`Знайдено undefined елементи на індексах: ${undefinedIndices.join(', ')}`);
        }
        return cleanArray;
    },

    _logStats: function(methodName, comparisons, swaps) {
        console.log(`Метод: ${methodName} | Порівнянь: ${comparisons} | Обмінів: ${swaps}`);
    },

    bubbleSort: function(inputArr, ascending = true) {
        let arr = this._prepareArray(inputArr);
        let n = arr.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                if (ascending ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swaps++;
                }
            }
        }
        this._logStats("Обміну", comparisons, swaps);
        return arr;
    },

    selectionSort: function(inputArr, ascending = true) {
        let arr = this._prepareArray(inputArr);
        let n = arr.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            let minMaxIdx = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++;
                if (ascending ? arr[j] < arr[minMaxIdx] : arr[j] > arr[minMaxIdx]) {
                    minMaxIdx = j;
                }
            }
            if (minMaxIdx !== i) {
                [arr[i], arr[minMaxIdx]] = [arr[minMaxIdx], arr[i]];
                swaps++;
            }
        }
        this._logStats("Мінімальних елементів", comparisons, swaps);
        return arr;
    },

    insertionSort: function(inputArr, ascending = true) {
        let arr = this._prepareArray(inputArr);
        let n = arr.length;
        let comparisons = 0, moves = 0;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0) {
                comparisons++;
                if (ascending ? arr[j] > key : arr[j] < key) {
                    arr[j + 1] = arr[j];
                    moves++;
                    j--;
                } else break;
            }
            arr[j + 1] = key;
        }
        this._logStats("Вставок", comparisons, moves);
        return arr;
    },

    shellSort: function(inputArr, ascending = true) {
        let arr = this._prepareArray(inputArr);
        let n = arr.length;
        let comparisons = 0, swaps = 0;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;
                while (j >= gap) {
                    comparisons++;
                    if (ascending ? arr[j - gap] > temp : arr[j - gap] < temp) {
                        arr[j] = arr[j - gap];
                        swaps++;
                        j -= gap;
                    } else break;
                }
                arr[j] = temp;
            }
        }
        this._logStats("Шелла", comparisons, swaps);
        return arr;
    },

    quickSort: function(inputArr, ascending = true) {
        let arr = this._prepareArray(inputArr);
        let stats = { comparisons: 0, swaps: 0 };

        const sort = (a, low, high) => {
            if (low < high) {
                let p = partition(a, low, high);
                sort(a, low, p);
                sort(a, p + 1, high);
            }
        };

        const partition = (a, low, high) => {
            let pivot = a[Math.floor((low + high) / 2)];
            let i = low - 1;
            let j = high + 1;
            while (true) {
                do { i++; stats.comparisons++; } while (ascending ? a[i] < pivot : a[i] > pivot);
                do { j--; stats.comparisons++; } while (ascending ? a[j] > pivot : a[j] < pivot);
                if (i >= j) return j;
                [a[i], a[j]] = [a[j], a[i]];
                stats.swaps++;
            }
        };

        sort(arr, 0, arr.length - 1);
        this._logStats("Хоара", stats.comparisons, stats.swaps);
        return arr;
    }
};

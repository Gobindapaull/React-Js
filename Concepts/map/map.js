const arr = [1, 2, 3, 4, 5];

const callback = (element, index, a) => {
    console.log(`Element: ${element * element}, Index: ${index}, Array: ${a}`);
}

arr.map(callback);

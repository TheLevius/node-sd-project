const isString = (issue) => typeof issue === 'string';

const compareStrings = (leftString, rightString) => {

    if (!leftString || !rightString) return false;

    return leftString.toUpperCase() === rightString.toUpperCase()

};

const compareStringInArray = (itemString, arrayStrings) => {

    if (!itemString || !Array.isArray(arrayStrings)) return false;

    const itemStringHigh = itemString.toUpperCase();

    return arrayStrings.some((currentString) => itemStringHigh === currentString.toUpperCase());

};

module.exports = {
    isString,
    compareStrings,
    compareStringInArray
}
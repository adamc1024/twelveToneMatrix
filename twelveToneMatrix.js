"use strict";

// let palindromeRow = [0, 4, 7, 10, 2, 6, 9, 1, 5, 8, 11, 3]
const seedRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const shuffleArray = function (array) {
  let currentIndex, randomIndex;
  currentIndex = array.length;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const normalizeRow = function (array) {
  const normalizationValue = array[0];
  const normalizedArray = [];
  for (const item of array) {
    if (item - normalizationValue < 0) {
      normalizedArray.push(item - normalizationValue + 12);
    } else {
      normalizedArray.push(item - normalizationValue);
    }
  }
  return normalizedArray;
};

const convertNumMatrixToLetterMatrix = function (notebank) {
  if (twelveToneMatrix) {
    let finalArray = [];
    for (let row of twelveToneMatrix) {
      for (let item of row) {
        let note = notebank[item];
        finalArray.push(note);
      }
    }
    for (let i = 0; i < finalArray.length; i++) {
      document.querySelectorAll(".note")[i].textContent = finalArray[i];
    }
  }
};

const numToNoteFlats = {
  0: "C",
  1: "D♭",
  2: "D",
  3: "E♭",
  4: "E",
  5: "F",
  6: "G♭",
  7: "G",
  8: "A♭",
  9: "A",
  10: "B♭",
  11: "B",
};

const numToNoteSharps = {
  0: "C",
  1: "C♯",
  2: "D",
  3: "D♯",
  4: "E",
  5: "F",
  6: "F♯",
  7: "G",
  8: "G♯",
  9: "A",
  10: "A♯",
  11: "B",
};

const numToSubscript = {
  0: "₀",
  1: "₁",
  2: "₂",
  3: "₃",
  4: "₄",
  5: "₅",
  6: "₆",
  7: "₇",
  8: "₈",
  9: "₉",
  10: "₁₀",
  11: "₁₁",
};

const makeNumToNoteMixed = function () {
  let result = {};
  for (let i = 0; i < 12; i++) {
    let sharpOrFlat = Math.floor(Math.random() * 2);
    let note;
    if (sharpOrFlat === 0) {
      note = numToNoteFlats[i];
    } else if (sharpOrFlat === 1) {
      note = numToNoteSharps[i];
    }
    result[i] = note;
  }
  return result;
};

let numToNoteMixed = makeNumToNoteMixed();

let twelveToneMatrix;

const gridCellButtons = document.querySelectorAll(".grid-cell-btn");

const resetGridBorders = function () {
  for (let item of gridCellButtons) {
    item.style.borderColor = "#4f4f4f";
  }
  for (let item of document.querySelectorAll(".note")) {
    item.style.borderColor = "#4f4f4f";
  }
};

document
  .querySelector(".btn-new-matrix")
  .addEventListener("click", function () {
    resetGridBorders();
    let primeRow = shuffleArray(seedRow);
    const inversionRow = [primeRow[0]];
    const intervals = [];
    for (let i = 0; i < primeRow.length - 1; i++) {
      let interval = primeRow[i + 1] - primeRow[i];
      if (interval < 0) {
        interval += 12;
      }
      intervals.push(interval);
      let invertedNote = inversionRow[inversionRow.length - 1] - interval;
      if (invertedNote < 0) {
        invertedNote += 12;
      }
      inversionRow.push(invertedNote);
    }
    const normalizedPrime = normalizeRow(primeRow);
    const normalizedInversion = normalizeRow(inversionRow);
    twelveToneMatrix = [];
    for (let item of inversionRow) {
      let tempArr = [];
      tempArr.push(item);
      for (let interval of intervals) {
        let nextNote = tempArr[tempArr.length - 1] + interval;
        if (nextNote > 11) {
          nextNote -= 12;
        }
        tempArr.push(nextNote);
      }
      twelveToneMatrix.push(tempArr);
    }
    let finalArray = [];
    for (let row of twelveToneMatrix) {
      for (let item of row) {
        let note = numToNoteMixed[item];
        finalArray.push(note);
      }
    }
    for (let i = 0; i < finalArray.length; i++) {
      document.querySelectorAll(".note")[i].textContent = finalArray[i];
    }
    for (let i = 0; i < 12; i++) {
      let pVal = normalizedPrime[i];
      let iVal = normalizedInversion[i];
      document.querySelectorAll(".i-label")[
        i
      ].textContent = `I${numToSubscript[pVal]}`;
      document.querySelectorAll(".ri-label")[
        i
      ].textContent = `RI${numToSubscript[pVal]}`;
      document.querySelectorAll(".p-label")[
        i
      ].textContent = `P${numToSubscript[iVal]}`;
      document.querySelectorAll(".r-label")[
        i
      ].textContent = `R${numToSubscript[iVal]}`;
    }
    document
      .querySelector(".btn-all-flats")
      .addEventListener("click", function () {
        convertNumMatrixToLetterMatrix(numToNoteFlats);
      });

    document
      .querySelector(".btn-all-sharps")
      .addEventListener("click", function () {
        convertNumMatrixToLetterMatrix(numToNoteSharps);
      });

    document
      .querySelector(".btn-random")
      .addEventListener("click", function () {
        convertNumMatrixToLetterMatrix(makeNumToNoteMixed());
      });
    for (const gridCellButton of gridCellButtons) {
      gridCellButton.addEventListener("click", function () {
        const rowType = gridCellButton.id.slice(0, 2);
        const number = gridCellButton.id.slice(2);
        const resultRow = [];
        const buttonKey = {
          pr: "p-label",
          re: "r-label",
          in: "i-label",
          ri: "ri-label",
        };
        for (let item of gridCellButtons) {
          item.style.borderColor = "#4f4f4f";
        }
        for (let item of document.querySelectorAll(".note")) {
          item.style.borderColor = "#4f4f4f";
        }
        resetGridBorders();
        this.style.borderColor = "#00f0ff";
        if (rowType === "in" || rowType === "ri") {
          for (let item of document.querySelectorAll(`.col-${number}`)) {
            resultRow.push(item.textContent);
            item.style.borderColor = "#00f0ff";
          }
        } else if (rowType === "pr" || rowType === "re") {
          for (let item of document.querySelectorAll(`.row-${number}`)) {
            resultRow.push(item.textContent);
            item.style.borderColor = "#00f0ff";
          }
        }
        if (rowType === "re" || rowType === "ri") {
          resultRow.reverse();
        }
      });
    }
  });

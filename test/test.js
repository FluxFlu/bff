const fs = require("fs");
const path = require("path");
const { fromPlaintext, toPlaintext, toInstructionList } = require("../src/index");
const { instructionToChar } = require("../src/instruction_list/instruction_set");

const fileNames = fs.readdirSync(path.join(__dirname, "/testPrograms"));

const files = fileNames.map(e => fs.readFileSync(path.join(__dirname, "/testPrograms/", e)).toString());

let out = [];

const maxFilenameSize = fileNames.reduce((a, b) => a.length > b.length ? a : b).length - 2;

let isFailure = false;

function padTestId(test) {
    let str = "";
    let num = maxFilenameSize - test.length + (isFailure ? 2 : 0);
    while (num--)
        str += " ";
    return " " + test + str;
}

function endLog() {
    for (let i = 0; i < out.length; i++) {
        out[i]();
    }
    if (!isFailure) {
        console.error("\n\n\x1b[7m " + out.length + " \x1b[0;44m TESTS PASSING \x1b[0m");
    }
}

function logSuccess(test) {
    console.error("\x1b[0;44m TEST PASSED \x1b[0m\x1b[7m" + padTestId(test) + "​\x1b[0m");
}

function logFailure(test, expected, received) {
    console.error("\x1b[0;44m TEST FAILED \x1b[0m\x1b[0;41m" + padTestId(test) + "​\x1b[0m");
    console.error("+ EXPECTED:", expected);
    console.error("- RECEIVED:", received);
    console.error("");
}

for (let i = 0; i < files.length; i++) {
    files[i] = files[i].replaceAll(/[^[\]+\-,.<>]/g, "");
    fileNames[i] = fileNames[i].slice(0, -3);
    const buffer = fromPlaintext(files[i]);
    if (files[i] == toPlaintext(buffer)) {
        const instructionList = toInstructionList(buffer);
        if (files[i] == instructionList.map(e => instructionToChar.get(e)).join("")) {
            out.push(() => logSuccess(fileNames[i]));
        } else {
            isFailure = true;
            out.push(() => logSuccess(fileNames[i]));
            out.push(() => logFailure(fileNames[i] + ": b", files[i], instructionList.map(e => instructionToChar.get(e)).join("")));
        }
    } else {
        isFailure = true;
        out.push(() => logFailure(fileNames[i] + ": a", files[i], toPlaintext(buffer)));
    }
}

endLog();
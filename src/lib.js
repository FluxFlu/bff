const { initConvert } = require("./from_plaintext/init_compress");
const { squashMultiples } = require("./from_plaintext/squash_multiples");
const { squashSet } = require("./from_plaintext/squash_set");
const { charToInstruction } = require("./instruction_list/instruction_set");
const { toPlaintext } = require("./to_plaintext/to_plaintext");

const Brain = {
    fromPlaintext(text) {
        text = text.replaceAll(/[^[\]+\-,.<>]/g, "");
        text = initConvert(text);
        text = squashMultiples(text);
        text = squashSet(text);
        return Buffer.concat([Buffer.from("BFF:", "utf-8"), text]);
    },
    toPlaintext(buffer) {
        if (buffer.slice(0, 4).toString() !== "BFF:") {
            console.log(buffer.slice(0, 4));
            throw "File is not in the BFF file format.";
        }
        buffer = toPlaintext(buffer.slice(4));
        return buffer;
    },
    toInstructionList(buffer) {
        buffer = toPlaintext(buffer.slice(4)).split("").map(e => charToInstruction.has(e) ? charToInstruction.get(e) : "");
        return buffer;
    }
};

module.exports = Brain;
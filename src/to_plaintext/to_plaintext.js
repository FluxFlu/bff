const { instructionToChar } = require("../instruction_list/instruction_set");
const { getInstr } = require("../utils/buffer");

const map = instructionToChar;

function toPlaintext(buffer) {
    let str = "";
    for (let i = 0; i < buffer.length * 2; i++) {
        if (getInstr(buffer, i) === 0)
            break;

        if (getInstr(buffer, i) === 0b1001) {
            i++;
            let num = getInstr(buffer, i) * 0b00010000;
            i++;
            num += getInstr(buffer, i);
            i++;
            while (num--)
                str += map.get(getInstr(buffer, i));
        } else if (getInstr(buffer, i) == 0b1010) {
            str += "[-]";
        } else {
            str += map.get(getInstr(buffer, i));
        }
    }
    return str;
}

module.exports = { toPlaintext };
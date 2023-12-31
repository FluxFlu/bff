const { charToInstruction } = require("../instruction_list/instruction_set");

const map = charToInstruction;

function initConvert(file) {
    const out = Buffer.alloc(Math.ceil(file.length / 2));
    let offset = 0;
    for (let i = 0; i < file.length; i++) {
        if (!map.has(file[i]))
            continue;

        if (i % 2 == 0) {
            out[offset] = map.get(file[i]) << 4;
        } else if (i % 2 == 1) {
            out[offset] = out[offset] + (map.get(file[i]));
            offset++;
        }
    }
    return out;
}

module.exports = { initConvert };
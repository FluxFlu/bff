const { getInstr, setInstr } = require("../utils/buffer");

function squashSet (buffer) {
    const out = Buffer.alloc(buffer.length);
    let outIndex = 0;
    for (let i = 0; i < buffer.length * 2; i++) {
        const instr = getInstr(buffer, i);
        if (instr === 0 && getInstr(buffer, i - 1) !== 0b1001 && getInstr(buffer, i - 2) !== 0b1001)
            break;
        if (instr == 0b0101/* [ */ && getInstr(buffer, i + 1) == 0b0010/* - */ && getInstr(buffer, i + 2) == 0b0110/* ] */ ) {
            setInstr(out, outIndex, 0b1010);
            i += 2;
        } else {
            setInstr(out, outIndex, instr);
        }
        outIndex++;
    }
    if (out.indexOf(0) !== -1)
        return out.subarray(0, out.indexOf(0));
    return out;
}

module.exports = { squashSet };
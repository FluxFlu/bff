const { getInstr, setInstr } = require("../utils/buffer");

function squashMultiples (buffer) {
    const out = Buffer.alloc(buffer.length);
    let outIndex = 0;
    for (let i = 0; i < buffer.length * 2; i++) {
        const instr = getInstr(buffer, i);
        if (instr === 0)
            break;
        if (instr == getInstr(buffer, i + 1) && getInstr(buffer, i + 1) == getInstr(buffer, i + 2) && getInstr(buffer, i + 2) == getInstr(buffer, i + 3)) {
            setInstr(out, outIndex, 0b1001);
            outIndex++;
            const locationOfFin = outIndex;
            outIndex += 2;
            setInstr(out, outIndex, instr);
            let count = 3;
            i += 3;
            while (count < 255 && getInstr(buffer, i) && getInstr(buffer, i) == instr)
                i++, count++;
            i--;
            setInstr(out, locationOfFin, count >> 4);
            setInstr(out, locationOfFin + 1, count & 0b00001111);
            // out[locationOfFin] = count;
        } else {
            setInstr(out, outIndex, instr);
        }
        outIndex++;
    }
    if (out.indexOf(0) !== -1)
        return out.subarray(0, out.indexOf(0));
    return out;
}

module.exports = { squashMultiples };
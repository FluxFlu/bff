function getInstr(buffer, index) {
    if (index % 2 == 0) {
        return buffer[~~(index / 2)] >> 4;
    } else {
        return buffer[~~(index / 2)] & 0b00001111;
    }
}

function setInstr(buffer, index, instr) {
    if (index % 2 == 0) {
        buffer[~~(index / 2)] = buffer[~~(index / 2)] | (instr << 4);
    } else {
        buffer[~~(index / 2)] = buffer[~~(index / 2)] | instr;
    }
}


module.exports = { getInstr, setInstr };
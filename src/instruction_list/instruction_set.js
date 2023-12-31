const instructionSet = {
    PLUS:           1,
    MINUS:          2,
    LEFT:           3,
    RIGHT:          4,
    START_LOOP:     5,
    END_LOOP:       6,
    INPUT:          7,
    OUTPUT:         8,
};

const charToInstruction = new Map([
    ["+", 0b0001],
    ["-", 0b0010],
    ["<", 0b0011],
    [">", 0b0100],
    ["[", 0b0101],
    ["]", 0b0110],
    [",", 0b0111],
    [".", 0b1000],
]);

const instructionToChar = new Map([
    [0b0001, "+"],
    [0b0010, "-"],
    [0b0011, "<"],
    [0b0100, ">"],
    [0b0101, "["],
    [0b0110, "]"],
    [0b0111, ","],
    [0b1000, "."],
]);

module.exports = { instructionSet, charToInstruction, instructionToChar };
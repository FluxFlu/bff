const fs = require("fs");
const path = require("path");
const { fromPlaintext, toPlaintext } = require("./lib");

function main() {
    const args = process.argv.map(e => e.toLowerCase());
    args.shift();
    args.shift();
    
    if (args.length == 0 || args.includes("--help") || args.includes("-h")) {
        console.log(require("./utils/help"));
        process.exit(0);
    }

    let out;
    let filename;
    let type;

    for (let i = 0; i < args.length; i++) {
        if (args[i] == "-o" || args[i] == "--help") {
            out = args[i + 1];
            i++;
        } else if (args[i] == "--compress" || args[i] == "-d") {
            if (type) {
                console.error("ERROR: Specified both compression and decompression.");
                process.exit(1);
            }
            type = "compress";
        } else if (args[i] == "--decompress" || args[i] == "-d") {
            if (type) {
                console.error("ERROR: Specified both compression and decompression.");
                process.exit(1);
            }
            type = "decompress";
        } else {
            if (filename) {
                console.error("ERROR: Specified filename twice: both [" + filename + "] and [" + args[i] + "].");
                process.exit(1);
            }
            filename = args[i];
        }
    }

    if (!type) {
        console.error("ERROR: Type unspecified. Specify either `--compress` or `--decompress`.");
        process.exit(1);
    }

    if (!out) {
        if (type == "compress") {
            out = path.basename(filename.slice(0, filename.lastIndexOf(".")) + ".bff");
        } else {
            out = path.basename(filename.slice(0, filename.lastIndexOf(".")) + ".bf");
        }
    }

    if (!fs.existsSync(filename)) {
        console.error("ERROR: File [" + filename + "] does not exist.");
    }

    if (type == "compress") {
        fs.writeFileSync(out, fromPlaintext(fs.readFileSync(filename, "utf-8").toString()), "utf-8");
    } else {
        fs.writeFileSync(out, toPlaintext(fs.readFileSync(filename)));
    }
}

module.exports = { main };
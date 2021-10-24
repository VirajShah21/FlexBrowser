const path = require('path');
const os = require('os');
const fs = require('fs');

const logs = [];

/**
 * Dedents a string, allowing for the use of es6 formatted strings while
 * preserving **intended** identation. This will take the first line
 * with non-space text and detects the indentation from only that line.
 * Then the rest of the string will be unshifted that amount.
 *
 * @param {any} str The string to dedent.
 * @returns The unindented string.
 */
function dedent(str) {
    const lines = str.split('\n');
    let indent = 0;
    for (const line of lines) {
        if (line.trim().length > 0) {
            for (let i = 0; i < line.length; i++) {
                if (line[i] === ' ') {
                    indent++;
                } else {
                    return indent;
                }
            }
        }
    }
    return indent;
}

exports.error = msg => logs.push({ m: dedent(msg), l: 0 });

exports.warn = msg => logs.push({ m: dedent(msg), l: 1 });

exports.info = msg => logs.push({ m: dedent(msg), l: 2 });

exports.debug = msg => logs.push({ m: dedent(msg), l: 3 });

exports.initializeLogger = () => {
    setInterval(() => {
        const length = logs.length;
        const toWrite = logs.splice(0, length);
        let out = '';
        for (let i = 0; i < length; i++) {
            switch (toWrite[i].l) {
                case 0:
                    out += '[ERROR]  ';
                    break;
                case 1:
                    out += '[WARN]  ';
                    break;
                case 2:
                    out += '[INFO]  ';
                    break;
                case 3:
                    out += '[DEBUG] ';
                    break;
                default:
                    out += '[LOG]   ';
            }
            out += `${new Date()}: ${toWrite[i].m}\n`;
        }
        fs.appendFileSync(
            path.join(path.join(os.homedir(), '.flex.logs')),
            out,
        );
    }, 3000);
};

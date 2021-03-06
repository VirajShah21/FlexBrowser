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
 * @param {string} str The string to dedent.
 * @returns {string} The unindented string.
 */
function dedent(str) {
    if (!str.includes('\n')) return str.trim();
    const lines = str.split('\n');
    let indent = 0;
    let fline = 0; // first line of text
    for (const lnum in lines) {
        const line = lines[lnum];
        if (lines[lnum].trim().length > 0) {
            fline = lines.indexOf(line);
            for (let i = 0; i < line.length; i++) {
                if (line[i] === ' ') {
                    indent++;
                } else {
                    break;
                }
            }
            break;
        }
    }
    lines.splice(0, fline);
    return lines.map(line => line.substring(indent)).join('\n');
}

exports.dedent = dedent;

exports.error = msg => logs.push({ m: dedent(msg), l: 0, t: new Date() });

exports.warn = msg => logs.push({ m: dedent(msg), l: 1, t: new Date() });

exports.info = msg => logs.push({ m: dedent(msg), l: 2, t: new Date() });

exports.debug = msg => logs.push({ m: dedent(msg), l: 3, t: new Date() });

function initializeLogger() {
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
            out += `${toWrite[i].t}: ${toWrite[i].m}\n`;
        }
        fs.appendFileSync(
            path.join(path.join(os.homedir(), '.flex.logs')),
            out,
        );
    }, 3000);
}

initializeLogger();

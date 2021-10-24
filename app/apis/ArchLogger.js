const path = require('path');
const os = require('os');
const fs = require('fs');

const logs = [];

exports.error = msg => logs.push({ m: msg, l: 0 });

exports.warn = msg => logs.push({ m: msg, l: 1 });

exports.info = msg => logs.push({ m: msg, l: 2 });

exports.debug = msg => logs.push({ m: msg, l: 3 });

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

const path = require('path');
const os = require('os');
const fs = require('fs');

const logs = [];

function error(msg) {
    logs.push({ m: msg, l: 0 });
}

function warn(msg) {
    logs.push({ m: msg, l: 1 });
}

function info(msg) {
    logs.push({ m: msg, l: 2 });
}

function debug(msg) {
    logs.push({ m: msg, l: 3 });
}

function init() {
    setInterval(() => {
        const length = logs.length;
        let out = '';
        for (let i = 0; i < length; i++) {
            switch (logs[i]) {
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
            out += `${new Date()}: ${logs[i].msg}\n`;
        }
        fs.writeFileSync(path.join(path.join(os.homedir(), '.flex.logs')), out);
    }, 1000);
}

export { error, warn, info, debug };

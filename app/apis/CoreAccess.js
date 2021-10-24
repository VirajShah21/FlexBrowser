const fs = require('fs');
const path = require('path');
const HOMEDIR = require('os').homedir();
const { info, warn, error } = require('./ArchLogger.js');

/**
 * @returns The flex runcome file in JSON format
 */
exports.readRC = () => {
    try {
        const text = fs.readFileSync(
            path.join(HOMEDIR, '.flexrc.json'),
            'utf-8',
        );
        return JSON.parse(text);
    } catch (e) {
        error('Error reading/parsing RC File.');
        return null;
    }
};

exports.writeRC = data => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flexrc.json'),
        JSON.stringify(data, null, 4),
    );
};

/**
 * Reads the bookmarks file
 *
 * @returns The URLMeta[] of bookmarks from the bookmarks file.
 *
 */
exports.readBookmarksFile = () => {
    try {
        return JSON.parse(
            fs.readFileSync(
                path.join(HOMEDIR, '.flex-bookmarks.json'),
                'utf-8',
            ),
        );
    } catch (e) {
        warn('Error reading/parsing bookmarks file.');
        return [];
    }
};

/**
 * Write to the bookmarks file.
 *
 * @param bookmarks The `URLMeta[]` to save to `~/.flex-bookmarks.json`.
 *
 */
exports.writeBookmarksFile = bookmarks => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-bookmarks.json'),
        JSON.stringify(bookmarks, null, 4),
    );
};

exports.readBrandingRegistry = () => {
    try {
        return JSON.parse(
            fs.readFileSync(path.join(HOMEDIR, '.flex-branding.json'), 'utf-8'),
        );
    } catch (e) {
        error('Error reading/parsing branding registry.');
        return {};
    }
};

exports.writeBrandingRegistry = registry => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-branding.json'),
        JSON.stringify(registry, null, 4),
    );
};

exports.readHistoryFile = () => {
    try {
        return JSON.parse(
            fs.readFileSync(path.join(HOMEDIR, '.flex-history.json'), 'utf-8'),
        );
    } catch (e) {
        error('Error reading/parsing history file.');
        return [];
    }
};

exports.writeHistoryFile = history => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-history.json'),
        JSON.stringify(history, null, 4),
    );
};

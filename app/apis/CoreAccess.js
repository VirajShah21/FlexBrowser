const fs = require('fs');
const path = require('path');
const HOMEDIR = require('os').homedir();
const { info, warn } = require('./ArchLogger.js');

/**
 * @returns The flex runcome file in JSON format
 */
const readRC = (exports.readRC = () => {
    try {
        const text = fs.readFileSync(
            path.join(HOMEDIR, '.flexrc.json'),
            'utf-8',
        );
        info('Read RC File.');
        return JSON.parse(text);
    } catch (e) {
        info('Error reading/parsing RC File.');
        return null;
    }
});

const writeRC = (exports.writeRC = data => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flexrc.json'),
        JSON.stringify(data, null, 4),
    );
    info('Finished writing RC File');
});

/**
 * Reads the bookmarks file
 *
 * @returns The URLMeta[] of bookmarks from the bookmarks file.
 *
 */
const readBookmarksFile = (exports.readBookmarksFile = () => {
    try {
        info('Reading bookmarks File.');
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
});

/**
 * Write to the bookmarks file.
 *
 * @param bookmarks The `URLMeta[]` to save to `~/.flex-bookmarks.json`.
 *
 */
const writeBookmarksFile = (exports.writeBookmarksFile = bookmarks => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-bookmarks.json'),
        JSON.stringify(bookmarks, null, 4),
    );
    info('Finished writing bookmarks file.');
});

const readBrandingRegistry = (exports.readBrandingRegistry = () => {
    try {
        info('Reading branding registry.');
        return JSON.parse(
            fs.readFileSync(path.join(HOMEDIR, '.flex-branding.json'), 'utf-8'),
        );
    } catch (e) {
        warn('Error reading/parsing branding registry.');
        return {};
    }
});

const writeBrandingRegistry = (exports.writeBrandingRegistry = registry => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-branding.json'),
        JSON.stringify(registry, null, 4),
    );
    info('Finished writing branding registry');
});

const readHistoryFile = (exports.readHistoryFile = () => {
    try {
        info('Reading history file');
        return JSON.parse(
            fs.readFileSync(path.join(HOMEDIR, '.flex-history.json'), 'utf-8'),
        );
    } catch (e) {
        warn('Error reading/parsing history file.');
        return [];
    }
});

const writeHistoryFile = (exports.writeHistoryFile = history => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-history.json'),
        JSON.stringify(history, null, 4),
    );
    info('Finished writing history file.');
});

const { describe, beforeEach } = require('mocha');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { readBookmarksFile, writeBookmarksFile } = require('../../app');
const expect = require('chai').expect;

const HOMEDIR = os.homedir();
const BACKUP = path.join(HOMEDIR, '.flex-bookmarks.backup.json');
const BMFile = path.join(HOMEDIR, '.flex-bookmarks.json');

function storeBackupOfBookmarks() {
    if (fs.existsSync(BMFile)) fs.renameSync(BMFile, BACKUP);
}

function restoreBackupOfBookmarks() {
    if (fs.existsSync(BMFile)) fs.rmSync(BMFile);
    if (fs.existsSync(BACKUP)) fs.renameSync(BACKUP, BMFile);
}

describe('Main Process: Bookmarks', () => {
    beforeEach(() => storeBackupOfBookmarks());

    it('Should attempt to read non-existent bookmarks', () => {
        expect(readBookmarksFile()).to.eql(
            [],
            'Should have produced an empty array',
        );
    });

    it('Should write, then read an array of bookmarks', () => {
        const bookmarks = [
            {
                url: 'https://google.com',
                title: 'Google',
            },
            {
                url: 'https://facebook.com',
                title: 'Facebook',
            },
        ];
        writeBookmarksFile(bookmarks);
        const saved = fs.readFileSync(BMFile, 'utf8');
        expect(saved).to.equal(JSON.stringify(bookmarks));
    });

    afterEach(() => restoreBackupOfBookmarks());
});

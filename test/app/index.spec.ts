import { describe, beforeEach } from 'mocha';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { expect } from 'chai';
import { readBookmarksFile, writeBookmarksFile } from '../../app';

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

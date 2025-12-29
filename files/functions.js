const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

function writeFileSync(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
}
async function writeFileAsync(filePath, content) {
    await fsPromises.writeFile(filePath, content, 'utf8');
}

function readFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}
async function readFileAsync(filePath) {
    return await fsPromises.readFile(filePath, 'utf8');
}

function updateFileSync(filePath, newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
}
async function updateFileAsync(filePath, newContent) {
    await fsPromises.writeFile(filePath, newContent, 'utf8');
}

function clearFileSync(filePath) {
    fs.writeFileSync(filePath, '', 'utf8');
}
async function clearFileAsync(filePath) {
    await fsPromises.writeFile(filePath, '', 'utf8');
}

function cleanNoiseSync(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/[0-9]/g, '').replace(/[A-ZА-ЯЁ]/g, c => c.toLowerCase());
    fs.writeFileSync(filePath, content, 'utf8');
}
async function cleanNoiseAsync(filePath) {
    let content = await fsPromises.readFile(filePath, 'utf8');
    content = content.replace(/[0-9]/g, '').replace(/[A-ZА-ЯЁ]/g, c => c.toLowerCase());
    await fsPromises.writeFile(filePath, content, 'utf8');
}

function copyFileSync(src, dest) {
    fs.copyFileSync(src, dest);
}
async function copyFileAsync(src, dest) {
    await fsPromises.copyFile(src, dest);
}

function createFolderSync(folderPath) {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
}
async function createFolderAsync(folderPath) {
    await fsPromises.mkdir(folderPath, { recursive: true });
}

function deleteFolderSync(folderPath) {
    if (fs.existsSync(folderPath)) fs.rmSync(folderPath, { recursive: true, force: true });
}
async function deleteFolderAsync(folderPath) {
    await fsPromises.rm(folderPath, { recursive: true, force: true });
}

function listFilesSync(basePath) {
    const exclude = ['node_modules', '.env', '.git'];
    const result = [];

    function walk(dir) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (exclude.includes(item)) continue;
            if (stat.isDirectory()) walk(fullPath);
            else result.push(fullPath);
        }
    }
    walk(basePath);
    return result;
}
async function listFilesAsync(basePath) {
    const exclude = ['node_modules', '.env', '.git'];
    const result = [];

    async function walk(dir) {
        const items = await fsPromises.readdir(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = await fsPromises.stat(fullPath);
            if (exclude.includes(item)) continue;
            if (stat.isDirectory()) await walk(fullPath);
            else result.push(fullPath);
        }
    }

    await walk(basePath);
    return result;
}

function cleanProjectSync(basePath) {
    const exclude = ['node_modules', '.env', '.git'];

    function walk(dir) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            if (exclude.includes(item)) continue;
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) fs.rmSync(fullPath, { recursive: true, force: true });
            else fs.unlinkSync(fullPath);
        }
    }

    walk(basePath);
}
async function cleanProjectAsync(basePath) {
    const exclude = ['node_modules', '.env', '.git'];

    async function walk(dir) {
        const items = await fsPromises.readdir(dir);
        for (const item of items) {
            if (exclude.includes(item)) continue;
            const fullPath = path.join(dir, item);
            const stat = await fsPromises.stat(fullPath);
            if (stat.isDirectory()) await fsPromises.rm(fullPath, { recursive: true, force: true });
            else await fsPromises.unlink(fullPath);
        }
    }

    await walk(basePath);
}

module.exports = {
    writeFileSync, writeFileAsync,
    readFileSync, readFileAsync,
    updateFileSync, updateFileAsync,
    clearFileSync, clearFileAsync,
    cleanNoiseSync, cleanNoiseAsync,
    copyFileSync, copyFileAsync,
    createFolderSync, createFolderAsync,
    deleteFolderSync, deleteFolderAsync,
    listFilesSync, listFilesAsync,
    cleanProjectSync, cleanProjectAsync
};

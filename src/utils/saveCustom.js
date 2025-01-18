/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.development' });
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("process.env.SITE_URL: ", process.env.SITE_URL);

const CUSTOM_SITES_DIR = process.env.CUSTOM_SITES_DIR;
if (!CUSTOM_SITES_DIR) {
    console.error('\x1b[31m%s\x1b[0m', "CUSTOM_SITES_DIR is not defined in the environment variables.");
    process.exit(1);
}
const SITE_URL = process.env.SITE_URL || "default";
const NEXT_PUBLIC_CONTENT_VERSION = process.env.NEXT_PUBLIC_CONTENT_VERSION || "undefined";
const DEST_DIR = path.join(CUSTOM_SITES_DIR, SITE_URL, NEXT_PUBLIC_CONTENT_VERSION);
const SOURCE_DIR = path.resolve("./");


console.log('\x1b[36m%s\x1b[0m', `Copying files from \x1b[33m${SOURCE_DIR}\x1b[36m to \x1b[32m${DEST_DIR}\x1b[36m`);


// Ensure the source directory exists
if (!fs.existsSync(SOURCE_DIR) || !fs.lstatSync(SOURCE_DIR).isDirectory()) {
    console.error(`Source directory does not exist: ${SOURCE_DIR}`);
    process.exit(1);
}

// Create the destination directory if it does not exist
if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Patterns to copy
const patterns = [
    ".env.development",
    ".env.production",
    ".env.development.local",
    "package.json",
    "package-lock.json",
    "public/",
    "src/components/presentation/context/",
    "src/components/presentation/_custom/",
    "src/components/transformation/_custom/",
    "src/components/extraction/_custom/",
    "src/styles/custom.css",
    "src/styles/_custom/",
    "src/types/custom-types.d.ts",
    "src/types/cf-type.d.ts",
    "src/types/cf-types.ts"
];

// Create directories in the destination path if they don't exist
patterns.forEach(pattern => {
    if (pattern.endsWith('/')) {
        const dirPath = path.join(DEST_DIR, pattern);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
});

console.log("Starting copy process...");

patterns.forEach(pattern => {
    const srcPath = path.join(SOURCE_DIR, pattern);
    const destPath = path.join(DEST_DIR, pattern);
    if (fs.existsSync(srcPath)) {
        if (fs.lstatSync(srcPath).isDirectory()) {
            execSync(`cp -r ${srcPath} ${destPath}`);
        } else {
            // Ensure the destination directory exists before copying the file
            const destDir = path.dirname(destPath);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            fs.copyFileSync(srcPath, destPath);
        }
        console.log(`Copied: ${pattern}`);
    } else {
        console.warn(`Source path does not exist: ${srcPath}`);
    }
});

console.log('\x1b[32m%s\x1b[0m', "Copy process completed.");
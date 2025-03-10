/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config({ path: ".env.production" });
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const SITE_URL = process.env.SITE_URL;
if (!SITE_URL) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "SITE_URL is not defined in the local .env.production."
  );
  process.exit(1);
}

const SOURCE_DIR = path.resolve("./out/");

console.log(
  "\x1b[36m%s\x1b[0m",
  `Syncing files from \x1b[33m${SOURCE_DIR}\x1b[36m to \x1b[32m${SITE_URL}\x1b[36m`
);

console.log("Starting sync process...");

const srcPath = SOURCE_DIR;

// Create a date string for the backup
const now = new Date();
const dateStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
const bakPath = `${SITE_URL}/${dateStr}`;

// Backup the destination directory
const backupDir = `/Users/philipbuntine/git-projects/old-sites/${bakPath}`;
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
console.log(`aws s3 cp s3://${SITE_URL} ${backupDir} --recursive`);

execSync(`aws s3 cp s3://${SITE_URL} ${backupDir} --recursive`);

// Copy /out/. to the remote server
if (fs.existsSync(srcPath)) {
  // Call the AWS CLI to copy the directory using the command:
  //  aws s3 sync . s3://DEST_DIR --delete
  try {
    execSync(`aws s3 sync ${srcPath} s3://${SITE_URL} --delete`);
    console.log(`Synced: ${SITE_URL}`);
  } catch (error) {
    console.error(`Failed to sync: ${SITE_URL}`, error);
  }
  return;
}


// To create an AWS CLI command for invalidating an Amazon CloudFront distribution, use the following command: 
// aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
console.log("\x1b[32m%s\x1b[0m", "Sync process completed.");

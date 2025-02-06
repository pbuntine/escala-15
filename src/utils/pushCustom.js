/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config({ path: ".env.development" });
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const ESC_REMOTE_SERVER = process.env.ESC_REMOTE_SERVER;
if (!ESC_REMOTE_SERVER) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "ESC_REMOTE_SERVER is not defined in the local environment variables."
  );
  process.exit(1);
}

const SITE_SUBDIR = process.env.SITE_SUBDIR;
if (!SITE_SUBDIR) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "SITE_SUBDIR is not defined in the local environment variables."
  );
  process.exit(1);
}

const DEV_SITES_DIR = execSync(
  `ssh ${ESC_REMOTE_SERVER} printenv DEV_SITES_DIR`
)
  .toString()
  .trim();

if (!DEV_SITES_DIR) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "DEV_SITES_DIR is not defined in the remote environment variables."
  );
  process.exit(1);
}

const DEST_DIR = `${ESC_REMOTE_SERVER}:${path.join(DEV_SITES_DIR, SITE_SUBDIR)}`;
const SOURCE_DIR = path.resolve("./");

console.log(
  "\x1b[36m%s\x1b[0m",
  `Syncing files from \x1b[33m${SOURCE_DIR}\x1b[36m to \x1b[32m${DEST_DIR}\x1b[36m`
);

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
  "src/types/cf-types.ts",
];

console.log("Starting sync process...");

patterns.forEach((pattern) => {
  const srcPath = path.join(SOURCE_DIR, pattern);
  const destPath = path.join(DEST_DIR, pattern);

  // Ensure the destination directory exists
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    execSync(`rsync -avz ${srcPath} ${destPath}`);
    console.log(`Synced: ${pattern}`);
  } catch (error) {
    console.error(`Failed to sync: ${pattern}`, error);
  }
});

console.log("\x1b[32m%s\x1b[0m", "Sync process completed.");

/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config({ path: ".env.development" });
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Check for a parameter in the command line when running this using npm run pushCustom
const args = process.argv.slice(2); // Exclude first two default arguments
console.log("Command-line arguments:", args);

// Checking for a specific parameter
let verbose = false;
// const param = args.find(arg => arg.startsWith('--verbose='));
// if (param) {
//     const value = param.split('=')[1]; // Extract value
//     console.log("Parameter value:", value);
//     verbose = true;
// } else {
//     console.log("Parameter not provided.");
// }

// Check for a help parameter
if (args.includes("--help")) {
  console.log("Usage: npm run pushCustom -- --verbose=true");
  process.exit(0);
}

// Check for a verbose parameter
if (args.includes("--verbose")) {
  console.log("Verbose mode enabled.");
  verbose = true;
}

// If verbose is enabled, print the environment variables
if (verbose) {
  console.log("Environment variables:");
  console.log("ESC_REMOTE_SERVER:", process.env.ESC_REMOTE_SERVER);
  console.log("SITE_SUBDIR:", process.env.SITE_SUBDIR);
}



const ESC_REMOTE_SERVER = process.env.ESC_REMOTE_SERVER;
if (!ESC_REMOTE_SERVER) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "ESC_REMOTE_SERVER is not defined in the local environment variables."
  );
  process.exit(1);
}

// Check whether I can ssh into the remote server
try {
  execSync(`ssh ${process.env.ESC_REMOTE_SERVER} echo "SSH connection established."`);
} catch (error) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Failed to establish SSH connection to the remote server."
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

const DEST_PATH = `${path.join(DEV_SITES_DIR, SITE_SUBDIR)}`;
const DEST_DIR = `${ESC_REMOTE_SERVER}:${path.join(DEV_SITES_DIR, SITE_SUBDIR)}`;
const SOURCE_DIR = path.resolve("./");

// check if the destination directory exists
try {
  execSync(`ssh ${ESC_REMOTE_SERVER} ls ${DEST_PATH}`);
  console.log("\x1b[32m%s\x1b[0m", `Destination directory exists: ${DEST_DIR}`);
} catch (error) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    `Failed to access the destination directory: ${DEST_DIR}`
  );
  process.exit(1);
}



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
  const destPath = path.join(DEST_PATH, pattern);

  // Ensure the destination directory exists on the remote server
  const destDir = path.dirname(destPath);
  try {
    execSync(`ssh ${ESC_REMOTE_SERVER} mkdir -p ${destDir}`);
    console.log(`Ensured remote directory exists: ${destDir}`);
  } catch (error) {
    console.error(`Failed to create remote directory: ${destDir}`, error);
    process.exit(1);
  }

  console.log(`Syncing: ${pattern}`);
  console.log(`From: ${srcPath}`);
  console.log(`To: ${destPath}`);

  console.log("\x1b[34m%s\x1b[0m", `rsync -avz ${srcPath} ${ESC_REMOTE_SERVER}:${destPath}`);
  

  
  try {
    execSync(`rsync -avz ${srcPath} ${ESC_REMOTE_SERVER}:${destPath}`);
    console.log(`Synced: ${pattern}`);
  } catch (error) {
    if (verbose) {
      console.error(`Failed to sync: ${destPath}`, error);
      console.log("\x1b[31m%s\x1b[0m", `Failed to sync: ${destPath}`);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Sync process failed.  Try: > sudo chmod -R +rX ./"
      );
    }
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Sync process failed.  Try: > sudo chmod -R +rX ./"
    );
  }
});

console.log("\x1b[32m%s\x1b[0m", "Sync process completed.");

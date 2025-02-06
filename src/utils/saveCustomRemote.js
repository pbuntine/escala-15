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

const CUSTOM_SITES_DIR = execSync(
  `ssh ${ESC_REMOTE_SERVER} printenv CUSTOM_SITES_DIR`
)
  .toString()
  .trim();

if (!CUSTOM_SITES_DIR) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "CUSTOM_SITES_DIR is not defined in the remote environment variables."
  );
  process.exit(1);
}

const SITE_URL = process.env.SITE_URL || "default";
const NEXT_PUBLIC_CONTENT_VERSION =
  process.env.NEXT_PUBLIC_CONTENT_VERSION || "undefined";
const DEST_DIR = `${ESC_REMOTE_SERVER}:${path.join(CUSTOM_SITES_DIR, SITE_URL, NEXT_PUBLIC_CONTENT_VERSION)}`;
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

// const envVar = "CUSTOM_SITES_DIR"; // Change this to the variable you want to retrieve
// const command = `ssh ${ESC_REMOTE_SERVER} printenv ${envVar}`;
// const command = `ssh ${ESC_REMOTE_SERVER} printenv CUSTOM_SITES_DIR`;
// console.log(`Command: ${command}`);
// const remoteValue = execSync(`${command}`).toString().trim();
// console.log(`Remote ${envVar} Value: ${remoteValue}`);

// exec(`ssh ${ESC_REMOTE_SERVER} 'echo $${envVar}'`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         return;
//     }

//     const remoteValue = stdout.trim(); // Trim to remove extra newlines
//     console.log(`Remote ${envVar} Value: ${remoteValue}`);

//     // Assign the remote value to a JS variable
//     const myEnvVar = remoteValue;

//     // Use it in your script
//     console.log(`Stored in JS: ${myEnvVar}`);
// });

// exec(`ssh ${ESC_REMOTE_SERVER} 'echo $SHELL'`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         return;
//     }

//     const remoteShell = stdout.trim(); // Trim to remove extra newlines
//     console.log(`Remote shell: ${remoteShell}`);
// });

// exec(`ssh ${ESC_REMOTE_SERVER} 'bash -l -c "source ~/.bashrc && printenv"'`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         return;
//     }

//     const envVars = stdout.trim(); // Trim to remove extra newlines
//     console.log("");
//     console.log("");

//     console.log(`Remote environment variables:\n${envVars}`);
// });

// exec(`ssh ${ESC_REMOTE_SERVER} 'cat ~/.bashrc'`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         return;
//     }

//     const envVars = stdout.trim(); // Trim to remove extra newlines
//     console.log(`Remote bashrc variables:\n${envVars}`);
// });

// exec(`ssh ${ESC_REMOTE_SERVER} 'bash -l -c "source ~/.bash_profile && printenv"'`, (error, stdout, stderr) => {    if (error) {
//         console.error(`SSH Command Error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.warn(`SSH Warning: ${stderr}`);
//     }

//     const envVars = stdout.trim(); // Remove trailing spaces and newlines

//     console.log("\n\nRemote environment variables:\n", envVars);
// });

// exec(`ssh -t ${ESC_REMOTE_SERVER} 'source ~/.bashrc; bash -i'`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`SSH Command Error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.warn(`SSH Warning: ${stderr}`);
//     }

//     const envVars = stdout.trim(); // Remove trailing spaces and newlines

//     console.log("\n\nRemote environment variables:\n", envVars);
// });

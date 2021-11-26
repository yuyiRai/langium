/* eslint-disable */
const os = require("os");
const fs = require("fs-extra");
const path = require("path");
const extensionPath = path.join(os.homedir(), ".vscode/extensions/langium.langium-vscode-0.2.0");

console.log(extensionPath);
async function symlink(source, target) {
  if (await fs.pathExists(target)) {
    await fs.remove(target);
  }
  await fs.ensureSymlink(source, target);
}
symlink(path.join(__dirname, "../packages/langium-vscode"), extensionPath);

const { promises: fs } = require('fs');
const path = require('path');

const NEXT_BUILD_DIR = `./packages/app/.next`;
const ROOT = `./.next`;

// NOTE: since we are using a monorepo, vercel makes it a little challenging to locate the .next
// output since we are using the monorepo root level as the main directory for our build process.
// Defining the packages/app as the build output does not seem to work in the vercel platform. To
// get around this, the below script simply copies the .next output to root level. This gets round
// the issue and is essential for deployment.
function postBuildScript() {
  async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
    }
  }

  copyDir(NEXT_BUILD_DIR, ROOT);

  console.log(`
    ::::: Post build script executed successfully :::::
    - App fully bootstrapped
    - .next output resolved
    
  `);
}

postBuildScript();

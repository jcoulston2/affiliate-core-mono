const fs = require('fs');
const fse = require('fs-extra');

function init() {
  const srcDir = `./packages/app/.next`;
  const destDir = `./.next`;

  //   // fs.readdir('./packages/app/.next', (err, files) => {
  //   //   files.forEach((file) => {
  //   //     console.log(file);
  //   //   });
  //   // });

  //   // To copy a folder or file
  //   fse.copySync(srcDir, destDir, (err) => {
  //     console.log('innit copy');
  //     if (err) {
  //       console.error('ERR', err);
  //     } else {
  //       console.log('success! file copy');
  //     }
  //   });
  // }

  const { promises: fs } = require('fs');
  const path = require('path');

  async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      let srcPath = path.join(src, entry.name);
      let destPath = path.join(dest, entry.name);

      entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
    }
  }

  copyDir(srcDir, destDir);
}

init();

const fs = require('fs');

fs.readdir('./packages/app/.next', (err, files) => {
  files.forEach((file) => {
    console.log(file);
  });
});

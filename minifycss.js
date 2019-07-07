const uglifyCSS = require('uglifycss');
const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(__dirname, 'stylesheets');
const destPath = path.resolve(__dirname, 'minified');
const cssRegex = /\.css$/

const files = fs.readdirSync(sourcePath);

files.forEach(file => {
  if (cssRegex.test(file)) {
    uglify(file);
  }
});


function uglify(file) {
  const minified = uglifyCSS.processFiles(
    [path.resolve(sourcePath, file)],
    { maxLineLen: 500, expandVars: true }
  );

  const fileNewName = file.replace('.', '.min.');

  fs.writeFileSync(
    path.resolve(destPath, fileNewName),
    minified
  );
}



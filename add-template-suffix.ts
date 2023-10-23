import * as fs from 'fs';
const path = process.argv[2];

if (!path) {
  console.error('Path is required.');
  process.exit(1);
}

const suffix = '.template';

console.log(`Renaming files in ${path}...`);
const files = getRecursiveFileList(path).filter(
  (file) => !file.endsWith(suffix)
);

if (!files.length) {
  console.log('No files to rename.');
  process.exit(0);
}

for (const file of files) {
  const newFile = `${file}${suffix}`;
  fs.renameSync(file, newFile);
  console.log(` - Renamed ${file} to ${newFile}`);
}

// Point method at path and return a list of all the files in the directory recursively
function getRecursiveFileList(path: string): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(path);
  items.forEach((item) => {
    // Check out if it's a directory or a file
    const isDir = fs.statSync(`${path}/${item}`).isDirectory();
    if (isDir) {
      // If it's a directory, recursively call the method
      files.push(...getRecursiveFileList(`${path}/${item}`));
    } else {
      // If it's a file, add it to the array of files
      files.push(`${path}/${item}`);
    }
  });

  return files;
}

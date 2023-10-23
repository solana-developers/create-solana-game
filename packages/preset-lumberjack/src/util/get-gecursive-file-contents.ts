import { Tree } from '@nx/devkit';

export interface FileContents {
  path: string;
  content?: string;
  isBinary?: boolean;
  children?: Record<string, FileContents>;
}

const binaries = [
  'asset',
  'cginc',
  'dwlt',
  'eot',
  'gif',
  'ico',
  'jpeg',
  'jpg',
  'mat',
  'meta',
  'pdf',
  'png',
  'prefab',
  'shader',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

export function getRecursiveFileContents(tree: Tree, path: string) {
  const contents: Record<string, FileContents> = {};
  const dir = tree.children(path);
  dir.forEach((file) => {
    if (tree.isFile(`${path}/${file}`)) {
      const isBinary = binaries.includes(file.split('.').pop());
      contents[file] = {
        path: `${path}/${file}`,
        isBinary,
        content: isBinary
          ? null
          : tree.read(`${path}/${file}`).toString('utf-8'),
      };
    } else {
      contents[file] = {
        path: `${path}/${file}`,
        children: getRecursiveFileContents(tree, `${path}/${file}`),
      };
    }
  });

  return contents;
}

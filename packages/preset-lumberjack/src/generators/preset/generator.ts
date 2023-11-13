import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  const projectRoot = `.`;
 
  const name = options.name;
  const permutations = names(name);
  const underscoreName = permutations.fileName.split('-').join('_');
  console.log({...permutations, underscoreName});

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot,  {
    ...options,
    ...permutations,
    underscoreName
  });
  await formatFiles(tree);
}

export default presetGenerator;

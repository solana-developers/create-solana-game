import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { getRecursiveFileContents } from '../../util/get-gecursive-file-contents';

import { presetGenerator } from './generator';
import { PresetGeneratorSchema } from './schema';

describe('preset generator', () => {
  let tree: Tree;
  const options: PresetGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await presetGenerator(tree, options);
    const contents = getRecursiveFileContents(tree, '.');
    const stringified = JSON.stringify(contents, null, 2);
    expect(stringified).toMatchSnapshot();
  });
});

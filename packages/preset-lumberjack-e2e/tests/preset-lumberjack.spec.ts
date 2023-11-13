import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { mkdirSync, rmSync } from 'fs';

describe('preset-lumberjack', () => {
  const cleanUp = process.env['CLEANUP'] !== 'false'
  let projectDirectory: string;

  beforeAll(() => {
    projectDirectory = createTestProject();

    // The plugin has been built and published to a local registry in the jest globalSetup
    // Install the plugin built with the latest source code into the test repo
    execSync(`npm install @create-solana-game/preset-lumberjack@e2e`, {
      cwd: projectDirectory,
      stdio: 'inherit',
      env: process.env,
    });
  });

  afterAll(() => {
    // Cleanup the test project
    if (!cleanUp) {
      console.log(`Skipping cleanup of test project "${projectDirectory}"`)
      return
    }
   //return;
    rmSync(projectDirectory, {
      recursive: true,
      force: true,
    });
  });

  it('should be installed', () => {
    // npm ls will fail if the package is not installed properly
    execSync('npm ls @create-solana-game/preset-lumberjack', {
      cwd: projectDirectory,
      stdio: 'inherit',
    });
  });

  /*it('should build anchor', () => {
    // npm ls will fail if the package is not installed properly
    execSync('anchor build', {
      cwd: join(projectDirectory, 'program'),
      stdio: 'inherit',
    });
  });

  it('should install and build yarn', () => {
    // npm ls will fail if the package is not installed properly
    execSync('yarn install', {
      cwd: join(projectDirectory, 'app'),
      stdio: 'inherit',
    });
    execSync('yarn build', {
      cwd: join(projectDirectory, 'app'),
      stdio: 'inherit',
    });
  });*/ 
});

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject() {
  const projectName = 'test-project';
  const projectDirectory = join(process.cwd(), 'tmp', projectName);

  // Ensure projectDirectory is empty
  rmSync(projectDirectory, {
    recursive: true,
    force: true,
  });
  mkdirSync(dirname(projectDirectory), {
    recursive: true,
  });

  execSync(
    `npx --yes create-nx-workspace@latest ${projectName} --preset apps --no-nxCloud --no-interactive`,
    {
      cwd: dirname(projectDirectory),
      stdio: 'inherit',
      env: process.env,
    }
  );
  console.log(`Created test project in "${projectDirectory}"`);

  return projectDirectory;
}

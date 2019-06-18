import * as path from 'path';
import * as tl from 'azure-pipelines-task-lib/task';

async function run() {
  tl.setResourcePath(path.join(__dirname, 'task.json'));
  try {
    const version: string = tl.getInput('version', false);

    const args: Array<string> = new Array<string>();
    args.push('install');
    args.push('-g');
    if (version) {
      args.push('netlify-cli@' + version);
    }
    else {
      args.push('netlify-cli');
    }

    await tl.exec('npm', args);
  }
  catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();

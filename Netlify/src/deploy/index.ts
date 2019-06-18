import * as path from 'path';
import * as tl from 'azure-pipelines-task-lib/task';

async function run() {
  tl.setResourcePath(path.join(__dirname, 'task.json'));
  try {
    const authToken: string = tl.getInput('authToken', true);
    const siteId: string = tl.getInput('siteId', true);
    const sourceDirectory: string = tl.getPathInput('sourceDirectory', true, true);
    const isValidationOnly: boolean = tl.getBoolInput('isValidationOnly', true);
    const message: string = tl.getInput('message', false);
    const functionsDirectory: string = tl.getPathInput('functionsDirectory', false, true);

    const args: Array<string> = new Array<string>();
    args.push('deploy')
    args.push('--auth=' + authToken);
    args.push('--site=' + siteId);
    args.push('--dir=' + sourceDirectory);
    if (!isValidationOnly) {
      args.push('--prod');
    }
    if (message) {
      args.push('--message=' + message);
    }
    if (functionsDirectory) {
      args.push('--functions=' + functionsDirectory);
    }
    args.push('--json');

    await tl.exec('netlify', args);
  }
  catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();

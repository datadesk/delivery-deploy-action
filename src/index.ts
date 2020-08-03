// packages
import { getInput, info, setFailed } from '@actions/core';
import { Delivery } from '@datagraphics/delivery';
import prettyBytes from 'pretty-bytes';

async function run() {
  // the directory to upload
  const dir = getInput('dir', { required: true });

  // the bucket to upload it to
  const bucket = getInput('bucket', { required: true });

  // an optional base path, or path prefix, to upload everything to
  const basePath = getInput('base-path', { required: false });

  // if true, use the accelerate endpoint for this bucket
  const useAccelerateEndpoint =
    getInput('use-accelerate-endpoint', {
      required: false,
    }).toLowerCase() === 'true';

  // if true, upload all the files as public
  const isPublic =
    getInput('public', { required: false }).toLowerCase() === 'true';

  // if true, use delivery's cache logic
  const shouldCache =
    getInput('should-cache', { required: false }).toLowerCase() === 'true';

  // setup the instance of Delivery
  const delivery = new Delivery({ bucket, basePath, useAccelerateEndpoint });

  // some logging up uploads
  // @ts-ignore
  delivery.on('upload', ({ isIdentical, Key, size }) => {
    info(
      `${isIdentical ? 'Skipped' : 'Uploaded'}: ${Key} (${prettyBytes(size)})`
    );
  });

  // give it a shot
  try {
    await delivery.uploadFiles(dir, {
      isPublic,
      shouldCache,
    });

    return true;
  } catch (e) {
    setFailed(e);

    return false;
  }
}

run();

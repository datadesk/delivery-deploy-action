# delivery-deploy-action

A GitHub Action for uploading a directory to S3 using [@datagraphics/delivery](https://www.npmjs.com/package/@datagraphics/delivery). Developed as an extension to the [`baker`](https://github.com/datadesk/baker) page deployment system.

## Configuration

Before you can use this action, you need to create an [Amazon S3](https://en.wikipedia.org/wiki/Amazon_S3) bucket with API keys authorized to upload files.

## Basic usage

See [action.yml](https://github.com/datadesk/delivery-deploy-action/blob/main/action.yml):

```yaml
steps:
  # Before you can upload, you need to log in to Amazon
  - uses: aws-actions/configure-aws-credentials@v1
    with:
      aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
      aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      aws-region: ${{ secrets.AWS_S3_REGION }}

  # Here we do the upload to a public folder
  - uses: datadesk/delivery-deploy-action@v1
    with:
      bucket: ${{ secrets.AWS_S3_PBUCKET }}
      dir: _dist
      public: true
```

Other options allow you to set a base path to prepend to all files in the bucket, set cache headers and accelerate the upload.

## Releasing

Releasing a new version requires three steps. After you finish making your edits to the `src` directory, you should compile the final distribution in `dist/`.

```bash
npm run package
```

Then update the examples in the README to point to the version number you plan to release. Finally, issue a [new GitHub release](https://github.com/datadesk/notify-slack-on-build/releases) with that same version name.

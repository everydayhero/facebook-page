# Facebook Page

Website for use client's Facebook pages as a tab. More or less a replica of supporter pages.

## Dependencies

- [Node.js](https://nodejs.org/) (v0.10+)
- [Gulp.js](http://gulpjs.com/)

## Configuring a new client (for regular humans)

[https://docs.google.com/document/d/1BB2QanYcAaq6xDHndgwI3HOxniKut63YtxM9TjCNnLg/edit?usp=drivesdk](https://docs.google.com/document/d/1BB2QanYcAaq6xDHndgwI3HOxniKut63YtxM9TjCNnLg/edit?usp=drivesdk)

## Configuring a new client (for local development)

1. Copy the template configuration file: `src/config/template.js` and rename the copied version to the name of the client. Eg `src/config/some-client.js`
2. Edit your new configuration file as required.
3. Run this command: `npm run start`
4. Open `http://localhost:3000?client=some-client` in your browser. Make sure you pass in the name of your configuration file via GET.

## Publish to S3

This task will automatically upload all of your static files (located in `./dist`) to a designated Amazon S3 bucket. Follow the set up:

1. Add a file named `aws.json` to the project root directory. Insert credentials/info based on the following:

  ```json
    {
      "key": "YOUR_AWS_KEY",
      "secret": "YOUR_AWS_SECRET",
      "bucket": "YOUR_BUCKET_NAME",
      "region": "YOUR_BUCKET_REGION"
    }
  ```
2. Run this command `npm run publish`.

**Note:** Keep your AWS key and secret safe! Make sure this file is added to your .gitignore file before pushing your project up to GitHub.


## Commands

```sh
$ npm run setup    # install project dependencies, run an initial build
$ npm run build    # build production assets
$ npm run start    # run a build and start a local server
$ npm run publish  # publish production assets to Amazon S3
```

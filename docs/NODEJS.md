Node JS
=======
Node JS is a JavaScript runtime. We use several features in NodeJS to support this project:
+ npm dependencies -
  We use the node package manager to list and install 3rd party dependencies used by this project.
  Dependencies are installed using the `npm install` command.
  `package.json` has two sections for dependencies.
  Dependencies used by the solution itself are located under 'dependencies'.
  Dependencies used for development tasks are located under 'devDependencies'.
+ npm scripts -
  `package.json` has a section for us to configure scripts that can be run with the `npm run` command.
  + `npm test` is an alias for running `gulp karma`.
  + `npm run build` is an alias for running `gulp build`
  + `npm start` is an alias for running `gulp watch`
  + `npm run deploy` is an alias for running `gulp deploy`
+ gulp tasks -
  Gulp is a task execution framework that allows us to create and execute tasks for our project.
  It is analogous with Ant in the Java world.

Gulp
====
Gulp is a task runner.
You can execute any gulp task with the command `gulp taskName`.
You can optionally provide flags to a gulp task with `--flag` or `--flag=value`.

Before you can use gulp you will need to install it globally with `npm install gulp -g`.
This will make gulp available for use on the commandline.
If you do not want to install gulp globally, you can run all gulp commands through npm with `npm run gulp <task_name>`.
The documentation below will assume you have gulp installed globally.

In this project gulp tasks are organized into the [gulp/tasks](gulp/tasks) directory.
Task configuration is contained in [gulp/config.js](gulp/config.js).

Gulp Tasks
----------

### Clean tasks
Tasks that cleanup our local development directory are located in [gulp/tasks/clean.js](gulp/tasks/clean.js).
The only task of note is `gulp clean` which will remove the build directory.

### Build tasks
Gulp uses Webpack to build the project.
Webpack will combine all javascript into a couple of js and css files and minify the output.
This helps optimize the solution for delivery over the internet.
The output is written to the `build` directory.

[gulp/tasks/webpack.js](gulp/tasks/webpack.js) contains webpack specific build tasks.
+ `gulp build` will build the solution using the production configuration.
+ `gulp build:dev` will build the solution using the development configuration.
The main difference between production and development builds is the minification process is skipped on development builds.

[webpack.config.js](gulp/webpack.config.js) contains the base configuration for webpack.
This configuration is altered by the webpack tasks to suit the particular task.
For instance the dev build will configure creation of source maps, while the production build will dedupe and minify the code.

[gulp/tasks/views.js](gulp/tasks/views.js) contains tasks that are used by the build process.
+ `gulp views` will compile all html templates into [src/app/templates.js](src/app/templates.js)
+ `gulp assets` will copy uncompiled assets to the `build` directory.

### Run tasks
When developing it is essential to have a local environment to try out your changes.

[gulp/tasks/watch.js](gulp/tasks/watch.js) contains the watch task.
+ `gulp watch` will launch the webpack dev server to host the solution on <https://localhost:3000>.
It will also watch all source files and recompile everytime a file changes.

### Test tasks
Good support for unit tests is essential for faster development and less bugs.

[gulp/tasks/karma.js](gulp/tasks/karma.js) contains tasks for running unit tests with Karma test runner.
+ `gulp karma` will run all unit tests and write the code coverage report to the `coverage` directory.
+ `gulp tdd` will keep the test runner in running and watch for any changes to your spec files.
  Whenever a file changes it will rerun all affected tests. It will not produce (or overwrite) code coverage reports.


+ [test/karma.conf.js](test/karma.conf.js) contains the configuration used by the karma test runner.
+ [test/unit/index.js](test/unit/index.js) - This file is used to setup unit tests for execution.
It will load dependencies and register test files in a dynamic manner.
It will also load any test fixtures that apply to all tests.
+ [test/unit/fixtures](test/unit/fixtures) - This directory contains setup code and other items used by unit tests.
+ `coverage` - This directory contains code coverage reports in HTML format.
After running `npm test` this directory will contain one subdirectory for each browser and environment used in the test run.
These subdirectories will contain coverage results in HTML format.
They can be viewed in any browser by navigating to `file:///path/to/project/coverage/PhantomJS 2.1.1 (Mac OS X 0.0.0)/index.html`

### Deploy tasks
This solution is designed to be hosted in Salesforce, so we have a task designed to deploy the solution to a Salesforce environment.

[gulp/tasks/deploy.js](gulp/tasks/deploy.js) contains tasks specific to Salesforce deployment.
+ `gulp deploy` is the main task in this file. It will build the solution, run all unit tests, perform code coverage checks, prompt for Salesforce credentials and deploy the code to Salesforce.
+ `gulp deploy:dev` will perform the tasks above with a development build.

Deploy tasks will use the `dist` directory as their working directory for building he metadata package that will get deployed to Salesforce.
+ `dist/resource-bundles` contains the uncompressed static resource that will get deployed to Salesforce.
  This directory is built by the deploy:copy tasks.
+ `dist/src` contains the compiled static resource as well as a package.xml used to deploy the metadata to Salesforce.
  This directory and its contents are built by the deploy:zip abd deploy:sf tasks.

See [UNIT_TESTS.md](UNIT_TESTS.md) for more on writing and running unit tests.
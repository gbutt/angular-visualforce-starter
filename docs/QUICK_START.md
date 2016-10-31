Quick Start Guide
===========================

### Installing Git
+ Go to <https://git-scm.com/downloads> to download and install git on your local computer.
+ Check that git was installed correctly by opening a commandline and typing: `git --version`.

### Installing NodeJS
+ Go to <https://nodejs.org/en/download/> to download and install NodeJS on your local computer.
+ project was developed with v4.4.7, and it has not been tested with other versions.

#### Upgrading NodeJS
+ Open the commandline.
+ Globaly install the node helper package from npm: `sudo npm install -g n`
+ Install the latest LTS version of NodeJSL `sudo n lts`
+ Check your version: `node --version`

### Setting up this project on your local computer
+ Open a commandline and cd to your projects workspace.
+ Clone the git repository to your local computer.
+ Install 3rd party dependencies into node_modules folder: `npm install`
+ Start the local web server: `npm start`
+ Once the server starts, navigate to <https://localhost:3000>
You should see an SSL certificate warning page.
Proceed to the website.

### Running tests
+ Open the commandline to the project directory.
+ Run all tests: `npm test`
+ The test results will output to the commandline with a code coverage summary.

### Running tests in TDD mode
+ Open the commandline to the project directory.
+ Start TDD mode: `gulp tdd`
  + If you do not have gulp installed globally then use `npm run gulp tdd`
+ This will run all tests and keep the commandline running in TDD mode.
Any changes you make to a source file or a spec file will rerun all affected tests, displaying the results to the commandline output.

### Deploying project to Salesforce
NOTE: This command will overwrite the existing version of project, so proceed with care.
+ Open the commandline to the project directory.
+ Run the deploy task: `npm deploy`
+ Using the spacebar, select the Test server - All Salesforce sandboxes are test servers.
+ Enter your Salesforce Username (optionally with the sandbox extension - i.e. username@company.org.dev)
+ Enter your Salesforce password.
+ Wait for the deployment to finish.
If the deployment times out, you can go to the Deployment Status screen in Salesforce to monitor the progress.
Deployment usually takes 10-20 seconds.
+ Open your browser to the Visualforce to inspect the new code.

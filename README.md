angular-visualforce-starter
=========

This is a starter project for getting up and running quickly with Visualforce and Angular. It provides the following features:
+ Local development server - `npm start` - you can develop your changes quickly without having to push them to Salesforce every time.
+ Bundle and deploy your code to Salesforce as a static resouce - `npm run deploy`
+ Code bundling and minification provided by Webpack.
+ Visualforce Remote Actions using [angular-vf-remote-actions](https://www.npmjs.com/package/angular-vf-remote-actions).

Everything else is just gravy, use it if you like.

Prerequisites
-----
+ Install NodeJS
+ General knowledge of git, Salesforce and Angular v1.5 is helpful

Getting Started
------
+ install dependencies - `npm install`
+ start local development server - `npm start`
+ give it a few seconds - then open your browser to [https://localhost:3000](https://localhost:3000)

For a more in-depth review see the [Quick Start](docs/QUICK_START.md) guide.

FAQ
---

<b>How do I get the starter running in Salesforce?</b>
+ If you are deploying to a developer org you might need to specify the package namespace. Do this in [vfrAction.config.js](src/js/config/vfrAction.config.js), or in the [example visualforce page](example/ngStarter.page).
+ First you will need to deploy this starter as a static resource - `npm run deploy`
  + This command will prompt you for your environment - choose `test` for a sandbox and `login` for a developer org.
  + Provide your credentials and wait for the deploy to finish. If the deploy times out you can check the status on the Deployment Status page in Salesforce.
+ Next you need a Visualforce page to act in place of index.html. I've provided one in the [example](example) folder. Upload this to a Salesforce sandbox/developer org, along with the controller class.
+ Open your Visualforce page and enjoy!

<b>How can I add a new Visualforce Remote Action?</b>
+ Create a new @RemoteAction method in the [Visualforce controller](example/ngStarterController.cls)
+ Optional - Create an entry for this action in [vfrAction.config.js](src/js/config/vfrAction.config.js). Use this to override default settings.
+ Wire up your action in the [VFR Action Demo page](src/js/components/vfr-action-demo.comp.js)
+ Optional - Create a mock action handler in [mockedVfrActions.js](src/js/mocks/mockedVfrActions.js) to support local testing

<b>Mocks are great, but can I execute real Remote Actions while developing?</b>
+ Yes - but you will need to load your scripts from localhost
+ Start the dev server - `npm start`
+ Open [https://localhost:3000](https://localhost:3000) and accept the security exception
+ Now you should be able to load localhost scripts in your visualforce page - e.g. `<script src="//localhost:3000/app.js"></script>`
+ Do not load mocks.js in your visualforce page. It will intercept all calls to the Apex Controller.
+ See the [ngStarter.page](example/ngStarter.page) for a working example. This page attempts to load scripts from localhost before falling back to loading scripts from Salesforce.

<b>How do I add a unit test?</b>
+ Unit tests are executed using the command `npm test`.
+ To add a unit test, create a new file in the src folder called `<file-under-test>.spec.js`. For convenience, place it next to the file under test.
+ Tests are executed using Karma and PhantomJS by default, but you can change this to use a real browser like [Chrome](https://www.npmjs.com/package/karma-chrome-launcher) if you want.
+ Code Coverage reports are output to the coverage folder.
+ For more info on writing unit tests you can read [this doc](docs/UNIT_TESTS.md).

Would you like to know more?
---
There is more reading in the [docs](docs) folder. Note: I created these docs as a knowledge transfer for developers who have never worked with Angular, git, NodeJS, etc. So you might want to skim around here for something useful.
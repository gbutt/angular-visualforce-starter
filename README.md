angular-visualforce-starter
=========

This is a starter project for getting up and running quickly with Visualforce and Angular. It provides the following features:
+ Local development server - `npm start` - you can develop your changes quickly without having to push them to Salesforce every time.
+ Bundle and deploy your code to Salesforce as a static resouce - `npm run deploy`
+ Code bundling and minification provided by Webpack.
+ My own tiny framework for invoking Visualforce Remote Actions from Angular.

Prerequisites
-----
+ Install NodeJS
+ General knowledge of git, Salesforce and Angular v1.5 is helpful

Getting Started
------
I am going to assume you are familiar with how to use the commandline ;)
+ install dependencies - `npm install`
+ start local development server - `npm start`
+ give it a few seconds - then open your browser to [https://localhost:3000](https://localhost:3000)

FAQ
---

<b>How do I get the starter running in Salesforce?</b>
+ If you are deploying to a developer org you might need to specify the package namespace. Do this in [vfrActions.constant.js](src/js/config/vfrActions.constant.js).
+ First you will need to deploy this starter as a static resource - `npm run deploy`
  + This command will prompt you for your environment - choose `test` for a sandbox and `login` for a developer org.
  + Provide your credentials and wait for the deploy to finish. If the deploy times out you can check the status on the Deployment Status page in Salesforce.
  + Open your Visualforce page and enjoy!
+ Next you need a Visualforce page to act in place of index.html. I've provided one in the [example](example) folder. Upload this to a Salesforce sandbox/developer org, along with the controller class.

<b>How can I add a new Visualforce Remote Action?</b>
+ Create a new @RemoteAction method in the Visualforce controller
+ Create an entry for this action in [vfrActions.constant.js](src/js/config/vfrActions.constant.js)
+ Wire up your action in your angular page - see the [VFR Action Demo page](src/js/components/vfr-action-demo.comp.js) for details
+ Optional - Create a mock action handler in [mockedVfrActions.js](src/js/mocks/mockedVfrActions.js) to support local testing

<b>Can I develop using real Remote Actions and data?</b>
+ Yes - but you will need to load your scripts from localhost
+ start the dev server - `npm start`
+ open [https://localhost:3000](https://localhost:3000) and accept the security exception
+ now you should be able to load localhost scripts from your visualforce page - e.g. `<script src="https://localhost:3000/app.js"></script>`
+ do not load mocks.js in your visualforce page!
+ see the [ngStarter.page](example/ngStarter.page) for a working example

Would you like to know more?
---
There is more reading in the [docs](docs) folder.
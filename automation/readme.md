# Install Jest using yarn:

- Type `yarn add --dev jest`
## Or 
# Install Jest using npm:

- Type `npm install --save-dev jest`
## Note: Jest documentation uses yarn commands, but npm will also work. You can compare yarn and npm commands in the yarn docs, here.

# Let's get started by writing a test for a hypothetical function that adds two numbers. First, create a sum.js file:

function sum(a, b) {
  return a + b;
}
module.exports = sum;

# Then, create a file named sum.test.js. This will contain our actual test:

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

# Add the following section to your package.json:

{
  "scripts": {
    "test": "jest"
  }
}

# Finally, run yarn test or npm test and Jest will print this message:

PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
You just successfully wrote your first test using Jest!

# This test used expect and toBe to test that two values were exactly identical. To learn about the other things that Jest can test, see Using Matchers.

# Running from command line
# You can run Jest directly from the CLI (if it's globally available in your PATH, e.g. by `yarn global add jest` or `npm install jest --global`) with a variety of useful options.

# Here's how to run Jest on files matching my-test, using config.json as a configuration file and display a native OS notification after the run:

`jest my-test --notify --config=config.json`

# If you'd like to learn more about `running jest through the command line`, take a look at the Jest CLI Options page.

## Additional Configuration
## Generate a basic configuration file
## Based on your project, Jest will ask you a few questions and will create a basic configuration file with a short description for each option:

`jest --init`
# Using Babel
# To use Babel, install required dependencies via yarn:

`yarn add --dev babel-jest @babel/core @babel/preset-env`

# Configure Babel to target your current version of Node by creating a babel.config.js file in the root of your project:

## // babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};

# The ideal configuration for Babel will depend on your project. See Babel's docs for more details.

# Making your Babel config jest-aware
# Using webpack
# Jest can be used in projects that use webpack to manage assets, styles, and compilation. webpack does offer some unique challenges over other tools. Refer to the webpack guide to get started.

# Using Vite
Jest can be used in projects that use vite to serves source code over native ESM to provide some frontend tooling, vite is an opinionated tool and does offer some out-of-the box workflows. Jest is not fully supported by vite due to how the plugin system from vite works, but there is some working examples for first-class jest integration using the vite-jest, since this is not fully supported, you might as well read the limitation of the vite-jest. Refer to the vite guide to get started.

# Using Parcel
Jest can be used in projects that use parcel-bundler to manage assets, styles, and compilation similar to webpack. Parcel requires zero configuration. Refer to the official docs to get started.

# Using TypeScript
Jest supports TypeScript, via Babel. First, make sure you followed the instructions on using Babel above. Next, install the @babel/preset-typescript via yarn:

`yarn add --dev @babel/preset-typescript`

# Then add @babel/preset-typescript to the list of presets in your babel.config.js.

// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
+    '@babel/preset-typescript',
  ],
};

## However, there are some caveats to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run. If you want that, you can use ts-jest instead, or just run the TypeScript compiler tsc separately (or as part of your build process).







###        `Cypress`    ###

# Architecture: Cypress sits inside the browser. Maintains a proxy server to interact with browsers. Cypress uses NODE.js which creates a proxy server that interacts with the cypress inside the browser. That browser cypress has everything that runs and executes tests.

# Installation Steps:
# First install Node.
## Install npm.
# Vscode folder-> `npm init`
# Install Cypress: `npm install cypress --save-dev`
# Launch Cypress: `./node_modules/.bin/cypress open`

# CYPRESS Folder Structure:
# Fixture:
# Used to provide static constant data.
[url, email, username, ENVs]
Command: `cy.fixture();`

## E2e:
# Used to write all end-to-end test cases.
## Plugins:
# For all plugins and listeners.
1. Chrome support opts.
2. Accept Cert.
3. Support:
# For all custom modules, functions, wrappers, and libs.
# It will be accessible for all `spec/test files`.

`describe()`— a group of tests/scenario
`context`— alias of describe
`it()`— used for a single test case.
# NOTE: one describe block may have several test cases.
`before()`— runs once before all tests.
`after()`— runs after all tests.
`beforeEach()`— runs once before each test in describe().
`afterEach()`— runs once after each test in describe().
`.skip()`- `it.skip()`— to skip a particular test case
`.only()`- `it.only()` — run a specific test case.

# How to write test case
1. Pre-conditions
2. Test
3. Assertions (expected vs actual)
4. Post steps

# Cypress through CLI
# To run in headless mode:
Command: `./node_modules/bin/cypress run`
This command will run all the test cases in the e2e folder and will run headless in the background in the default browser which is the electron.
Run specific test case:
Command: `./node_modules/bin/cypress run —spec cypress/e2e/folderName/fileName.cy.js`
Run all test cases under one folder:
Command: `./node_modules/bin/cypress run —spec cypress/e2e/folderName/*.cy.js`
Run in headed mode:
To run in headed mode simply just add —browser=chrome
Command: `./node_modules/bin/cypress run —spec cypress/e2e/folderName/fileName —browser=chrome`

# Cypress Features
1. Time Travel: Take SS as you run the test.
2. Debug-ability: Readable error and stack traces.
3. Automatic waiting: Auto waits for commands and assertions before moving on.
5. Consistent Result: Doesn’t use selenium or Web Driver. Fast, consistent, and reliable.
6. SS and Videos: Get SS and videos of every action.
7. CBT: Supports Cross Browser testing or also supports CI/CD tools.
8. Tests support: e2e and unit tests.	


# Cross-browser testing:
You can switch browsers like this:

Run Test in headed and headless mode:

For headless: `npx cypress run`
For headed: `npx cypress run –headed`


# Cypress Allure Reporting:

Mac: `brew install allure`
Dependencies/Packages->
Cypress Allure Plugin: `npm i @shelex/cypress-allure-plugin`
Allure Command Line: Requires JAVA as Pre-Req: `npm i -g allure-commandline —save-dev`

# Configuration in Project:
Custom Scripts to Add in package.json->
  "cy:run": "cypress run --env allure=true",
  "allure-report": "allure generate allure-results --clean -o allure-report",
  "test": "npm run cy:run || npm run posttest",
  "posttest": "npm run allure-report"

Run Script: `npm test`
Cypress.config.json->
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
setupNodeEvents(on, config) {
     // on('file:preprocessor', webpackPreprocessor);
     allureWriter(on, config);
     return config;
   }

# Launch Allure Reports in Browser: allure serve
# Help tutorial:
Cypress Automation Learning Part 10 Allure Reporting:
`https://www.youtube.com/watch?v=Kz1lwStZGSM`

# Mochawesome:

Run Testcases in headless mode CLI with mochawesome
# Command: `npx cypress run —reporter mochawesome —browser chrome`

Merge multiple jSON reports into one:
Command: `npx mochawesome -merge .\cypress\reports\*.json > report1.json`
OR
`npx mochawesome-merge "cypress/reports/*.json" > mochawesome.json`
Merge in case if [Unexpected token in Json at position 0 position] error occurs:
`npx mochawesome -merge .\cypress\reports\*.json | out-file -encoding ascii ./report1.json`

`npx mochawesome-merge "cypress/reports/*.json" > mochawesome.json`
`npx marge mochawesome.json`

# package:
`https://www.npmjs.com/package/mochawesome`

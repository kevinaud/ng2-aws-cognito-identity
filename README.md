# A library for intregating Angular 2 and AWS Cognito User Pools without breaking your keyboard in frustration

## Project Structure

The '/lib' directory contains all of the code that is part of the library itself. Inside the '/example' directory there is an application that demonstrates how to implement a user system with this library. **The example application also contains all of the unit tests for the library.** I know that it seems weird to have unit tests for the library inside of the example application but I did it that way so that I could make use of the Angular CLI for running the tests which vastly simplifys things. The unit tests can be found in '/example/src/app/tests'.

The example project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.18.

**YOU MUST RUN ALL OF THE BOLLOW ANGULAR CLI COMMANDS IN THE '/example' DIRECTORY**

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `/example/dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

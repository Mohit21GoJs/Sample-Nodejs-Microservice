## Sample Node.js Service ##


### Tools ###
* gulpfile.js: Gulp Task runner for running tasks like setting up environment variable, start nodemon with babel node.

* .babelrc: Babel for transpiling ES6 Code to ES5.

* Dockerfile: Docker for containerization of application.

* .eslintrc.yml: Eslint for static code style guide, uses airbnb-base as base ruleset.

* api/swagger.yaml: swagger is used for documentation and api-request middleware which provides a swagger ui along with endpoints and try out request from there itself, also swagger maps routes to controllers.

* swagger-version-update.sh: a shell script to update the version of swagger file on each new jenkins/ci build.

### Common Modules ###

In various microservices we have some common logics, for example the server start logic, wrapper for making http requests from one service to another, logging in a well-defined json format and log instantiation logic, connecting to rabbitmq/kafka.

Specifically for the module sharing we can use approach of separating out modules into independent modules and publish them to npm, similar to aob-logger-wrapper and aob-rabbit-connector that we have, other common modules are listed in common/ folder

* common/authentication.js: for verification logic of jwt and writing logic for exempting some routes from being authenticated

* common/base-server.js: common logics for starting the server and catching events and start the app using swagger middleware

* common/base-controller.js: a base controller which contains a global try catch for whole app, whichever controller uses the methods exposed by this module do not need to implement try/catch as we have global try/catch which wraps the controller methods we have.

* common/base-handler.js: a base handler which includes global try/catch from handlers

* common/http-client.js: a http request wrapper which exposes customized get,post,delete and put methods.

* common/configuration.js: a module for reading yaml files coming from a repository and merging two config yaml files into one and returning the resulted json.

* aob-logger-wrapper is a module published on npm which is used across the app.

#### Project Structure ####

api/ folder contains project specific folders

* controllers: usual controllers for REST calls, these contain function for each endpoint using middleware pattern, and includes Joi Validations(Joi validation is a chema validation which allows us to do schema based validation and avoids if else in our code). Also controllers call methods of baseController from common/base-controller to handle response handling and error handling in global try/catch.

* Handlers: Handlers handle the logic of execution, for example calling adapters(external services), making db queries and returning result to the caller function, we have a base handler which wraps handlers for global try/catch.
The point of handlers is that we can have one handler for data ingested from REST call or from rabbitmq/kafka, we can execute same logic independent of the input source.

* dbQueryBuilder: for building db queries as name suggests.

* helpers: helper functions shared across the app.

* models: models for the db collections.

* rabbit: similar to controllers for REST, this is entry point definition for publish/subscribe data from rabbitmq.

* service: in microservices we have various services and hence we defined one folder for each service, for example service/iam => identityaccessmanagementservice related logics

* service/iam: for interacting with other services we have concept of adapters, entities and mappers, adapters contain the logic for request related to external services, mappers are used for mapping data coming from source to sink and it uses entities to share the code. for each outgoing request to iam service we define a mapper and similar for incoming data we provide a mapper in mappers/inbound.js

* vars: global app vars, usually values read from external configurations are loaded at app start time and mapped to values of the config yaml to app level variables.




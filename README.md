# nodejs-express-sequelize-sample

The main reason of this project study is for you to learn, by yourself, how to work with the `express` and `sequelize` tools.

Fork this repository and create a NodeJS API using express as your webserver and sequelize as your database manager.

_Obs.: It's not required to create "front-end" pages. An API that you can access using Postman/Insomnia would satisfy the requirements._

## About Tools 🛠️

### NodeJS

According to their [website](https://nodejs.org/en) "Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more.
Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser".

For this study, we'll be using NodeJS version 16.17.0.

### Express

According to their [website](https://expressjs.com/) "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web applications".

For this study, we would like you to use express on version 4.15.5.
You can find its documentation [here](https://expressjs.com/en/4x/api.html).
We recommend you to follow the "Getting Started" steps (skip the steps about serving static/public/front-end files).

### Sequelize

According to their [website](https://sequelize.org/) "Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more".

For this study, we would like you to use express on version 4.41.2.
You can find its documentation [here](https://sequelize.org/v4/).
We recommend you to follow the "Getting Started" steps.
Remember to always use `async/await` when interacting to Sequelize, so be sure to interact with it inside `async` functions.

### MochaJS/Chai/Istanbul

a

## About Challenge 🎯

The challenge will be separeted between milestones.
On the end of each one, you should show what you have developed to you team leader.

### 1º Milestone - Basic Express

- Add a route using GET method `/hello-world`.
The created route must return a message "Hello world!".
- Add to the previous route the parameter(query param) `name`.
The created route must return a message "Hello \<name>!".
Example: `/hello-world?name=zeca` must return "Hello zeca!"
- Add a new route where you use the parameter as a path param. GET method `/hello-world/:name`
The created route must return a message "Hello \<name>!".
Example: `/hello-world/zeca` must return "Hello zeca!"

### 2º Milestone - Advanced Express and Basic Sequelize

```bash
# run mysql docker container
docker run --rm --name nodejs-express-sequelize-sample -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:8.0

# create a database to use on your application
mysql --host=localhost --user=root --password=root --port 3306 --protocol=tcp -e "create schema nodejs_express_sequelize_sample;"
```

- Use sequelize to create a model/table
- Add basic CRUD routes to your model. POST(create), GET(read), PUT(update) and DELETE.
- Add unit tests to your all your routes to get a good code coverage.

### 3º Milestone - Advanced Sequelize

- Create some 1:N relation to your model.
- Create basic CRUD routes to the "child" model of your main model.
- Add unit tests to your all your routes to get a good code coverage.

### 4º Milestone - Going Further

- Create some N:N relation to your model.
- Add basic CRUD routes to your new model. POST(create), GET(read), PUT(update) and DELETE.
- Add routes to Create, Read and Delete relations between these two models.
- Add unit tests to your all your routes to get a good code coverage.

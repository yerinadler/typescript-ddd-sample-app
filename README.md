# TypeScript DDD API Boilerplate
Seed project (boilerplate) for RESTful API that leverages the concept of Domain Driven Design (DDD)

### Foreword from the author
This API project utilises information from multiple sources to create the fine-tuned API product with the following objectives

1. To build a maintainable enterprise grade application
2. The application that follows `SOLID` principles as much as possible
3. To build an pplication that benefits most of the stakeholders in an organisation

### Architecture
This project uses DDD with Onion Architecture as illustrated in below images

![](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlKQYp4rl0kH9GTuH0V0GU1QwyAhjIPy3aJQ&usqp=CAU)

Below image illustrates the more detailed architecture

![](https://image.slidesharecdn.com/applifireblueprintguidelinesv22-151216102708/95/applifire-blue-print-design-guidelines-12-638.jpg?cb=1450261807)

### Technologies
1. Node.js
2. TypeScript
3. MongoDB with MongoDB native driver (mongodb package on NPM)
4. InversifyJS as an IoC container
5. Express (via Inversify Express Utils) as an API framework

## Getting Started
To run the project, make sure you have these dependencies installed on your system

1. Node.js v8 or later
2. Typescript with `tsc` command
3. Nodemon
4. ts-node
5. MongoDB

You also need to setup and initialise MongoDB database. Then, copy the `.env_example` file into `.env` file by firing the command

````bash
cp .env_template .env
````

Do adjust the DB_NAME and MONGODB_URI to match your configuration then run

````bash
yarn dev
````
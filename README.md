##Beer Api

Using Express, Mongoose and Mongodb, we are going to build a RESTful API to CRUD our beer collection.

We are going to use the [Express Router](http://expressjs.com/4x/api.html#router), which allows more flexibility and cleanliness when defining our routes.

Our Beer API will:
 - Handle CRUD for a beer
 - Have an API url structure: (`/api/beers`, `/api/beers/:beer_id`, etc)
 - Be RESTful by using the proper HTTP verbs (`GET, POST, PUT and DELETE`)
 - Return JSON data
 - Bonus: be deployed on Heroku 

## Getting Started

To get started, we need to:

 - Define our Node packages

 - Start our Node server

 - Define our model

 - Declare our routes using the Express Router

 - and the Text our API

### Calling the API

Skip the frontend! We are going to be returning JSON data, which is how real-world APIs communicate.

Using the Postman app, we will create the appropriate request and fire it off to our app. Another way to make requests is by using the command line tool cURL.

## Step 1 - Set up

Initialize a new node.js application within the project directory. 

> $npm init

We need to install mongoose, express and body-parser.

What is the command to install a package, and then save it to our package.json?

> $npm install --save mongoose express body-parser

Then, within server.js, setup Mongoose, Express and body-parser to handle POSTed data.

## Step 2 - Plan our model

We are going to create one model to start off with, called Beer. The Beer model will have a name, kind and price. What do you think the datatype for price should be?

Create the model in the app/models directory.

Try to write the schema and model setup code from memory before looking at the solution below:



```
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: String,
  kind: String,
  price: Number
});

module.exports = mongoose.model('Beer', BeerSchema);
```

## Step 3 - CRUD!

We are going to use the Express Router to help define our routes. The first set of routes we are going to create are the index and create route, which both will be at `/api/beers`

### Routes with /api/beers

#### Index

What Mongoose find command should we use to find all of a certain collection?

#### Create

What method do we call on the model to create a new record?

### Routes with /api/beers/:id

Next, we will look at the specific record routes: `show`, `update`, and `destroy`

#### Show

What method should we use to find one member of a collection?

#### Update

We can combine the find and update operations into one operation with this command...

#### Destroy

By calling this command on the model, and passing a key: value pair, we can remove a single item from a collection.

## Step 4 - Test!

Use Postman or cURL to make requests to the api. If you are console logging, check the server output. For `GET` requests, you can use the browser.

## Bonus: Deploy to Heroku

 - Login to Heroku via your terminal (`heroku login`)

 - Create your app with `heroku create`

 - Provision the MongoLab add on: `heroku addons:create mongolab:sandbox` [more...](https://elements.heroku.com/addons/mongolab)
   - You may need your MongoLab connection URI: Get it by following [these steps](https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri)

 - Or, get a Mongo database running with [MongoLab](https://mlab.com/)
   - setup an environment varialbe locally with your MongoLab URI
     - `export MONGOLAB_URI="mongodb://example:example@something.mongolab.com:...."`
     - does it work locally?

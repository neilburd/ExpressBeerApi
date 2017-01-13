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

Then, within server.js, setup Mongoose, Express and body-parser to handle POSTed data. Also connect to your mongo database by calling `mongoose.connect`:

```
var bodyParser = require('body-parser');

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/beer_api')

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```


## Step 2 - Plan our model

We are going to create one model to start off with, called Beer. The Beer model will have a name, kind and price. What do you think the datatype for price should be?

Create the model in the app/models directory.

### Try to write the schema and model setup code from memory before looking at the solution below



```
/*
*
*
*
*
* SPOILER ALERT!
*
*
*
*
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: String,
  kind: String,
  price: Number
});

module.exports = mongoose.model('Beer', BeerSchema);
```

Why did we choose Number for price? 

> Dealing with monetary data can be a tricky thing. Read up on the topic in the context of MongoDB [here](https://docs.mongodb.com/manual/tutorial/model-monetary-data/). I prefer the Scale Factor approach for simplicity, where the price is stored as a number. The monetary value is multiplied by a power of 10 to ensure the precision you desire, then stored in the database. For example, a price of 9990 in our database signifies a real-world price of 9.99 with precision up to one tenth of a cent. You may also want to store the currency of i.e. "USD".

Now that you have exported (exposed) this model, where should you then call `require` along with the name of the model?

## Step 3 - CRUD!

We are going to use the Express Router to help define our routes. The first set of routes we are going to create are the index and create route, which both will be at `/api/beers`

Before we get started, take a look at the `router.use` call. That middleware gets called each time a route is visited, and is a good place for something like user authentication. We are not going to cover that today, but it would be something good to investigate, as you don't want anyone hacking your beer collection!

The call to `next()` goes to the next matching middleware, in this case, our RESTful routes that we are going to setup. If you notice your app is hanging, then somewhere, some middleware may not be passing on to the next piece of middleware. Read more about Express middleware [here](http://expressjs.com/en/guide/using-middleware.html)

So ***if you want something to happen on every request, implement `router.use`***!

## Break!

## Implementing CRUD

Working in groups of 2-3, implement the following CRUD actions. When you are ready to test an action out, fire up Postman and get the api response.

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

For POSTing data, make sure you are using `x-www-form-urlencoded`

Namespacing form data can be achieved by typing beer[name] as a key, for example. Then you have access to `req.body.beer`.

## Bonus: Deploy to Heroku

 - Login to Heroku via your terminal (`heroku login`)

 - Create your app with `heroku create`

 - Provision the MongoLab add on: `heroku addons:create mongolab:sandbox` [more...](https://elements.heroku.com/addons/mongolab)
   - You may need your MongoLab connection URI: Get it by following [these steps](https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri)

 - Or, get a Mongo database running with [MongoLab](https://mlab.com/)
   - setup an environment varialbe locally with your MongoLab URI
     - `export MONGOLAB_URI="mongodb://example:example@something.mongolab.com:...."`
     - does it work locally?

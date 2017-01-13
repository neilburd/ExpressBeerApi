[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Express as an API

Express, like Rails, can be used as an API. In fact, building APIs in Express,
especially those that use MongoDB for persistence, led to the rising popularity
of Node.

Express can be used for full-stack applications (those that have server-rendered
views). However, we will use it purely as an API.

A customized template for Express is available at [ga-wdi-boston/express-api-template](https://github.com/ga-wdi-boston/express-api-template).
It includes authentication and common middlewares so that you can start developing an API right away. But today, we are going to build our own from scratch.

## Prerequisites

-   [ga-wdi-boston/node-http-server](https://github.com/ga-wdi-boston/node-http-server)
-   [ga-wdi-boston/mongoose-crud](https://github.com/ga-wdi-boston/mongoose-crud)

## Beer Api

Let's face it, you have a hoarding problem. Luckily, it's not with cats, but with beers! Today you are thinking, wouldn't it be nice to have a beer api to CRUD all of my different beers?

Using Express, Mongoose and Mongodb, we are going to build a RESTful API to CRUD our beer collection.

We are going to use the [Express Router](http://expressjs.com/4x/api.html#router), which allows more flexibility and cleanliness when defining our routes.

Our Beer API will:
 - Handle CRUD for a beer
 - Have an API url structure: (`/api/beers`, `/api/beers/:beer_id`, etc)
 - Be RESTful by using the proper HTTP verbs (`GET, POST, PUT and DELETE`)
 - Return JSON data
 - Bonus: be deployed on Heroku 

## Learning Objectives
 - Use Express Router to define multiple routes
 - Namespace your routes so they originate from a different URL than `/`
 - Attach middleware to your application that runs on each request
 - Build a RESTful API using ME(A)N
 - Talk to the API using Postman
 
## Getting Started

To get started, we need to:

 - Prepare our environment and install dependencies

 - Start our servers: Node and MongoD (if it's not running)
 
 - Define our Schema and our model

 - Declare our routes using the Express Router

 - Write our CRUD functionality, testing along the way 

### Preparing our environment

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
2.  Install dependencies with `npm install`.
3.  Verify monogdb is runnning with `brew services list`
    (Run `brew services restart mongodb` if not)
    
    **OPTIONAL setting up of a SECRET_KEY**
4.  Set a SECRET_KEY in the environment. See below for command to set a SECRET_KEY
5. For development and testing, set the SECRET_KEY from the root of your repository using:

    `echo SECRET_KEY=$(/usr/bin/openssl rand -base64 66 | tr -d '\n') >>.env`

6.  Install Nodemon by `npm install -g nodemon`. Nodemon will reload the
application on a change to any file in the application. To start the express
server, use `nodemon`. A secondary way is `npm start` together with a 'start' script within package.json.

### Interacting with the API

Skip the frontend! We are going to be returning JSON data, which is how real-world APIs communicate.

Notice how, when building our controller functionality to respond to routes, we use the `res` object to respond with JSON:

Using the Postman app, we will create the appropriate request and fire it off to our app. Another way to make requests is by using the command line tool cURL.

## Step 1 - Set up (5 minutes)

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


## Step 2 - Plan our model (10 minutes)

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

Before we jump right in, let's take a moment to review and learn more about what's going on under the hood with the router.

When an incoming request comes in, we want our router to send that request to the appropriate route, execute the appropriate code, and give the appropriate response.

### Review Req, Res, Next and Response Handlers

So what are these `req, res and next` objects that we see from time to time when dealing with routes?

The `req` object is a
[http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
object. The `res` object is
[http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)
object. These are what we used in the node HTTP server. What about `next`?

> More than one callback function can handle a route (make sure you specify the
> next object).
>
> – [Express routing](http://expressjs.com/en/guide/routing.html)

That means that there can be **more than one step** when processing a single request. In fact,
that's how Express keeps boilerplate to a minimum; we did something similar with
`before_filter`s in Rails. Common functionality, like error handling, can be
extracted into a middleware and run on any request you like. However, you
**must** use `next` to propagate errors onward.

Likewise, `res.json` signals to Express that we're done working on our response.
It's analogous to Rails' `render` method. If you don't use a **terminal
handler**, Express will keep the connection open waiting for one. You and
Express will both be frustrated and confused. Here's a list of terminal
handlers. You will use `res.json` and `res.sendStatus` most frequently.

| Response method      | What it means                                                                         |
|:---------------------|:--------------------------------------------------------------------------------------|
| `res.json(jsObject)` | Send a JSON response.                                                                 |
| `res.redirect()`     | Redirect a request.                                                                   |
| `res.sendStatus()`   | Set the response status code and send its string representation as the response body. |


### Adding Middleware to our app

Take a look at the `router.use` call. That middleware gets called each time a route is visited, and is a good place for something like user authentication. We are not going to cover that today, but it would be something good to investigate, as you don't want anyone hacking your beer collection!

The call to `next()` goes to the next matching middleware, in this case, our RESTful routes that we are going to setup. If you notice your app is hanging, then somewhere, some middleware may not be passing on to the next piece of middleware. Read more about Express middleware [here](http://expressjs.com/en/guide/using-middleware.html)

So ***if you want something to happen on every request, implement `router.use`***!

### Using the Express Router

We are going to use the Express Router to help define our routes. The first set of routes we are going to create are the index and create route, which both will be at `/api/beers`

## Break!

## Implementing CRUD (60 minutes)

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

## Break!

## Bonus: Deploy to Heroku (30 minutes)

 - Login to Heroku via your terminal (`heroku login`)

 - Create your app with `heroku create`

 - Provision the MongoLab add on: `heroku addons:create mongolab:sandbox` [more...](https://elements.heroku.com/addons/mongolab)
   - You may need your MongoLab connection URI: Get it by following [these steps](https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri)

 - Or, get a Mongo database running with [MongoLab](https://mlab.com/)
   - setup an environment varialbe locally with your MongoLab URI
     - `export MONGOLAB_URI="mongodb://example:example@something.mongolab.com:...."`
     - does it work locally?

## Review

- What allows use to have our application mounted at /api?

- How to we use the res object to respond with json?

- How do we use middleware that is executed on each request?

- How can we have our app use multiple sets of routes?

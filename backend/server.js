const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser')
var compression = require('compression')
var http = require('http')
var https = require('https')
const app = express();
app.use(cookieParser())

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  exposedHeaders: ['X-ACCESS-TOKEN'],
  sameSite: 'lax',
  credentials: true
};

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.use(cors(corsOptions));
app.set('view cache', true);

// parse requests of content-type - application/json
app.use(express.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Add middleware
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Reduce the download size of the client by compressing all responses
app.use(compression());

const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Initialize roles
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Send CSRF token as a cookie
app.get('/api/v1/getcsrftoken', function (req, res) {
  return res.json({ csrfToken: req.csrfToken() });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello :)" });
});

require("./app/routes/user.route")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/reply.routes')(app);

initial();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

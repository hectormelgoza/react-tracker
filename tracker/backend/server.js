const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require("passport");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB CONNECTED");
})

const routes = require('./routes/accounts.js');
const users = require('./routes/user.js');


app.use('/api', routes);
app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

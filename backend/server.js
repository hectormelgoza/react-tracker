const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require("passport");
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./configs/passport.js")(passport);

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());


const db = require("./configs/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB CONNECTED");
})

const users = require('./routes/user.js');

app.use('/api/users', users);


app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'))
})




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

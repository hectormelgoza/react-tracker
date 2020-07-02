const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const uri = "mongodb+srv://hectormelgoza:thetrailblaze@cluster0-h4g1e.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB CONNECTED");
})

const routes = require('./routes/accounts.js');
const login = require('./routes/user.js');
const signup = require('./routes/signup.js');

app.use('/api', routes);
app.use('/login', login);
app.use('/signup', signup);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

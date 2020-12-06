const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

// Port and serve
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started at port: ${PORT}`));

// set up mongoose
mongoose.connect(
  'mongodb://localhost:27017/auth',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

app.use('/users', require('./routes/userRouter'));

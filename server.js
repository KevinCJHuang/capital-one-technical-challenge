const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// connect to Mongo Database
connectDB();

// middleware
app.use(express.json());

app.use('/api/transaction', require('./routes/transaction'));
app.use('/api/report', require('./routes/report'));

// check environment
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// listen on port 5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

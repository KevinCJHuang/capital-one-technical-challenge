const express = require('express');
// var bodyParser = require('body-parser');

const connectDB = require('./config/db');
// const path = require('path');

const app = express();

// Connect Database
connectDB();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/transaction', require('./routes/transaction'));
app.use('/api/report', require('./routes/report'));

// // Check environment
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }

// Listen on port 5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

const mongoose = require('mongoose');
const { config } = require('dotenv');
const { resolve } = require('path');

const result = config({ path: resolve(__dirname, './.env') });
const connectDatabase = () => {
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
    console.log(`MongoDb connected with server ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
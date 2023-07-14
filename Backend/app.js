const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: './config/.env' });
}
app.use(errorMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const movies = require('./routes/moviesRoute');
const user = require('./routes/userRoute');

app.use("/api/v1", movies);
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})
module.exports = app;
const mongoose = require("mongoose");

const { GHINTEGRAL_APP_MONGODB_HOST, GHINTEGRAL_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${GHINTEGRAL_APP_MONGODB_HOST}/${GHINTEGRAL_APP_MONGODB_DATABASE}`;
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then((bd) => console.log("Database is conected"))
  .catch((err) => console.log(err));

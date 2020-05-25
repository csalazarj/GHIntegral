const mongoose = require("mongoose");

const {
  GHINTEGRAL_APP_MONGODB_HOST,
  GHINTEGRAL_APP_MONGODB_DATABASE,
  GHINTEGRAL_APP_MONGODB_ATLAS,
} = process.env;
// const MONGODB_URI = `mongodb://${GHINTEGRAL_APP_MONGODB_HOST}/${GHINTEGRAL_APP_MONGODB_DATABASE}`;
const MONGODB_URI = GHINTEGRAL_APP_MONGODB_ATLAS;
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((bd) => console.log("Database is conected"))
  .catch((err) => console.log(err));

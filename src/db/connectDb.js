const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((e) => {
    console.log("Database connected fail");
    console.log("Message:", e.message);
  });
const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDb;

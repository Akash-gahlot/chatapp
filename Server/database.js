const mongoose = require("mongoose");

const url =
  "mongodb+srv://akash:cristiano77@cluster0.xpg9osl.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: true,
    });
    console.log(`connected to mongoDB :${con.connection.host}`);
  } catch (err) {
    console.log(`Unable to connect with server :${err}`);
    process.exit();
  }
};

module.exports = connectDB;

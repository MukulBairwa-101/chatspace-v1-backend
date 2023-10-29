const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose.set("strictQuery", false);

  const connection = await mongoose.connect(
    "mongodb+srv://mukulbairwa-db_cloud1608:Ttvx4e2TfUucz8Lj@cluster0.bnkhjiv.mongodb.net/chatspace",
    {
      useNewUrlParser: true,
    }
  );

  console.log("mongodb connected");
};

module.exports = connectDb;

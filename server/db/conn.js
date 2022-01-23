// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Db = process.env.ATLAS_URI;
// const mongooseClient = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// var _db;

// module.exports = {
//   connectToServer: function (callback) {
//     mongoose.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db) {
//         _db = db.db("ml-connect-database");
//         console.log("Successfully connected to MongoDB.");
//       }
//       return callback(err);
//     });
//   },

//   getDb: function () {
//     return _db;
//   },
// };

mongoose.connect(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;

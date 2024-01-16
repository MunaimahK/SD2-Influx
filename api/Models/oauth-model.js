const mongoose = require("mongoose");
const User = mongoose.Schema(
  {
    discordId: String,
    username: String,
    avatar: String,
    clubs: String,
  },
  {
    collection: "main",
  }
);

// collection specifies where the schema is inserted
// bu default uses users collection in Mongo
// Specified to main collection inside of the iNflux-main DB

const oauthModel = mongoose.model("oauthModel", User);
module.exports = oauthModel;

require("dotenv").config();
const userrouter = require("./Routers/router1");
const oauth = require("./Routers/discord");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const url = require("url");
const { error } = require("console");
// const port = process.env.PORT || 3001;
const router = express.Router();
const app = express();
const oauthModel = require("./Models/oauth-model.js");

// -Connect to MongoDB Inlfux-main DB-------------------------------------------------------------------------------------
try {
  mongoose.connect("mongodb://localhost:27017/Influx-main");
  console.log("Connected");
} catch (error) {
  handleError(error);
}

// -DiscordOauth2 Redirect------------------------------------------------------------------------------------------------
app.get("/api/auth/discord/dashboard", async (req, res) => {
  console.log(req.query);
  const { code } = req.query;
  if (code) {
    const formData = new url.URLSearchParams({
      client_id: process.env.ClientID,
      client_secret: process.env.ClientSecret,
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: "http://localhost:3000/api/auth/discord/dashboard",
    });

    const response = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;
    const { data: userResponse } = await axios.get(
      "https://discord.com/api/v10/users/@me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(userResponse);
    res.send(JSON.stringify(userResponse, null, 2));

    if (userResponse) {
      const { id, username, avatar } = userResponse;
      console.log(userResponse.username);

      // add the authorized user to the main server db
      var data = new oauthModel({
        discordId: userResponse.id,
        username: userResponse.username,
        avatar: userResponse.avatar,
        clubs: null,
      });
      data.save();
      /*
      const checkIfUserExists = await db("main")
        .where({ discordId: id })
        .first();

      if (checkIfUserExists) {
        await db("main")
          .where({ discordId: id })
          .update({ username, avatar });
      } else {
        await db("main").insert({ discordId: id, username, avatar });
      }*/
    }
  }
});

/*
app.get("/api/auth/discord/redirect", async (req, res) => {
  const url =
    "https://discord.com/api/oauth2/authorize?client_id=1179068530273034290&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+email";
  return res.redirect(url);
});

app.get("/api/auth/discord/redirect", async (req, res) => {
  const { code } = req.query;

  if (code) {
    const formData = new url.URLSearchParams({
      client_id: process.env.ClientID,
      client_secret: process.env.ClientSecret,
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: "http://localhost:3001/api/auth/discord/redirect",
    });
    console.log("Hello");
    const output = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (output.data) {
      const access = output.data.access_token;
      const userInfo = await axios.get(
        "https://discord.com/api/v10/oauth2/users/@me",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      console.log(output.data, userInfo.data);
    }
  }
});
*/
//app.use("/user/oauth", oauth);
//app.use(express.json());
// -Enable the app to use router with a base route-------------------------------------------------------------------------------------
//app.use("/user", userrouter);

// -Start the server-------------------------------------------------------------------------------------
/*app.listen(3001, () => {
  console.log("Server is running");
});*/

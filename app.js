//express
const express = require("express");
const app = express();
//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//axios
const axios = require("axios");
//code==
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.Lname;
  var email = req.body.email;
  var info = {
    members: [{ email_address: email, status: "subscribed" }],
  };

  var postData = JSON.stringify(info);
  console.log(postData);

  axios
    .post(
      "https://us17.api.mailchimp.com/3.0/lists/91ae4e527d",
      { data: postData },
      {
        auth: {
          username: "basic",
          password: "6f6a1a9981316a6806beb8f3bacfda8d-us17",
        },
      }
    )

    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.listen(3000, function () {
  console.log("server is running on port 3000");
});

//api key
//6f6a1a9981316a6806beb8f3bacfda8d-us17
// list id
// 91ae4e527d

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { title: "EasyBank" });
});
app.get("/signup", function (req, res) {
  res.render("signUp", { title: "Sign Up" });
});
app.get("/success", function (req, res) {
  res.render("success", { title: "Success" });
});
app.post("/", function (req, res) {
  res.redirect("/signup");
});
app.post("/success", function (req, res) {
  res.redirect("/");
});

app.post("/signup", function (req, res) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/521bd5f0a2";
  const options = {
    method: "POST",
    auth: "easybank:deb46fb01ff9799fddb727a649c75e51-us18",
  };
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
  res.redirect("/success");
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

// deb46fb01ff9799fddb727a649c75e51-us18
// 521bd5f0a2

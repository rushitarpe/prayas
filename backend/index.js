const express = require('express');
const app = express();
var figlet = require("figlet");

figlet("Welcome to Rushi's Website", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });







app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
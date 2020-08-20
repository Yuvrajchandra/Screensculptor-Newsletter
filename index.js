const express = require("express");
const bodyParser = require("body-parser");
const request= require("request");
const https= require("https");

const app= express();

app.use(express.static("public"));      //to use files stored in local storage
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res){
  // const firstName= req.body.fname;
  // const lastName= req.body.lname;
  const email= req.body.email;

  const data= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {

        }
      }
    ]
  };

  const jsonData= JSON.stringify(data);

  const url= "https://us18.api.mailchimp.com/3.0/lists/68e9f0c74a";

  const options = {
    method: "POST",
    auth: "SCREENSCULPTOR:4f7f954b2cbe11fb902116ea1aeeef82-us18"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){      ///if the status code is 200 , everything went right
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

// app.post("/failure", function(req,res){
//   res.redirect("/");
// });



app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

// API key
// 4f7f954b2cbe11fb902116ea1aeeef82-us18    we have to replace the last number(here it is us18) with usX of url

//List Id
//68e9f0c74a          replace this list id with {list_id} from that of url


import express from "express";
import fs from "fs";
import path from 'path';
const app = express()

// Get localdirectory url
const root = process.cwd();

// Port for localhost
const PORT = 4000;

// EndPoint that is HomePage

app.get('/', function(request, response) {

  let html = "";
  html += "<h1>Welcome to Filesystem API</h1>"
  html += "<a href=\"/readfiles\">Read Files</a> | "
  html += "<a href=\"/createfile\">Create Files</a>"
  response.set('Content-Type', 'text/html');
  response.send(html)

})

// EndPoint to read all files in particular folder called files

app.get('/readfiles', function(request, response){

  fs.readdir(path.join(root, "files/"), "utf-8", (err, dirContent) => {
      if(err){
          console.error(err);
          return;
      }
      console.log(dirContent);
      response.send(dirContent);
  })

})

// EndPoint to create file in particular folder called files

app.get('/createfile', function (request, response) {
  // Get current time and date
  const today = new Date();
  let current_date = `${today.getDate()}-${today.toLocaleString("en-IN", {
      month: "long",
    })}-${today.getFullYear()}`;
  let current_time = `${today.getHours()}-${today.getMinutes()}`;
    const fileName = current_date+"-"+current_time+".txt"

    // Send current time 
    response.send('File created with filename -> ' + fileName + '<br> <a href="/">Go Back</a>');

    // Create a file with current date time as file name
    fs.writeFile(path.join(root, "files/"+fileName), today.toLocaleString(), (err) => {
        if (err) throw err;
        console.log('File Created!!');
    })
})

app.listen(PORT, () => console.log("Server is started in "+PORT))
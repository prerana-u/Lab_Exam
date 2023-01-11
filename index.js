var mysql = require('mysql');
const express = require('express')
var cors = require('cors')
var fs=require('fs')
const bodyParser = require('body-parser')
const path=require('path')
const app = express()

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "infosys"
  });

  app.use(cors())
  const tbl = "emp"

  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: false }));
  var corsOptions = {
    origin: '*',
    methods: "GET",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
  
  // Connect with MySql
  con.connect((err) => {
      if (err)
          throw (err)
      console.log("MySql Connected")
  })

  app.get('/', (req, res) => {
    // Display all data
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    con.query("SELECT * from " + tbl, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.get('/sal', (req, res) => {
    // Display all data
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    con.query("SELECT * from emp where esal>120000", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})
app.get('/empform', (req, res) => {
    // Display all data
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile(path.join(__dirname,'form.html'),'utf-8',(err,data)=>{
      if(err)
      throw err
      res.end(data)
    })
  });
  app.get('/delete', (req, res) => {
    // Display all data
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile(path.join(__dirname,'delete.html'),'utf-8',(err,data)=>{
      if(err)
      throw err
      res.end(data)
    })
  });
  app.get('/display', (req, res) => {
    // Display all data
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile(path.join(__dirname,'search_display.html'),'utf-8',(err,data)=>{
      if(err)
      throw err
      res.end(data)
    })
  });
  app.get('/update', (req, res) => {
    // Display all data
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile(path.join(__dirname,'update.html'),'utf-8',(err,data)=>{
      if(err)
      throw err
      res.end(data)
    })
  });
  app.get('/search', (req, res) => {
    // Display all data
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile(path.join(__dirname,'search.html'),'utf-8',(err,data)=>{
      if(err)
      throw err
      res.end(data)
    })
  });



app.post('/postdata', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['id'])
    con.query("INSERT into " + tbl + " VALUES (" + resp['id'] + ",\'" + resp['ename'] + "\',\'" + resp['des'] + "\',\'" + resp['dep'] + "\'," + resp['sal'] + ",\'" + resp['loc'] + "\')", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/deletedata', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['id'])
    con.query("Delete from emp where emp_id= "+resp['id'], function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/updatedata', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['id'])
    con.query("Update  emp set eloc= \'"+resp['loc']+"\' where emp_id= "+resp['id'], function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})
app.post('/searchdata', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['dep']);
    con.query("select * from  emp where edep= \'"+resp['dep']+"\'", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})


app.listen(3000, "localhost", () => {
    console.log(`App listening at http://localhost:3000`)
})
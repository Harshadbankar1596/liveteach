const express = require('express')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const path = require("path")

const app = express()
const port = 7887;

app.use(bodyparser.urlencoded({ extended: true })); //read a html mhforms data
app.use(bodyparser.json()); //read json data
app.use(express.static(path.join(__dirname, "/public")));


//connect mongo db
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mhmhform')
}
try {
  main();
  console.log("mongodb connected")
} catch (error) {
  console.log("mongodb not connected");
}



//scchema

const mhform = new mongoose.Schema({
  firstname: String,
  lastname: String,
  mail: String,
  subject: String,
  businesswebsite: String,
  businessleaglename: String,
  yourmessage: String,
})

const info = mongoose.model('info', mhform);

const malischema = new mongoose.Schema({
  name: String,
  mail: String,
  password: String,
})

const mail = mongoose.model('mail', malischema);
//mongodb connected


//app main page
app.get('/', (req, res) => {
 
    res.sendFile('./public/mainindex.html', { root: __dirname } , (err) => {
      if (err) {
        res.sendFile('./public/errorindex.html', { root: __dirname } );
      }
    })
  
})


//app about page
app.get('/about', (req, res) => {
  res.sendFile('./public/aboutindex.html', { root: __dirname } , (err) => {
    if (err) {
      res.sendFile('./public/errorindex.html' , {root : __dirname});
    }
  }
  )
})


//app registermhform page
app.get('/registermhform', (req, res) => {
  res.sendFile('./public/contactindex.html', { root: __dirname }, (err) => {
    if (err) {
      res.sendFile('./public/errorindex.html' , {root : __dirname});
    }
  }
  )
})


//app mail page
app.get('/mail', (req, res) => {
  res.sendFile('./public/mailindex.html', { root: __dirname }, (err) => {
    if (err) {
      res.sendFile('./public/errorindex.html' , {root : __dirname});
    }
  }
  )
})


//app mobile page
app.get('/mobile', (req, res) => {
  res.sendFile('./public/mobileindex.html', { root: __dirname }, (err) => {
    if (err) {
      res.sendFile('./public/errorindex.html' , {root : __dirname});
    }
  }
  )
})


///app career page
app.get('/career', (req, res) => {
  res.sendFile('./public/careersindex.html', { root: __dirname }, (err) => {
    if (err) {
      res.sendFile('./public/errorindex.html' , {root : __dirname});
    }
  }
  )
})


//app suite page
app.get('/suite', (req, res) => {
  res.sendFile('./public/suiteindex.html', { root: __dirname }, (err) => {
    if (err) {
      res.sendFile('./public/errorindex.html' , {root : __dirname});
    }
  }
  )
})


//mhform subimit

app.post('/registerformsubmit', async (req, res) => {
  try {
    const newmhform = new info({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mail: req.body.mail,
      subject: req.body.subject,
      businesswebsite: req.body.businesswebsite,
      businessleaglename: req.body.businessleaglename,
      yourmessage: req.body.yourmessage,
    });

    await newmhform.save()
    res.sendFile('./public/datasaveindex.html' , {root : __dirname});
    console.log("mhform details submited")

  } catch (error) {
    console.error(error)
    res.sendFile('./public/errorindex.html', { root: __dirname })
    
  }
})

app.post('/mail', async (req, res) => {
  try {
    const newmail = new mail({
      name: req.body.fullname,
      mail: req.body.mail,
      password: req.body.password,
    })

    await newmail.save();
   res.sendFile('./public/datasaveindex.html' , {root : __dirname});
    console.log("mail data saved");

  } catch (error) {
    console.error(error)
    res.sendFile('./public/errorindex.html', { root: __dirname })

    console.error(error);
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port${port}`)
})


const express = require('express');
const path = require('path');
const port = 8001;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));




app.get('/' , function(req,res){
     Contact.find({}, function(err, contact){
    if(err){
        console.log('Error in fetching contact from db');
        return;
    }
    return res.render('home',{
       title: "contact List",
       contact_list: contact  
    });
});
});

app.post('/create-contact' , function(req , res){
  // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
if(err){console.log('error in creating a contact!!');
return};
   console.log('*******' , newContact);
   return res.redirect('/');
    });
});

app.get('/delete-contact' , function(req, res){
    //get the id from query in the url
   
  let id = req.query.id;

  // find the contact in the data basae using id and delete

  Contact.findByIdAndDelete(id, function(err){
   if(err)
   {
       console.log('error in deleting');
   
    return;  
  }
  return res.redirect('/');
});
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

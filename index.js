
const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));


var contactList = [
    {
        name:"Captain America",
        phone : "123456789"
    },
    {
        name:"Iron Man",
        phone : "987654321"
    },
    {
        name:"Thor",
        phone : "897654321"
    }
]

app.get('/' , function(req,res){
    return res.render('home',{
       title: "contactList",
       contact_list: contactList  });
});

app.post('/create-contact' , function(req , res){
   contactList.push(req.body);
    return res.redirect('/');

});

app.get('/delete-contact' , function(req, res){
    console.log(req.query);
  let phone = req.query.phone
  let contactIndex = contactList.findIndex(contact => contact.phone == phone);

  if(contactIndex != -1){
      contactList.splice(contactIndex, 1)
  }
  return res.redirect('/');
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

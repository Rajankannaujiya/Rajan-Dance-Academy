const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 800;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    complain: String
});

const Contact = mongoose.model('Contact', contactSchema);

//express specific stuff
// app.use(express.static('static', options))
app.use('/static', express.static('static'))//for serving static files
app.use(express.urlencoded())

// pug specific stuff
app.set('view.engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname, 'view'))//set the view directory

//endpoints
app.get("/", (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get("/about", (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
});
app.get("/services", (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
});
app.get("/classinfo", (req, res) => {
    const params = {}
    res.status(200).render('classinfo.pug', params);
});
app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("your response have been recorded");
    }).catch(() => {
        res.status(400).send("item doesn't save to the data base");
    })
    // res.status(200).render('contact.pug');
});

//start the server
app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);
});
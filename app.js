import express from "express";
import mongoose from 'mongoose';
import Cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer'
import insert from './dao/insert.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8001;
const conn = 'mongodb://localhost:27017/Welding';

//middleware
app.use(express.json())
app.use(Cors());
//db config
mongoose.connect('mongodb+srv://tejinder:Teji123@cluster0.x40zw.mongodb.net/Welding?retryWrites=true&w=majority'||conn,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'));
app.use(express.json()); 
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({
    extended: true
  }));


app.get('/',(req, res) => {
    res.render('index')
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.post('/on',(req,res)=>{
    console.log(req.body);
    const customerData = req.body;
     insert(customerData);
        // nodemailer objects
    // let mailOpts, transporter;

    // // email transporter
    // transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587, // changed from 465
    //     secure: false,
    //     auth: {
    //         admin: "Tejinder22gg@gmail.com",
    //         pass: "teji22gg"
    //     },
    //     tls:{
    //         rejectUnauthorized:false
    //     }
    // });

    // // email credentials
    // mailOpts = {
    //     from: '"Node mailer contact "<Tejinder22gg@gmail.com>',
    //     to: 't9814312194@gmail.com',
    //     subject: "Welding CUSTOMER!!!!",
    //     text: `${req.body.email}  is our new customer, havinf phn ${req.body.phoneno}`
    // };

    // // send email and verify contact
    // transporter.sendMail(mailOpts, function(err, res) {
    //    if (err) {
    //        console.log(err);
    //    } else {
    //        res.render("contact-success");
    //    }
    // });
    res.sendStatus(200);
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
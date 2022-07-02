import express from "express";
import mongoose from 'mongoose';
import Cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import wbm from 'wbm';
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
//https://catalins.tech/heroku-environment-variables
mongoose.connect(process.env.DATABASE_URL||conn,{
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

    wbm.start().then(async () => {
        const phones = ['916239576769'];
        const message = 'Good Morning.';
        await wbm.send(phones, message);
        await wbm.end();
    }).catch(err => console.log(err));

         // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: 'gmail.com',
   service: 'gmail', // true for 465, false for other ports
    auth: {
        user: 't9814312194@gmail.com', // generated  user
        pass: 'ibrfqyktdddtshsv'  // generated 16 digit app  password in g accouunt
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 't9814312194@gmail.com', // sender address
      to: 'tejinderinsta@gmail.com', // list of receivers
      subject: 'Welding Customer', // Subject line
      text: `Name: ${req.body.name},
             Email: ${req.body.email},
             Phone: ${req.body.phoneno},` // plain text body
        // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
            console.log(error);
      }else
      {
        insert(customerData);
        console.log('email sent successfully'+info.response);
        
      }
       
      
      
  });
 
    res.sendStatus(200);
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    console.log(`db ${process.env.DATABASE_URL}`);
})
import mongo from 'mongoose';



// allows our dompurify to create html and purify it with JSDOM.window() object
// mainly santisez out html
const customerSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})


export default mongo.model('customers', customerSchema)
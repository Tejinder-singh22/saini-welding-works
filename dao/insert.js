import customers from '../Models/customerModel.js';

export default async function insert(customerData){

 let cust = new customers({
      name: customerData.name,
      email: customerData.email,
      phone_no: customerData.phoneno,
  })
   try{  
     const already = customers.find({email : customerData.email})
     if(already==customerData.email){
         console.log('email already exists');
     }else
     {
    cust = await cust.save();
    console.log('data inserted successfully'+cust); 
     }  
   }
   catch(err){
    console.log(err);
   }

}

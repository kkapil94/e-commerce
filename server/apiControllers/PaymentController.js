import Razorpay from "razorpay"
import crypto from "crypto"
 const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

export const checkout = async (req,res)=>{
  const amount = req.body.total 

    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
      };
      const order = await instance.orders.create(options)
   
      res.status(200).json({success:true,order})
}
export const paymentVerification = async (req,res)=>{
  let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
                                  .update(body.toString())
                                  .digest('hex');
  var response = {"signatureIsValid":"false"}
  if(expectedSignature === req.body.razorpay_signature)
   {response={"signatureIsValid":"true"}
   res.redirect(`https://e-commerce-kkapil94.vercel.app/payment?reference=${req.body.razorpay_payment_id}`)
  }
} 
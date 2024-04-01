import dbConnect from "../../../util/mongo.js";
import Receipt from "../../../models/Receipt.js"; 

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();


  if (method === "GET") {
    try{
      const receipt = await Receipt.find();
      res.status(200).json(receipt);

    }catch(err){
      res.status(500).json(err);
    }
 }

  if (method === 'POST') {
    try {
      const { orderId, customer, address, total, method } = req.body;
      const newReceipt = new Receipt({
        orderId,
        customer,
        address,
        total
      });
      const savedReceipt = await newReceipt.save();
      res.status(201).json(savedReceipt);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 60e662a2bbd75084c299b7d2e5f27a46f7b2b828

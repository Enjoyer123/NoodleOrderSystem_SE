import dbConnect from "../../../util/mongo.js";
import Product from "../../../models/Product.js";

export default async function handler(req, res) {
  const { 
    method, 
    query: { id },
} = req;
 
<<<<<<< HEAD
   dbConnect();
=======
  await dbConnect();
>>>>>>> 60e662a2bbd75084c299b7d2e5f27a46f7b2b828
  
   if (method === "GET") {
      try{
        const product = await Product.findById(id);
        res.status(200).json(product);

      }catch(err){
        res.status(500).json(err);
      }
   }
  
   if (method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try{
        await Product.findByIdAndDelete(id);
        res.status(201).json("The product has been deleted!!!!")
    }catch(err){
        res.status(500).json(err);
       
    }
  }

}
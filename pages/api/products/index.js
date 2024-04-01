// import dbConnect from "../../../util/mongo.js";
// import Product from "../../../models/Product.js";

// export default async function handler(req, res) {
//   const { method } = req;
 
//    await dbConnect();
  
//    if (method === "GET") {
//       try{
//         const product = await Product.find();
//         res.status(200).json(product);

//       }catch(err){
//         res.status(500).json(err);
//       }
//    }
  
//   if (method === "POST") {
//     try{
//         const products = await Product.create(req.body);
//         res.status(201).json(products)
//     }catch(err){
//         res.status(500).json(err);
       
//     }
//   }

// }

import dbConnect from "../../../util/mongo.js";
import Product from "../../../models/Product.js";

export default async function handler(req, res) {
  const { method } = req;
<<<<<<< HEAD
=======
 
  await dbConnect();
  
   if (method === "GET") {
      try{
        const product = await Product.find();
        res.status(200).json(product);
>>>>>>> 60e662a2bbd75084c299b7d2e5f27a46f7b2b828

  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.find();
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const products = await Product.create(req.body);
      return res.status(201).json(products);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

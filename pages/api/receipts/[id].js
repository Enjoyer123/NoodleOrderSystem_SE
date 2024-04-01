import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import Receipt from "@/models/Receipt";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const receipt = await Receipt.findById(id);
      res.status(200).json(receipt);
    } catch (err) {
      res.status(500).json(err);
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> 60e662a2bbd75084c299b7d2e5f27a46f7b2b828
};

export default handler;
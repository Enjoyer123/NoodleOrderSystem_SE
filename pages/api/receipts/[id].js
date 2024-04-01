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
};

export default handler;
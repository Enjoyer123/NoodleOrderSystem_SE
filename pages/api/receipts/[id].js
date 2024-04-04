// เรียกใช้โมดูลและโมเดลที่เกี่ยวข้อง
import dbConnect from "../../../util/mongo";
import Receipt from "@/models/Receipt";

// ฟังก์ชัน handler สำหรับการจัดการคำขอ
const handler = async (req, res) => {
  // รับข้อมูล method และ id จากคำขอ
  const {
    method,
    query: { id },
  } = req;

  // เชื่อมต่อกับฐานข้อมูล MongoDB
  await dbConnect();

  // ตรวจสอบ method ของคำขอ
  if (method === "GET") {
    try {
      // ค้นหาข้อมูลใบเสร็จด้วย id
      const receipt = await Receipt.findById(id);
      // ส่งข้อมูลใบเสร็จที่พบกลับในรูปแบบ JSON พร้อมรหัสสถานะ 200
      res.status(200).json(receipt);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการค้นหา ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json(err);
    }
  }
};

export default handler;

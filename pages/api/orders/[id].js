// เรียกใช้งานโมดูลและโมเดลที่เกี่ยวข้อง
import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

// กำหนดฟังก์ชัน handler สำหรับการจัดการคำขอ
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
      // ค้นหาข้อมูลคำสั่งซื้อตาม id ที่ระบุ
      const order = await Order.findById(id);
      // ส่งข้อมูลคำสั่งซื้อกลับในรูปแบบ JSON และรหัสสถานะ 200
      res.status(200).json(order);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการค้นหา ส่งข้อผิดพลาดกลับในรูปแบบ JSON และรหัสสถานะ 500
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      // อัปเดตข้อมูลคำสั่งซื้อตาม id และข้อมูลที่รับเข้ามา
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // ส่งข้อมูลคำสั่งซื้อที่อัปเดตแล้วกลับในรูปแบบ JSON และรหัสสถานะ 200
      res.status(200).json(order);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการอัปเดต ส่งข้อผิดพลาดกลับในรูปแบบ JSON และรหัสสถานะ 500
      res.status(500).json(err);
    }
  }
};

export default handler;

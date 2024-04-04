// เรียกใช้งานโมดูลและโมเดลที่เกี่ยวข้อง
import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

// กำหนดฟังก์ชัน handler สำหรับการจัดการคำขอ
const handler = async (req, res) => {
  // รับข้อมูล method จากคำขอ
  const { method } = req;

  // เชื่อมต่อกับฐานข้อมูล MongoDB
  await dbConnect();

  // ตรวจสอบ method ของคำขอ
  if (method === "GET") {
    try {
      // ค้นหาข้อมูลคำสั่งซื้อทั้งหมดใน MongoDB
      const orders = await Order.find();
      // ส่งข้อมูลคำสั่งซื้อทั้งหมดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 200
      res.status(200).json(orders);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการค้นหา ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      // สร้างข้อมูลคำสั่งซื้อใหม่ใน MongoDB จากข้อมูลที่รับเข้ามา
      const order = await Order.create(req.body);
      // ส่งข้อมูลคำสั่งซื้อที่สร้างใหม่กลับในรูปแบบ JSON พร้อมรหัสสถานะ 201
      res.status(201).json(order);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการสร้าง ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json(err);
    }
  }
};

export default handler;

// เรียกใช้งานโมดูลและโมเดลที่เกี่ยวข้อง
import dbConnect from "../../../util/mongo.js";
import Product from "../../../models/Product.js";

// กำหนดฟังก์ชัน handler สำหรับการจัดการคำขอ
export default async function handler(req, res) {
  // รับข้อมูล method จากคำขอ
  const { method } = req;

  // เชื่อมต่อกับฐานข้อมูล MongoDB
  await dbConnect();

  // ตรวจสอบ method ของคำขอ
  if (method === "GET") {
    try {
      // ค้นหาข้อมูลสินค้าทั้งหมด
      const products = await Product.find();
      // ส่งข้อมูลสินค้าทั้งหมดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 200
      return res.status(200).json(products);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการค้นหา ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      return res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      // สร้างสินค้าใหม่ด้วยข้อมูลที่รับเข้ามา
      const products = await Product.create(req.body);
      // ส่งข้อมูลสินค้าที่สร้างใหม่กลับในรูปแบบ JSON พร้อมรหัสสถานะ 201
      return res.status(201).json(products);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการสร้าง ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      return res.status(500).json(err);
    }
  }
}

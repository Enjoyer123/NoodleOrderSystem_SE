// เรียกใช้งานโมดูลและโมเดลที่เกี่ยวข้อง
import dbConnect from "../../../util/mongo.js";
import Product from "../../../models/Product.js";

// กำหนดฟังก์ชัน handler สำหรับการจัดการคำขอ
export default async function handler(req, res) {
  // รับข้อมูล method และ id จากคำขอ
  const { method, query: { id } } = req;

  // เชื่อมต่อกับฐานข้อมูล MongoDB
  dbConnect();

  // ตรวจสอบ method ของคำขอ
  if (method === "GET") {
    try {
      // ค้นหาข้อมูลสินค้าด้วย id ที่ระบุ
      const product = await Product.findById(id);
      // ส่งข้อมูลสินค้าที่พบกลับในรูปแบบ JSON พร้อมรหัสสถานะ 200
      res.status(200).json(product);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการค้นหา ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json(err);
    }
  }

  if (method === "PUT" || method === "PATCH") {
    try {
      // อัปเดตข้อมูลสินค้าด้วย id และข้อมูลที่รับเข้ามา
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // ส่งข้อมูลสินค้าที่อัปเดตแล้วกลับในรูปแบบ JSON พร้อมรหัสสถานะ 200
      res.status(200).json(product);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการอัปเดต ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      // ลบข้อมูลสินค้าด้วย id ที่ระบุ
      await Product.findByIdAndDelete(id);
      // ส่งข้อความแสดงการลบสินค้าสำเร็จกลับในรูปแบบ JSON พร้อมรหัสสถานะ 201
      res.status(201).json("The product has been deleted!!!!");
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการลบ ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json(err);
    }
  }
}

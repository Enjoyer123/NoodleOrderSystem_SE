// เรียกใช้โมดูลและโมเดลที่เกี่ยวข้อง
import dbConnect from "../../../util/mongo.js";
import Receipt from "../../../models/Receipt.js"; 

// ฟังก์ชัน handler สำหรับการจัดการคำขอ
export default async function handler(req, res) {
  // รับข้อมูล method จากคำขอ
  const { method } = req;

  // เชื่อมต่อกับฐานข้อมูล MongoDB
  await dbConnect();

  // ตรวจสอบ method ของคำขอ
  if (method === "GET") {
    try {
      // ค้นหาข้อมูลใบเสร็จทั้งหมดและส่งกลับในรูปแบบ JSON พร้อมรหัสสถานะ 200
      const receipt = await Receipt.find();
      res.status(200).json(receipt);
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการค้นหา ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json(err);
    }
  }

  // ตรวจสอบ method ของคำขอ
  if (method === 'POST') {
    try {
      // รับข้อมูลจากตัว body ของคำขอ
      const { orderId, customer, address, total, method } = req.body;
      // สร้างใบเสร็จใหม่จากข้อมูลที่รับมา
      const newReceipt = new Receipt({
        orderId,
        customer,
        address,
        total
      });
      // บันทึกใบเสร็จใหม่ลงในฐานข้อมูล
      const savedReceipt = await newReceipt.save();
      // ส่งข้อมูลใบเสร็จที่บันทึกไว้กลับในรูปแบบ JSON พร้อมรหัสสถานะ 201
      res.status(201).json(savedReceipt);
    } catch (error) {
      // หากเกิดข้อผิดพลาดในการบันทึกใบเสร็จ ส่งข้อผิดพลาดกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // หาก method ไม่ใช่ GET หรือ POST ส่งข้อความแจ้งเตือน Method Not Allowed กลับในรูปแบบ JSON พร้อมรหัสสถานะ 405
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

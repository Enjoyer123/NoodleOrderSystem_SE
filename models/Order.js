import mongoose from "mongoose";

// กำหนดโครงสร้างข้อมูลสำหรับการสั่งซื้อสินค้า
const OrderSchema = new mongoose.Schema(
  {
    // อีเมลของลูกค้าที่ทำการสั่งซื้อ
    emailcustomer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    // เลขโต๊ะที่ลูกค้านั่ง
    table: {
      type: String,
      required: true,
      maxlength: 200,
    },
    // รวมราคาของสินค้าทั้งหมดในการสั่งซื้อ
    total: {
      type: Number,
      required: true,
    },
    // สถานะการทำรายการสั่งซื้อ
    status: {
      type: Number,
      default: 0, // สถานะเริ่มต้นคือ 0 (ยังไม่เริ่มทำรายการ)
    },
    // วิธีการชำระเงิน
    method: {
      type: Number,
      required: true,
    },
  },
  // กำหนดให้เก็บเวลาที่สร้างและแก้ไขข้อมูล
  { timestamps: true }
);

// สร้างและส่งออกโมเดล Order โดยใช้ schema ที่กำหนดไว้
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

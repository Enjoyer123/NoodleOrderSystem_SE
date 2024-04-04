import mongoose from 'mongoose';

// กำหนด Schema สำหรับใบเสร็จ
const ReceiptSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId, // ประเภทข้อมูลเป็น ObjectId ที่เชื่อมโยงกับข้อมูลใบสั่งซื้อ
    ref: 'Order', // เชื่อมโยงกับโมเดล Order
    required: true, // บังคับให้มีข้อมูล
  },
  customer: {
    type: String, // ประเภทข้อมูลชื่อลูกค้าเป็น String
    required: true, // บังคับให้มีข้อมูล
  },
  address: {
    type: String, // ประเภทข้อมูลที่อยู่ของลูกค้าเป็น String
    required: true, // บังคับให้มีข้อมูล
  },
  total: {
    type: Number, // ประเภทข้อมูลรวมยอดเงินเป็น Number
    required: true, // บังคับให้มีข้อมูล
  },
  createdAt: {
    type: Date, // ประเภทข้อมูลเวลาที่สร้างใบเสร็จเป็น Date
    default: Date.now, // ค่าเริ่มต้นของเวลาที่สร้างเป็นปัจจุบัน
  },
},
{ timestamps: true } // เปิดใช้งานการเก็บเวลาที่สร้างและแก้ไขข้อมูล
);

// สร้างและส่งออกโมเดล Receipt โดยใช้ Schema ที่กำหนดไว้
const Receipt = mongoose.models.Receipt || mongoose.model('Receipt', ReceiptSchema);

export default Receipt;

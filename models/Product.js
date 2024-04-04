// factory เก็บข้อมูล schma
import mongoose from "mongoose";

// กำหนด Schema สำหรับสินค้า
const ProductSchema = new mongoose.Schema({
    title: {
        type: String, // ประเภทข้อมูลชื่อสินค้าเป็น String
        required: true, // บังคับให้มีข้อมูล
        maxlength: 60 // จำนวนตัวอักษรสูงสุดที่ยอมรับได้คือ 60 ตัวอักษร
    },
    img1: {
        type: String, // ประเภทข้อมูล URL ของรูปภาพหลักของสินค้าเป็น String
        required: true // บังคับให้มีข้อมูล
    },
    img2: {
        type: String, // ประเภทข้อมูล URL ของรูปภาพรองของสินค้าเป็น String
        required: true // บังคับให้มีข้อมูล
    },
    desc: {
        type: String, // ประเภทข้อมูลคำอธิบายเกี่ยวกับสินค้าเป็น String
        required: true, // บังคับให้มีข้อมูล
        maxlength: 1000 // จำนวนตัวอักษรสูงสุดที่ยอมรับได้คือ 1000 ตัวอักษร
    },
    hide: {
        type: String, // ประเภทข้อมูลสถานะการแสดงผลของสินค้าเป็น String
        default: "1" // ค่าเริ่มต้นของสถานะการแสดงผลเป็น "1"
    },
    prices: {
        type: Number, // ประเภทข้อมูลราคาของสินค้าเป็น Number
        required: true // บังคับให้มีข้อมูล
    }
}, { timestamps: true }); // เปิดใช้งานการเก็บเวลาที่สร้างและแก้ไขข้อมูล

// สร้างและส่งออกโมเดล Product โดยใช้ Schema ที่กำหนดไว้
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

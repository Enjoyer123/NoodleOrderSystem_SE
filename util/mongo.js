import mongoose from 'mongoose'

// กำหนด URL ของ MongoDB จาก .env.local
const MONGO_URL = process.env.MONGO_URL

// ตรวจสอบว่ามีการกำหนด MONGO_URL หรือไม่ ถ้าไม่มีให้โยนข้อผิดพลาด
if (!MONGO_URL) {
  throw new Error(
    'Please define the MONGO_URL environment variable inside .env.local'
  )
}

let cached = global.mongoose

// สร้างตัวแปร global เพื่อเก็บการเชื่อมต่อ MongoDB
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// ฟังก์ชันสำหรับเชื่อมต่อ MongoDB
async function dbConnect() {
  // ถ้ามีการเชื่อมต่อแล้วให้ส่งการเชื่อมต่อเดิมกลับ
  if (cached.conn) {
    return cached.conn
  }

  // ถ้ายังไม่มีการเชื่อมต่อ ให้เชื่อมต่อ MongoDB
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    // เชื่อมต่อ MongoDB โดยใช้ Mongoose
    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect

// Import ไลบรารี cookie เพื่อใช้ในการจัดการคุกกี้
import cookie from "cookie";

// สร้าง handler สำหรับรับคำขอ
const handler = (req, res) => {
  // ตรวจสอบว่าเป็นคำขอแบบ POST หรือไม่
  if (req.method === "POST") {
    // ดึงข้อมูล username และ password จาก body ของคำขอ
    const { username, password } = req.body;
    // ตรวจสอบว่า username และ password ตรงกับค่าที่กำหนดในไฟล์ .env หรือไม่
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // สร้างคุกกี้ token และเซ็ตให้กับ response header
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60, // กำหนดอายุของคุกกี้เป็น 1 ชั่วโมง
          sameSite: "strict", // กำหนด sameSite attribute เป็น strict
          path: "/", // กำหนด path ของคุกกี้
        })
      );
      // ส่งรหัสสถานะ 200 และข้อความ "Succesfull" กลับไปยัง client
      res.status(200).json("Succesfull");
    } else {
      // หาก username หรือ password ไม่ถูกต้อง ส่งรหัสสถานะ 400 และข้อความ "Wrong Credentials!" กลับไปยัง client
      res.status(400).json("Wrong Credentials!");
    }
  }
};

// ส่ง handler ออกเป็น default
export default handler;
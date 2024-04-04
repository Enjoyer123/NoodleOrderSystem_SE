import nodemailer from 'nodemailer';

// ฟังก์ชัน handler สำหรับการจัดการคำขอ
export default async function handler(req, res) {
    try {
        // รับข้อมูล receiptData จากตัว body ของคำขอ
        const { receiptData } = await req.body;
        console.log("eiei4",receiptData.orderId)
        
        // สร้าง transporter เพื่อสร้างการเชื่อมต่อกับผู้ให้บริการอีเมล
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 's6504062636381@email.kmutnb.ac.th',
                pass: process.env.NEXT_PUBLIC_PASSWORD
            }
        });

        // กำหนดข้อมูลเกี่ยวกับอีเมลที่จะส่ง
        const mailOptions = {
          from: 's6504062636381@email.kmutnb.ac.th',
          to: `${receiptData.customer}`,
          subject: "Noodle Shop",
          html: `
            <div style="color: #000000; font-family: Arial, sans-serif; padding: 20px; background-image: url('https://res.cloudinary.com/ddpkw3vyp/image/upload/v1712145872/uploads/ff006b_solid_color_background_icolorpalette_bnhkqe.png'); background-size: cover; text-align: center; font-size: 18px;">
              <h2 style="font-size: 36px;">Your Receipt</h2>
              <ul style="list-style-type: none; padding: 0; text-align: center; font-size: 24px;">
                <li><strong>Receipt ID:</strong> ${receiptData._id}</li>
                <li><strong>Order ID:</strong> ${receiptData.orderId}</li>
                <li><strong>Customer:</strong> ${receiptData.customer}</li>
                <li><strong>Address:</strong> ${receiptData.address}</li>
                <li><strong>Created At:</strong> ${new Date(receiptData.createdAt).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</li>
                <li><strong>Total:</strong> $${receiptData.total}</li>
              </ul>
            </div>
          `
      };
      
        // ส่งอีเมล
        await transporter.sendMail(mailOptions);

        // ส่งข้อความกลับในรูปแบบ JSON พร้อมรหัสสถานะ 200 เมื่อส่งอีเมลสำเร็จ
        res.status(200).json({ message: "Email Sent Successfully" });
    } catch (error) {
        // ส่งข้อความกลับในรูปแบบ JSON พร้อมรหัสสถานะ 500 เมื่อเกิดข้อผิดพลาดในการส่งอีเมล
        console.error("Failed to send email:", error);
        res.status(500).json({ message: "Failed to Send Email" });
    }
}

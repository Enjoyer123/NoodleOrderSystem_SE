import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    try {
        const { receiptData } = await req.body;
        console.log("eiei4",receiptData.orderId)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 's6504062636381@email.kmutnb.ac.th',
                pass: process.env.NEXT_PUBLIC_PASSWORD
            }
        });

        const createdAt = new Date(receiptData.createdAt);
        const formattedCreatedAt = createdAt.toLocaleString();

        const mailOptions = {
            from: 's6504062636381@email.kmutnb.ac.th',
            to: 's6504062616071@email.kmutnb.ac.th',
            subject: "Noodle Shop",
            html: `
                <h3>Your Invoice</h3>
                <li> Receipt_id: ${receiptData._id}</li> 
                <li> Order_id: ${receiptData.orderId}</li>
                <li> Customer: ${receiptData.customer}</li>
                <li> Address: ${receiptData.address}</li> 
                <li> createdAt: ${formattedCreatedAt}</li> 
                <li> Total: ${receiptData.total}</li>  
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email Sent Successfully" });
    } catch (error) {
        console.error("Failed to send email:", error);
        res.status(500).json({ message: "Failed to Send Email" });
    }
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en"> {/* กำหนดภาษาของเอกสารเป็นภาษาอังกฤษ */}
      <Head /> {/* ใส่เนื้อหาที่อยู่ใน <head> ของ HTML */}
      <body> {/* เริ่มต้นของส่วนของเนื้อหาหลักของเอกสาร */}
        <Main /> {/* เป็น Component หลักที่จะแสดงเนื้อหาหลักของแอปพลิเคชัน */}
        <NextScript /> {/* ส่วนนี้จะทำการนำเข้า script ที่จำเป็นในการรัน Next.js */}
      </body>
    </Html>
  );
}

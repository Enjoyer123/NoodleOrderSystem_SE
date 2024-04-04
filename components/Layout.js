import Navbar from "./Navbar";

// คอมโพเนนต์ Layout ใช้สำหรับจัดรูปแบบหน้าเว็บไซต์โดยมี Navbar เป็นส่วนหัวและ children เป็นเนื้อหาที่ต้องการแสดง
const Layout = ({ children }) => {
  return (
    <>
        {/* เรียกใช้ Navbar เพื่อแสดงเมนูบนส่วนหัวของเว็บไซต์ */}
        <Navbar />
        {/* แสดง children ซึ่งเป็นเนื้อหาหลักของเว็บไซต์ */}
        {children}
    </>
  );
};

export default Layout;

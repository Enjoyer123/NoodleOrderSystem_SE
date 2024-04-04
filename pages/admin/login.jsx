// Import CSS module สำหรับการสไตล์ของหน้า Login
import styles from "../../styles/Login.module.css";
// Import axios สำหรับการทำ HTTP requests
import axios from "axios";
// Import useRouter เพื่อใช้ในการ redirect หน้า
import { useRouter } from "next/router";
// Import useState เพื่อใช้ในการเก็บ state ของ component
import { useState } from "react";
// Import Swal เพื่อใช้ในการแสดงข้อความเตือนที่สวยงาม
import Swal from 'sweetalert2';

const Login = () => {
  // สร้าง state สำหรับเก็บชื่อผู้ใช้และรหัสผ่าน
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // ใช้ hook useRouter เพื่อให้สามารถ redirect หน้าได้
  const router = useRouter();

  // ฟังก์ชันสำหรับการคลิกปุ่ม Sign In
  const handleClick = async () => {
    try {
      // ส่งคำร้องขอ POST ไปยังเซิร์ฟเวอร์เพื่อทำการ login
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      // หลังจาก login เรียบร้อยให้ทำการ redirect ไปยังหน้า Admin Dashboard
      router.push("/admin");
    } catch (err) {
      // หากเกิดข้อผิดพลาดในการ login แสดงข้อความเตือนว่า "Wrong Credentials!"
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Credentials!'
      });
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        {/* ช่องใส่ชื่อผู้ใช้ */}
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* ช่องใส่รหัสผ่าน */}
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* ปุ่ม Sign In */}
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;

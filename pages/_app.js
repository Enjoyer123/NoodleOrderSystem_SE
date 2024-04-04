import "@/styles/globals.css"; // นำเข้าไฟล์ CSS ที่ใช้ทั่วทั้งเว็บไซต์

import Layout from "../components/Layout.js"; // นำเข้าคอมโพเนนต์ Layout สำหรับใช้เป็นโครงสร้างหลักของเว็บไซต์
import store from "../redux/store"; // นำเข้า Redux store ที่ใช้เก็บสถานะและโมเดลข้อมูลของแอปพลิเคชัน
import { Provider } from "react-redux"; // นำเข้า Provider ของ Redux เพื่อให้ Redux store เป็นที่รู้จักทั่วทั้งแอปพลิเคชัน

function MyApp({ Component, pageProps }) {
  
  return (
    // ให้ Provider ครอบทุกๆ Component เพื่อให้สามารถเข้าถึง Redux store ได้
    <Provider store={store}>
      {/* นำเข้า Component Layout เพื่อใช้เป็นโครงสร้างหลักของเว็บไซต์ */}
      <Layout>
        {/* แสดง Component หลักของหน้าเว็บไซต์ที่ได้รับผ่าน props */}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );

}

export default MyApp;

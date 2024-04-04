import Head from "next/head";
import ProductsList from "../components/ProductList";
import Featured from "../components/Featured";
import axios from "axios";

export default function Home({ noodleList }) {
  return (
    <div className="">
      <Head>
        <title>Noodles-Shop</title>
        <meta name="description" content="Best noodle in this town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* แสดงเนื้อหาหลักของหน้าเว็บ */}
      <Featured />
      {/* แสดงรายการสินค้า */}
      <ProductsList noodleList={noodleList} />
    </div>
  );
}

// เรียกใช้เมื่อเซิร์ฟเวอร์เริ่มทำงาน
export const getServerSideProps = async () => {
  // เรียกข้อมูลสินค้าจาก API ด้วย axios
  const res = await axios.get("http://localhost:3000/api/products");
  // ส่งข้อมูลสินค้าที่ได้รับกลับไปยังหน้า Home เป็น props
  return {
    props: {
      noodleList: res.data,
    },
  };
};

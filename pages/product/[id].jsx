import Image from "next/image";
import styles from "../../styles/Product.module.css"
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

// สร้างคอมโพเนนต์ Product ที่รับ props เป็น noodle
const Product = ({ noodle }) => {
  // สร้าง state สำหรับเก็บราคาและจำนวนสินค้าที่ใช้เพิ่มลดราคา
  const [price, setPrice] = useState(noodle.prices)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // ฟังก์ชัน handle click เพื่อเพิ่มสินค้าเข้าไปในตะกร้า
  const handleClick = () => {
    // ส่ง action เพื่อเพิ่มสินค้าเข้าไปในตะกร้าโดยใช้ dispatch จาก Redux
    dispatch(addProduct({ ...noodle, price, quantity }))
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          {/* แสดงรูปภาพสินค้าโดยใช้คอมโพเนนต์ Image จาก Next.js */}
          <Image src={noodle.img2} layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        {/* แสดงชื่อสินค้า ราคา และคำอธิบายสินค้า */}
        <h1 className={styles.title}>{noodle.title}</h1>
        <span className={styles.price}>${noodle.prices}</span>
        <p className={styles.desc}>{noodle.desc}</p>
        {/* ส่วนของการเพิ่มสินค้าเข้าไปในตะกร้า */}
        <div className={styles.add}>
          <input
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) {
                setQuantity(value);
              } else {
                setQuantity(1);
              }
            }}
            type="number"
            value={quantity}
            className="w-20 h-10 px-2 py-1 border border-gray-300 rounded"
          />
          {/* ปุ่มเพิ่มสินค้าเข้าไปในตะกร้า */}
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// ฟังก์ชัน getServerSideProps ใช้สำหรับดึงข้อมูลสินค้าที่มี id ที่ส่งมาจาก params จาก server
export const getServerSideProps = async ({ params }) => {
  // ใช้ axios เพื่อเรียกข้อมูลสินค้าจาก API โดยใช้ id ที่ส่งมา
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      noodle: res.data, // ส่งข้อมูลสินค้าที่ได้รับกลับไปเป็น props ให้กับคอมโพเนนต์
    },
  };
};

export default Product; // ส่งคอมโพเนนต์ Product ออกจากไฟล์

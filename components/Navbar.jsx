import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

// คอมโพเนนต์ Navbar ใช้สำหรับแสดงเมนูและโลโก้บนส่วนหัวของเว็บไซต์
const Navbar = () => {
  // ใช้ useSelector เพื่อดึงค่าจำนวนสินค้าในตะกร้าจาก Redux store
  const quantity = useSelector((state) => state.cart.quantity);
  
  return (
    <div className={styles.container}>
      {/* ส่วนของโลโก้และชื่อเว็บไซต์ */}
      <div className={styles.item}>
        <div >
          <Image className={styles.logo} src="/img/logo.jpg" alt="" width={100} height={100}  />
        </div>
        <div className={styles.texts}>
          {/* ใช้ Link สำหรับการนำทางไปยังหน้าแรก */}
          <Link href="/">
            <div className={styles.text}>NoodleElegant</div>
          </Link>
        </div>
      </div>
      
      {/* ส่วนของไอคอนตะกร้าสินค้าและจำนวนสินค้าในตะกร้า */}
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            {/* รูปไอคอนตะกร้า */}
            <Image src="/img/cart.png" alt="" width={30} height={30} />
            {/* แสดงจำนวนสินค้าในตะกร้า */}
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;

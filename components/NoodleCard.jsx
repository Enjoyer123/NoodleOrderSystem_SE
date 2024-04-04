import Image from "next/image";
import Link from "next/link";
import styles from "../styles/NoodleCard.module.css";

const NoodleCard = ({ noodle }) => {
  return (
    <div className={styles.container}>
      {/* สร้างลิงก์เมื่อคลิกที่รูปภาพหรือชื่อสินค้า */}
      <Link href={`/product/${noodle._id}`}>
        <div className={styles.image}>
          {/* โหลดรูปภาพของสินค้า */}
          <Image src={noodle.img1} alt="" width={500} height={500} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            {/* แสดงชื่อและราคาของสินค้า */}
            <h1 className={styles.title}>{noodle.title}</h1>
            <span className={styles.title}>${noodle.prices}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoodleCard;

import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  // สร้างตัวแปรเพื่อเก็บค่าสถานะของคำสั่งซื้อ
  const status = order.status;

  // ฟังก์ชันสำหรับกำหนดคลาส CSS ของสถานะ
  const statusClass = (index) => {
    // เช็คสถานะและคืนค่าคลาส CSS ตามสถานะที่กำหนด
    if (index - status < 1) return styles.done; // สถานะเสร็จสมบูรณ์
    if (index - status === 1) return styles.inProgress; // กำลังดำเนินการ
    if (index - status > 1) return styles.undone; // ยังไม่เริ่มดำเนินการ
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          {/* แสดงรายละเอียดของคำสั่งซื้อ */}
          <div className={styles.cardItem}>
            <span className={styles.label}>Order ID:</span>
            <span className={styles.value}>{order._id}</span>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.label}>Customer:</span>
            <span className={styles.value}>{order.emailcustomer}</span>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.label}>Table:</span>
            <span className={styles.value}>{order.table}</span>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.label}>Total:</span>
            <span className={styles.value}>${order.total}</span>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.label}>Time:</span>
            <span className={styles.value}>{order.createdAt}</span>
          </div>
        </div>

        {/* แสดงสถานะของคำสั่งซื้อ */}
        <div className={styles.row}>
          {/* สถานะ Payment */}
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            {/* รูปเครื่องหมายตรวจสอบ */}
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          {/* สถานะ Preparing */}
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            {/* รูปเครื่องหมายตรวจสอบ */}
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          {/* สถานะ On the way */}
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            {/* รูปเครื่องหมายตรวจสอบ */}
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          {/* สถานะ Finished */}
          <div className={statusClass(2)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Finished</span>
            {/* รูปเครื่องหมายตรวจสอบ */}
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  // ดึงข้อมูลคำสั่งซื้อจาก API โดยใช้ id ของคำสั่งซื้อ
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;

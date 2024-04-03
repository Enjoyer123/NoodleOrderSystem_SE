import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  const status = order.status;

  
  

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      
        <div className={styles.card}>
          <div className={styles.cardContent}>
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
            <div className={styles.row}>
              <div className={statusClass(0)}>
                <Image src="/img/paid.png" width={30} height={30} alt="" />
                <span>Payment</span>
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
              <div className={statusClass(1)}>
                <Image src="/img/bake.png" width={30} height={30} alt="" />
                <span>Preparing</span>
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
              <div className={statusClass(2)}>
                <Image src="/img/bike.png" width={30} height={30} alt="" />
                <span>On the way</span>
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
            <div className={statusClass(2)}>
                <Image src="/img/delivered.png" width={30} height={30} alt="" />
                <span>Finished</span>
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
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;
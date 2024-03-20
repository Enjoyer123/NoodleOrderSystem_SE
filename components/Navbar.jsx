import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/1.jpg" alt="" width={32} height={32} />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Contact!</div>
          <div className={styles.text}>012345678</div>
        </div>
      </div>
      
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/cart.png" alt="" width={30} height={30} />
            <div className={styles.counter}>2</div>
          </div>
        </div>
      </Link>
    </div>
   
  );
};

export default Navbar;
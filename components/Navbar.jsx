import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div >
          <Image className={styles.logo} src="/img/logo.jpg" alt="" width={100} height={100}  />
        </div>
        <div className={styles.texts}>
          <Link href="/">
          <div className={styles.text}>NoodleElegant</div>
          </Link>
        </div>
      </div>
      
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width={30} height={30} />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
   
  );
};

export default Navbar;
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/NoodleCard.module.css";

const NoodleCard = ({ noodle }) => {
  return (
    <div className={styles.container}>
  <Link href={`/product/${noodle._id}`}>
    <div className={styles.image}>
      <Image src={noodle.img1} alt="" width={500} height={500} />
    </div>
    <div className={styles.bottom}>
      
      <div className={styles.left}>
        <h1 className={styles.title}>{noodle.title}</h1>
        <span className={styles.title}>${noodle.prices}</span>
      </div>
    </div>
  </Link>
</div>

  );
};

export default NoodleCard;

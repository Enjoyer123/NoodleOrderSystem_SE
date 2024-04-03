import Image from "next/image";
import styles from "../../styles/Product.module.css"
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ noodle }) => {
  const [price, setPrice] = useState(noodle.prices)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...noodle, price, quantity }))
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={noodle.img2} layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{noodle.title}</h1>
        <span className={styles.price}>${noodle.prices}</span>
        <p className={styles.desc}>{noodle.desc}</p>
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

          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      noodle: res.data,
    },
  };
};

export default Product;




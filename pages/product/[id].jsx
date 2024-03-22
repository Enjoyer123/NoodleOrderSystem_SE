
//import { useState } from 'react';
import Image from "next/image";
import styles from "../../styles/Product.module.css"
import axios from "axios";
import { useState } from "react";
const Product = ({noodle}) => {
  const [size, setSize] = useState(0);

 
  // const noodles = {
  //   id: "65dc72b08fdb6838cb397b7d",
  //   img: "/3.jpg",
  //   name: "เตี๋ยว",
  //   price: [19.9, 23.9, 27.9],
  //   desc: " หรอยแรงหรอยแรงหรอยแรงหรอย"
  // };

  const handleClick = () => {
    // Handle click
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src="/1.jpg" objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{noodle.title}</h1>
        <span className={styles.price}>${noodle.prices[0]}</span>
        <p className={styles.desc}>{noodle.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/1.jpg" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/1.jpg" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/1.jpg" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
        
        {noodle.extraOption.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))} 
        </div>


        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className="w-20 px-2 py-1 border border-gray-300 rounded"
          />
          <button className={styles.button} >
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




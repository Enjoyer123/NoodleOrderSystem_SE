
//import { useState } from 'react';
import Image from "next/image";
import styles from "../../styles/Product.module.css"


const Product = () => {
  
 
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
        <h1 className={styles.title}>เตี๋ยว</h1>
        <span className={styles.price}>$50</span>
        <p className={styles.desc}>หรอย</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/1.jpg" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/2.jpg" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/3.jpg" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
        
            <div className={styles.option} >
              <input
                type="checkbox"
                id="double"
                name="double"
                className={styles.checkbox}
              />
              <label htmlFor="double">""พิเศษเนื้อ</label>
            </div>
        
            
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

export default Product;

import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  // สถานะเริ่มต้นของรูปภาพแสดง
  const [index, setIndex] = useState(0);
  // รายการของรูปภาพที่จะแสดง
  const images = [
    "/img/1.png",
    "/img/2.png",
    "/img/3.png",
  ];

  // ฟังก์ชันสำหรับเปลี่ยนรูปภาพด้วยลูกศร
  const handleArrow = (direction) =>{
      if(direction==="l"){
          setIndex(index !== 0 ? index-1 : 2)
      }
      if(direction==="r"){
          setIndex(index !== 2 ? index+1 : 0)
      }
  }

  return (
    <div className={styles.container}>
      {/* ลูกศรทางซ้าย */}
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" width={500} height={800} />
      </div>
      {/* รูปภาพที่แสดง */}
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" width={1920} height={1080} />
          </div>
        ))}
      </div>
      {/* ลูกศรทางขวา */}
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" alt="" width={500} height={800}/>
      </div>
    </div>
  );
};

export default Featured;

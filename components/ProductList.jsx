import { useState } from "react";
import NoodleCard from "./NoodleCard";
import style from "../styles/NoodleList.module.css"

const ProductsList = ({ noodleList }) => {
  // ใช้ Hook useState เพื่อเก็บค่าของคำค้นหาสินค้า
  const [searchTerm, setSearchTerm] = useState("");

  // ฟังก์ชัน handleSearchChange ใช้ในการเปลี่ยนแปลงค่าคำค้นหา
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={style.container}>
      {/* แสดงหัวข้อหน้าเว็บ */}
      <h1 className="text-center text-3xl font-bold mb-4 mt-8">THE BEST NOODLE</h1>
      {/* แสดงคำอธิบายเกี่ยวกับร้านเส้นบางกอก */}
      <p className={style.desc}>
        Discover the most delicious noodle flavors in town at our noodle shop. We gather flavors from everywhere and are ready to present them to you. Come and savor tastes you've never experienced before. Enjoy the unique texture of our noodles today!{" "}
        {/* ข้อความเน้นเด่น */}
        <span className={style.high}> It’s time to enjoy the finer things in life.</span>
      </p>
      {/* ช่องค้นหาสินค้า */}
      <div className={style.search1}>
        <input
          type="text"
          placeholder="Search by name..."
          // ค่าของคำค้นหา
          value={searchTerm}
          // เมื่อมีการเปลี่ยนแปลงค่าในช่องค้นหา
          onChange={handleSearchChange}
          className={style.search2}
        />
      </div>
      {/* แสดงรายการสินค้า */}
      <div className={style.wrapper}>
        {noodleList
          // กรองรายการสินค้าที่ต้องการแสดง
          .filter((noodle) => noodle.hide !== "0")
          .filter((noodle) => noodle.title && noodle.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((noodle) => (
            // แสดงข้อมูลสินค้าแต่ละรายการด้วย NoodleCard
            <NoodleCard key={noodle._id} noodle={noodle} />
          ))}
      </div>
    </div>
  );
};

export default ProductsList;

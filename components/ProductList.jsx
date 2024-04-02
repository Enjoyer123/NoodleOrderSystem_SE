// // ProductsList.jsx
// import NoodleCard from "./NoodleCard";

// const ProductsList = ({noodleList}) => {
  
//   return (
//     <div className="mt-16 container mx-auto">
//       <h1 className="text-center text-3xl font-bold mb-4">THE BEST NOODLE</h1>
//       <p className="pl-8 pr-8 text-lg text-gray-700 mb-8">
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
//         in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
//         sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
//         in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
//         sit amet, consectetur adipiscing elit.
//       </p>
//       <div className="flex flex-wrap justify-center">
//       { 
//  noodleList
//  .filter(noodle => noodle.hide !== "0") // เลือกเฉพาะ noodle ที่ option ไม่เท่ากับ 0
//  .map((noodle) => (
//    <NoodleCard key={noodle._id} noodle={noodle} />
//  ))
// }
//       </div>
//     </div>
//   );
// };

// export default ProductsList;


import { useState } from "react";
import NoodleCard from "./NoodleCard";
import style from "../styles/NoodleList.module.css"
const ProductsList = ({ noodleList }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={style.container}>
      <h1 className="text-center text-3xl font-bold mb-4 mt-8">THE BEST NOODLE</h1>
      <p className={style.desc}>
      Discover the most delicious noodle flavors in town at our noodle shop. We gather flavors from everywhere and are ready to present them to you. Come and savor tastes you've never experienced before. Enjoy the unique texture of our noodles today! <span className={style.high}> It’s time to enjoy the finer things in life.</span>
      </p>
      <div className={style.search1}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={style.search2}
        />
      </div>
      <div className={style.wrapper}>
      { 
  noodleList
    .filter((noodle) => noodle.hide !== "0")
    .filter((noodle) => noodle.title && noodle.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((noodle) => (
      <NoodleCard key={noodle._id} noodle={noodle} />
    ))
}
      </div>
    </div>
  );
};

export default ProductsList;



import Head from "next/head";
import ProductsList from "../components/ProductList"
import Featured from "../components/Featured";
import axios from "axios";
export default function Home({noodleList}) {
 
  return (
    
        <div className="">
          <Head>
            <title>Noodles-Shop</title>
            <meta name="description" content="Best noodle shop in town" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Featured />
          <ProductsList noodleList = {noodleList} />  
       
        </div>
    
  );
}


export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  // console.log(res)
  return {
    props: {
      noodleList: res.data,
    },
  };
};

// export const getServerSideProps = async () => {
//   try {
//     const noodleList = await NoodleApiProxyProducts.fetchNoodleData(); // เรียกใช้ fetchNoodleData จาก NoodleApiProxy
//     return {
//       props: {
//         noodleList,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching noodle data:", error);
//     return {
//       props: {
//         noodleList: [],
//       },
//     };
//   }
// };
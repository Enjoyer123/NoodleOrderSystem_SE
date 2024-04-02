import Image from "next/image";

import Head from "next/head";
import ProductsList from "../components/ProductList"
import axios from "axios";

import Featured from "../components/Featured";

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
import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import ProductsList from "../components/ProductList"
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home({noodleList}) {
  return (
    
        <div className="">
          <Head>
            <title>Noodles-Shop</title>
            <meta name="description" content="Best noodle shop in town" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
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
import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import ProductsList from "../components/ProductList"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    
        <div className="">
          <Head>
            <title>Noodles-Shop</title>
            <meta name="description" content="Best noodle shop in town" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ProductsList />
        </div>
    
  );
}



import styles from "../../styles/Admin.module.css"
import Image from "next/image"
import axios from "axios"
import { useState } from "react";


function Index({ products, orders }) {
    const [close, setClose] = useState(true);
    const [noodleList, setNoodleList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "on the way", "delivered"];
    
    
    const handleDelete = async (id) => {
        try {
            
            const res = await axios.delete("http://localhost:3000/api/products/" + id);
            console.log("ei")
            location.reload();
        } catch (err) {
            console.log(err)
        }
    };



    const handleHide = async (id) => {

        // หากค่า title เป็น "0" ให้เปลี่ยนเป็น "1" และ ngượcกัน
        const newData = {
            hide: noodleList.find(product => product._id === id).hide === "0" ? "1" : "0"
            // อื่น ๆ ที่คุณต้องการอัปเดต
        };
        
        try {
            const updatedProduct = await axios.patch(
                `http://localhost:3000/api/products/${id}`,
                newData
            );
    
            console.log("Updated Product:", updatedProduct.data);
            location.reload();
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };
    

    const handleStatus = async (id) => {
        const item = orderList.find((order) => order._id === id);
        const currentStatus = item.status;

        try {
            const res = await axios.put(`http://localhost:3000/api/orders/${id}`, { status: currentStatus + 1 });

            if (status[currentStatus] === "") {
                // ถ้าสถานะเป็น "delivered" ลบคำสั่งออกจาก orderList
                setOrderList(orderList.filter((order) => order._id !== id));
            } else {
                // ถ้าสถานะไม่ใช่ "delivered" อัปเดตคำสั่งใน orderList
                setOrderList([
                    res.data,
                    ...orderList.filter((order) => order._id !== id)
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Display</th>
                            <th>Action</th>
                    
                        </tr>
                    </tbody>
                    {noodleList.map(product => (
                        <tbody key={product._id}>

                            <tr className={styles.trTitle}>
                                <td>
                                    <Image
                                        src={product.img}
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                        alt=""
                                    />
                                </td>
                                <td>{product._id}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices[0]}</td>
                                <td>{product.hide}</td>
                                <td>
                                    <button className={styles.button} onClick={() => handleHide(product._id)}>Hide</button>
                                    <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            {/* //////////////////////////// */}
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </tbody>
                    {orderList
                        .filter((order) => status[order.status] !== "delivered") // กรองเฉพาะคำสั่งที่มีสถานะไม่ใช่ "delivered"
                        .map((order) => (
                            <tbody key={order._id}>
                                <tr className={styles.trTitle}>
                                    <td>{order._id.slice(0, 8)}...</td>
                                    <td>{order.customer}</td>
                                    <td>${order.total}</td>
                                    <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                                    <td>{status[order.status]}</td>
                                    <td>
                                        <button className={styles.button} onClick={() => handleStatus(order._id)}>Next Stage</button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                </table>
            </div>


        </div>
    )
}


export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }
    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");
    // console.log("eiei",productRes)
    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        }
    }
}
export default Index;
import styles from "../../styles/Admin.module.css"
import Image from "next/image"
import axios from "axios"
import { useState } from "react";
import Swal from 'sweetalert2';

const Index =({ products, orders })=> {
    const [close, setClose] = useState(false);
    const [noodleList, setNoodleList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "on the way", "delivered","Finished"];

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3000/api/products/" + id);
            setNoodleList(noodleList.filter(product => product._id !== id)); 
            Swal.fire('Success', 'Product has been deleted!', 'success');
        } catch (err) {
            console.log(err)
        }
    };
    
    const handleHide = async (id) => {
        const currentProduct = noodleList.find(product => product._id === id);
        const newData = {
            hide: currentProduct.hide === "0" ? "1" : "0"
        };
    
        try {
            const updatedProduct = await axios.patch(
                `http://localhost:3000/api/products/${id}`,
                newData
            );
    
            console.log("Updated Product:", updatedProduct.data);
            if (newData.hide === "0") {
                Swal.fire('Success', 'Product has been hidden!', 'success');
            } else {
                Swal.fire('Success', 'Product has been displayed!', 'success');
            }
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
                setOrderList(orderList.filter((order) => order._id !== id));
               
            } else {
                setOrderList([
                    res.data,
                    ...orderList.filter((order) => order._id !== id)
                ]);
            }
            Swal.fire('Success', 'Status has been changed!', 'success');
        } catch (err) {
            console.log(err);
        }
    };
    

    const handleClick = () => {
        setClose(prevClose => !prevClose);
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
                                        src={product.img1}
                                        width={50}
                                        height={50}
                                        alt=""
                                    />
                                </td>
                                <td>{product._id.slice(0, 8)}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices}</td>
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


            <div className={styles.item}>
            <div className={styles.title1}>
                Orders
                <button className={styles.buttonOpen} onClick={handleClick}>Order Records</button>
                </div>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Time</th>
                            <th>Action</th>

                        </tr>
                    </tbody>
                    {orderList
            .filter((order) => status[order.status] !== "Finished") // กรองเฉพาะคำสั่งที่มีสถานะไม่ใช่ "delivered"
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // เรียงลำดับตามวันที่ถูกสร้าง
            .map((order) => (
                <tbody key={order._id}>
                    <tr className={styles.trTitle}>
                        <td>{order._id.slice(0, 8)}...</td>
                        <td>{order.emailcustomer}</td>
                        <td>${order.total}</td>
                        <td>{order.method === 1 ? <span>paid</span> : <span>paid</span>}</td>
                        <td>{status[order.status]}</td>
                        <td>{order.createdAt}</td>
                        <td>
                            <button className={styles.button} onClick={() => handleStatus(order._id)}>Next</button>
                        </td>
                    </tr>
                </tbody>
            ))}
                </table>
                
            </div>

            {close && (
    <div className={styles.popupOverlay}>

        <div className={styles.popupContent}>

            <div className={styles.title}>Orders
            <button 
            className={styles.buttonClose} 
            onClick={handleClick}>x</button>

            </div>

            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Time</th>
                        <th>Status</th>
                        
                    </tr>
                </tbody>
                
                {orderList
                    .filter((order) => status[order.status] === "Finished") // กรองเฉพาะคำสั่งที่มีสถานะ "delivered"
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // เรียงลำดับตามวันที่ถูกสร้าง
                    .map((order) => (
                        <tbody key={order._id}>
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0, 8)}...</td>
                                <td className={styles.text}>{order.emailcustomer}</td>
                                <td>${order.total}</td>
                                <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                                <td>{order.createdAt}</td>
                                <td>{status[order.status]}</td>
                            </tr>
                        </tbody>
                    ))}
                
            </table>
        </div>
        
    </div>
)}
                   

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
    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        }
    }
}


export default Index;
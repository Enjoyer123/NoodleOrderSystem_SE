import styles from "../../styles/Admin.module.css"
import Image from "next/image"
import axios from "axios"
import { useState } from "react";
import Swal from 'sweetalert2';

const Index =({ products, orders })=> {
    // สถานะเพื่อเปิดหรือปิดการแสดงข้อมูลคำสั่งซื้อ
    const [close, setClose] = useState(false); 
    // รายการสินค้า
    const [noodleList, setNoodleList] = useState(products); 
    // รายการคำสั่งซื้อ
    const [orderList, setOrderList] = useState(orders); 
    // สถานะของคำสั่งซื้อ
    const status = ["preparing", "on the way", "delivered","Finished"];

    // ฟังก์ชันสำหรับลบสินค้า
    const handleDelete = async (id) => {
        try {
            // ส่งคำร้องขอ DELETE ไปยังเซิร์ฟเวอร์
            await axios.delete("http://localhost:3000/api/products/" + id); 
            // อัพเดตรายการสินค้าหลังจากลบสำเร็จ
            setNoodleList(noodleList.filter(product => product._id !== id)); 
            // แสดงข้อความเตือนด้วย SweetAlert
            Swal.fire('Success', 'Product has been deleted!', 'success'); 
        } catch (err) {
            console.log(err)
        }
    };
    
    // ฟังก์ชันสำหรับซ่อนหรือแสดงสินค้า
const handleHide = async (id) => {
    // ค้นหาสินค้าที่ต้องการซ่อนหรือแสดงจาก noodleList โดยใช้ _id
    const currentProduct = noodleList.find(product => product._id === id);
    // สร้างข้อมูลใหม่เพื่ออัพเดตสถานะการซ่อนหรือแสดงของสินค้า
    const newData = {
        hide: currentProduct.hide === "0" ? "1" : "0"
    };

    try {
        // ส่งคำร้องขอ PATCH ไปยังเซิร์ฟเวอร์เพื่ออัพเดตสินค้า
        const updatedProduct = await axios.patch(
            `http://localhost:3000/api/products/${id}`,
            newData
        );
        console.log("Updated Product:", updatedProduct.data);
        // แสดงข้อความเตือนด้วย SweetAlert ว่าสินค้าถูกซ่อนหรือแสดงเรียบร้อย
        if (newData.hide === "0") {
            Swal.fire('Success', 'Product has been hidden!', 'success');
        } else {
            Swal.fire('Success', 'Product has been displayed!', 'success');
        }
        // รีโหลดหน้าเว็บหลังจากอัพเดตสินค้าเรียบร้อย
        //location.reload();
    } catch (err) {
        console.error("Error updating product:", err);
    }
};

    // ฟังก์ชันสำหรับเปลี่ยนสถานะของคำสั่งซื้อ
const handleStatus = async (id) => {
    // ค้นหาคำสั่งซื้อที่ต้องการเปลี่ยนสถานะจาก orderList โดยใช้ _id
    const item = orderList.find((order) => order._id === id);
    // กำหนดสถานะปัจจุบันของคำสั่งซื้อ
    const currentStatus = item.status;
    try {
        // ส่งคำร้องขอ PUT ไปยังเซิร์ฟเวอร์เพื่ออัพเดตสถานะของคำสั่งซื้อ
        const res = await axios.put(`http://localhost:3000/api/orders/${id}`, { status: currentStatus + 1 });
        // หากสถานะปัจจุบันของคำสั่งซื้อเป็นสถานะว่าง (""), ให้ลบคำสั่งซื้อออกจาก orderList
        if (status[currentStatus] === "") {
            setOrderList(orderList.filter((order) => order._id !== id));
        } else {
            // ไม่เช่นนั้นให้อัพเดตคำสั่งซื้อใหม่และเพิ่มเข้าไปใน orderList
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id)
            ]);
        }
        // แสดงข้อความเตือนด้วย SweetAlert ว่าสถานะถูกเปลี่ยนแล้ว
        Swal.fire('Success', 'Status has been changed!', 'success');
    } catch (err) {
        console.log(err);
    }
};


    // ฟังก์ชันสำหรับเปิดหรือปิดการแสดงข้อมูลคำสั่งซื้อ
    const handleClick = () => {
        setClose(prevClose => !prevClose);
    };
    
    // JSX สำหรับแสดงข้อมูลและการจัดการข้อมูล
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
                                    <button 
                                    className={styles.button} 
                                    onClick={() => handleHide(product._id)}>Hide
                                    </button>
                                    <button 
                                    className={styles.button} 
                                    onClick={() => handleDelete(product._id)}>Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            <div className={styles.item}>
                <div className={styles.title1}>
                    Orders
                    <button 
                    className={styles.buttonOpen} 
                    onClick={handleClick}>Order Records
                    </button>
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
            // กรองเฉพาะคำสั่งที่มีสถานะไม่ใช่ "delivered"
            .filter((order) => status[order.status] !== "Finished") 
            // เรียงลำดับตามวันที่ถูกสร้าง
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
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
                            <button 
                            className={styles.button} 
                            onClick={() => handleStatus(order._id)}>Next
                            </button>
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
                    // กรองเฉพาะคำสั่งที่มีสถานะ "delivered"
                    .filter((order) => status[order.status] === "Finished") 
                    // เรียงลำดับตามวันที่ถูกสร้าง
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
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

// ฟังก์ชันนี้ใช้สำหรับดึงข้อมูลเริ่มต้นของ component โดยทำงานบน server และตรวจสอบความถูกต้องของ token ที่ถูกส่งมากับคำขอ
export const getServerSideProps = async (ctx) => {
    // ดึงค่า cookie จาก request หากไม่มีจะกำหนดให้เป็นค่าว่าง
    const myCookie = ctx.req?.cookies || "";

    // ตรวจสอบความถูกต้องของ token ที่ถูกส่งมากับคำขอ
    if (myCookie.token !== process.env.TOKEN) {
        // หาก token ไม่ถูกต้องให้ redirect ไปยังหน้า login
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    // ดึงข้อมูลสินค้าและคำสั่งซื้อจากเซิร์ฟเวอร์
    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");

    // ส่งข้อมูลสินค้าและคำสั่งซื้อกลับเพื่อนำมาใช้ใน component
    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        }
    }
}

export default Index;


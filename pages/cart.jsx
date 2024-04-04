// Import ไลบรารีและคอมโพเนนต์ที่จำเป็น
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset, removeProduct, adjustQuantity } from "../redux/cartSlice";
import Link from "next/link";
import Swal from 'sweetalert2';

// ฟังก์ชันสำหรับแสดงหน้าตะกร้าสินค้า
function Cart() {
  // กำหนด state สำหรับเก็บข้อมูล table number และ email
  const [tableNumber, setTableNumber] = useState('');
  const [email, setEmail] = useState('');

  // ใช้ useSelector เพื่อดึงข้อมูลจาก Redux store
  const cart = useSelector((state) => state.cart);
  // กำหนด state สำหรับเปิด/ปิดโมดอัพชำระเงิน
  const [open, setOpen] = useState(false);
  // กำหนดค่ารวมราคาสินค้าในตะกร้า
  const amount = cart.total;
  // กำหนดสกุลเงิน
  const currency = "USD";
  // กำหนดรูปแบบของปุ่ม PayPal
  const style = { "layout": "vertical" };
  // ใช้ useDispatch เพื่อเรียกใช้ actions จาก Redux store
  const dispatch = useDispatch();
  const router = useRouter();

  // ฟังก์ชันตรวจสอบความถูกต้องของอีเมล
  const isValidEmail = (email) => {
    // Regular expression สำหรับการตรวจสอบความถูกต้องของอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // ฟังก์ชันสำหรับการทำรายการชำระเงิน
  const handleCheckout = () => {
    // ตรวจสอบความถูกต้องของข้อมูล table number และ email
    if (!tableNumber && !email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter table number and email before checkout.'
      });
      return;
    }
    if (!tableNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a table number.'
      });
      return;
    }
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter your email.'
      });
      return;
    }
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address.'
      });
      return;
    }
    // กำหนด state เพื่อเปิดโมดอัพชำระเงิน
    setOpen(true);
  };
  
  // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  // ฟังก์ชันสำหรับสร้าง order และ receipt หลังจากชำระเงินสำเร็จ
  const createOrder = async (data) => {
    try {
      // ส่งคำขอสร้าง order ไปยังเซิร์ฟเวอร์
      const orderRes = await axios.post("http://localhost:3000/api/orders", data);
      // ส่งคำขอสร้าง receipt ไปยังเซิร์ฟเวอร์
      const receiptRes = await axios.post("http://localhost:3000/api/receipts", {
        orderId: orderRes.data._id,
        customer: data.emailcustomer,
        address: data.table,
        total: data.total
      });

      // หากสร้าง order และ receipt สำเร็จ
      if (orderRes.status === 201 && receiptRes.status === 201) {
        // ส่งอีเมลหลังจากสร้าง order และ receipt สำเร็จ
        sendMail(receiptRes.data);
        // นำ user ไปยังหน้ารายการคำสั่งซื้อ
        router.push("/orders/" + orderRes.data._id);
        // Reset ตะกร้าสินค้า
        dispatch(reset());
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ฟังก์ชันสำหรับปรับปริมาณสินค้าในตะกร้า
  const handleAdjustQuantity = (productId, newQuantity) => {
    dispatch(adjustQuantity({ _id: productId, quantity: newQuantity }));
  };

  // ฟังก์ชันสำหรับส่งอีเมล
  const sendMail = async (data) => {
    try {
      // ส่งคำขอสร้างอีเมลไปยังเซิร์ฟเวอร์
      const response = await axios.post("http://localhost:3000/api/sendEmail", {
        receiptData: data
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // คอมโพเนนต์ที่ครอบ PayPalButtons เพื่อปรับเปลี่ยนสกุลเงินและแสดง Spinner
  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              createOrder({
                emailcustomer: email,
                table: tableNumber,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <>
    {/* ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่ */}
    {cart.products.length === 0 ? (
      <div className={styles.container2}>
        <div className={styles.newcard}>
          <h1>No products in the cart</h1>
          <Link href="/">
            <button className={styles.goorders}>Go orders</button>
          </Link>
        </div>
      </div>
    ) : (
      <div className={styles.container}>
        <div className="setid">
          {/* แสดงสินค้าในตะกร้า */}
          {cart.products.map((product) => (
            <div className={styles.cardItem} key={product._id}>
              <div className={styles.left}>
                <img className={styles.Image} src={product.img1} alt="" />
                <span className={styles.name}>{product.title}</span>
                <span className={styles.price}>${product.prices}/1</span>
              </div>
              <div className={styles.right}>
                {/* ปุ่มสำหรับปรับปริมาณสินค้า */}
                <button
                  className={styles.sub}
                  onClick={() => {
                    if (product.quantity > 1) {
                      handleAdjustQuantity(product._id, product.quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <span className={styles.quantity}>{product.quantity}</span>
                <button
                  className={styles.add}
                  onClick={() => handleAdjustQuantity(product._id, product.quantity + 1)}
                >
                  +
                </button>
                {/* ปุ่มสำหรับลบสินค้าออกจากตะกร้า */}
                <button
                  className={styles.buttonRe}
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tamail}>
          {/* เลือกเลขโต๊ะ */}
          <select
            id="table-number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className={styles.select}>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
          {/* กรอกอีเมล */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            className={styles.email}
          />
        </div>
        
        {/* แสดงราคารวมทั้งหมด */}
        <div className={styles.totalTextTitle}>
          <b>Total: ${cart.total}.00</b>
        </div>

        {/* คอมโพเนนต์ PayPalButtons และปุ่ม CHECKOUT NOW */}
        <PayPalScriptProvider
          options={{
            "client-id": "Actpj7W8pi5foaGko0k9zzEj2gy9qtxXzBocJcGmg4CTZnvwZl6dJq4rXDiLGyQyJYOmx7RbN3FGzLB2",
            components: "buttons",
            currency: "USD",
            "disable-funding": "credit,card,p24",
          }}
        >
          {open ? ( // ตรวจสอบว่าปุ่ม PayPal ถูกกดหรือไม่
            <ButtonWrapper currency={currency} showSpinner={false} />
          ) : (
            <button onClick={handleCheckout} className={styles.button}>CHECKOUT NOW</button>
          )}
        </PayPalScriptProvider>
      </div>
    )}
    </>
  );
}

export default Cart;

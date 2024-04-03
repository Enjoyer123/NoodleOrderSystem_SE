// import styles from "../styles/Cart.module.css";
// import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import {
//   PayPalScriptProvider,
//   PayPalButtons,
//   usePayPalScriptReducer,
// } from "@paypal/react-paypal-js";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { reset, removeProduct, adjustQuantity } from "../redux/cartSlice";

// function Cart() {
//   const [tableNumber, setTableNumber] = useState('');
//   const [email, setEmail] = useState('');

//   const cart = useSelector((state) => state.cart);
//   const [open, setOpen] = useState(false);
//   const amount = cart.total;
//   const currency = "USD";
//   const style = { "layout": "vertical" };
//   const dispatch = useDispatch();
//   const router = useRouter();


//   const handleRemoveProduct = (productId) => {
//     // หากต้องการลบสินค้าจากตะกร้า สามารถใช้ dispatch เพื่อส่ง action ไปยัง redux หรือส่งคำขอ API ไปยังเซิร์ฟเวอร์เพื่อลบสินค้า
//     // เช่น:
//     dispatch(removeProduct(productId));
//   }


//   const createOrder = async (data) => {
//     try {
//       const orderRes = await axios.post("http://localhost:3000/api/orders", data);
//       const receiptRes = await axios.post("http://localhost:3000/api/receipts", {
//         orderId: orderRes.data._id,
//         customer: data.customer,
//         address: data.address,
//         total: data.total
//       });

//       if (orderRes.status === 201 && receiptRes.status === 201) {
//         // ส่งอีเมลหลังจากสร้าง order และ receipt สำเร็จ
//         await sendMail(receiptRes.data);

//         router.push("/orders/" + orderRes.data._id);
//         dispatch(reset());
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleAdjustQuantity = (productId, newQuantity) => {
//     dispatch(adjustQuantity({ _id: productId, quantity: newQuantity }));
//   };

//   const sendMail = async (data) => {

//     try {
//       console.log("eiei2", data);
//       const response = await axios.post("http://localhost:3000/api/sendEmail", {
//         receiptData: data // ส่งข้อมูล receiptRes ไปยัง sendMail
//       });

//     } catch (error) {
//       console.log("หรอย2");
//       console.error("Error sending email:", error);
//     }
//   };


//   // Custom component to wrap the PayPalButtons and handle currency changes
//   const ButtonWrapper = ({ currency, showSpinner }) => {
//     // usePayPalScriptReducer can be used only inside children of PayPalScriptProviders
//     // This is the main reason to wrap the PayPalButtons in a new component
//     const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

//     useEffect(() => {
//       dispatch({
//         type: "resetOptions",
//         value: {
//           ...options,
//           currency: currency,
//         },
//       });
//     }, [currency, showSpinner]);

//     return (
//       <>
//         {showSpinner && isPending && <div className="spinner" />}
//         <PayPalButtons
//           style={style}
//           disabled={false}
//           forceReRender={[amount, currency, style]}
//           fundingSource={undefined}
//           createOrder={(data, actions) => {
//             return actions.order
//               .create({
//                 purchase_units: [
//                   {
//                     amount: {
//                       currency_code: currency,
//                       value: amount,
//                     },
//                   },
//                 ],
//               })
//               .then((orderId) => {
//                 // Your code here after create the order
//                 return orderId;
//               });
//           }}
//           onApprove={function (data, actions) {
//             return actions.order.capture().then(function (details) {
//               const shipping = details.purchase_units[0].shipping;
//               createOrder({
//                 customer: email,
//                 address: tableNumber,
//                 total: cart.total,
//                 method: 1,

//               });
//             });
//           }}
//         />
//       </>
//     );
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.left}>
//           <table className={styles.table}>
//             <tbody>
//               <tr className={styles.trTitle}>
//                 <th>Product</th>
//                 <th>Name</th>
//                 <th>Table</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//               </tr>
//             </tbody>
//             <tbody>

//               {cart.products.map((product) => (
//                 <tr className={styles.tr} key={product._id}>
//                   <td>
//                     <div className={styles.imgContainer}>
//                       <Image src={product.img} layout="fill" objectFit="cover" alt="" />
//                     </div>
//                   </td>
//                   <td>
//                     <span className={styles.name}>{product.title}</span>
//                   </td>
//                   <td>
//                     <span className={styles.extras}>5</span>
//                   </td>
//                   <td>
//                     <span className={styles.price}>฿{product.price}</span>
//                   </td>
//                   <td>
//                     <div className={styles.quantityContainer}>
//                       <button onClick={() => handleAdjustQuantity(product._id, product.quantity - 1)}>-</button>
//                       <span className={styles.quantity}>{product.quantity}</span>
//                       <button onClick={() => handleAdjustQuantity(product._id, product.quantity + 1)}>+</button>
//                     </div>
//                   </td>
//                   <td>
//                     <span className={styles.total}>฿{product.price * product.quantity}</span>
//                   </td>
//                   <td>
//                     <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
//                   </td>
//                 </tr>
//               ))}


//             </tbody>
//           </table>
//         </div>
//         <div>
//           <h1>โต๊ะอาหาร</h1>
//           <label htmlFor="table-number">เลือกเลขโต๊ะ:</label>
//           <select id="table-number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)}>
//             <option value="">โปรดเลือก</option>
//             <option value="1">โต๊ะที่ 1</option>
//             <option value="2">โต๊ะที่ 2</option>
//             <option value="3">โต๊ะที่ 3</option>
//             <option value="4">โต๊ะที่ 4</option>
//             <option value="5">โต๊ะที่ 5</option>
//             <option value="6">โต๊ะที่ 6</option>
//             {/* Add more table options as needed */}
//           </select>
//           <br /><br />
//           <label htmlFor="email">อีเมล์:</label>
//           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" />
//           <br /><br />
//         </div>
//       </div>
//       <div className={styles.right}>
//         <div className={styles.wrapper}>
//           <h2 className={styles.title}>CART TOTAL</h2>
//           <div className={styles.totalText}>
//             <b className={styles.totalTextTitle}>Subtotal:</b>฿{cart.total}
//           </div>
//           <div className={styles.totalText}>
//             <b className={styles.totalTextTitle}>Discount:</b>฿0.00
//           </div>
//           <div className={styles.totalText}>
//             <b className={styles.totalTextTitle}>Total:</b>฿{cart.total}
//           </div>

//           <PayPalScriptProvider
//             options={{
//               "client-id": "Actpj7W8pi5foaGko0k9zzEj2gy9qtxXzBocJcGmg4CTZnvwZl6dJq4rXDiLGyQyJYOmx7RbN3FGzLB2",
//               components: "buttons",
//               currency: "USD",
//               "disable-funding": "credit,card,p24",
//             }}
//           >
//             <ButtonWrapper currency={currency} showSpinner={false} />
//           </PayPalScriptProvider>

//           <button onClick={() => setOpen(true)} className={styles.button}>CHECKOUT NOW</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cart;


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

function Cart() {
  const [tableNumber, setTableNumber] = useState('');
  const [email, setEmail] = useState('');

  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { "layout": "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleCheckout = () => {
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
    console.log("test",open)
    setOpen(true);
    console.log("test",open)
  };
  

  const handleRemoveProduct = (productId) => {
    // หากต้องการลบสินค้าจากตะกร้า สามารถใช้ dispatch เพื่อส่ง action ไปยัง redux หรือส่งคำขอ API ไปยังเซิร์ฟเวอร์เพื่อลบสินค้า
    // เช่น:
    dispatch(removeProduct(productId));
  }


  const createOrder = async (data) => {
    try {
      const orderRes = await axios.post("http://localhost:3000/api/orders", data);
      const receiptRes = await axios.post("http://localhost:3000/api/receipts", {
        orderId: orderRes.data._id,
        customer: data.emailcustomer,
        address: data.table,
        total: data.total
      });

      if (orderRes.status === 201 && receiptRes.status === 201) {
        // ส่งอีเมลหลังจากสร้าง order และ receipt สำเร็จ
        sendMail(receiptRes.data);

        router.push("/orders/" + orderRes.data._id);
        dispatch(reset());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdjustQuantity = (productId, newQuantity) => {
    dispatch(adjustQuantity({ _id: productId, quantity: newQuantity }));
  };

  const sendMail = async (data) => {

    try {
      console.log("eiei2", data);
      const response = await axios.post("http://localhost:3000/api/sendEmail", {
        receiptData: data // ส่งข้อมูล receiptRes ไปยัง sendMail
      });

    } catch (error) {
      console.log("หรอย2");
      console.error("Error sending email:", error);
    }
  };


  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be used only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
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
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
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
          {cart.products.map((product) => (
            <div className={styles.cardItem} key={product._id}>
              <div className={styles.left}>
                <img className={styles.Image} src={product.img1} alt="" />
                <span className={styles.name}>{product.title}</span>
                <span className={styles.price}>${product.prices}/1</span>
                {/* <span className={styles.total}>฿{product.price * product.quantity}</span> */}
              </div>
              <div className={styles.right}>
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

          <select
            id="table-number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className={styles.select}>

            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            className={styles.email}
          />
     
        
        </div>
        <div className={styles.totalTextTitle}>
         
            <b>Total: ${cart.total}.00</b>
          </div>


       
          <PayPalScriptProvider
  options={{
    "client-id": "Actpj7W8pi5foaGko0k9zzEj2gy9qtxXzBocJcGmg4CTZnvwZl6dJq4rXDiLGyQyJYOmx7RbN3FGzLB2",
    components: "buttons",
    currency: "USD",
    "disable-funding": "credit,card,p24",
  }}
>
  {open ? ( // เช็คว่าปุ่ม PayPal ถูกกดหรือไม่
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



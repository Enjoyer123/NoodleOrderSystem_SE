import styles from "../styles/Cart.module.css"
import Image from "next/image"
function cart() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Table</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </tbody>
          <tbody>
          <tr className={styles.tr}>
            <td>
              <div className={styles.imgContainer}>
                <Image src="/1.jpg" layout="fill" objectFit="cover" alt=""/>
              </div>
            </td>
            <td>

              <span className={styles.name}>5</span>
            </td>
            <td>
              <span className={styles.extras}>veget</span>
            </td>
            <td>
              <span className={styles.price}>5</span>
            </td>
            <td>
              <span className={styles.quantity}>1</span>
            </td>
            <td>
              <span className={styles.total}>5
              </span>
            </td>
          </tr>
        
          </tbody>
        </table>
      </div>
      
    </div>
    <div className={styles.right}>
    <div className={styles.wrapper}>
      <h2 className={styles.title}>CART TOTAL</h2>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Subtotal:</b>$5
      </div>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Discount:</b>$5
      </div>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Total:</b>$5
      </div>
      <button className={styles.button}>CHECKOUT NOW</button>
    </div>
  </div>
  </>

  )
}

export default cart
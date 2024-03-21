import React from 'react'
import Image from 'next/image'
import styles from "../../styles/Order.module.css";

function Order() {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.row}>
            <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Id</th>
            <th>Customer</th>
            <th>Table</th>
            <th>Total</th>
          </tr>
          <tr className={styles.tr}>
            <td>
    
              <span className={styles.id}>eiei</span>
            </td>
            <td>
              <span className={styles.name}>123546</span>
            </td>
            <td>
              <span className={styles.address}>John</span>
            </td>
            <td>
              <span className={styles.total}>1</span>
            </td>
    
            </tr>
            
        </table>
            </div>
            <div className={styles.row}>
                <div className=''>
                
                    <img className="w-[30px] h-[30px]"src="/1.jpg"></img>
                <span>Payment</span>
                <div className=''>
                    <spam>checked</spam>
                </div>
                </div>
                <div className=''>
                
                <img className="w-[30px] h-[30px]"src="/1.jpg"></img>
            <span>Payment</span>
            <div className=''>
                <spam>checked</spam>
            </div>
            
            </div>
            <div className=''>
                
                <img className="w-[30px] h-[30px]"src="/1.jpg"></img>
            <span>Payment</span>
            <div className=''>
                <spam>checked</spam>
            </div>
            
            </div>
            <div className=''>
                
                <img className="w-[30px] h-[30px]"src="/1.jpg"></img>
            <span>Payment</span>
            <div className=''>
                <spam>checked</spam>
            </div>
            
            </div>
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
          <button className={styles.button}>PAID</button>
        </div>
        </div>
    </div>
  )
}

export default Order
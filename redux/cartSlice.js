import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // สถานะเริ่มต้นของตะกร้าสินค้า
    products: [], // รายการสินค้าในตะกร้า
    quantity: 0, // จำนวนสินค้าทั้งหมดในตะกร้า
    total: 0, // ราคารวมของสินค้าทั้งหมดในตะกร้า
  },
  reducers: {
    // การเพิ่มสินค้าเข้าไปในตะกร้า
    addProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingProductIndex !== -1) {
        // หากมีสินค้าที่มี _id เหมือนกันอยู่ในตะกร้าแล้ว
        state.products[existingProductIndex].quantity += parseInt(action.payload.quantity, 10);
      } else {
        // ถ้าไม่มีสินค้าที่มี _id เหมือนกันในตะกร้า
        state.products.push(action.payload);
      }
      // อัปเดตจำนวนสินค้าทั้งหมดในตะกร้า
      state.quantity += parseInt(action.payload.quantity, 10);
      // อัปเดตราคารวมของสินค้าทั้งหมดในตะกร้า
      state.total += action.payload.prices * parseInt(action.payload.quantity, 10);
    },
    // การรีเซ็ตตะกร้าให้เป็นค่าเริ่มต้น
    reset: (state) => {
      state.products = []; // ลบรายการสินค้าในตะกร้าทั้งหมด
      state.quantity = 0; // กำหนดจำนวนสินค้าทั้งหมดในตะกร้าเป็น 0
      state.total = 0; // กำหนดราคารวมของสินค้าทั้งหมดในตะกร้าเป็น 0
    },
    // การปรับปริมาณสินค้าในตะกร้า
    adjustQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const product = state.products.find(item => item._id === _id);
      if (product) {
        // ปรับปรุงจำนวนสินค้าในตะกร้า
        state.quantity += quantity - product.quantity;
        state.total += product.prices * (quantity - product.quantity);
        product.quantity = quantity;
      }
    },
    // การลบสินค้าออกจากตะกร้า
    removeProduct: (state, action) => {
      const removedProductIndex = state.products.findIndex(
        (item) => item._id === action.payload
      );
      if (removedProductIndex !== -1) {
        const removedProductQuantity = state.products[removedProductIndex].quantity;
        const removedProductPrice = state.products[removedProductIndex].prices;
        // ลบจำนวนสินค้าและราคารวมของสินค้าที่ถูกลบออกจากตะกร้า
        state.quantity -= removedProductQuantity;
        state.total -= removedProductPrice * removedProductQuantity;
        // ลบสินค้าออกจากตะกร้า
        state.products.splice(removedProductIndex, 1);
      }
    },
  },
});

export const { addProduct, adjustQuantity, removeProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;

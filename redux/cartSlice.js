// import {createSlice} from "@reduxjs/toolkit"
// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         quantity:0,
//         total:0,
//     },
//     reducers:{
//         addProduct:(state,action)=>{
//             state.products.push(action.payload);
//             state.quantity += 1;
//             state.total += action.payload.price * action.payload.quantity;
//         },
//         reset: (state) => {
//             state.products=[];
//             state.quantity = 0;
//             state.total = 0;
//         },
//     },
// });

// export const {addProduct , reset} = cartSlice.actions;
// export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     quantity: 0,
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       const existingProductIndex = state.products.findIndex(
//         (item) => item._id === action.payload._id
//       );
//       if (existingProductIndex !== -1) {
//         // หากมีสินค้าที่มี id เหมือนกันอยู่ในตะกร้าแล้ว
//         state.products[existingProductIndex].quantity += parseInt(action.payload.quantity, 10);
//       } else {
//         // ถ้าไม่มีสินค้าที่มี id เหมือนกันในตะกร้า
//         state.products.push(action.payload);
//       }
//       // อัปเดตจำนวนสินค้าทั้งหมดในตะกร้า
//       state.quantity += parseInt(action.payload.quantity, 10);
//       // อัปเดตราคารวมของสินค้าทั้งหมดในตะกร้า
//       state.total += action.payload.price * parseInt(action.payload.quantity, 10);
//     },
//     reset: (state) => {
//       state.products = [];
//       state.quantity = 0;
//       state.total = 0;
//     },
//   },
// });

// export const { addProduct, reset } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingProductIndex !== -1) {
        // หากมีสินค้าที่มี id เหมือนกันอยู่ในตะกร้าแล้ว
        state.products[existingProductIndex].quantity += parseInt(action.payload.quantity, 10);
      } else {
        // ถ้าไม่มีสินค้าที่มี id เหมือนกันในตะกร้า
        state.products.push(action.payload);
      }
      // อัปเดตจำนวนสินค้าทั้งหมดในตะกร้า
      state.quantity += parseInt(action.payload.quantity, 10);
      // อัปเดตราคารวมของสินค้าทั้งหมดในตะกร้า
      state.total += action.payload.prices * parseInt(action.payload.quantity, 10);
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    // ฟังก์ชันใหม่เพื่อเพิ่มหรือลดจำนวนสินค้าในตะกร้า
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
    removeProduct: (state, action) => {
      const removedProductIndex = state.products.findIndex(
        (item) => item._id === action.payload
      );
      if (removedProductIndex !== -1) {
        const removedProductQuantity = state.products[removedProductIndex].quantity;
        const removedProductPrice = state.products[removedProductIndex].prices;
        // ลบจำนวนสินค้าและราคารวมของสินค้าที่ลบออกจากตะกร้า
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

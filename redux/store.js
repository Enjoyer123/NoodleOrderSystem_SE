import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// สร้างและกำหนดค่า store ของ Redux ด้วย configureStore
export default configureStore({
    reducer: {
      cart: cartReducer, // กำหนด reducer ของตะกร้าสินค้าเข้าไปใน store
    },
  });

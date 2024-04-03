//factory เก็บข้อมูล schma
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60
    },
    img1: {
        type: String,
        required: true
    },
    img2: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        maxlength: 1000
    },
    hide: {
        type: String,
        default: "1"
    },
    prices: {
        type: Number,
        required: true
    },

    
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

import mongoose, { mongo } from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer:{
        type: String,
        required: true,
        maxlenght: 60,
    },
    address:{
        type: String,
        required: true,
        maxlenght: 200,
    },
    total:{
        type: Number,
        default: 0,
    },
   status:{
        type: Number,
        required: true
    },
    method:{
        type: Number,
        required: true
    },
    

},
{ timestamps: true }

);


export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
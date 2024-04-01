import mongoose from 'mongoose';

const ReceiptSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', 
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true }
);

const Receipt = mongoose.models.Receipt || mongoose.model('Receipt', ReceiptSchema);

export default Receipt;
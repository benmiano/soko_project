import mongoose from "mongoose";
 
const purchaseSchema = new mongoose.Schema({
    items: [{
        itemId:Number,
        quantity:Number
        }],
    price: Number,
    shipping:{type:Object,required:true},
    delivery_status: {type:String, default:"Pending" },
    payment_status:{type:String, required:true},
    total:{type:Number, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    customerId: {type: String},
    paymentIntentId: {type:String}
},
{timestamps:true})

export const Purchase = mongoose.model("Purchase", purchaseSchema)
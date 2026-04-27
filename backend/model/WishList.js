import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }
},{
    timestamps: true
})

export const WishList = mongoose.model('WishList', WishListSchema);


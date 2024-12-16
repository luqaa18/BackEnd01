import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const CartSchema = new Schema({
    products: [{
        _id: false,
        quantity: {
            type: Number,
            default: 1,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        }
    }]
})

CartSchema.plugin(mongoosePaginate);

export const cartModel = model('carts', CartSchema);